"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "../src/button";
import { Input } from "../src/input";
import { examples } from "./examples";
import generated from "./props.generated.json";

type Prop = { name: string; type: string; required: boolean; defaultValue: string | null };
type Api = { name: string; props: Prop[] };
const reference = generated as Record<string, Api[]>;

export function ComponentDocs({ name, live }: { name: string; live: boolean }) {
  const example = examples[name];
  const apis = example?.modules.flatMap(module => reference[module] || []) || [];
  const [apiName, setApiName] = useState("");
  const [filter, setFilter] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const api = apis.find(api => api.name === apiName) || apis[0];
  const props = api?.props.filter(prop => (prop.name + " " + prop.type).toLowerCase().includes(filter.toLowerCase())) || [];

  async function copyCode() {
    if (!example) return;
    try {
      await navigator.clipboard.writeText(example.code);
      setCopyState("copied");
    } catch {
      // Embedded browsers may deny the async clipboard API but allow selection copying.
      const previousFocus = document.activeElement;
      const textarea = document.createElement("textarea");
      textarea.value = example.code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        setCopyState(document.execCommand("copy") ? "copied" : "failed");
      } catch {
        setCopyState("failed");
      } finally {
        textarea.remove();
        if (previousFocus instanceof HTMLElement) previousFocus.focus();
      }
    }
  }

  return (
    <section aria-label="Code and props" className="min-w-0 space-y-8 border-t pt-6">
      <div className="min-w-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold">Usage code</h3>
          <Button type="button" variant="outline" size="icon" aria-label="Copy code" title={example ? "Copy code" : "No shared implementation yet"} disabled={!example} onClick={copyCode}>
            {copyState === "copied" ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>
        {example ? <pre className="max-h-96 max-w-full overflow-auto rounded-md bg-muted p-4 text-xs leading-6" tabIndex={0} aria-label="Usage code example"><code>{example.code}</code></pre> : <p className="text-sm text-muted-foreground">{live ? "Usage documentation is not available yet." : "No shared implementation yet. Copy code will be available when this component is added."}</p>}
        <p role="status" className="min-h-5 text-xs text-muted-foreground">{copyState === "copied" ? "Code copied" : copyState === "failed" ? "Clipboard access was unavailable. Select the code above to copy it manually." : ""}</p>
      </div>
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold">Accepted props</h3>
          {apis.length > 1 && <select aria-label="Component API" className="h-9 max-w-full rounded-sm border bg-background px-3 text-sm" value={api?.name} onChange={event => setApiName(event.target.value)}>{apis.map(api => <option key={api.name} value={api.name}>{api.name}</option>)}</select>}
        </div>
        {api ? <>
          <Input aria-label="Search props" placeholder="Search prop names or types" value={filter} onChange={event => setFilter(event.target.value)} />
          <p className="text-xs text-muted-foreground">{api.name} · {api.props.length} accepted props, including inherited HTML or Radix props. Defaults shown are declared in Mpeep UI.</p>
          <div className="max-h-96 overflow-auto rounded-md border">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead className="sticky top-0 bg-muted"><tr>{["Prop", "Type", "Required", "Default"].map(label => <th key={label} className="px-3 py-3 font-semibold">{label}</th>)}</tr></thead>
              <tbody>{props.map(prop => <tr key={prop.name} className="border-t"><td className="px-3 py-3 align-top font-mono">{prop.name}</td><td className="max-w-sm break-words px-3 py-3 align-top font-mono">{prop.type}</td><td className="px-3 py-3 align-top">{prop.required ? "Yes" : "No"}</td><td className="px-3 py-3 align-top font-mono">{prop.defaultValue || "Not declared"}</td></tr>)}{!props.length && <tr><td colSpan={4} className="p-4 text-muted-foreground">No matching props</td></tr>}</tbody>
            </table>
          </div>
        </> : <p className="text-sm text-muted-foreground">{example?.note || "No shared props contract has been defined for this entry."}</p>}
      </div>
    </section>
  );
}
