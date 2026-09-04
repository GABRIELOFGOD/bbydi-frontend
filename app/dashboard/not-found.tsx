import { Link } from "lucide-react";

const NotFoundDashboard = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400">The page you are looking for does not exist. Click <Link href="/" className="text-primary font-bold hover:underline">here</Link> to go back to the home page.</p>
    </div>
  )
}

export default NotFoundDashboard;