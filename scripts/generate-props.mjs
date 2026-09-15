import ts from "typescript";
import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src");
const files = readdirSync(source, { recursive: true }).filter(file => file.endsWith(".tsx")).sort();
const program = ts.createProgram(files.map(file => path.join(source, file)), {
  target: ts.ScriptTarget.ES2021, module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX,
  strict: true, skipLibCheck: true, esModuleInterop: true,
});
const checker = program.getTypeChecker();
const reference = {};
for (const file of files) {
  const sf = program.getSourceFile(path.join(source, file));
  const module = checker.getSymbolAtLocation(sf);
  if (!module) continue;
  const components = [];
  for (const exported of checker.getExportsOfModule(module)) {
    if (!/^[A-Z]/.test(exported.name)) continue;
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration || sf);
    const signature = type.getCallSignatures()[0];
    const parameter = signature?.getParameters()[0];
    if (!parameter) continue;
    const parameterType = checker.getTypeOfSymbolAtLocation(parameter, parameter.valueDeclaration || sf);
    const declaration = symbol.valueDeclaration;
    const defaults = {};
    function collectDefaults(node) {
      if (ts.isPropertyAssignment(node) && node.name.getText(sf) === "defaultVariants" && ts.isObjectLiteralExpression(node.initializer)) {
        for (const prop of node.initializer.properties) {
          if (ts.isPropertyAssignment(prop)) defaults[prop.name.getText(sf)] = prop.initializer.getText(sf);
        }
      }
      ts.forEachChild(node, collectDefaults);
    }
    collectDefaults(sf);
    if (declaration && ts.isFunctionDeclaration(declaration)) {
      const binding = declaration.parameters[0]?.name;
      if (binding && ts.isObjectBindingPattern(binding)) {
        for (const element of binding.elements) {
          if (element.initializer) defaults[(element.propertyName || element.name).getText(sf)] = element.initializer.getText(sf);
        }
      }
    }
    const branches = parameterType.isUnion() ? parameterType.types : [parameterType];
    const names = [...new Set(branches.flatMap(branch => checker.getPropertiesOfType(branch).map(prop => prop.name)))];
    const props = names.map(name => {
      const symbols = branches.map(branch => checker.getPropertyOfType(branch, name));
      const types = [...new Set(symbols.filter(Boolean).map(prop => checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration || sf), undefined, ts.TypeFormatFlags.NoTruncation)))];
      return {
        name,
        type: types.join(" | "),
        required: symbols.every(prop => prop && !(prop.flags & ts.SymbolFlags.Optional)),
        defaultValue: defaults[name] || null,
      };
    }).sort((a, b) => Number(b.required) - Number(a.required) || a.name.localeCompare(b.name));
    components.push({ name: exported.name, props });
  }
  reference[file.replace(/\.tsx$/, "")] = components;
}
mkdirSync(path.join(root, "ui-preview"), { recursive: true });
writeFileSync(path.join(root, "ui-preview/props.generated.json"), JSON.stringify(reference, null, 2) + "\n");
console.log(`Generated props for ${Object.values(reference).reduce((count, items) => count + items.length, 0)} exported components.`);
