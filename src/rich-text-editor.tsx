"use client";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Underline,
  Undo2,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "./button";

const tools = [
  { command: "bold", label: "Bold", icon: Bold },
  { command: "italic", label: "Italic", icon: Italic },
  { command: "underline", label: "Underline", icon: Underline },
  { command: "insertUnorderedList", label: "Bulleted list", icon: List },
  { command: "insertOrderedList", label: "Numbered list", icon: ListOrdered },
  { command: "undo", label: "Undo", icon: Undo2 },
  { command: "redo", label: "Redo", icon: Redo2 },
] as const;

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editor.current && editor.current.innerHTML !== value)
      editor.current.innerHTML = value;
  }, [value]);

  function format(command: string) {
    editor.current?.focus();
    document.execCommand(command);
    onChange(editor.current?.innerHTML ?? "");
  }

  return (
    <div className="overflow-hidden rounded-md border bg-background focus-within:ring-[3px] focus-within:ring-ring/50">
      <div
        className="flex flex-wrap gap-1 border-b bg-muted/40 p-2"
        role="toolbar"
        aria-label="Description formatting"
      >
        {tools.map(({ command, label, icon: Icon }) => (
          <Button
            key={command}
            type="button"
            size="icon"
            variant="ghost"
            className="size-8"
            title={label}
            aria-label={label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => format(command)}
          >
            <Icon className="size-4" />
          </Button>
        ))}
      </div>
      <div
        ref={editor}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Description"
        aria-multiline="true"
        data-placeholder="Describe the product, its use, features, and specifications."
        className="min-h-36 px-3 py-3 text-sm leading-6 outline-none empty:before:pointer-events-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)] [&_ol]:ml-5 [&_ol]:list-decimal [&_ul]:ml-5 [&_ul]:list-disc"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
}
