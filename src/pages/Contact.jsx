import { X } from "lucide-react"
import { useNavigate } from "react-router";

const Contact = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="relative flex flex-col ml-auto bg-white rounded-3xl w-full max-w-2xl p-12 animate-slide-in shadow-lg">
            {/* Botón de cerrar (X) */}
            <button 
                onClick={() => navigate(-1)} // Al hacer clic, vuelve a la página anterior
                className="absolute top-6 right-6 p-2 text-primary-900 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
            >
                <X size={24} /> 
            </button>
            <h1>Hola soy contact</h1>
            </div>
        </>
    )
}

export default Contact