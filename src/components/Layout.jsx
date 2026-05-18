import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet, useLocation } from "react-router";

const Layout = () => {

    const location = useLocation();
    const isContactPage = location.pathname === "/contact";
    return (
        <section className="w-full max-w-7xl mx-auto">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </section>
    )
}

export default Layout;