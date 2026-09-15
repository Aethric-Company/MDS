"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { RichTextEditor } from "./rich-text-editor";

const meta = {
  title: "Core Components/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultEditor() {
      const [value, setValue] = useState("");
      return <RichTextEditor value={value} onChange={setValue} />;
    }
    return <DefaultEditor />;
  },
};

export const WithContent: Story = {
  render: () => {
    function PrefilledEditor() {
      const [value, setValue] = useState(
        "<p>Durable <strong>Portland cement</strong>, suitable for structural work.</p><ul><li>50kg bags</li><li>Moisture resistant packaging</li></ul>",
      );
      return <RichTextEditor value={value} onChange={setValue} />;
    }
    return <PrefilledEditor />;
  },
};
