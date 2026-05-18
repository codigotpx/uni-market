
import photo1 from "../../../assets/photo1.png"
import photo5 from "../../../assets/photo5.png"
import photo4 from "../../../assets/photo4.png"
import photo2 from "../../../assets/photo2.png"
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <section className="md:grid md:static h-dvh flex relative grid-cols-6 gap-4 grid-rows-[repeat(6,90px)] md:pt-30">
                <div className="hidden md:block col-start-1 row-start-1 col-span-2 row-span-6">
                    <img className="w-full h-full object-cover rounded-3xl" src={photo1} alt="Photo of men" />
                </div>
                <div className="hidden md:block col-start-3 row-start-1 col-span-2 row-span-2">
                    <img className="w-full h-full object-cover rounded-3xl" src={photo5} alt="" />
                </div>
                <div className="hidden md:block col-start-3 row-start-5 col-span-2 row-span-2">
                    <img className="w-full h-full object-cover rounded-3xl" src={photo4} alt="" />
                </div>
                <div className="hidden md:flex flex-col md:bg-white md:rounded-3xl justify-center p-10 md:p-0 left-0 w-full md:w-auto items-center col-span-2 row-span-2 md:border border-yellow-100 md:static"
                >
                    <h2 className="flex flex-col font-bold justify-center items-center text-3xl">
                        <span className="text-2xl text-yellow-400 font-semibold ">COLECCIÓN</span> 
                        UNIVERSITARIA</h2>
                    <Link className="bg-yellow-400 text-white px-6 py-2 mt-2 rounded-full font-semibold hover:bg-yellow-500 transition-all hover:scale-110 ease-in duration-200"
                        to="/shop"
                    >
                        Ver catálogo
                    </Link>
                </div>
                <div className="md:block md:h-auto h-full w-full md:w-auto absolute md:static col-start-5 row-start-1 row-span-6 col-span-2">
                    <img className="w-full h-full object-cover md:rounded-3xl" src={photo2} alt="" />
                </div>

                {/**Mobile text */}
                <div className="md:hidden fixed bottom-16 left-0 px-5 pointer-events-none">
                    <h2 className="text-3xl font-bold text-white">UNIVERSIDAD CARIBEA</h2>
                    <span className="text-xl font-bold text-white">Lo que necesitas para estudiar... y verte increíble</span>
                </div>

                {/** fixed footer  */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] px-6 py-4 
                flex items-center justify-between">
                    <Link
                        to="/shop"
                        className="text-white font-bold tracking-widest text-sm uppercase"
                    >
                        Comprar ahora
                    </Link>
                </div>


            </section>
    )
}

export default Hero