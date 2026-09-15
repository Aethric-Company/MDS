import type { Meta, StoryObj } from "@storybook/nextjs";
import { BarChart, type BarChartItem } from "./bar-chart";

const weekly: BarChartItem[] = [
  { label: "Mon", value: 4, formattedValue: "4", detail: "orders" },
  { label: "Tue", value: 5, formattedValue: "5", detail: "orders" },
  { label: "Wed", value: 7, formattedValue: "7", detail: "orders" },
  { label: "Thu", value: 3, formattedValue: "3", detail: "orders" },
  { label: "Fri", value: 9, formattedValue: "9", detail: "orders" },
  { label: "Sat", value: 6, formattedValue: "6", detail: "orders" },
  { label: "Sun", value: 2, formattedValue: "2", detail: "orders" },
];

const meta = {
  title: "Data Display/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "analytics"],
    },
  },
  args: {
    label: "Daily paid orders",
    data: weekly,
    variant: "default",
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Analytics: Story = { args: { variant: "analytics" } };

export const Empty: Story = {
  args: { data: [], emptyMessage: "No orders for this period" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <BarChart variant="default" label="Daily paid orders" data={weekly} />
      <BarChart variant="analytics" label="Daily paid orders" data={weekly} />
    </div>
  ),
};
