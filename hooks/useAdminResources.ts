"use client";

import { baseUrl } from "@/lib/constants";
import { User } from "@/lib/types";
import { throwError } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export interface IProgram {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

export interface IAProgram extends IProgram {
  isDeleted: boolean;
  postedBy: User;
}

export type PostProgramType = Omit<IProgram, "_id" | "createdAt" | "image"> & {
  image: File;
};

export const usePostAdminResources = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const postProgram = async (data: PostProgramType) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", data.image);

    const token = localStorage.getItem("token");

    try {
      if (!token) throw new Error("Please login to perfom this action");
      const request = await fetch(`${baseUrl}/program`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`
        },
        body: formData
      });

      const response = await request.json();
      return response.message
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error posting program");
    } finally {
      setLoading(false);
    }
  }

  return { isLoading, postProgram }
}

export const useGetAdminResources = () => {
  const [programs, setPrograms] = useState<IAProgram[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const getAllAdminPrograms = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const req = await fetch(`${baseUrl}/program/all`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const res = await req.json() as IAProgram[];
      setPrograms(res);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error fetching all programs");
    } finally {
      setLoading(false);
    }
  }

  return {
    getAllAdminPrograms, programs, isLoading
  }
}

export const useDeleteAdminResources = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  const deleteProgram = async (id: string) => {
    setLoading(true);
    try {
      const req = await fetch(`${baseUrl}/program/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const res = await req.json();
    toast.success(res.message || "Program deleted successfully!")
    } catch (error) {
      toast.error(throwError(error, "Error fetching occur while trying to delete program"));
    } finally {
      setLoading(false);
    }

  }

  return { isLoading, deleteProgram }
}