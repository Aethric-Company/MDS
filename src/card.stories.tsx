import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card, CardHeader, CardContent, CardFooter } from "./card";
import { Button } from "./button";

const meta = {
  title: "Cards/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h3 className="text-base font-semibold">Card title</h3>
        <p className="text-sm text-muted-foreground">Supporting description text.</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Card body content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h3 className="text-base font-semibold">Simple card</h3>
        <p className="text-sm text-muted-foreground">No footer or extra content.</p>
      </CardHeader>
    </Card>
  ),
};
