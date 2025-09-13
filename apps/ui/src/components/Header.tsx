import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full absolute top-14 z-50 bg-transparent">
        <div className="w-[80%] mx-auto py-3 flex items-center font-inter">

            <nav className="flex gap-12 flex-1 text-sm font-semibold text-white tracking-wide items-center justify-start">
            <Link to={"/products"} className="hover:text-gray-200 transition-colors">PRODUCTOS</Link>
            <Link to={"/routine"} className="hover:text-gray-200 transition-colors">RUTINA</Link>
            </nav>

            <Link to="/home" className="flex-1 text-center text-4xl font-bold tracking-wide text-white">
            GLOW STUDIO
            </Link>

            <nav className="flex gap-8 flex-1 justify-end text-sm font-semibold text-white tracking-wide items-center">
            <Link to={"/register"} className="border border-white text-sm py-1 px-5 rounded-full hover:bg-defaultbg hover:text-[#676161] transition-colors">
                LOG IN
            </Link>
            </nav>
        </div>
        </header>
    );
}
