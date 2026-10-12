"use client";

import { useDeleteAdminResources } from "@/hooks/useAdminResources";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteButton = ({programId}:{programId: string}) => {
  const router = useRouter();
    const { deleteProgram, isLoading: loading } = useDeleteAdminResources();

  const deleteP = async () => {
    await deleteProgram(programId);
    router.refresh();
  }
  return (
    <button disabled={loading} onClick={deleteP} className="h-8 w-8 bg-destructive hover:bg-destructive/80 duration-300 text-white flex justify-center items-center rounded disabled:bg-muted disabled:text-muted-foreground">{loading ? (<Loader2 />) : (<Trash2 size={14} />)}</button>
  )
}

export default DeleteButton;