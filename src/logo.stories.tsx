import type { Meta, StoryObj } from "@storybook/nextjs";
import { MpeepLogo } from "./logo";

const meta = {
  title: "Foundations/Logo",
  component: MpeepLogo,
  tags: ["autodocs"],
  args: {
    showWordmark: true,
  },
} satisfies Meta<typeof MpeepLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MarkOnly: Story = { args: { showWordmark: false } };

export const LargeMark: Story = { args: { markClassName: "size-16" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <MpeepLogo />
      <MpeepLogo showWordmark={false} />
      <MpeepLogo markClassName="size-12" />
    </div>
  ),
};
