"use client";

"use client";

import { useUser } from "@/providers/userProvider";

const DashboardGreeting = () => {
  const { user } = useUser();
  const timeOfTheDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  return (
    <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
      {timeOfTheDay()}, {user?.name || "there"}!
    </div>
  )
}

export default DashboardGreeting;