import {ReactNode} from "react";

interface Props {
    className: string
    onClick: () => void
    children: ReactNode
}

const Button = ({className, children, onClick}: Props) => {

    return <button className={`shadow-xl hover:shadow-sm transition-all ease-in-out py-2 px-6 bg-slate-200 rounded rounded-b
        ${className}`} onClick={onClick}>
        {children}
    </button>

}

export {Button}