import {useAuth} from "@/hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {api, pop3} from "@/api/api.ts";
import {Container} from "@/components/container.tsx";
import {useDispatch} from "react-redux";
import {removeUser} from "@/store/slices/user.ts";
import {notifyError, notifySuccess} from "@/components/toasts.ts";
import {Button} from "@/components/ui/button.tsx";
import {formatDate} from "@/helpers/date.ts";
import {useNavigate} from "react-router-dom";

interface data {
    messages: Mail[]
}

const InboxPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useAuth()

    const [messages, setMessages] = useState<Mail[]>([])
    const [fetching, setFetching] = useState<boolean>(false)

    const fetch = async () => {
        setFetching(true)
        try {
            const r = await pop3.get("/list")
            const data: data = r.data.data
            setMessages(data.messages)
            notifySuccess(`Fetched ${data.messages.length} messages`)
        } catch (e) {
            // console.log(e)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            notifyError(e.response.data.message)
            dispatch(removeUser())
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    function logout() {
        api.post("/logout")

        dispatch(removeUser())

        notifySuccess("Successfully logged out")
    }

    const open = (id: number) => {
        navigate(`/inbox/${id}`)
    }

    function sendNew() {
        navigate("/inbox/send")
    }

    return <>
        <Container className="w-3/5 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <div className="flex justify-between">
                <h2 className="font-bold mb-4 pl-3 text-2xl ">{auth.email}</h2>
                <div className="flex gap-x-6 mb-3">
                    <Button onClick={sendNew} disabled={false} >Send new</Button>
                    <Button disabled={fetching} onClick={fetch} className="w-48">{fetching ? "Refreshing" : "Refresh"}</Button>
                    <Button onClick={logout} className="" disabled={false}>Logout</Button>
                </div>
            </div>

            <div className="gap-y-3 flex flex-col">
                {messages.map(m => (
                    <>
                        <div
                            className="p-3 overflow-hidden  bg-slate-200
                            cursor-pointer rounded shadow-xl hover:shadow-sm
                            transition-all ease-in-out" onClick={() => open(m.meta.ID)}>
                            <div className="flex justify-between">
                                <div className="flex justify-items-start">
                                    <p className="font-bold">{m.from}</p>
                                    <p>{m.subject.substring(0, 30) + (m.subject.length > 30 ? "..." : "")}</p>
                                </div>
                                <p className="text-slate-900">{formatDate(m.date)}</p>
                            </div>
                            {m.body ? (
                                <p className="whitespace-normal">{m.body[0].body.substring(0, 96) + (m.body[0].body.length > 96 ? "..." : "")}</p>
                            ) : (
                                <p className="text-red-500">Cannot parse message</p>
                            )}

                        </div>
                    </>
                ))}
            </div>
        </Container>

    </>;
}

export {InboxPage}