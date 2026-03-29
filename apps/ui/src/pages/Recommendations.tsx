import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import img from "../assets/modelo22.jpg";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/api";

function Banner() {
  return (
    <div className="w-[90%] pt-6 md:pt-10 pb-5">
      <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
        <img src={img} alt="Rhode" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

// Types
type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  rating: number | null;
  officialUrl: string;
  imageUrl: string | null;
  price: string | null;
  category: string;
  bodyPart: string;
  createdAt: string;
  updatedAt: string;
};

type Recommendation = {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
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
  EYE_CREAM: "Crema de Ojos",
  FACIAL_OIL: "Aceite Facial",
  MIST: "Mist",
  ESSENCE: "Esencia",
};

const categoryOrder = [
  "CLEANSER",
  "EXFOLIANT",
  "TONER",
  "SERUM",
  "TREATMENT",
  "MOISTURIZER",
  "EYE_CREAM",
  "SUNSCREEN",
  "MASK",
  "FACIAL_OIL",
  "MIST",
  "ESSENCE",
];

function ProductCarousel({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 768) setVisible(2);
      else if (window.innerWidth < 1024) setVisible(3);
      else setVisible(4);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const next = () => {
    if (index < products.length - visible) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (products.length === 0) return null;

  return (
    <div className="relative w-full">
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-darkblue text-white rounded-full p-1 sm:p-2 shadow-md hover:bg-hovertext transition z-10"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visible}%` }}
            >
              <Link
                to={`/product/${product.id}`}
                className="relative flex flex-col justify-between items-center 
                h-[300px] sm:h-[340px] md:h-96 
                p-3 sm:p-4 md:p-6 
                rounded-2xl bg-[#E2EFEF] shadow-sm hover:shadow-lg transition group"
              >
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  className="w-auto h-[50%] sm:h-[55%] md:h-[60%] object-contain rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />

                <p className="text-center p-2 text-xs sm:text-sm font-semibold text-darkblue group-hover:text-hovertext">
                  {product.name}
                </p>

                <p className="text-xs sm:text-sm text-darkblue/60">
                  {product.brand}
                </p>

                <div className="flex flex-row justify-center items-center w-full mt-2">
                  {product.rating && (
                    <div className="flex flex-row items-center">
                      <Star
                        className="h-4 w-4 text-darkblue fill-current mr-1"
                        strokeWidth={1}
                      />
                      <p className="text-darkblue font-semibold text-sm">
                        {product.rating.toFixed(1)}
                      </p>
                    </div>
                  )}

                  <div className="h-1 w-1 bg-darkblue rounded-full mx-2"></div>

                  {product.price && (
                    <p className="text-darkblue font-semibold text-sm">
                      ${" "}
                      {parseFloat(product.price).toLocaleString("es-AR")}
                    </p>
                  )}

                  <div className="absolute top-3 right-3 bg-darkblue/60 text-white text-xs px-2 py-1 rounded-xl">
                    {categoryDisplayNames[product.category] ||
                      product.category}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {index < products.length - visible && (
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-darkblue text-white rounded-full p-1 sm:p-2 shadow-md hover:bg-hovertext transition z-10"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          window.location.href = "/register";
          return;
        }

        const response = await fetch(
          API_ENDPOINTS.productsRecommendations,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/register";
          return;
        }

        if (!response.ok) {
          throw new Error("Error al cargar recomendaciones");
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar recomendaciones"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const productsByCategory = recommendations.reduce((acc, rec) => {
    const category = rec.product.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(rec.product);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-xl font-semibold text-darkblue mb-4">
            Cargando recomendaciones...
          </div>
          <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600 mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-darkblue text-white rounded-full hover:bg-hovertext transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-xl font-semibold text-darkblue mb-4">
            No hay recomendaciones disponibles
          </div>
          <p className="text-gray-600 mb-6">
            Asegúrate de haber seleccionado tus tipos de piel.
          </p>
          <a
            href="/selection"
            className="px-6 py-2 bg-darkblue text-white rounded-full hover:bg-hovertext transition inline-block"
          >
            Seleccionar Tipos de Piel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col items-center bg-background min-h-screen relative font-geist">
        <Header />
        <Banner />

        <div className="w-[90%]">
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-darkblue">
            Productos Recomendados Para Vos
          </h1>

          {categoryOrder.map((category) => {
            const products = productsByCategory[category];
            if (!products || products.length === 0) return null;

            return (
              <div key={category} className="mb-6">
                <h2 className="text-xl sm:text-3xl ml-2 text-darkblue font-semibold mb-4">
                  {categoryDisplayNames[category] || category}
                </h2>
                <ProductCarousel products={products} />
              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    </div>
  );
}