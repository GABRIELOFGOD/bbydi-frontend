import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <Loader2 />
      <p className="text-xs text-center text-gray-500 font-bold">Please wait ...</p>
    </div>
  )
}

export default Loading;