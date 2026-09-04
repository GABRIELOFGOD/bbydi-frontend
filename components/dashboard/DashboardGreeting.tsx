"use client";

import { useCurrentUser } from "@/hooks/getCurrentUser";

const DashboardGreeting = () => {
  const currentUser = useCurrentUser()
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
      {timeOfTheDay()}, {currentUser.name}!
    </div>
  )
}

export default DashboardGreeting;