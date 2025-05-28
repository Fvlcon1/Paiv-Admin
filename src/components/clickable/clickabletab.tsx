'use client'

import { baseProps } from "@/utils/@types"
import { useState } from "react"

const ClickableTab = ({
    children,
    className,
    onClick
} : baseProps) => {

    const [onHover, setOnHover] = useState<boolean>(false)
    const [onPress, setOnPress] = useState<boolean>(false)

    return (
        <div 
            className={`flex py-1 px-2 h-fit rounded-md duration-200 hover:bg-bg-tetiary ${onPress ? 'scale-[0.95]' : 'scale-[1]'} cursor-pointer ${className}`}
            onClick={onClick ? (e)=>onClick(e) : ()=>{}}
            onMouseOver={()=>setOnHover(true)}
            onMouseLeave={()=>setOnHover(false)}
            onMouseDown={()=>setOnPress(true)}
            onMouseUp={()=>setOnPress(false)}
        >
            {children}
        </div>
    )
}
export default ClickableTab