import {useAuth} from "../hooks/useAuth.ts";

const InboxPage = () => {

    const auth = useAuth()

    return <>
        <h2>INBOX of {auth.email}</h2>
    </>;
}

export {InboxPage}