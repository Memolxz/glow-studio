import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full absolute top-14 z-50 bg-transparent">
        <div className="w-[80%] mx-auto py-3 flex items-center font-inter">
            <div className="flex-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white"
                >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <div
            className={`fixed top-0 left-0 h-full bg-rectangles text-darkblue w-64 p-6 flex flex-col gap-6 transition-transform duration-300 z-50 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            >
            <Link
                to={"/products"}
                onClick={() => setIsOpen(false)}
                className="hover:text-hovertext transition-colors"
            >
                PRODUCTOS
            </Link>
            <Link
                to={"/routine"}
                onClick={() => setIsOpen(false)}
                className="hover:text-hovertext transition-colors"
            >
                RUTINA
            </Link>
            <Link
                to={"/recommendations"}
                onClick={() => setIsOpen(false)}
                className="hover:text-hovertext transition-colors"
            >
                RECOMENDACIONES
            </Link>
            <Link
                to={"/FAQ"}
                onClick={() => setIsOpen(false)}
                className="hover:text-hovertext transition-colors"
            >
                FAQ
            </Link>
            </div>

            {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsOpen(false)}
            ></div>)}

            </div>
            <Link
            to="/home"
            className="flex-1 text-center text-4xl font-bold tracking-wide text-white"
            >
            GLOW STUDIO
            </Link>

            <nav className="flex gap-8 flex-1 justify-end text-sm font-semibold text-white tracking-wide items-center">
            <Link
                to={"/register"}
                className="border border-white text-sm py-1 px-5 rounded-full hover:bg-white hover:text-[#676161] transition-colors"
            >
                LOG IN
            </Link>
            </nav>
        </div>
        </header>
    );
}
