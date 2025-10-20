import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import img1 from "../assets/modelo2.png"
import Footer from "../components/Footer";

interface SkinType {
    id: number;
    name: string;
    description: string;
}

interface SkinTypeResponse {
    ok: boolean;
    data?: SkinType[];
    error?: string;
}

interface UserSkinTypeResponse {
    ok: boolean;
    error?: string;
}

export default function SkinSelection() {
    const [skinTypes, setSkinTypes] = useState<SkinType[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Get user ID from token
    const getUserIdFromToken = (): number | null => {
        const token = localStorage.getItem("accessToken");
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id || null;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    // Fetch skin types from backend
    useEffect(() => {
        const fetchSkinTypes = async () => {
        try {
            const response = await fetch("http://localhost:8000/skintype", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data: SkinTypeResponse = await response.json();

            if (response.ok && data.ok && data.data) {
                setSkinTypes(data.data);
            } else {
                setError(data.error || "Error al cargar tipos de piel");
            }
        } catch (error) {
            console.error("Error fetching skin types:", error);
            setError("Error de conexión al cargar tipos de piel");
        } finally {
            setLoading(false);
        }};

        fetchSkinTypes();
    }, []);

    const toggleSelect = (skinTypeId: number) => {
        setSelected((prev) =>
        prev.includes(skinTypeId)
            ? prev.filter((id) => id !== skinTypeId)
            : [...prev, skinTypeId]
        );
    };

    const handleContinue = async () => {
        const userId = getUserIdFromToken();
        
        if (!userId) {
        setError("No se pudo identificar el usuario. Por favor, inicia sesión nuevamente.");
        navigate("/register");
        return;
        }

        setSubmitting(true);
        setError("");

        try {
            const promises = selected.map(async (skinTypeId) => {
                const response = await fetch(`http://localhost:8000/users/skintype/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({ skinTypeId }),
                });

                const data: UserSkinTypeResponse = await response.json();

                if (!response.ok || !data.ok) {
                    throw new Error(data.error || `Error al asignar tipo de piel ${skinTypeId}`);
                }

                return data;
            });

        await Promise.all(promises);

        navigate("/recommendations");
        } catch (error) {
            console.error("Error assigning skin types:", error);
            setError(error instanceof Error ? error.message : "Error al guardar tipos de piel");
        } finally {
            setSubmitting(false);
        }
    };

    // Format description by replacing \n with line breaks
    const formatDescription = (description: string) => {
        return description.split('\\n').map((line, index) => (
        <span key={index}>
            {line}
            {index < description.split('\\n').length - 1 && <br />}
        </span>
        ));
    };

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
            <div className="text-xl font-semibold text-darkblue mb-4">Cargando tipos de piel...</div>
            <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-background relative font-geist">
            <Header />
            <div className="w-[90%] mt-10 mx-auto">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img src={img1} alt="Banner" className="w-full object-cover" />
                </div>

                <div className="flex flex-col items-start justify-center w-full mt-10">
                    <div className="flex flex-row items-center justify-start w-full">
                        <div className="flex flex-col items-start justify-start w-full">
                            <h1 className="text-4xl font-bold text-start text-darkblue">
                                Seleccioná tus Tipos de Piel
                            </h1>
                            <p className="text-xl font-normal text-start text-darkblue/60">
                                Podés elegir uno o varios según tu tipo de piel.
                            </p>
                        </div>
                    </div>
                    <div className="border-b border-darkblue/60 my-5 w-full"></div>
                </div>
            </div>
        <div className="w-full relative flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 gap-6 w-[90%] z-10">
                {skinTypes.map((skinType) => (
                <div key={skinType.id} className="relative">
                    <input
                        type="checkbox"
                        id={`skin-${skinType.id}`}
                        className="hidden peer"
                        checked={selected.includes(skinType.id)}
                        onChange={() => toggleSelect(skinType.id)}
                        disabled={submitting}
                    />

                    <label
                        htmlFor={`skin-${skinType.id}`}
                        className="flex flex-col items-start justify-center origin-center
                                w-full h-40 border border-rectangles bg-white rounded-xl z-10 p-7 transform-gpu
                                cursor-pointer transition-transform
                                hover:bg-[#E2EFEF] peer-checked:bg-[#E2EFEF] peer-checked:origin-center
                                disabled:opacity-50 disabled:cursor-not-allowed">
                        <p className="text-start text-2xl font-geist font-semibold text-darkblue mb-2">
                        {skinType.name}
                        </p>

                        <p className="text-start font-geist text-md text-darkblue w-[85%] leading-tight">
                        {formatDescription(skinType.description)}
                        </p>
                    </label>

                    {/* Ícono de tilde */}
                    <div className="absolute top-5 right-5 bg-darkblue rounded-full p-1 hidden peer-checked:flex">
                        <Check className="w-5 h-5 text-white" />
                    </div>
                </div>
                ))}
            </div>

            <button
                disabled={selected.length === 0 || submitting}
                onClick={handleContinue}
                className={`rounded-full px-4 py-2 border-2 text-base font-semibold font-geist my-5
                ${
                    selected.length === 0 || submitting
                    ? "border-darkblue text-darkblue cursor-not-allowed bg-white"
                    : "border-darkblue text-darkblue hover:bg-darkblue hover:text-white cursor-pointer transition"
                }`}
            >
                {submitting ? (
                    <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                    </div>
                ) : (
                    `Continuar${selected.length > 0 ? ` (${selected.length} seleccionado${selected.length > 1 ? 's' : ''})` : ''}`
                )}
            </button>
        </div>
            <Footer />
        </div>
    );
}
