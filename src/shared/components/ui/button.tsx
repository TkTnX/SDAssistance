import { cn } from "@/lib/utils"

interface Props extends React.ComponentProps<'button'> {
    text: string
}


export const Button = ({className, text, ...props }: Props) => {
  return (
    <button className={cn("bg-osnovnoy font-bold text-center h-[60px] text-white hover:opacity-80", className)} {...props}>{text}</button>
  )
}
