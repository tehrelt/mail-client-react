import {Container} from "@/components/container.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {smtp} from "@/api/api.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import {notifyError, notifySuccess} from "@/components/toasts.ts";

const SendEmailPage = () => {
    const navigate = useNavigate()
    const auth = useAuth()

    const [to, setTo] = useState<string>("")
    const [subject, setSubject] = useState<string>("");
    const [body, setBody] = useState<string>("")
    const [files, setFiles] = useState<FileList|null>();

    function back() {
        navigate("/inbox");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        formData.append("from", auth.email)
        formData.append("to", to)
        formData.append("subject", subject)
        formData.append("body", body)

        console.log("files", files)
        for (let i = 0; i < files?.length; ++i) {
            formData.append(`file${i + 1}`, files[i]);
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            await smtp.post("/send", formData, config)
            notifySuccess(`Successfully sent '${subject}' to '${to}'`)
        } catch (e) {
            notifyError("File too big")
        }
    }

    function handleChangeFiles(fs: FileList|null) {
        setFiles(fs)
    }

    return <Container className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-12">
        <Button onClick={back} disabled={false} className="font-black text-2xl">{"<--"}</Button>
        <form className="flex flex-col">
            <div className="p-2">
                <input required
                        className="border-slate-700 bg-slate-300 w-full transition-all p-1
                        focus:p-2 focus:outline-none focus:border-b-2 shadow-xl"
                        name="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="To"/>
            </div>
            <div className="p-2">
                <input required
                       className="border-slate-700 bg-slate-300 w-full transition-all p-1
                        focus:p-2 focus:outline-none focus:border-b-2 shadow-xl"
                       name="subject"
                       value={subject}
                       onChange={(e) => setSubject(e.target.value)}
                       placeholder="Subject"/>
            </div>
            <div className="p-2">
                <textarea required
                      className="border-slate-700 bg-white w-full transition-all p-1
                           focus:outline-none focus:border-b-2 shadow-xl h-40"
                      name="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Message"/>
            </div>

            <div>
                <p>Attachments: (UP TO 10 MB)</p>
                <input type="file" multiple={true} name="attachment"
                   onChange={(e) => handleChangeFiles(e.target.files)}/>
            </div>

            <Button onClick={handleSubmit} disabled={false} className="m-2">Send</Button>

        </form>
    </Container>
}

export {SendEmailPage}