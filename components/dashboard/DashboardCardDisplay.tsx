import { DashboardCardData } from "@/lib/dashboardData"
import DashboardHomeCard from "./DashboardHomeCard"


const DashboardCardDisplay = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {DashboardCardData.map((card) => (
        <DashboardHomeCard key={card.id} {...card} />
      ))}
    </div>
  )
}

export default DashboardCardDisplay