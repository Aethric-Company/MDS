import type { Meta, StoryObj } from "@storybook/nextjs";
import { DataTableSkeleton, type DataTableSkeletonColumn } from "./data-table-skeleton";

const columns: DataTableSkeletonColumn[] = [
  { header: "Material" },
  { header: "Quantity", skeletonClassName: "h-4 w-16" },
];

const meta = {
  title: "Data Display/DataTableSkeleton",
  component: DataTableSkeleton,
  tags: ["autodocs"],
  args: {
    columns,
    rows: 5,
    label: "Loading",
  },
} satisfies Meta<typeof DataTableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyRows: Story = { args: { rows: 10 } };
