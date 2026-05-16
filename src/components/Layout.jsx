import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet, useLocation } from "react-router";

const Layout = () => {

    const location = useLocation();
    const isContactPage = location.pathname === "/contact";
    return (
        <section className="w-7xl min-h-screen flex flex-col mx-auto bg-cream-100">
            <div className={`transition-all duration-700 ${isContactPage ? "animate-blur-out scale 95 pointer-events-none": ""}`}>
                <Navbar/>
            </div>
            <main >
                <Outlet/>
            </main>
            <Footer/>
        </section>
    )
}

export default Layout;