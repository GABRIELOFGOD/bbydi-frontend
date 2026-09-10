"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SidebarGroupLabel } from "./ui/sidebar";
import { useState } from "react";
import { useUser } from "@/providers/userProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useUser();

  // const submitLoginForm = ()
  
  return (
    <div className="w-full h-fit p-10 border rounded shadow-sm flex flex-col gap-10 justify-center items-center">
      <h1 className="text-lg font-bold">Welcome back</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password);
        }}
        className="w-full flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2 w-full">
          <SidebarGroupLabel>Email:</SidebarGroupLabel>
          <Input
            className="w-full h-10  rounded "
            placeholder="example@thebrainbuilders.org"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <SidebarGroupLabel>Password:</SidebarGroupLabel>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary hover:underline">Forgot password?</Link>
          </div>
          <Input
            className="w-full h-10  rounded "
            placeholder="* * * * * * * *"
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full rounded font-bold h-10" size={"lg"}>Login</Button>
      </form>
    </div>
  )
}

export default LoginForm;