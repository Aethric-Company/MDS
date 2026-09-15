"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { ImageUploader, type ExistingProductImage } from "./image-uploader";

const meta = {
  title: "Core Components/ImageUploader",
  component: ImageUploader,
  tags: ["autodocs"],
  args: {
    images: [],
    onChange: () => {},
    onError: () => {},
  },
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultUploader() {
      const [images, setImages] = useState<File[]>([]);
      const [error, setError] = useState("");
      return (
        <div className="max-w-lg space-y-3">
          <ImageUploader images={images} onChange={setImages} onError={setError} />
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      );
    }
    return <DefaultUploader />;
  },
};

const existingImages: ExistingProductImage[] = [
  { id: "1", url: "https://picsum.photos/seed/mpeep-1/400", isPrimary: true, altText: "Cement bags" },
  { id: "2", url: "https://picsum.photos/seed/mpeep-2/400", isPrimary: false, altText: "Steel rods" },
];

export const WithExistingImages: Story = {
  render: () => {
    function ExistingUploader() {
      const [images, setImages] = useState<File[]>([]);
      const [existing, setExisting] = useState<ExistingProductImage[]>(existingImages);
      const [error, setError] = useState("");
      return (
        <div className="max-w-lg space-y-3">
          <ImageUploader
            images={images}
            existingImages={existing}
            onExistingImagesChange={setExisting}
            onChange={setImages}
            onError={setError}
          />
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      );
    }
    return <ExistingUploader />;
  },
};

export const CustomTitle: Story = {
  render: () => {
    function CustomTitleUploader() {
      const [images, setImages] = useState<File[]>([]);
      const [error, setError] = useState("");
      return (
        <div className="max-w-lg space-y-3">
          <ImageUploader images={images} onChange={setImages} onError={setError} title="Storefront photos" />
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      );
    }
    return <CustomTitleUploader />;
  },
};
