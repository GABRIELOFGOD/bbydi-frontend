"use client";

import { Input } from "../ui/input";
import { ImageDropzone } from "../ui/ImageDropzone";

const PostProgram = () => {
  return (
    <div className="w-full gap-5 flex flex-col md:w-[30%] border rounded-sm py-10 px-4">
      <h2 className="text-xl font-bold">Post new program</h2>
      <form onSubmit={e=>e.preventDefault()} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Title</p>
          <Input
            placeholder="Program title"
            className="w-full rounded h-10"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Category (One word recommended)</p>
          <Input
            placeholder="Program category"
            className="w-full rounded h-10"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Description</p>
          <textarea
            placeholder="Program descriptions"
            className="w-full rounded h-40 border p-3"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs font-bold text-gray-700">Program image</p>
          <ImageDropzone />
        </div>
      </form>
    </div>
  )
}

export default PostProgram;