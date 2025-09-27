import Header from '../components/Header';
import Footer from '../components/Footer';
import prod1 from "../assets/producto1.png"
import prod2 from "../assets/producto2.png"
import prod3 from "../assets/producto3.png"
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center bg-defaultbg relative font-inter">
            <Header />


        <div className="flex flex-col w-[90%] bg-rectangles rounded-3xl mb-5 mt-10 p-10">
                <div className="flex flex-row">
                    <div className="flex-1 px-14 flex flex-col justify-end mt-10 w-1/2">
                        <h2 className="text-3xl font-bold text-darkblue font-inter">Nombre Completo</h2>
                        <div className='bg-darkblue w-60 h-1 border-rectangles border mt-1'></div>

                        <h3 className="mt-5 text-2xl text-darkblue font-inter font-bold text-left">
                            Características
                        </h3>
                        <p className='ml-5 mt-2 text-md text-darkblue font-inter text-left'>Piel Acnéica</p>
                        <p className='ml-5 mt-2 text-md text-darkblue font-inter text-left'>Piel Seca</p>
                        <p className='ml-5 mt-2 text-md text-darkblue font-inter text-left'>Piel Oleósa</p>
                        <p className='ml-5 mt-2 text-md text-darkblue font-inter text-left'>Hiperpigmentación</p>
                        <p className='ml-5 mt-2 text-md text-darkblue font-inter text-left'>Piel Envejecida</p>
                    </div>
                    <div className="flex-1 px-14 flex flex-col justify-end mt-10 w-1/2 items-end">
                        <button
                            type="submit"
                            className="flex w-1/3 h-8 rounded-full bg-transparent border-2 border-red-900 text-red-900 mr-3
                                    hover:bg-red-900 hover:text-rectangles transition items-center justify-center
                                    focus:outline-none focus:ring-2 focus:ring-red-900">
                            Eliminar Cuenta
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex-1 flex-col px-6 ml-8 flex justify-end mt-10">
                        <h2 className="text-2xl text-darkblue font-inter font-bold text-left">Productos más recomendados</h2>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-5 items-center">
                            <div
                                className="flex flex-col justify-center items-center 
                                            w-[250px] h-[320px] p-6 rounded-2xl bg-transparent">
                                <img
                                    src={prod1}
                                    className="w-auto h-[85%] object-contain rounded-t-xl"
                                />
                                <p className="text-center p-2 text-sm font-semibold mt-3 text-darkblue">
                                    Limpiador
                                </p>
                            </div>

                            <div
                                className="flex flex-col justify-between items-center 
                                            w-[250px] h-[320px] p-6 rounded-2xl bg-transparent">
                                <img
                                    src={prod2}
                                    className="w-auto h-[85%] object-contain rounded-t-xl"
                                />
                                <p className="text-center p-2 text-sm font-semibold mt-3 text-darkblue">
                                    Sérum
                                </p>
                            </div>

                            <div
                                className="flex flex-col justify-between items-center 
                                            w-[250px] h-[320px] p-6 rounded-2xl bg-transparent">
                                <img
                                    src={prod3}
                                    className="w-auto h-[85%] object-contain rounded-t-xl"
                                />
                                <p className="text-center p-2 text-sm font-semibold mt-3 text-darkblue">
                                    Hidratante
                                </p>
                            </div>
                            <div
                                className="flex flex-col justify-between items-center 
                                            w-[250px] h-[320px] p-6 rounded-2xl bg-transparent">
                                <img
                                    src={prod1}
                                    className="w-auto h-[85%] object-contain rounded-t-xl"
                                />
                                <p className="text-center p-2 text-sm font-semibold mt-3 text-darkblue">
                                    Limpiador
                                </p>
                            </div>
                            <Link to="/recommendations"
                                type="submit"
                                className="flex w-10 h-10 rounded-full bg-transparent border-2 border-darkblue text-darkblue mr-3
                                        hover:bg-darkblue hover:text-rectangles transition items-center justify-center
                                        focus:outline-none focus:ring-2 focus:ring-darkblue">
                            <Plus className='text-inherit w-7 h-7 hover:text-rectangles'></Plus>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}