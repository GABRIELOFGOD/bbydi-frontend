"use client";

import { Input } from "../ui/Input";
import { ImageDropzone } from "../ui/ImageDropzone";
import { useState } from "react";
import { cn, slugify } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { usePostAdminResources } from "@/hooks/useAdminResources";

const PostProgram = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  const { isLoading, postProgram } = usePostAdminResources();

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setCategory(slugify(value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please select a program image");
      return;
    }

    try {
      const response = await postProgram({ image, title, category, description });
      setTitle("");
      setCategory("");
      setDescription("");
      setImage(null);
      toast.success(response || "Program posted successfully");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error posting program");
    }
  };

  return (
    <div className="w-full gap-5 flex flex-col md:w-[30%] border rounded-sm py-10 px-4">
      <h2 className="text-xl font-bold">Post new program</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Title</p>
          <Input
            placeholder="Program title"
            className="w-full rounded h-10"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Category (One word recommended)</p>
          <Input
            placeholder="Program category"
            className="w-full rounded h-10"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Description</p>
          <textarea
            placeholder="Program descriptions"
            className="w-full rounded h-30 border p-3"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Program image</p>
          <ImageDropzone onFileChange={setImage} />
        </div>

        <Button type="submit" disabled={isLoading} className={cn("w-full rounded h-10 font-bold", isLoading && "bg-muted ")}>
          {isLoading ? (
            <div className="flex gap-3 my-auto">
              <Loader color="#ffffff" />
              <p className="text-xs font-bold text-white my-auto">Uploading program</p>
            </div>
          ) : ("Post program")}
        </Button>
      </form>
    </div>
  )
}

export default PostProgram;