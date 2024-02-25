import {Container} from "../components/container.tsx";
import {Input} from "../components/input.tsx";
import React, {useState} from "react";
import {pop3, smtp} from "../api/api.ts";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/user.ts";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


     const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const payload = {
            user: email,
            password
        }

        // console.log("payload", payload)

       pop3.post("/auth", payload)
           .then(r => {
                if (r.status == 200) {
                    dispatch(setUser({
                        email: email
                    }))


                }
           })
           .catch(e => console.log("pop3 error", e))

     smtp.post("/auth", payload)
         .then(r => {
             console.log(r)
         })
         .catch(e => console.log("smtp error", e))

     return navigate("/inbox")
    }

    return <Container className="min-w-48 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-12">
        <div>
            <h2 className="font-bold">Login into inbox</h2>
            <form className="w-3/4 mx-auto">
                <div className="grid grid-cols-2 gap-y-2 ">
                    <Input label="E-Mail" value={email} type="email" onChange={setEmail} name="email"/>
                    <Input label="Password" value={password} type="password" onChange={setPassword} name="password"/>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={(e) => login(e)}
                        className="text-gray-600 font-semibold border bg-slate-400 col-span-2 py-2 px-8 ml-4 hover:bg-slate-300 transition-all ease-in-out">

                        LOG IN
                    </button>
                </div>

            </form>
        </div>
    </Container>
}

export {LoginPage}