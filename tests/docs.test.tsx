import assert from "node:assert/strict";
import { test } from "node:test";
import path from "node:path";
import ts from "typescript";
import { componentGroups } from "../ui-preview/catalog";
import { examples } from "../ui-preview/examples";
import reference from "../ui-preview/props.generated.json";

test("props reference preserves required date inputs and button variants", () => {
  const date = reference["date-picker"].find(api => api.name === "DatePicker")!;
  for (const name of ["id", "value", "onChange"]) assert.equal(date.props.find(prop => prop.name === name)?.required, true);
  const button = reference.button.find(api => api.name === "Button")!;
  const variant = button.props.find(prop => prop.name === "variant")!;
  assert.match(variant.type, /destructive/);
  assert.equal(variant.defaultValue, '"default"');
  const calendar = reference.calendar.find(api => api.name === "Calendar")!;
  assert.ok(calendar.props.some(prop => prop.name === "selected"));
});

test("every documented component belongs to the catalog and has generated props", () => {
  const names = componentGroups.flatMap(group => group.items);
  for (const [name, example] of Object.entries(examples)) {
    assert.ok(names.includes(name), name);
    assert.ok(example.code.trim(), name);
    for (const module of example.modules) assert.ok(reference[module as keyof typeof reference]?.length, module);
  }
});

test("copyable React examples compile against the shared component APIs", () => {
  const virtual = new Map(Object.entries(examples).filter(([, example]) => example.code.startsWith('"use client";')).map(([name, example]) => [path.resolve("ui-preview", "example-" + name.replaceAll(/[^a-z0-9]/gi, "-") + ".tsx"), example.code]));
  const options: ts.CompilerOptions = { target: ts.ScriptTarget.ES2021, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX, strict: true, skipLibCheck: true, esModuleInterop: true, noEmit: true };
  const host = ts.createCompilerHost(options);
  const read = host.readFile.bind(host);
  const exists = host.fileExists.bind(host);
  const source = host.getSourceFile.bind(host);
  host.fileExists = file => virtual.has(file) || exists(file);
  host.readFile = file => virtual.get(file) ?? read(file);
  host.getSourceFile = (file, language, onError, shouldCreate) => virtual.has(file) ? ts.createSourceFile(file, virtual.get(file)!, ts.ScriptTarget.ES2021, true) : source(file, language, onError, shouldCreate);
  const program = ts.createProgram([...virtual.keys()], options, host);
  const errors = ts.getPreEmitDiagnostics(program).filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, ts.formatDiagnosticsWithColorAndContext(errors, { getCanonicalFileName: file => file, getCurrentDirectory: () => process.cwd(), getNewLine: () => "\n" }));
});
