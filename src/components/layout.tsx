import {Outlet} from "react-router-dom"

const Layout = () => {
    return <>
            <main className="relative w-full h-screen">
                <Outlet/>
            </main>
        </>
}

export {Layout}