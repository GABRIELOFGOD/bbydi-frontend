import { CardTypes } from "@/lib/types"

const DashboardHomeCard = ({ title, text, value } : CardTypes) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-sm shadow-sm border hover:border-primary duration-300 cursor-pointer p-6 relative">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <h3 className="font-semibold text-gray-900 text-sm dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 text-xs dark:text-gray-400">{text}</p>
    </div>
  )
}

export default DashboardHomeCard