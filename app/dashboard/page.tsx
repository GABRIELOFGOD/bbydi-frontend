import DashboardCardDisplay from "@/components/dashboard/DashboardCardDisplay";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";

const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardGreeting />
      <DashboardCardDisplay />
    </div>
  )
}

export default DashboardHome;