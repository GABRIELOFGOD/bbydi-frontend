
const Divider = ({className}:{className?: string}) => {
  return (
    <div className={`border-t border-gray-300 ${className || ""}`} />
  )
}

export default Divider;