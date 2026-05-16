import { Link, useLocation } from "react-router";
import { ShoppingCart, Menu, X, House, UserSearch, User  } from 'lucide-react';
import AccountDropdown from "./AccountDropdown"
import SearchBar from "./SearchBar"
import "../styles/Navbar.css"
import { useState } from "react";
import ShoppingCartComp from "./ShoppingCartComp"

const NAV_LINKS = [
        { label: "Inicio", href:"/", logo: <House/> },
        { label: "Shop", href:"/shop", logo: <ShoppingCart/> },
        { label: "About us", href:"/about", logo: <UserSearch /> }
]

const Navbar = () => {

    const [ open, setOpen ] = useState(false)

    const location = useLocation()

    const isActive = (href) => location.pathname === href

    return (
        <>
            <header className="w-full fixed z-20 py-2 md:my-5 h-15 md:h-auto bg-white md:rounded-full md:justify-between flex max-w-7xl">
                <div className="hidden md:flex flex-col justify-center items-center md:ml-10">
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
                                <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-yellow-400 transition-transform duration-300 origin-center ${
                                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                                }`}/>
                                </Link>
                        </li>
                    ))}
                </ul>
                </nav>
                <div className="hidden md:flex justify-center items-center mr-10 gap-3">
                    <SearchBar/>
                    
                    <ShoppingCartComp/>

                    <AccountDropdown className="hidden" />
                </div> 

                {/** Mobile topBar */}
                <div className="md:hidden relative flex w-full justify-between items-center px-5">
                    <SearchBar className="flex mx-auto" />

                    <div className="flex items-center gap-5">
                        <ShoppingCartComp/>

                        <button className="z-99" onClick={() => setOpen(!open)}>
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                    
                </div>

                {/** Overlay — cierra al tocar afuera */}
                {open && (
                    <div
                        className="fixed inset-0 z-40 bg-black/20 md:hidden"
                        onClick={() => setOpen(false)}
                    />
                )}

                {/** Nav — SIEMPRE renderizado, controlado solo por clases */}
                <nav className={`
                    md:hidden fixed top-0 right-0 z-50 h-full w-64
                    bg-white border-l shadow-sm
                    transition-transform duration-420 ease-in-out
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}>
                    <ul className="flex flex-col items-center gap-4 mt-20 px-4">
                        <h2 className="font-bold text-xl opacity-80">MENÚ</h2>
                        {NAV_LINKS.map((link, i) => (
                            <li
                                key={link.href}
                                className={`
                                    w-full flex gap-4 hover:scale-105 transform transition duration-300
                                    ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
                                    ${isActive(link.href) ? "opacity-100" : "opacity-50"}
                                `}
                                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                            >
                                <span>{link.logo}</span>

                                <Link
                                    to={link.href}
                                    className="relative pb-0.5 transition duration-300"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                    <span className={`
                                        absolute bottom-0 left-0 h-0.5 w-full bg-gold-400
                                        transition-transform duration-300 origin-center
                                        ${isActive(link.href) ? "scale-x-100" : "scale-x-0"}
                                    `} />
                                </Link>
                            </li>
                        ))}

                        <li
                            className={`
                                    w-full flex gap-4 hover:scale-105 transform transition duration-300
                                    ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
                                `}
                            >
                                <span><User/></span>
                                <Link
                                    to="/login" 
                                    onClick={() =>setOpen(false)}>
                                    Cuenta
                                </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )

}

export default Navbar