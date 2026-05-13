import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, BookOpen, FileText, Shirt, Gift} from "lucide-react";
import { Link } from "react-router-dom"
 
const MOCK_RESULTS = [
    { id: 1,  category: "Ropa",       label: "Suéter Caribea Classic — Azul",       href: "/shop/sueter-classic-azul" },
    { id: 2,  category: "Ropa",       label: "Suéter Caribea Oversize — Negro",      href: "/shop/sueter-oversize-negro" },
    { id: 3,  category: "Ropa",       label: "Camiseta Universidad Caribea",         href: "/shop/camiseta-caribea" },
    { id: 4,  category: "Ropa",       label: "Gorra Bordada Caribea",                href: "/shop/gorra-caribea" },
    { id: 5,  category: "Libros",     label: "Cálculo Diferencial — 4ta Ed.",        href: "/shop/calculo-diferencial" },
    { id: 6,  category: "Libros",     label: "Introducción al Derecho",              href: "/shop/intro-derecho" },
    { id: 7,  category: "Libros",     label: "Biología Molecular y Celular",         href: "/shop/biologia-molecular" },
    { id: 8,  category: "Libros",     label: "Estadística para Ingenieros",          href: "/shop/estadistica-ingenieros" },
    { id: 9,  category: "Souvenirs",  label: "Taza Caribea — Logo Dorado",           href: "/shop/taza-caribea" },
    { id: 10, category: "Souvenirs",  label: "Morral Universitario Caribea",         href: "/shop/morral-caribea" },
    { id: 11, category: "Souvenirs",  label: "Llavero Graduación 2025",              href: "/shop/llavero-graduacion" },
    { id: 12, category: "Souvenirs",  label: "Botella Térmica Caribea",              href: "/shop/botella-termica" },
    { id: 13, category: "Papelería",  label: "Cuaderno Argollado Caribea",           href: "/shop/cuaderno-argollado" },
    { id: 14, category: "Papelería",  label: "Set de Lapiceros Caribea",             href: "/shop/set-lapiceros" },
    { id: 15, category: "Papelería",  label: "Carpeta Institucional A4",             href: "/shop/carpeta-institucional" },
];

const RECENT = ["Suéter" , "Taza", "Cuaderno"]

const CATEGORY_ICONS = {
    Ropa: <Shirt size={13}/>,
    Libros: <BookOpen size={13}/>,
    Souvenirs: <Gift size={13}/>,
    Paperlería: <FileText size={13}/>
}

const SearchBar = () => {
    const [ query, setQuery ] = useState("")
    const [ open, setOpen ] = useState(false)
    const [ cursor, setCursor ] = useState(-1)
    const inputRef = useRef(null)
    const wrapRef = useRef(null)

    const filtered = query.trim().length > 0
        ? MOCK_RESULTS.filter(r => 
            r.label.toLowerCase().includes(query.toLowerCase()) ||
            r.category.toLowerCase().includes(query.toLowerCase())
        ): [];
    
    const grouped = filtered.reduce((acc, r) => {
        if(!acc[r.category]) acc[r.category] = []
        acc[r.category].push(r)
        return acc
    }, {})


    const flat = Object.values(grouped).flat()

    useEffect(() => {
        const handleClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false)
                setCursor(-1)
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleKeyDown = (e) => {
        if (!open) return
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setCursor(c => Math.min(c + 1, flat.length - 1))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setCursor(c => Math.max(c - 1, 0))
        } else if (e.key === "Escape") {
            setOpen(false)
            setCursor(-1)
            inputRef.current?.blur()
        } else if (e.key === "Enter" && cursor >= 0) {
            window.location.href = flat[cursor.href]
        }
    }

    const clear = () => {
        setQuery("")
        setCursor(-1)
        inputRef.current?.focus()
    }

    const showDropdown = open && (query.trim().length > 0 || RECENT.length > 0)

    return (
        <div ref={wrapRef} className="relative">
            {/**Input */}
            <div className={`flex items-center gap-2 px-3 h-9 bg-white border transition-all duration-200 
                ${open ? "border-stone-400 rounded-t-2xl rounded-b-none shadow-sm w-64" : 
                "border-stone-200 rounded-full w-44 hover:border-stone-300"}`}>
                    <Search size={14} className="text-stone-400 shrink-0"/>
                    <input 
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setCursor(-1)}}
                        onFocus={() => setOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Buscar..."
                        className="flex bg-transparent text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none min-w-0"
                    />
                    {query && (
                        <button onClick={clear} className="text-stone-400 hover:text-stone-600 shrink-0">
                            <X size={14}/>
                        </button>
                    )}
            </div>

            {/**Dropdown */}
            { showDropdown && (
                <div className="absolute top-full left-0 w-64 z-50 bg-white border border-t-0 border-stone-400 rounded-b-2xl shadow-lg overflow-hidden">
                    {query.trim() && filtered.length === 0 && (
                        <div className="px-4 py-5 text-sm text-stone-400 text-center">
                            Sin resultados para <span className="font-medium text-stone-600">"{query}"</span>
                        </div>
                    )}

                    {/**Resultados agrupados */}
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                            <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                                {CATEGORY_ICONS[category]}
                                {category}
                            </div>
                            {items.map(item => {
                                const idx = flat.findIndex(f => f.id === item.id)
                                return(
                                    <Link
                                        key={item.id}
                                        to={item.href}
                                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-100 cursor-pointer  ${idx === cursor ? "bg-stone-100 text-stone-900":"text-stone-700 hover:bg-stone-50"}`}  
                                        onMouseEnter={() => setCursor(idx)}
                                    >
                                        <Search size={12} className="text-stone-300 shrink-0"/>
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </div>
                    ))}

                    {/**Búsquedas recientes */}
                    {!query.trim() && (
                        <div>
                            <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                                <Clock size={13}/> Recientes
                            </div>
                            {RECENT.map((term, i) => (
                                <button 
                                    key={i}
                                    onClick={() => { setQuery(term); inputRef.current?.focus();}}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                                >
                                    <Clock size={12} className="text-stone-300 shrink-0"/>
                                    {term}
                                </button>
                            ))}
                        </div>
                    )}

                    {/**Footer */}
                    {query.trim() && filtered.length > 0 && (
                        <div className="border-t border-stone-100 px-4 py-2.5">
                            <button className="text-xs text-stone-400 hover:text-stone-600 w-full text-left transition-colors">
                                Ver todos los resultados para <span className="font-medium">"{query}"</span>
                            </button>

                        </div>
                    )}
                </div>
            )}
        </div>
    )

}

export default SearchBar