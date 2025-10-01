import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, UserRoundIcon, LogOut } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    return (
        <header className="w-full absolute top-14 z-50 bg-transparent">
        <div className="w-[80%] mx-auto py-3 flex items-center font-inter">
            <div className="flex-1">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:scale-105 transition-transform">
                <Menu size={28} />
            </button>

            <div
            className={`fixed top-0 left-0 h-full bg-background text-darkblue w-64 p-6 flex flex-col gap-6 
                        transition-transform duration-300 z-50 rounded-r-3xl ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex justify-start text-darkblue">
                        <h1 className="text-darkblue font-bold text-2xl">MENÚ</h1>
                    </div>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center">
                        <X className="text-darkblue hover:text-hovertext" size={32} strokeWidth={2.25} />
                    </button>
                </div>
                <Link
                    to={"/products"}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-hovertext ml-3 text-xl transition-transform hover:scale-105 origin-left"
                >
                    Productos
                </Link>
                <Link
                    to={"/routine"}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-hovertext ml-3 text-xl transition-transform hover:scale-105 origin-left"
                >
                    Rutina
                </Link>
                <Link
                    to={"/recommendations"}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-hovertext ml-3 text-xl transition-transform hover:scale-105 origin-left"
                >
                    Recomendaciones
                </Link>
                <Link
                    to={"/FAQ"}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-hovertext ml-3 text-xl transition-transform hover:scale-105 origin-left"
                >
                    FAQ
                </Link>
            </div>

            {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsMenuOpen(false)}
            ></div>)}

            </div>
            <Link
            to="/home"
            className="flex-1 text-center text-4xl font-bold tracking-wide text-white"
            >
            GLOW STUDIO
            </Link>

            <nav className="flex gap-8 flex-1 justify-end text-sm font-semibold text-white tracking-wide items-center">
                <div className="relative">
                <button
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                    className="flex items-center justify-center border-2 h-10 w-10 border-white rounded-full hover:border-darkblue hover:bg-transparent hover:text-darkblue hover:scale-105 transition-transform"
                >
                    <UserRoundIcon className="scale-150" strokeWidth={1.5}/>
                </button>

                {isOptionsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-background rounded-2xl shadow-lg flex flex-col text-start z-30">
                        <Link
                            to={"/profile"}
                            onClick={() => setIsOptionsOpen(false)}
                            className="flex flex-row py-2 mt-1 text-darkblue hover:text-hovertext text-lg transition-transform hover:scale-105 ml-3 origin-left"
                        >
                            <UserRoundIcon className="mr-2"/>
                            <p>Perfil</p>
                        </Link>
                        <div className="mx-auto flex w-[90%] items-center border-t border-gray-500 rounded-full"/>
                        <button
                            onClick={() => setIsOptionsOpen(false)}
                            className="flex flex-row py-2 mb-1 text-red-800 hover:text-red-900 text-lg transition-transform hover:scale-105 ml-3 origin-left"
                        >
                            <LogOut className="mr-2"/>
                            <p>Cerrar Sesión</p>
                            
                        </button>
                    </div>
                )}
            </div>

{/* 
                <Link
                    to={"/register"}
                    className="border border-white text-sm py-1 px-5 rounded-full hover:bg-white hover:text-darkblue hover:scale-105 transition-transform"
                >
                    LOG IN
                </Link> */}
            </nav>
        </div>
        </header>
    );
}
