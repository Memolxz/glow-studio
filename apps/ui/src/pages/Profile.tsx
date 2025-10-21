import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserRound, X, Mail, Droplet, Trash2 } from 'lucide-react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import img1 from '../assets/fondo.png'

// Types
type User = {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
};

type SkinType = {
    id: number;
    name: string;
    description: string;
};

type UserSkinType = {
    userId: number;
    skinTypeId: number;
    skinType: SkinType;
};

type Product = {
    id: number;
    name: string;
    brand: string;
    imageUrl: string | null;
    category: string;
};

type Recommendation = {
    id: number;
    product: Product;
};

const categoryDisplayNames: Record<string, string> = {
    SERUM: "Sérum",
    CLEANSER: "Limpiador",
    TONER: "Tonificador",
    SUNSCREEN: "Protector Solar",
    MASK: "Mascarilla",
    MOISTURIZER: "Hidratante",
    EXFOLIANT: "Exfoliante",
    TREATMENT: "Tratamiento",
};


export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [userSkinTypes, setUserSkinTypes] = useState<UserSkinType[]>([]);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Get user data from token
    const getUserFromToken = (): User | null => {
        const token = localStorage.getItem("accessToken");
        if (!token) return null;

        try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.id,
            email: payload.email,
            name: payload.name,
            isAdmin: payload.isAdmin,
        };
        } catch (error) {
        console.error("Error decoding token:", error);
        return null;
        }
    };


    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const userData = getUserFromToken();


            if (!token || !userData) {
            window.location.href = "/register";
            return;
            }


            setUser(userData);


            // Fetch user's skin types
            const skinTypesResponse = await fetch(
            `http://localhost:8000/users/skintype/${userData.id}`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            }
            );


            if (skinTypesResponse.ok) {
            const skinTypesData = await skinTypesResponse.json();
            setUserSkinTypes(skinTypesData.ok ? skinTypesData.data : []);
            }


            // Fetch recommendations
            const recsResponse = await fetch(
            "http://localhost:8000/products/recommendations",
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            }
            );


            if (recsResponse.ok) {
            const recsData = await recsResponse.json();
            setRecommendations(recsData.slice(0, 6)); // Show first 6
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Error al cargar datos del perfil");
        } finally {
            setLoading(false);
        }
        };


        fetchUserData();
    }, []);


    const handleDeleteAccount = async () => {
        if (!user) return;


        setDeleting(true);
        try {
        const token = localStorage.getItem("accessToken");


        const response = await fetch(`http://localhost:8000/users/${user.id}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });


        if (response.ok) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/register";
        } else {
            throw new Error("Error al eliminar cuenta");
        }
        } catch (err) {
        console.error("Error deleting account:", err);
        setError("Error al eliminar la cuenta");
        setDeleting(false);
        }
    };


    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-defaultbg">
            <div className="text-center">
            <div className="text-xl font-semibold text-darkblue mb-4">
                Cargando perfil...
            </div>
            <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
        );
    }


    if (error && !user) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-defaultbg">
            <div className="text-center">
            <div className="text-xl font-semibold text-red-600 mb-4">{error}</div>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 border-darkblue text-darkblue hover:bg-darkblue hover:text-white cursor-pointer transition"
            >
                Reintentar
            </button>
            </div>
        </div>
        );
    }




    return (
        <div className="flex flex-col items-center bg-background relative font-geist">
            <Header />
            <div className="w-[90%] pt-10 pb-10">
                <div className="w-full h-24 overflow-hidden rounded-3xl relative">
                    <img
                        src={img1}
                        alt="Agua Header"
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>


        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-3xl p-8 max-w-md w-[90%] relative">
                    <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="absolute top-4 right-4">
                    <X size={30} className="absolute top-4 right-4 text-darkblue hover:hovertext"/>
                    </button>
                    <h3 className="text-2xl font-bold text-darkblue mb-2">
                    ¿Eliminar Cuenta?
                    </h3>
                    <p className="text-darkblue/60 mb-6">
                    Esta acción eliminará tu cuenta y todos tus datos en 30 días.
                    ¿Estás seguro?
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            className="flex-1 py-2 px-4 bg-red-900 text-white rounded-full hover:bg-red-800 transition disabled:opacity-50"
                        >
                            {deleting ? "Eliminando..." : "Eliminar"}
                        </button>
                    </div>
                </div>
            </div>
        )}


        <div className="flex flex-col w-[90%] bg-rectangles rounded-3xl mb-10 px-10 py-10">
            <div className="flex flex-row">
                <div className="flex-1 flex flex-col justify-end mt-2 w-full">
                    <div className='w-full flex flex-row mb-10'>
                        <div className='bg-darkblue rounded-full h-16 w-16 text-white flex justify-center items-center mr-5'>
                            <UserRound className='h-9 w-9' strokeWidth={1.5}/>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className="text-4xl font-bold text-darkblue font-geist">{user?.name}</h2>
                            <div className='w-full flex flex-row justify-start items-center'>
                                <Mail className="h-4 w-4 text-darkblue/60 mr-1" />
                                <p className="text-md text-darkblue/60 font-geist">{user?.email}</p>
                            </div>
                        </div>
                    </div>


                    <div className='bg-[#E2EFEF] w-full rounded-2xl p-7 pl-9'>
                        <div className='w-full flex flex-row justify-start items-center mb-5'>
                            <Droplet className="text-darkblue h-7 w-7" strokeWidth={1.5}/>
                            <h3 className="text-2xl text-darkblue font-geist font-bold text-left">
                                Tipos de Piel
                            </h3>
                        </div>
                        <div className='w-full flex flex-row justify-start items-center mb-5'>
                            {userSkinTypes.length > 0 ? (
                                userSkinTypes.map((ust) => (
                                    <div className='mr-4 bg-darkblue rounded-full text-white flex justify-center items-center'>
                                        <p
                                            key={ust.skinTypeId}
                                            className="text-md font-geist font-bold p-2 mx-2"
                                            >
                                            {ust.skinType.name}
                                        </p>
                                    </div>
                                ))
                                ) : (
                                <p className="ml-5 mt-2 text-md text-gray-500 text-left italic">
                                    No has seleccionado tipos de piel
                                </p>
                                )}
                        </div>


                        <a
                        href="/selection"
                        className="mt-4 text-darkblue hover:text-[#1a3d3d] underline text-sm"
                        >
                        Actualizar tipos de piel
                        </a>
                    </div>
                </div>
            </div>
        </div>


        <div className="flex flex-col w-[90%] bg-rectangles rounded-3xl mb-5 px-10">
                {/* Recommended Products */}        
                <div className="flex flex-col">
                    <div className="flex-1 flex-col py-12 flex justify-end">
                        <div className='flex justify-between items-center w-full'>
                            <h2 className="text-4xl text-darkblue font-geist font-bold text-left">Productos Recomendados</h2>
                            <Link to={"/recommendations"} className="rounded-full bg-darkblue px-4 py-2
                                font-semibold text-white text-md font-geist text-center
                                hover:bg-hovertext transition w-36">Ver Más</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto mt-5 items-center">
                            {recommendations.length > 0 ? (
                                <>
                                {recommendations.map((rec) => (
                                    <Link to={`/product/${rec.product.id}`}
                                    key={rec.id}
                                    className="relative h-full flex flex-col items-center group bg-white rounded-2xl p-6 hover:shadow-xl transition-all group"
                                    >
                                    <img
                                        src={rec.product.imageUrl || "/placeholder.png"}
                                        alt={rec.product.name}
                                        className="w-full h-48 object-contain rounded-xl mb-4 group-hover:scale-105 transition-transform"
                                        onError={(e) => {
                                        e.currentTarget.src = "/placeholder.png";
                                        }}
                                    />
                                    <div className="absolute top-5 right-5 bg-darkblue/60 text-white font-semibold px-3 h-8 flex items-center rounded-2xl z-10">
                                        <p>{categoryDisplayNames[rec.product.category] || rec.product.category}</p>
                                    </div>
                                    <p className="text-center p-2 text-sm font-semibold text-darkblue group-hover:text-hovertext">
                                        {rec.product.name}
                                    </p>
                                    <p className="text-sm text-darkblue/60">
                                        {rec.product.brand}
                                    </p>
                                    </Link>
                                ))}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full py-10">
                                <p className="text-gray-500 mb-4">
                                    No tienes recomendaciones todavía
                                </p>
                                <a
                                    href="/selection"
                                    className="px-6 py-2 bg-darkblue text-white rounded-full hover:bg-hovertext transition"
                                >
                                    Seleccionar Tipos de Piel
                                </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <div className='bg-red-100 w-[90%] rounded-2xl px-10 py-7 my-5'>
                <div className='w-full flex flex-col justify-start items-start mb-5 ml-2'>
                    <div className='bg-red-200 rounded-full h-16 w-16 flex justify-center items-center'>
                        <Trash2 className="text-red-900 h-9 w-9" strokeWidth={1.5}/>
                    </div>
                    <h3 className="text-4xl text-red-900 font-geist font-bold text-start mt-2">Zona de Peligro</h3>
                    <p className="text-xl text-red-900/60 font-geist text-start mt-2">Al eliminar tu cuenta tenés 30 días para recuperarla en caso de que te arrepientas.</p>
                </div>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full flex rounded-full bg-red-900 text-white
                            hover:bg-red-800 transition items-center justify-center
                            py-2 font-semibold text-md font-geist text-center mt-5">
                    Eliminar Cuenta
                </button>
            </div>
            <Footer />
        </div>
    );
}

