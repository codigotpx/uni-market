import { useRef, useState, useEffect } from "react"
import { User, ChevronDown } from "lucide-react"
import { Link } from "react-router"

const ACCOUNT_LINKS = [
    { label: "Mi cuenta", href: "/account" },
    { label: "Registrarse", href: "/register" },
    { label: "Iniciar sesión", href: "/login" }
]

const AccountDropDown = () => {
    const [ open, setOpen ] = useState(null)
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1 cursor-pointer">
                <User size={18}/>
                <ChevronDown 
                    size={14}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <ul className="absolute right-0 bg-white top-full mt-2 w-48 rounded-lg shadow-lg z-50">
                    {ACCOUNT_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link 
                                to={link.href}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-2"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AccountDropDown
