"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Pagination } from "./pagination";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    pageSize: 10,
    total: 120,
    disabled: false,
    page: 1,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function DefaultPagination() {
      const [page, setPage] = useState(1);
      return <Pagination {...args} page={page} onPageChange={setPage} />;
    }
    return <DefaultPagination />;
  },
};

export const MiddlePage: Story = {
  render: (args) => {
    function MiddlePagination() {
      const [page, setPage] = useState(6);
      return <Pagination {...args} page={page} onPageChange={setPage} />;
    }
    return <MiddlePagination />;
  },
};

export const FewPages: Story = {
  args: { total: 25 },
  render: (args) => {
    function FewPagesPagination() {
      const [page, setPage] = useState(1);
      return <Pagination {...args} page={page} onPageChange={setPage} />;
    }
    return <FewPagesPagination />;
  },
};

export const Empty: Story = {
  args: { total: 0 },
  render: (args) => <Pagination {...args} page={1} onPageChange={() => {}} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Pagination {...args} page={2} onPageChange={() => {}} />,
};
