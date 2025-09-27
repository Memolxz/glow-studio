import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="min-h-screen flex flex-col items-center bg-background">
        <div
            className="w-full h-[450px] bg-cover bg-center relative flex flex-col items-center justify-center"
            style={{
            backgroundImage: "url('/images/selection-banner.jpg')"
            }}
        >
            <div className="absolute inset-0 bg-black/20"></div>

            <h1 className="relative z-10 text-5xl mt-48 mb-20 font-bold font-inter text-center text-white">
            Elegí tu(s) tipo(s) de piel
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-12 w-[72%] z-10">
                {skinTypes.map((skinType) => (
                <div key={skinType.id}>
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
                        className="flex flex-col items-center justify-center w-40 h-40 border border-gray-200 bg-white rounded-xl shadow-sm 
                                hover:shadow-lg cursor-pointer transition-transform hover:scale-105 z-10
                                peer-checked:bg-gray-300 peer-checked:border-gray-300
                                disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <p className="text-center text-md font-inter font-semibold text-darkblue mb-2">
                        {skinType.name}
                        </p>
                        <p className="text-center font-inter text-xs text-darkblue w-[85%] leading-tight">
                        {formatDescription(skinType.description)}
                        </p>
                    </label>
                </div>
                ))}
            </div>

            <button
                disabled={selected.length === 0 || submitting}
                onClick={handleContinue}
                className={`rounded-full px-4 py-2 border-2 text-base font-semibold font-inter
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
        </div>
    );
}
