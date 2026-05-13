import { Link, useLocation } from "react-router";
import { ShoppingCart, Search } from 'lucide-react';
import AccountDropdown from "./AccountDropdown"
import SearchBar from "./SearchBar"
import "../styles/Navbar.css"

const NAV_LINKS = [
        { label: "Inicio", href:"/" },
        { label: "Shop", href:"/shop" },
        { label: "About us", href:"/about" }
]

const Navbar = () => {

    const location = useLocation()

    const isActive = (href) => location.pathname === href

    return (
        <>
            <header className="w-full py-2 md:my-5 bg-white md:rounded-full md:justify-between flex">
                <div className="flex flex-col justify-center items-center md:ml-10">
                    <span className="text-lg md:text-2xl logo">Universidad</span>
                    <span className="text-xs md:text-xl logo">Caribea</span>
                </div>
                <nav className="hidden justify-center items-center md:flex flex-col md:flex-row">
                    <ul className="flex flex-col md:flex-row justify-center items-center gap-10">
                    { NAV_LINKS.map((link) => (
                        <li className={`hover:scale-110 opacity-50 transform transition duration-300 ${isActive(link.href) ? "opacity-100": ""}`} 
                            key={link.href}
                            >
                            <Link
                                to={link.href}
                                className={`relative pb-0.5 transition duration-300`}
                                >
                                {link.label}
                                <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-gold-400 transition-transform duration-300 origin-center ${
                                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                                }`}/>
                                </Link>
                        </li>
                    ))}
                </ul>
                </nav>
                <div className="hidden md:flex justify-center items-center mr-10 gap-3">
                    <SearchBar/>
                    <div className="flex items-center cursor-pointer hover:scale-105 transition duration-100">
                        <ShoppingCart size={15}/>
                    </div>
                    <AccountDropdown className="hidden" />
                </div>
                <div className="flex justify-center items-center ">

                </div>
            </header>
        </>
    )

}

export default Navbar