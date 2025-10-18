import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header"
import Footer from "../components/Footer"

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
  const visible = 5;

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
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#2C5F5F] text-white rounded-full p-2 shadow-md hover:bg-[#1a3d3d] transition z-10"
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
            <div key={product.id} className="flex-shrink-0 w-1/5 px-2">
              <div className="flex flex-col justify-between items-center h-[320px] p-6 rounded-2xl bg-[#d7eaea] shadow-sm hover:shadow-lg transition cursor-pointer">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  className="w-auto h-[85%] object-contain rounded-t-xl"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#2C5F5F]">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-600">{product.brand}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {index < products.length - visible && (
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#2C5F5F] text-white rounded-full p-2 shadow-md hover:bg-[#1a3d3d] transition z-10"
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
          <div className="text-xl font-semibold text-[#2C5F5F] mb-4">
            Cargando recomendaciones...
          </div>
          <div className="w-8 h-8 border-4 border-[#2C5F5F] border-t-transparent rounded-full animate-spin mx-auto"></div>
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
            className="px-6 py-2 bg-[#2C5F5F] text-white rounded-full hover:bg-[#1a3d3d] transition"
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
          <div className="text-xl font-semibold text-[#2C5F5F] mb-4">
            No hay recomendaciones disponibles
          </div>
          <p className="text-gray-600 mb-6">
            Asegúrate de haber seleccionado tus tipos de piel.
          </p>
          <a
            href="/selection"
            className="px-6 py-2 bg-[#2C5F5F] text-white rounded-full hover:bg-[#1a3d3d] transition inline-block"
          >
            Seleccionar Tipos de Piel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col items-center">
        <Header />
        <div className="w-full h-16 bg-[#2C5F5F]"></div>

        {/* Hero Image */}
        <div className="w-[90%] py-10">
          <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
            <img 
              src="/images/modelo11.jpg" 
              alt="Hero" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="items-start justify-start w-[90%] mb-20">
          <h1 className="text-4xl font-bold mb-8 text-start text-[#2C5F5F]">
            Productos Recomendados Para Vos
          </h1>

          {categoryOrder.map((category) => {
            const products = productsByCategory[category];
            
            if (!products || products.length === 0) return null;

            return (
              <div key={category} className="mb-10">
                <h2 className="text-2xl text-[#2C5F5F] font-semibold mb-4">
                  {categoryDisplayNames[category] || category}
                </h2>
                <ProductCarousel products={products} />
              </div>
            );
          })}
        </div>

        <Footer />
        <div className="w-full h-32 bg-[#2C5F5F]"></div>
      </div>
    </div>
  );
}