import {ReactNode} from "react";

interface Props {
    className: string
    children: ReactNode
}

const Container = ({children, className}: Props) => {

    return <div className={`bg-slate-200 w-1/2 mx-auto p-6 rounded ${className}`}>
        {children}
    </div>
}

export {Container}