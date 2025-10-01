import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, X } from 'lucide-react';
import { useState, useEffect } from "react";

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
            name: payload.name || "",
            isAdmin: payload.isAdmin || false,
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
        <div className="flex flex-col items-center bg-defaultbg relative font-inter">
            <Header />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-[90%] relative">
                <button
                onClick={() => setShowDeleteConfirm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-[#2C5F5F] mb-4">
                ¿Eliminar Cuenta?
                </h3>
                <p className="text-gray-600 mb-6">
                Esta acción eliminará permanentemente tu cuenta y todos tus datos.
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

        <div className="flex flex-col w-[90%] bg-rectangles rounded-3xl mb-5 mt-10 p-10">
                <div className="flex flex-row">
                    <div className="flex-1 px-14 flex flex-col justify-end mt-10 w-1/2">
                        <h2 className="text-3xl font-bold text-darkblue font-inter">{user?.name}</h2>
                        <div className='bg-darkblue w-60 h-1 border-rectangles border mt-1'></div>

                        <h3 className="mt-5 text-2xl text-darkblue font-inter font-bold text-left">
                            Características
                        </h3>
                        {userSkinTypes.length > 0 ? (
                        userSkinTypes.map((ust) => (
                            <p
                            key={ust.skinTypeId}
                            className="ml-5 mt-2 text-md text-darkblue font-inter font-bold text-left"
                            >
                            {ust.skinType.name}
                            </p>
                        ))
                        ) : (
                        <p className="ml-5 mt-2 text-md text-gray-500 text-left italic">
                            No has seleccionado tipos de piel
                        </p>
                        )}

                        <a
                        href="/selection"
                        className="mt-4 text-darkblue hover:text-[#1a3d3d] underline text-sm"
                        >
                        Actualizar tipos de piel
                        </a>

                    </div>
                    <div className="flex-1 px-14 flex flex-col justify-end mt-10 w-1/2 items-end">
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex w-1/3 h-8 rounded-full bg-transparent border-2 border-red-900 text-red-900 mr-3
                                    hover:bg-red-900 hover:text-rectangles transition items-center justify-center
                                    focus:outline-none focus:ring-2 focus:ring-red-900">
                            Eliminar Cuenta
                        </button>
                    </div>
                </div>

                {/* Recommended Products */}        
                <div className="flex flex-col">
                    <div className="flex-1 flex-col px-6 ml-8 flex justify-end mt-10">
                        <h2 className="text-2xl text-darkblue font-inter font-bold text-left">Productos más recomendados</h2>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-5 items-center">
                            {recommendations.length > 0 ? (
                                <>
                                {recommendations.map((rec) => (
                                    <div
                                    key={rec.id}
                                    className="flex flex-col justify-center items-center 
                                                w-[250px] h-[320px] p-6 rounded-2xl bg-transparent"
                                    >
                                    <img
                                        src={rec.product.imageUrl || "/placeholder.png"}
                                        alt={rec.product.name}
                                        className="w-auto h-[85%] object-contain rounded-t-xl"
                                        onError={(e) => {
                                        e.currentTarget.src = "/placeholder.png";
                                        }}
                                    />
                                    <p className="text-center p-2 text-sm font-semibold mt-3 text-[#2C5F5F]">
                                        {categoryDisplayNames[rec.product.category] ||
                                        rec.product.category}
                                    </p>
                                    <p className="text-center text-xs text-gray-600">
                                        {rec.product.brand}
                                    </p>
                                    </div>
                                ))}
                                <a
                                    href="/recommendations"
                                    className="flex w-10 h-10 rounded-full bg-transparent border-2 border-[#2C5F5F] text-[#2C5F5F] mr-3
                                            hover:bg-[#2C5F5F] hover:text-white transition items-center justify-center
                                            focus:outline-none focus:ring-2 focus:ring-[#2C5F5F]"
                                >
                                    <Plus className="text-inherit w-7 h-7" />
                                </a>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full py-10">
                                <p className="text-gray-500 mb-4">
                                    No tienes recomendaciones todavía
                                </p>
                                <a
                                    href="/selection"
                                    className="px-6 py-2 bg-[#2C5F5F] text-white rounded-full hover:bg-[#1a3d3d] transition"
                                >
                                    Seleccionar Tipos de Piel
                                </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}