import LoginForm from "@/components/LoginForm"
import Image from "next/image"
import Link from "next/link"
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex justify-center items-center">
            <Image
              src={"/images/logo.png"}
              alt="Logo"
              // className="h-10 w-10"
              height={50}
              width={140}
            />
          </div>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
