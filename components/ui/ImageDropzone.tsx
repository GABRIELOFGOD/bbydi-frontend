"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ImageDropzoneProps = {
  onFileChange?: (file: File | null) => void;
  className?: string;
};

export function ImageDropzone({ onFileChange, className }: ImageDropzoneProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const file = acceptedFiles[0];

      if (!file) {
        setError(
          fileRejections[0]?.errors[0]?.message ??
            "Please choose a valid image file.",
        );
        return;
      }

      setError(null);
      setPreviewUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return URL.createObjectURL(file);
      });
      onFileChange?.(file);
    },
    [onFileChange],
  );

  const removeFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPreviewUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setError(null);
    onFileChange?.(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex min-h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded border border-dashed border-gray-300 bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-primary/30 focus:outline-none",
          isDragActive && "border-primary bg-primary/5",
          previewUrl && "border-solid bg-gray-100",
        )}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Selected program"
              className="h-56 w-full object-cover"
            />
            <button
              type="button"
              onClick={removeFile}
              aria-label="Remove selected image"
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black"
            >
              <X className="size-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 px-5 py-8 text-center text-gray-500">
            <ImagePlus className="size-8 text-primary" />
            <p className="text-sm font-medium">
              {isDragActive ? "Drop your image here" : "Drag and drop an image"}
            </p>
            <p className="text-xs">or click to browse</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}