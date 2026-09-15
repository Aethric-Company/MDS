import type { Meta, StoryObj } from "@storybook/nextjs";
import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Textarea } from "./textarea";

const meta = {
  title: "Core Components/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="material-name">Material</FieldLabel>
      <Input id="material-name" placeholder="Material name" />
    </Field>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="material-notes">Notes</FieldLabel>
      <Textarea id="material-notes" placeholder="Add notes" />
    </Field>
  ),
};

export const FieldGroupExample: Story = {
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="group-name">Material</FieldLabel>
        <Input id="group-name" placeholder="Material name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="group-quantity">Quantity</FieldLabel>
        <Input id="group-quantity" type="number" placeholder="0" />
      </Field>
    </FieldGroup>
  ),
};
