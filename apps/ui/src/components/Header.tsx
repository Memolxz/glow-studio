import { Link, useNavigate  } from "react-router-dom";
import { useState, useEffect  } from "react";
import { Menu, X, UserRoundIcon, LogOut } from "lucide-react";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOptionSignOutOpen, setIsOptionSignOutOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        checkAuth();
    }, []);


    const checkAuth = () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.isAdmin === true) {
            setIsAdmin(true);
            }
            const currentTime = Date.now() / 1000;
            setIsAuthenticated(payload.exp > currentTime);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        setIsOptionSignOutOpen(false);
        setIsOptionsOpen(false);
        navigate("/register");
    };


    return (
        <header className="w-full absolute top-6 md:top-14 z-50 bg-transparent">
        <div className="w-[80%] mx-auto py-3 flex items-center font-geist">

            {/* LEFT - MENU */}
            <div className="flex-1">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:scale-105 transition-transform"
            >
                <Menu size={24} className="md:w-7 md:h-7" />
            </button>

            {/* SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full bg-background text-darkblue w-64 p-6 flex flex-col gap-6
                transition-transform duration-300 z-50 rounded-r-3xl ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">MENÚ</h1>
                <button onClick={() => setIsMenuOpen(false)}>
                    <X className="hover:text-hovertext" size={28} />
                </button>
                </div>

                {/* LINKS (no tocados) */}
                {isAuthenticated && (
                <Link to={"/recommendations"} onClick={() => setIsMenuOpen(false)} className="ml-3 text-lg md:text-xl hover:text-hovertext">
                    Recomendaciones
                </Link>
                )}

                {isAdmin && (
                <Link to={"/stats"} onClick={() => setIsMenuOpen(false)} className="ml-3 text-lg md:text-xl hover:text-hovertext">
                    Estadisticas
                </Link>
                )}

                <Link to={"/products"} onClick={() => setIsMenuOpen(false)} className="ml-3 text-lg md:text-xl hover:text-hovertext">
                Productos
                </Link>

                {isAdmin && (
                <Link to={"/users"} onClick={() => setIsMenuOpen(false)} className="ml-3 text-lg md:text-xl hover:text-hovertext">
                    Usuarios
                </Link>
                )}

                <Link to={"/FAQ"} onClick={() => setIsMenuOpen(false)} className="ml-3 text-lg md:text-xl hover:text-hovertext">
                FAQ
                </Link>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-40"></div>
            )}
            </div>

            {/* CENTER - LOGO */}
            <Link
            to="/home"
            className="flex-1 text-center text-xl sm:text-2xl md:text-4xl font-bold tracking-wide font-inter text-white"
            >
            GLOW STUDIO
            </Link>

            {/* RIGHT */}
            <nav className="flex flex-1 justify-end items-center">

            {isAuthenticated ? (
                <div className="relative">
                <button
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                    className="flex items-center justify-center border-2 border-white rounded-full
                            h-9 w-9 md:h-10 md:w-10 hover:scale-105 transition-transform"
                >
                    <UserRoundIcon className="scale-125 md:scale-150" strokeWidth={1.5}/>
                </button>

                {isOptionsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-44 md:w-48 bg-background rounded-2xl shadow-lg flex flex-col z-30 animate-[growDown_0.25s_ease-out]">

                    <Link
                        to={"/profile"}
                        onClick={() => setIsOptionsOpen(false)}
                        className="flex items-center py-2 mt-1 text-darkblue text-sm md:text-lg ml-3 hover:text-hovertext"
                    >
                        <UserRoundIcon className="mr-2"/>
                        Perfil
                    </Link>

                    <div className="mx-auto w-[90%] border-t border-gray-400"/>

                    <button
                        onClick={() => {
                        setIsOptionSignOutOpen(!isOptionSignOutOpen);
                        setIsOptionsOpen(false);
                        }}
                        className="flex items-center py-2 mb-1 text-red-800 text-sm md:text-lg ml-3 hover:text-red-900"
                    >
                        <LogOut className="mr-2"/>
                        Cerrar Sesión
                    </button>
                    </div>
                )}

                {isOptionsOpen && (
                    <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOptionsOpen(false)}
                    ></div>
                )}
                </div>

            ) : (
                <Link
                to={"/register"}
                className="border border-white text-xs md:text-sm py-1 px-3 md:px-5 rounded-full
                            hover:bg-white hover:text-darkblue text-white transition"
                >
                LOG IN
                </Link>
            )}
            </nav>
        </div>

        {/* MODAL (intacto, solo padding mobile) */}
        {isOptionSignOutOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-[90%] relative">
                <button
                onClick={() => setIsOptionSignOutOpen(false)}
                className="absolute top-4 right-4"
                >
                <X size={26} className="text-darkblue"/>
                </button>

                <h1 className="text-xl md:text-2xl font-bold text-darkblue mb-2">
                ¿Cerrar Sesión?
                </h1>

                <p className="text-darkblue/60 mb-6 text-sm md:text-base">
                ¿Estas seguro que querés cerrar sesión?
                </p>

                <div className="flex gap-3 md:gap-4">
                <button
                    onClick={handleLogout}
                    className="flex-1 py-2 px-4 bg-red-900 text-white rounded-full hover:bg-red-800"
                >
                    Aceptar
                </button>
                <button
                    onClick={() => setIsOptionSignOutOpen(false)}
                    className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                >
                    Cancelar
                </button>
                </div>
            </div>
            </div>
        )}
    </header>
    );
}
