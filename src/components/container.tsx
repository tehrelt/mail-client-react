import {ReactNode} from "react";

interface Props {
    className: string
    children: ReactNode
}

const Container = ({children, className}: Props) => {

    return <div className={`bg-slate-300 w-1/2 mx-auto p-6 rounded shadow-2xl ${className}`}>
        {children}
    </div>
}

export {Container}