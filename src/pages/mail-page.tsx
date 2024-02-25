import {useNavigate, useParams} from "react-router-dom";
import {Container} from "@/components/container.tsx";
import {useEffect, useState} from "react";
import {pop3} from "@/api/api.ts";
import {notifyError, notifySuccess} from "@/components/toasts.ts";
import {Button} from "@/components/ui/button.tsx";

const MailPage = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState<Mail>()
    const [error, setError] = useState<string|null>(null);

    const fetch = async () => {
        try {
            const response = await pop3.get(`/list/${id}`)
            const mail: Mail = response.data.data.message;
            setMessage(mail)
        } catch (e) {
            throw e
        }

    }

    useEffect(() => {
        fetch()
            .then(() => notifySuccess(`Mail #${id} successfully loaded`))
            .catch(e => {
                notifyError(e.response.data.message)
                setError(e.response.data.message)
            })
    }, []);

    if (error != null) {

    }

    function back() {
        navigate("/inbox")
    }


    return <Container className="mt-16">
        <Button onClick={back} disabled={message == null} className="font-black text-2xl">{"<--"}</Button>
        {message == null ? error != null ? (
            <div>
                {error}
            </div>
        ) : (
            <div>Loading</div>
        ) : (
            <div>
                <div className="flex justify-between flex-wrap items-center">
                    <p className="text-3xl overflow-hidden font-semibold ">{message.subject ? (message.subject.length > 30 ? message.subject.substring(0, 30) + "..." : message.subject) : "(Без темы)"}</p>

                    <p className="italic ">{message.from}</p>
                </div>
                <div className="bg-slate-200">
                    <h2>Content-Types:</h2>
                    <ul>
                        {message.body.map(b => (
                            <li className="list-disc list-inside">
                                <a href={`#${b.contentType}`} className="underline hover:no-underline">
                                    {b.contentType}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {message.body.map(b => (
                        <div key={b.contentType} id={b.contentType} className="mb-20">
                            <p className="text-center text-xl font-bold">{b.contentType}</p>
                            {b.contentType === "text/html" ? (
                                <div  dangerouslySetInnerHTML={{__html: b.body}}></div>
                            ) : (
                                <div>{b.body}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}
    </Container>
}

export {MailPage}