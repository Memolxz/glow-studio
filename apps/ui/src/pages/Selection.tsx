import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import img1 from "../assets/modelo1.jpg";
import Footer from "../components/Footer";
import { API_ENDPOINTS } from "../utils/api";

function Banner() {
  return (
    <div className="w-[90%] pt-4 sm:pt-6 md:pt-10 pb-4 sm:pb-5">
      <div className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-2xl md:rounded-3xl relative">
        <img src={img1} alt="Rhode" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

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

  const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchSkinTypes = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.skinTypes, {
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
      }
    };

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
      setError(
        "No se pudo identificar el usuario. Por favor, inicia sesión nuevamente."
      );
      navigate("/register");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const promises = selected.map(async (skinTypeId) => {
        const response = await fetch(
          API_ENDPOINTS.userSkinType(userId),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ skinTypeId }),
          }
        );

        const data: UserSkinTypeResponse = await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(
            data.error || `Error al asignar tipo de piel ${skinTypeId}`
          );
        }

        return data;
      });

      await Promise.all(promises);
      navigate("/recommendations");
    } catch (error) {
      console.error("Error assigning skin types:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Error al guardar tipos de piel"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatDescription = (description: string) => {
    return description.split("\\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < description.split("\\n").length - 1 && <br />}
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <div className="text-lg sm:text-xl font-semibold text-darkblue mb-4">
            Cargando tipos de piel...
          </div>
          <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }
    if (error) {
        console.log("roarrrrr");
    }


  return (
    <div className="min-h-screen flex flex-col items-center bg-background relative font-geist">
      <Header />
      <Banner />

      <div className="w-[90%] mt-6 sm:mt-10 mx-auto">
        <div className="flex flex-col items-start justify-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-darkblue">
            Seleccioná tus Tipos de Piel
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-darkblue/60 mt-2">
            Podés elegir uno o varios según tu tipo de piel.
          </p>
          <div className="border-b border-darkblue/60 my-4 sm:my-5 w-full"></div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center px-2 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-[90%]">
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
                className="flex flex-col justify-center w-full min-h-[140px] sm:min-h-[160px]
                border border-rectangles bg-white rounded-xl p-4 sm:p-6
                cursor-pointer transition
                hover:bg-[#E2EFEF] peer-checked:bg-[#E2EFEF]
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-darkblue mb-2">
                  {skinType.name}
                </p>

                <p className="text-sm sm:text-base text-darkblue leading-tight w-full">
                  {formatDescription(skinType.description)}
                </p>
              </label>

              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-darkblue rounded-full p-1 hidden peer-checked:flex">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        <button
          disabled={selected.length === 0 || submitting}
          onClick={handleContinue}
          className={`rounded-full px-4 sm:px-6 py-2 sm:py-3 border-2 text-sm sm:text-base font-semibold my-6
          w-[90%] sm:w-auto
          ${
            selected.length === 0 || submitting
              ? "border-darkblue text-darkblue cursor-not-allowed bg-white"
              : "border-darkblue text-darkblue hover:bg-darkblue hover:text-white cursor-pointer transition"
          }`}
        >
          {submitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Guardando...
            </div>
          ) : (
            `Continuar${
              selected.length > 0
                ? ` (${selected.length} seleccionado${
                    selected.length > 1 ? "s" : ""
                  })`
                : ""
            }`
          )}
        </button>
      </div>

      <Footer />
    </div>
  );
}