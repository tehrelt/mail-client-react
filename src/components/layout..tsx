import {Outlet} from "react-router-dom";
import {retry} from "@reduxjs/toolkit/query";

const Layout = () => {
    return <>
            <header>

            </header>

            <main>
                <Outlet/>
            </main>

            <footer>

            </footer>
        </>
}

export {Layout}