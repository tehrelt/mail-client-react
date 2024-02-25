import {Outlet} from "react-router-dom"

const Layout = () => {
    return <>
            <header>

            </header>

            <main className="relative w-full h-screen">
                <Outlet/>
            </main>

            <footer>

            </footer>
        </>
}

export {Layout}