"use client";

import { useDeleteAdminResources, useGetAdminResources } from "@/hooks/useAdminResources";
import DataLoading from "./DataLoading";
import { useEffect } from "react";
import EmptyState from "../ui/EmptyState";
import { Download, Eye, Loader2, Pen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

const DisplayPrograms = () => {
  const { getAllAdminPrograms, programs, isLoading } = useGetAdminResources();

  useEffect(() => {
    getAllAdminPrograms();
  }, []);
  
  if (isLoading) return <DataLoading label="Loading programs..." />
  
  return (
    <div className="w-full md:w-[70%]">{
      programs.length < 1 ? (
        <EmptyState label="No program posted yet" />
      ) : (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-extrabold">All Programs</h2>
          <div className="flex flex-col gap-2">
          {programs.map((program) => (
            <div className={cn("flex justify-between gap-5 py-1 px-3 bg-muted hover:bg-gray-200 rounded hover:shadow-sm", program.isDeleted && "bg-primary/10")}>
              <div>
                <p className="font-bold truncate">{program.title}</p>
                <p className="text-gray-400 truncate text-xs">{program.title}</p>
              </div>
              <div className="flex gap-3 my-auto">
                <Link target="_blank" href={"/programs"} className="h-8 w-8 bg-primary/20 hover:bg-primary/30 duration-300 text-primary flex justify-center items-center rounded"><Eye size={14} /></Link>
                <button className="h-8 w-8 bg-primary/20 hover:bg-primary/30 duration-300 text-primary flex justify-center items-center rounded"><Pen size={14} /></button>
                {program.isDeleted ? (<button className="h-8 w-8 bg-green-500 hover:bg-green-500/80 duration-300 text-white flex justify-center items-center rounded disabled:bg-muted disabled:text-muted-foreground"><Download size={14} /></button>) :
                (<DeleteButton programId={program._id} />)}
              </div>
            </div>
          ))}
        </div>
        </div>
      )
    }</div>
  )
}

export default DisplayPrograms;