import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/modelo13.jpg";
import { SlidersHorizontal, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from '../utils/api';

function Banner() {
    return (
    <div className="w-[90%] py-6 md:py-10">
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl">
            <img
            src={img1}
            alt="Products Banner"
            className="w-full h-full object-cover"
            />
        </div>
    </div>
    );
}

function Title() {
  return (
    <div className="w-full mb-8 md:mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-4 md:mb-6">
        
        <div className="flex flex-col items-start">
          <h1 className="text-2xl md:text-4xl font-bold text-darkblue">
            Productos
          </h1>

          <p className="text-sm md:text-xl text-darkblue/60">
            Descubre los productos que ofrecemos
          </p>
        </div>

      </div>

      <div className="border-b border-darkblue/60 my-4 md:my-5 w-full"></div>
    </div>
  );
}

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

const bodyPartDisplayNames: Record<string, string> = {
    FACE: "Rostro",
    EYES: "Ojos",
    BODY: "Cuerpo",
    GENERAL: "General",
};

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // Filtros
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number | undefined>();
    const [maxRating, setMaxRating] = useState<number | undefined>();
    const [minPrice, setMinPrice] = useState<string>("0");
    const [maxPrice, setMaxPrice] = useState<string>("150");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
        const response = await fetch(API_ENDPOINTS.products);
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al cargar productos");
        } finally {
        setLoading(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const applyFilters = async () => {
        try {
            setShowFilters(false);
            setLoading(true);
            setCurrentPage(1);

            const params = new URLSearchParams();
            if (selectedCategories.length > 0)
            selectedCategories.forEach((cat) => params.append("categories", cat));
            if (selectedBodyParts.length > 0)
            selectedBodyParts.forEach((bp) => params.append("bodyParts", bp));
            if (minRating !== undefined)
            params.append("minRating", minRating.toString());
            if (maxRating !== undefined)
            params.append("maxRating", maxRating.toString());
            if (minPrice) params.append("minPrice", minPrice);
            if (maxPrice) params.append("maxPrice", maxPrice);

            const response = await fetch(
            `${API_ENDPOINTS.productsFilter}?${params.toString()}`
            );


            const data = await response.json();
            if (data.ok) setFilteredProducts(data.data);
        } catch (err) {
            console.error("Error applying filters:", err);
        } finally {
            setLoading(false);
        }
};

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBodyParts([]);
        setMinRating(undefined);
        setMaxRating(undefined);
        setMinPrice("0");
        setMaxPrice("150");
        setFilteredProducts(products);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
        prev.includes(category)
            ? prev.filter((c) => c !== category)
            : [...prev, category]
        );
    };

    const toggleBodyPart = (bodyPart: string) => {
        setSelectedBodyParts((prev) =>
        prev.includes(bodyPart)
            ? prev.filter((bp) => bp !== bodyPart)
            : [...prev, bodyPart]
        );
    };

    const removeFilter = (type: string, value?: string) => {
        switch (type) {
            case "category":
            setSelectedCategories((prev) => prev.filter((c) => c !== value));
            break;
            case "bodyPart":
            setSelectedBodyParts((prev) => prev.filter((bp) => bp !== value));
            break;
            case "minRating":
            setMinRating(undefined);
            break;
            case "maxRating":
            setMaxRating(undefined);
            break;
            case "maxPrice":
            setMaxPrice("150");
            break;
            default:
            break;
        }
        setTimeout(() => applyFilters(), 0);
    };

    // Estado de carga
    if (loading) {
        return (
        <div className="bg-background relative font-geist flex flex-col items-center min-h-screen">
            <Header />

            <Banner />

            {/* Contenido */}
            <div className="w-[90%] flex flex-col items-center">
            <Title />

            <div className="flex flex-col items-center justify-center py-10">
                <div className="text-base md:text-xl font-semibold text-darkblue mb-4 text-center">
                Cargando productos...
                </div>

                <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin"></div>
            </div>
            </div>

            <Footer />
        </div>
        );
    }

    // Estado de error
    if (error) {
        return (
        <div className="bg-background relative font-geist min-h-screen flex flex-col items-center">
            <Header />

            <Banner />

            {/* Contenido */}
            <div className="w-[90%] flex flex-col items-center">
            <Title />

            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="text-base md:text-xl font-semibold text-red-600 mb-4">
                {error}
                </div>

                <button
                onClick={fetchProducts}
                className="px-5 md:px-6 py-2 text-sm md:text-base bg-darkblue text-white rounded-full hover:bg-hovertext transition"
                >
                Reintentar
                </button>
            </div>
            </div>

            <Footer />
        </div>
        );
    }
return (
  <div className="bg-background relative font-geist min-h-screen flex flex-col items-center">
    <Header />

    <Banner />

    <div className="w-[90%] mb-10">
      {/* Header + botón */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-6 gap-4">
        
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold text-darkblue">
            Productos
          </h1>
          <p className="text-sm md:text-xl text-darkblue/60">
            Descubre los productos que ofrecemos ({filteredProducts.length})
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-full md:w-48 h-10 bg-darkblue hover:bg-hovertext text-white rounded-full"
        >
          <span className="text-sm md:text-lg font-semibold mr-2">
            Filtros
          </span>
          <SlidersHorizontal className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Modal de filtros */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="bg-rectangles rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4 text-darkblue hover:text-hovertext"
            >
              <X size={26} />
            </button>

            <h2 className="text-xl md:text-2xl font-bold text-darkblue mb-4">
              Filtros
            </h2>

            {/* Categorías */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-darkblue mb-3">
                Categorías
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(categoryDisplayNames).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(key)}
                      onChange={() => toggleCategory(key)}
                      className="w-4 h-4"
                    />
                    <span className="text-darkblue text-sm md:text-base">{value}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Body parts */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-darkblue mb-3">
                Partes del cuerpo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(bodyPartDisplayNames).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBodyParts.includes(key)}
                      onChange={() => toggleBodyPart(key)}
                      className="w-4 h-4"
                    />
                    <span className="text-darkblue text-sm md:text-base">{value}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-darkblue mb-3">
                Calificación
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minRating ?? ""}
                  onChange={(e) =>
                    setMinRating(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="flex-1 px-4 py-2 rounded-full border border-darkblue"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxRating ?? ""}
                  onChange={(e) =>
                    setMaxRating(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="flex-1 px-4 py-2 rounded-full border border-darkblue"
                />
              </div>
            </div>

            {/* Precio */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-darkblue mb-3">
                Precio
              </h3>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm md:text-md font-semibold text-darkblue">$0</span>
                  <input
                    type="range"
                    min={0}
                    max={150}
                    step={10}
                    value={Number(maxPrice)}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-2/3 accent-darkblue"
                  />
                  <span className="text-sm md:text-md font-semibold text-darkblue">
                    ${Number(maxPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 py-2 bg-gray-200 text-darkblue rounded-full"
              >
                Limpiar
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-2 bg-darkblue text-white rounded-full"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-b border-darkblue/60 w-full my-5"></div>

      {/* Chips */}
      {(selectedCategories.length > 0 || minRating || maxRating || maxPrice !== "150") && (
        <div className="flex flex-wrap gap-2 md:gap-3 my-5">
          {selectedCategories.map((cat) => (
            <div key={cat} className="flex items-center gap-2 bg-darkblue/10 px-3 py-1 rounded-full text-sm">
              <span>{categoryDisplayNames[cat]}</span>
              <X size={14} onClick={() => removeFilter("category", cat)} />
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="relative flex flex-col items-justify h-[340px] md:h-96 p-4 md:p-6 rounded-2xl bg-[#E2EFEF] hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl || "/placeholder.png"}
              className="h-[55%] object-contain"
            />
            <div className="flex flex-col items-center w-full mt-2 text-center">
  
            <p className="text-xs md:text-sm font-semibold text-darkblue">
                {product.name}
            </p>

            <p className="text-xs text-darkblue/60">
                {product.brand}
            </p>

            <div className="flex items-center justify-center gap-2 mt-1">
                
                {product.rating && (
                <div className="flex items-center">
                    <Star className="h-3 w-3 md:h-4 md:w-4 text-darkblue fill-current mr-1" />
                    <span className="text-xs md:text-sm text-darkblue font-semibold">
                    {product.rating.toFixed(1)}
                    </span>
                </div>
                )}

                {product.price && (
                <span className="text-xs md:text-sm text-darkblue font-semibold">
                    $ {parseFloat(product.price).toLocaleString("es-AR")}
                </span>
                )}
            </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Empty */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-base md:text-xl text-darkblue/60">
            No se encontraron productos
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-wrap justify-center items-center mt-10 gap-2 md:gap-4 text-darkblue">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 border rounded-full"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-full text-sm ${
                currentPage === page ? "bg-darkblue text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="p-2 border rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>

    <Footer />
  </div>
);
}
