import {ReactNode} from "react";

interface Props {
    className?: string
    onClick: () => void
    children: ReactNode
    disabled: boolean
}

const Button = ({className, children, onClick, disabled}: Props) => {

    return <button disabled={disabled} className={`${disabled ? `bg-slate-400` : `shadow-xl hover:shadow-sm bg-slate-200`} transition-all ease-in-out py-2 px-6 rounded rounded-b
        ${className}`} onClick={onClick}>
        {children}
    </button>

}

export {Button}