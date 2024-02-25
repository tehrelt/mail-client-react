import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout..tsx";
import {RequiredAuth} from "./middleware/requiredAuth.tsx";
import {InboxPage} from "./pages/inbox-page.tsx";
import {HomePage} from "./pages/home-page.tsx";
import {LoginPage} from "./pages/login-page.tsx";
import {ToastContainer} from "react-toastify";

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
            </Route> {/* path="/" */}
        </Routes>

        <ToastContainer/>
    </>
  )
}

export default App
