import { ReactNode } from "react"

const Container = ({ children, className } : { children: ReactNode, className?: string }) => {
  return (
    <div className={`md:max-w-295 flex w-full mx-auto px-6 ${className || ''}`}>{children}</div>
  )
}

export default Container