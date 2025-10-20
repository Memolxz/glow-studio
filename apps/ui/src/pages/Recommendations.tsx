import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"
import img from "../assets/modelo11.jpg"
import { Link } from "react-router-dom";

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

// Category mapping from backend enum to display names
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

const categoryOrder = [
  "CLEANSER",
  "EXFOLIANT",
  "TONER",
  "SERUM",
  "TREATMENT",
  "MOISTURIZER",
  "SUNSCREEN",
  "MASK",
];

function ProductCarousel({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const visible = 4;

  const next = () => {
    if (index < products.length - visible) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (products.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-darkblue text-white rounded-full p-2 shadow-md hover:bg-hovertext transition z-10"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
      )}

      {/* Visible Container */}
      <div className="overflow-hidden w-full">
        <div
        className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
        >
        {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-1/4 px-2">
				<Link
          key={product.id}
          to={`/product/${product.id}`}
          className="relative flex flex-col group justify-between items-center h-96 p-6 rounded-2xl bg-[#E2EFEF] shadow-sm hover:shadow-lg transition group">
          <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="w-auto h-[60%] object-contain rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
              e.currentTarget.src = "/placeholder.png";}}/>
          <p className="text-center p-2 text-sm font-semibold text-darkblue group-hover:text-hovertext">
          {product.name}
          </p>
          <p className="text-sm text-darkblue/60">{product.brand}</p>
          <div className="flex flex-row justify-center items-center w-full mt-2">
              {product.rating && (
                  <div className="flex flex-row justify-center items-center">
                  <Star className="h-4 w-4 text-darkblue fill-current mr-1" strokeWidth={1} />
                  <p className="text-darkblue font-semibold text-md">
                      {product.rating.toFixed(1)}
                  </p>
                  </div>
              )}
              <div className="h-1 w-1 bg-darkblue rounded-full mx-2"></div>
              {product.price && (
                  <p className="text-darkblue font-semibold text-md">
                  $ {parseFloat(product.price).toLocaleString("es-AR")}
                  </p>
              )}
              <div className="absolute top-5 right-5 bg-darkblue/60 text-white font-semibold px-3 h-8 flex items-center rounded-2xl">
                  <p>{categoryDisplayNames[product.category] || product.category}</p>
              </div>
          </div>
      </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {index < products.length - visible && (
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-darkblue text-white rounded-full p-2 shadow-md hover:bg-hovertext transition z-10"
        >
          <ChevronRight size={24} strokeWidth={3} />
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

        const response = await fetch("http://localhost:8000/products/recommendations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          // Token expired, redirect to login
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
        console.error("Error fetching recommendations:", err);
        setError(err instanceof Error ? err.message : "Error al cargar recomendaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Group products by category
  const productsByCategory = recommendations.reduce((acc, rec) => {
    const category = rec.product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
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

            <div className="w-[90%] py-10 mt-22">
                <div className="w-full h-[450px] overflow-hidden rounded-3xl relative">
                    <img
                        src={img}
                        alt="Rhode"
                        className="w-full h-[500px] object-cover"
                    />
                </div>
            </div>
            {/* Recommendations */}
            <div className="items-start justify-start w-[90%]">
              <h1 className="text-4xl font-bold mb-8 text-start text-darkblue">
                Productos Recomendados Para Vos
              </h1>

              {categoryOrder.map((category) => {
                const products = productsByCategory[category];
                
                if (!products || products.length === 0) return null;

                return (
                  <div key={category} className="mb-5">
                    <h2 className="text-3xl ml-2 text-darkblue font-semibold mb-4">
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