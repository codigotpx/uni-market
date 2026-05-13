import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <section className="w-7xl mx-auto">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </section>
    )
}

export default Layout;