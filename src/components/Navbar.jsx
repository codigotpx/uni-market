import { Link, useLocation } from "react-router";
import { ShoppingCart, Search } from 'lucide-react';
import AccountDropdown from "./AccountDropdown"

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
            <nav className="w-full py-2 my-5 bg-white rounded-full flex justify-between">
                <div className="flex flex-col justify-center items-center ml-10">
                    <span className="text-2xl logo">Universidad</span>
                    <span className="logo">Caribea</span>
                </div>
                <ul className="flex justify-center items-center gap-10">
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
                <div className="flex justify-center items-center mr-10 gap-3">
                    <div className="border rounded-4xl flex items-center px-2">
                        <input className="focus:outline-none" type="text" placeholder="Buscar..." />
                        <Search size={15}/>
                    </div>
                    <div className="flex items-center cursor-pointer hover:scale-105 transition duration-100">
                        <ShoppingCart size={15}/>
                    </div>
                    <AccountDropdown/>
                </div>
            </nav>
        </>
    )

}

export default Navbar