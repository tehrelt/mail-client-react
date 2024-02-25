import {Container} from "../components/container.tsx";
import {Input} from "../components/input.tsx";
import React, {useState} from "react";
import {api} from "../api/api.ts";
import {setUser} from "../store/slices/user.ts";
import {useNavigate} from "react-router-dom";
import {notifyError, notifySuccess} from "../components/toasts.ts";
import {useDispatch} from "react-redux";
import {Button} from "@/components/ui/button.tsx";

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


     const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const payload = {
            user: email,
            password
        };

        try {
            await api.post("/auth", payload)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (e.code == "ECONNABORTED") {
                return notifyError("POP3: Connection aborted");

            } else {
                return console.log(e)
            }
        }

         dispatch(setUser({
             email: email
         }))

         notifySuccess("Successfully logged in as " + email)

        navigate("/inbox")
    }

    
    return (
        <Container className="min-w-48 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-12">
            <div>
                <h2 className="font-bold">Login into inbox</h2>
                <form className="w-3/4 mx-auto">
                    <div className="grid grid-cols-2 gap-y-2 ">
                        <Input label="E-Mail" value={email} type="email" onChange={setEmail} name="email"/>
                        <Input label="Password" value={password} type="password" onChange={setPassword} name="password"/>
                    </div>
                    <div className="flex justify-end mt-2">
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/*@ts-expect-error*/}
                        <Button onClick={(e) => login(e)}>
                            LOG IN
                        </Button>
                    </div>

                </form>
            </div>
        </Container>)
}

export {LoginPage}