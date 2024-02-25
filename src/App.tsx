import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import {Layout} from "@/components/layout.tsx";
import {RequiredAuth} from "@/middleware/requiredAuth.tsx";

// pages
import {InboxPage} from "@/pages/inbox-page.tsx";
import {HomePage} from "@/pages/home-page.tsx";
import {LoginPage} from "@/pages/login-page.tsx";
import {MailPage} from "@/pages/mail-page.tsx";
import {SendEmailPage} from "@/pages/send-email-page.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}  />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/inbox" element={
                        <RequiredAuth>
                            <InboxPage/>
                        </RequiredAuth>
                    }/>
                    <Route path="/inbox/:id" element={
                        <RequiredAuth>
                            <MailPage/>
                        </RequiredAuth>
                    }/>
                    <Route path="/inbox/send" element={
                        <RequiredAuth>
                            <SendEmailPage/>
                        </RequiredAuth>
                    }/>
                </Route> {/* path="/" */}
            </Routes>
            <ToastContainer/>
        </>
      )
}

export default App
