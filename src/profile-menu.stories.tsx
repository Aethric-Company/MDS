import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProfileMenu } from "./profile-menu";

const meta = {
  title: "Navigation/ProfileMenu",
  component: ProfileMenu,
  tags: ["autodocs"],
  args: {
    name: "Anjali Sharma",
    logoutHref: "#logout",
  },
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongName: Story = {
  args: { name: "Anjali Venkataraman Sharma" },
};

export const EmptyName: Story = {
  args: { name: "" },
};
