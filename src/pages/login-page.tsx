import {Container} from "../components/container.tsx";
import {Input} from "../components/input.tsx";
import React, {useState} from "react";
import axios from "axios";

const LoginPage = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    function login(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()


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