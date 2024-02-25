import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {ReactNode} from "react";

interface Props {
    children: ReactNode
}

const RequiredAuth = ({children}: Props) => {

    const location = useLocation()
    const auth = useAuth()

   if (!auth.isAuth) {
        return <Navigate to='/login' state={{from: location}}/>
   }

    return children;
}

export {RequiredAuth}