import DisplayPrograms from "@/components/dashboard/DisplayPrograms";
import PostProgram from "@/components/dashboard/PostProgram";

const DashboardProgramsPage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <DisplayPrograms />
      <PostProgram />
    </div>
  )
}

export default DashboardProgramsPage;