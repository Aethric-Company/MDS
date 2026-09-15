import type { Meta, StoryObj } from "@storybook/nextjs";
import { PublicHeader } from "./public-header";
import { MpeepLogo } from "./logo";
import { Button } from "./button";

const meta = {
  title: "Navigation/PublicHeader",
  component: PublicHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof PublicHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brand: <MpeepLogo />,
    actions: (
      <>
        <Button type="button" variant="ghost">
          Log in
        </Button>
        <Button type="button">Register</Button>
      </>
    ),
  },
};

export const MarkOnly: Story = {
  args: {
    brand: <MpeepLogo showWordmark={false} />,
    actions: <Button type="button">Register</Button>,
  },
};
