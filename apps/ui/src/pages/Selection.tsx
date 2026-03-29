import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import img1 from "../assets/modelo14.jpg";
import Footer from "../components/Footer";
import { API_ENDPOINTS } from "../utils/api";

function Banner() {
  return (
    <div className="w-[90%] pt-6 md:pt-10 pb-5">
      <div className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[420px] overflow-hidden rounded-2xl md:rounded-3xl relative">
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
        const response = await fetch(API_ENDPOINTS.skinTypes);
        const data: SkinTypeResponse = await response.json();

        if (response.ok && data.ok && data.data) {
          setSkinTypes(data.data);
        } else {
          setError(data.error || "Error al cargar tipos de piel");
        }
      } catch (error) {
        console.error(error);
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    fetchSkinTypes();
  }, []);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    const userId = getUserIdFromToken();

    if (!userId) {
      setError("Sesión inválida");
      navigate("/register");
      return;
    }

    setSubmitting(true);

    try {
      await Promise.all(
        selected.map(async (skinTypeId) => {
          const res = await fetch(API_ENDPOINTS.userSkinType(userId), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ skinTypeId }),
          });

          const data: UserSkinTypeResponse = await res.json();

          if (!res.ok || !data.ok) {
            throw new Error(data.error);
          }
        })
      );

      navigate("/recommendations");
    } catch (err: any) {
      setError(err.message || "Error al guardar");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDescription = (desc: string) =>
    desc.split("\\n").map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg md:text-xl font-semibold text-darkblue mb-4">
            Cargando tipos de piel...
          </p>
          <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background font-geist">
      <Header />
      <Banner />

      {/* HEADER TEXT */}
      <div className="w-[90%] mt-6 md:mt-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-darkblue">
          Seleccioná tus Tipos de Piel
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-darkblue/60 mt-2">
          Podés elegir uno o varios según tu tipo de piel.
        </p>
        <div className="border-b border-darkblue/40 my-5"></div>
      </div>

      {/* GRID */}
      <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {skinTypes.map((skin) => (
          <div key={skin.id} className="relative">
            <input
              type="checkbox"
              id={`skin-${skin.id}`}
              className="hidden peer"
              checked={selected.includes(skin.id)}
              onChange={() => toggleSelect(skin.id)}
              disabled={submitting}
            />

            <label
              htmlFor={`skin-${skin.id}`}
              className="flex flex-col justify-between w-full min-h-[140px] md:min-h-[160px]
              border border-rectangles bg-white rounded-xl p-4 md:p-6
              cursor-pointer transition-all
              hover:bg-[#E2EFEF]
              peer-checked:bg-[#E2EFEF]"
            >
              <div>
                <p className="text-lg md:text-xl font-semibold text-darkblue mb-1">
                  {skin.name}
                </p>

                <p className="text-sm md:text-base text-darkblue/80 leading-snug">
                  {formatDescription(skin.description)}
                </p>
              </div>
            </label>

            {/* CHECK */}
            <div className="absolute top-3 right-3 bg-darkblue rounded-full p-1 hidden peer-checked:flex">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="w-full flex justify-center mt-6 mb-10">
        <button
          disabled={selected.length === 0 || submitting}
          onClick={handleContinue}
          className={`rounded-full px-5 py-2 text-sm md:text-base font-semibold border-2 transition
          ${
            selected.length === 0 || submitting
              ? "border-darkblue text-darkblue bg-white cursor-not-allowed"
              : "border-darkblue text-darkblue hover:bg-darkblue hover:text-white"
          }`}
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Guardando...
            </div>
          ) : (
            `Continuar${
              selected.length > 0
                ? ` (${selected.length})`
                : ""
            }`
          )}
        </button>
      </div>

      <Footer />
    </div>
  );
}