import { useReducer, useState, useEffect, useRef } from "react"
import { ShoppingCart, X } from "lucide-react"

const reducer = (state, action) => {

}

const initialCart = { id: { value: null} }

const ShoppingCartComp = () => {
    const [ state, dispatch ] = useReducer(reducer, initialCart)
    const [ openCart, setOpenCart ] = useState(false)
    const ref = useRef(null)
    const btnRef = useRef(null)

    useEffect(() => {
        const handleClick = (e) => {
            if(ref.current && !ref.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
                setOpenCart(false)
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <>
            <div className="flex items-center hover:scale-105 transition duration-100">
                <button 
                    className="hover:scale-110 cursor-pointer"
                    onClick={() => setOpenCart(!openCart)}
                    ref={btnRef} 
                    >
                    <ShoppingCart size={17}/>
                </button>
            </div>

            { /** Overlay */}
            { openCart && (
                <div className="fixed left-0 top-0 bg-[rgba(0,0,0,0.3)] w-full h-dvh block"></div>
            )}
            

            <div className={`w-99 p-10 z-100 bg-white border-l border-stone-400 transition-transform ease-in-out fixed top-0 bottom-0 h-dvh right-0
                ${openCart ? "translate-x-0": "translate-x-full"}`}
                ref={ref}    
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">TU CARRITO DE COMPRAS</h1>
                    <button
                        onClick={() => setOpenCart(false)}    
                    >
                        <X className="cursor-pointer hover:scale-110 transition-transform ease-in" size={25}/>
                    </button>
                </div>

                    
            </div>
        </>
    )
}

export default ShoppingCartComp