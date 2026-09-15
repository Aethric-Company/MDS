import type { Meta, StoryObj } from "@storybook/nextjs";
import { DataTable, type DataTableColumn } from "./data-table";

type Material = { id: string; name: string; quantity: number };

const sampleRows: Material[] = Array.from({ length: 6 }, (_, index) => ({
  id: String(index + 1),
  name: `Material ${String(index + 1).padStart(2, "0")}`,
  quantity: (index + 1) * 10,
}));

const columns: DataTableColumn<Material>[] = [
  { key: "name", header: "Material", cell: (row) => row.name },
  { key: "quantity", header: "Quantity", cell: (row) => row.quantity, align: "right" },
];

const meta = {
  title: "Data Display/DataTable",
  component: DataTable<Material>,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "catalog"],
    },
    loadingVariant: {
      control: "select",
      options: ["spinner", "skeleton"],
    },
  },
  args: {
    columns,
    rows: sampleRows,
    rowKey: (row: Material) => row.id,
    variant: "default",
    loading: false,
  },
} satisfies Meta<typeof DataTable<Material>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = { args: { variant: "compact" } };

export const Catalog: Story = { args: { variant: "catalog" } };

export const LoadingSpinner: Story = { args: { loading: true, loadingVariant: "spinner" } };

export const LoadingSkeleton: Story = { args: { loading: true, loadingVariant: "skeleton" } };

export const Empty: Story = { args: { rows: [], emptyMessage: "No materials found" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["default", "compact", "catalog"] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="text-xs font-medium uppercase text-muted-foreground">{variant}</p>
          <DataTable variant={variant} columns={columns} rows={sampleRows} rowKey={(row) => row.id} />
        </div>
      ))}
    </div>
  ),
};
