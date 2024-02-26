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

    function download(attachment: Attachment) {;
        const src = `data:${attachment.mediaType};base64,${attachment.data}`
        const fileName = attachment.fileName;

        const link = document.createElement('a');
        link.href = src;
        link.setAttribute(
            'download',
            fileName,
        );

        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
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
                <div className="flex justify-between flex-wrap items-center mb-8">
                    <p className="text-3xl overflow-hidden font-semibold ">{message.subject ? (message.subject.length > 30 ? message.subject.substring(0, 30) + "..." : message.subject) : "(Без темы)"}</p>

                    <p className="italic ">{message.from}</p>
                </div>
                {message.attachments && (
                    <div className="shadow-2xl bg-slate-200 mb-4 py-1 px-2 rounded">
                        <p className="text-lg font-semibold">Attachments</p>
                        <div className="flex gap-x-4">
                            {message.attachments.map(a => (
                                <div className="relative bg-slate-600 h-32 w-32">
                                    <img key={a.fileName} src={`data:${a.mediaType};base64,${a.data}`} className="w-full h-full"/>

                                    <p className="pl-2 pt-1 w-full  text-sm overflow-hidden absolute top-0 left-0 text-white">
                                        {a.fileName}
                                    </p>


                                    <div className="text-sm text-white py-1 absolute bottom-0 right-0 px-1 cursor-pointer
                                    rounded rounded-l mb-1 mr-1 bg-slate-600 bg-opacity-0 shadow-2xl border hover:bg-opacity-100"
                                        onClick={() => download(a)}>
                                        <svg width="16px"
                                             height="16px"
                                             viewBox="0 0 24.00 24.00"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                             stroke="#ffffff"
                                             transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#ffffff"></path>
                                                <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="#ffffff"></path>
                                            </g>
                                        </svg>
                                    </div>

                                    <div></div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
                <div className="bg-slate-200 p-2">

                    <div className="mb-8 bg-white shadow-2xl p-4">
                         <div  dangerouslySetInnerHTML={{__html: message.body}}></div>
                    </div>
                </div>
            </div>
        )}
    </Container>
}

export {MailPage}