"use client";

import { ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";

const maximumImages = 4;
const maximumBytes = 5 * 1024 * 1024;
const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

export type ExistingProductImage = {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
};

export function ImageUploader({
  images,
  existingImages = [],
  onExistingImagesChange,
  onChange,
  onError,
  title = "Variant images",
}: {
  images: File[];
  existingImages?: ExistingProductImage[];
  onExistingImagesChange?: (images: ExistingProductImage[]) => void;
  onChange: (images: File[]) => void;
  onError: (message: string) => void;
  title?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const previews = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images],
  );

  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  function add(files: FileList | null) {
    if (!files) return;
    const selected = Array.from(files);
    if (existingImages.length + images.length + selected.length > maximumImages)
      return onError("You can upload a maximum of 4 product images.");
    if (selected.some((file) => !acceptedTypes.includes(file.type)))
      return onError("Images must be JPG, PNG, or WebP.");
    if (selected.some((file) => file.size > maximumBytes))
      return onError("Each product image must be 5 MB or smaller.");
    onError("");
    onChange([...images, ...selected]);
    if (input.current) input.current.value = "";
  }

  return (
    <section className="space-y-3 sm:col-span-2">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-bold">{title} *</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload 1–4 JPG, PNG, or WebP images. The first image will be
            primary.
          </p>
        </div>
        <span className="shrink-0 text-sm font-medium text-muted-foreground">
          {existingImages.length + images.length} / {maximumImages}
        </span>
      </div>
      <Input
        ref={input}
        className="sr-only"
        type="file"
        aria-label={`Upload ${title.toLowerCase()}`}
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(event) => add(event.target.files)}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {existingImages.map((image, index) => (
          <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <img src={image.url} alt={image.altText || `Product image ${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
            {index === 0 && <span className="absolute left-2 top-2 rounded-full bg-black/75 px-2 py-1 text-[10px] font-bold text-white">Primary</span>}
            {onExistingImagesChange && <Button type="button" size="icon" variant="destructive" className="absolute bottom-2 right-2 size-8" aria-label={`Remove existing image ${index + 1}`} onClick={() => onExistingImagesChange(existingImages.filter(item => item.id !== image.id))}><Trash2 className="size-4" /></Button>}
          </div>
        ))}
        {previews.map((preview, index) => (
          <div
            key={preview}
            className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
          >
            <img
              src={preview}
              alt={`Product preview ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {existingImages.length === 0 && index === 0 ? (
              <span className="absolute left-2 top-2 rounded-full bg-black/75 px-2 py-1 text-[10px] font-bold text-white">
                Primary
              </span>
            ) : null}
            <Button
              type="button"
              size="icon"
              className="absolute bottom-2 right-2 size-8 bg-red-600 text-white hover:bg-red-700"
              aria-label={`Remove image ${index + 1}`}
              onClick={() =>
                onChange(images.filter((_, itemIndex) => itemIndex !== index))
              }
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        {existingImages.length + images.length < maximumImages ? (
          <Button variant="outline"
            type="button"
            className="flex h-auto aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm font-medium text-muted-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary"
            onClick={() => input.current?.click()}
          >
            <ImagePlus className="size-7" />
            Add image
          </Button>
        ) : null}
      </div>
    </section>
  );
}
