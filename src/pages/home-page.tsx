import {useAuth} from "../hooks/useAuth.ts";

const HomePage = () => {

    const auth = useAuth()

    if (!auth.isAuth) {
        return <>
            <button>Login</button>
        </>
    }

    return <>
        <p>Logged as {auth.email}</p>
    </>

}

export {HomePage}