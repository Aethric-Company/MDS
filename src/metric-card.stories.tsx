import type { Meta, StoryObj } from "@storybook/nextjs";
import { ShoppingCart, UserRound } from "lucide-react";
import { MetricCard } from "./metric-card";

const meta = {
  title: "Cards/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "gradient", "soft", "analytics"],
    },
    tone: {
      control: "select",
      options: ["default", "amber", "green", "blue", "rose"],
    },
  },
  args: {
    heading: 128,
    subheading: "New users",
    description: "vs 100 in previous period",
    variant: "solid",
    tone: "default",
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};

export const Analytics: Story = {
  args: { variant: "analytics", icon: UserRound, change: 28 },
};

export const AnalyticsNegativeChange: Story = {
  args: { variant: "analytics", heading: 8, subheading: "Seller applications", change: -20, icon: ShoppingCart },
};

export const Soft: Story = {
  args: { variant: "soft", tone: "amber", icon: ShoppingCart, heading: 24, subheading: "Products", description: "Published catalogue items" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-3 md:grid-cols-2">
      <MetricCard variant="analytics" icon={UserRound} heading={128} subheading="New users" change={28} description="vs 100 in previous period" />
      <MetricCard variant="analytics" icon={ShoppingCart} heading={8} subheading="Seller applications" change={-20} description="vs 10 in previous period" />
      {(["amber", "green", "blue", "rose"] as const).map((tone) => (
        <MetricCard variant="soft" key={tone} tone={tone} icon={ShoppingCart} heading={24} subheading="Products" description="Published catalogue items" />
      ))}
    </div>
  ),
};
