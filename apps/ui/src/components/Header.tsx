import { Link, useNavigate  } from "react-router-dom";
import { useState, useEffect  } from "react";
import { Menu, X, UserRoundIcon, LogOut } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
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
        navigate("/home");
    };


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

                {isAuthenticated && (
                    <Link
                        to={"/recommendations"}
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-hovertext ml-3 text-xl transition-transform hover:scale-105 origin-left"
                    >
                        Recomendaciones
                    </Link>
                )}

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
            ></div>)}

            </div>
            <Link
            to="/home"
            className="flex-1 text-center text-4xl font-bold tracking-wide text-white"
            >
            GLOW STUDIO
            </Link>

            <nav className="flex gap-8 flex-1 justify-end text-sm font-semibold text-white tracking-wide items-center">
                {isAuthenticated ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                            className="flex items-center justify-center border-2 h-10 w-10 border-white rounded-full hover:border-darkblue hover:bg-transparent hover:text-darkblue hover:scale-105 transition-transform z-30">
                            <UserRoundIcon className="scale-150" strokeWidth={1.5}/>
                        </button>

                        {isOptionsOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-background rounded-2xl shadow-lg flex flex-col text-start z-30
                                            origin-top transition-all duration-300 ease-out animate-[growDown_0.25s_ease-out]">
                                <Link
                                    to={"/profile"}
                                    onClick={() => setIsOptionsOpen(false)}
                                    className="flex flex-row py-2 mt-1 text-darkblue hover:text-hovertext text-lg transition-transform hover:scale-105 ml-3 origin-left z-50">
                                    <UserRoundIcon className="mr-2"/>
                                    <p>Perfil</p>
                                </Link>
                                <div className="mx-auto flex w-[90%] items-center border-t border-gray-500 rounded-full"/>
                                <button
                                    onClick={() => {
                                        setIsOptionSignOutOpen(!isOptionSignOutOpen);
                                        setIsOptionsOpen(!isOptionsOpen);
                                    }}
                                    className="flex flex-row py-2 mb-1 text-red-800 hover:text-red-900 text-lg transition-transform hover:scale-105 ml-3 origin-left"
                                >
                                    <LogOut className="mr-2"/>
                                    <p>Cerrar Sesión</p>
                                </button>
                            </div>
                        )}
                        {isOptionsOpen && (
                            <div
                                className="fixed inset-0 mt-28 z-10"
                                onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to={"/register"}
                        className="border border-white text-sm py-1 px-5 rounded-full hover:bg-white hover:text-darkblue hover:scale-105 transition-transform"
                    >
                        LOG IN
                    </Link>
                )}
            </nav>
        </div>

        {isOptionSignOutOpen && (
            <div className="flex flex-row justify-center items-center w-[80%] mx-auto py-3 mt-16">
                <div className="absolute top-full mt-2 w-1/3 bg-background rounded-2xl shadow-lg flex flex-col text-start z-30 origin-top">
                    <h1 className="m-2 text-center font-inter text-xl">¿Estás seguro que querés cerrar sesión?</h1>
                    <div className="flex w-full items-center border-t border-gray-500 rounded-full"/>
                    <div className="flex flex-row justify-center items-center">
                        <button
                            onClick={handleLogout}
                            className="w-1/2 flex flex-row text-darkblue justify-center items-center hover:text-hovertext text-xl text-center
                                        transition-transform hover:scale-105 origin-center py-3">
                            <p>Aceptar</p>
                        </button>
                        <div className="h-10 border-l border-gray-500 rounded-full" />
                        <button
                            onClick={() => {
                                setIsOptionSignOutOpen(!isOptionSignOutOpen);
                                setIsOptionsOpen(!isOptionsOpen);
                                }}
                            className="w-1/2 flex flex-row text-red-800 hover:text-red-900 text-xl text-center justify-center items-center
                                        transition-transform hover:scale-105 origin-center">
                            <p>Cancelar</p>
                        </button>
                    </div>
                </div>
            </div>
            )}
            {isOptionSignOutOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                ></div>)}
        </header>
    );
}
