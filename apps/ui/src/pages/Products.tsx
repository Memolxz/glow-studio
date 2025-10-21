import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/modelo3.png";
import { SlidersHorizontal, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


function Title() {
    return (
        <div className="items-start justify-start w-full mb-10">
            <div className="flex flex-row items-center justify-between w-full mb-6">
                <div className="flex flex-col items-start justify-start">
                <h1 className="text-4xl font-bold text-start text-darkblue">
                    Productos
                </h1>
                <p className="text-xl font-normal text-start text-darkblue/60">
                    Descubre los productos que ofrecemos
                </p>
                </div>
            </div>
            <div className="border-b border-darkblue/60 my-5 w-full"></div>
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
        const response = await fetch("http://localhost:8000/products");
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
            `http://localhost:8000/products/filter?${params.toString()}`
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
        <div className="bg-background relative font-geist flex flex-col justify-center items-center">
            <Header />
                <div className="w-[90%] py-10 mt-22">
                        <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                            <img src={img1} alt="Products Banner" className="w-full h-full object-cover" />
                        </div>
                    </div>
            <div className="w-[90%]">
                <Title />
                <div className="flex flex-col items-center justify-center py-10">
                    <div className="text-xl font-semibold text-darkblue mb-4">
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
        <div className="bg-background relative font-geist min-h-screen">
            <Header />
            <div className="flex flex-col items-center justify-center">
                <div className="w-[90%] py-10 mt-22">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img src={img1} alt="Products Banner" className="w-full h-full object-cover" />
                </div>
                </div>


                <div className="w-[90%]">
                    <Title />
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="text-xl font-semibold text-red-600 mb-4">{error}</div>
                        <button
                        onClick={fetchProducts}
                        className="px-6 py-2 bg-darkblue text-white rounded-full hover:bg-hovertext transition"
                        >
                        Reintentar
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        );
    }


    // Vista principal
    return (
        <div className="bg-background relative font-geist min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center">
            <div className="w-[90%] py-10 mt-22">
            <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                <img src={img1} alt="Products Banner" className="w-full h-full object-cover" />
            </div>
            </div>


            <div className="items-start justify-start w-[90%] mb-10">
            <div className="flex flex-row items-center justify-between w-full mb-6">
                <div className="flex flex-col items-start justify-start">
                <h1 className="text-4xl font-bold text-start text-darkblue">
                    Productos
                </h1>
                <p className="text-xl font-normal text-start text-darkblue/60">
                    Descubre los productos que ofrecemos ({filteredProducts.length})
                </p>
                </div>
                <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex flex-row items-center justify-center w-48 h-10 bg-darkblue hover:bg-hovertext text-white rounded-full"
                >
                <h1 className="text-lg font-semibold text-start mr-2">
                    Mostrar Filtros
                </h1>
                <SlidersHorizontal className="h-6 w-6" />
                </button>
            </div>


            {/* Modal de filtros */}
            {showFilters && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowFilters(false)}>
                    <div className="bg-rectangles rounded-s-2xl p-8 max-w-2xl w-[90%] overflow-y-auto relative max-h-[550px]" onClick={(e) => e.stopPropagation()}>
                        <button
                        onClick={() => setShowFilters(false)}
                        className="absolute top-8 right-8 text-darkblue hover:text-hovertext"
                        >
                        <X size={30} />
                        </button>
                        <h2 className="text-2xl font-bold text-darkblue mb-4">
                        Filtros
                        </h2>

                        {/* Categorías */}
                        <div className="mb-6">
                        <h3 className="text-xl font-semibold text-darkblue mb-3">
                            Categorías
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(categoryDisplayNames).map(([key, value]) => (
                            <label
                                key={key}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                type="checkbox"
                                checked={selectedCategories.includes(key)}
                                onChange={() => toggleCategory(key)}
                                className="w-4 h-4 text-darkblue rounded"
                                />
                                <span className="text-darkblue">{value}</span>
                            </label>
                            ))}
                        </div>
                        </div>

                        {/* Partes del cuerpo */}
                        <div className="mb-6">
                        <h3 className="text-xl font-semibold text-darkblue mb-3">
                            Partes del cuerpo
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(bodyPartDisplayNames).map(([key, value]) => (
                            <label
                                key={key}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                type="checkbox"
                                checked={selectedBodyParts.includes(key)}
                                onChange={() => toggleBodyPart(key)}
                                className="w-4 h-4 text-darkblue rounded"
                                />
                                <span className="text-darkblue">{value}</span>
                            </label>
                            ))}
                        </div>
                        </div>


                        {/* Calificación */}
                        <div className="mb-6">
                        <h3 className="text-xl font-semibold text-darkblue mb-3">
                            Calificación
                        </h3>
                        <div className="flex gap-4">
                            <input
                            type="number"
                            placeholder="Min"
                            min="0"
                            max="5"
                            step="0.5"
                            value={minRating ?? ""}
                            onChange={(e) =>
                                setMinRating(e.target.value ? Number(e.target.value) : undefined)
                            }
                            className="flex-1 px-4 py-2 rounded-full border border-darkblue focus:outline-none focus:ring-2 focus:ring-darkblue"
                            />
                            <input
                            type="number"
                            placeholder="Max"
                            min="0"
                            max="5"
                            step="0.5"
                            value={maxRating ?? ""}
                            onChange={(e) =>
                                setMaxRating(e.target.value ? Number(e.target.value) : undefined)
                            }
                            className="flex-1 px-4 py-2 rounded-full border border-darkblue focus:outline-none focus:ring-2 focus:ring-darkblue"
                            />
                        </div>
                        </div>


                        {/* Precio */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-darkblue mb-3">
                                Precio
                            </h3>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center justify-between w-[90%]">
                                    <span className="text-md font-semibold text-darkblue">$0</span>
                                    <input
                                        type="range"
                                        min={0}
                                        max={150}
                                        step={10}
                                        value={Number(maxPrice)}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-9/12 accent-darkblue cursor-pointer"/>
                                    <span className="text-md font-semibold text-darkblue">
                                        ${Number(maxPrice).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>


                        {/* Botones */}
                        <div className="flex gap-4">
                        <button
                            onClick={clearFilters}
                            className="flex-1 py-2 px-4 font-semibold bg-gray-200 text-lg text-darkblue rounded-full hover:bg-gray-300 transition"
                        >
                            Limpiar
                        </button>
                        <button
                            onClick={applyFilters}
                            className="flex-1 py-2 px-4 font-medium bg-darkblue text-lg text-white rounded-full hover:bg-hovertext transition"
                        >
                            Aplicar
                        </button>
                    </div>
                </div>
                </div>
            )}


            {/* Grid de productos */}
            <div className="border-b border-darkblue/60 w-full my-5"></div>
            {/* Filtros activos (chips) */}
            {(selectedCategories.length > 0 || minRating || maxRating || maxPrice !== "150") && (
                <div className="flex flex-wrap gap-3 my-5">
                    {/* Categorías */}
                    {selectedCategories.map((cat) => (
                    <div
                        key={cat}
                        className="flex items-center gap-2 bg-darkblue/10 text-darkblue px-3 py-1 rounded-full cursor-pointer hover:bg-darkblue/20 transition"
                    >
                        <span>{categoryDisplayNames[cat]}</span>
                        <X
                        size={16}
                        className="hover:text-hovertext"
                        onClick={() => removeFilter("category", cat)}
                        />
                    </div>
                    ))}


                    {/* Calificación */}
                    {minRating !== undefined && maxRating !== undefined && (
                    <div className="flex flex-row items-center gap-2 bg-darkblue/10 text-darkblue px-3 py-1 rounded-full cursor-pointer hover:bg-darkblue/20 transition">
                        <Star className="fill-current h-4 w-4 text-darkblue"/><span>{minRating} - {maxRating}</span>
                        <X size={16} onClick={() => removeFilter("minRating")} className="hover:text-hovertext" />
                    </div>
                    )}


                    {/* Precio máximo (solo si no es el valor por defecto) */}
                    {maxPrice !== "150" && (
                    <div className="flex items-center gap-2 bg-darkblue/10 text-darkblue px-3 py-1 rounded-full cursor-pointer hover:bg-darkblue/20 transition">
                        <span>Hasta ${maxPrice}</span>
                        <X size={16} onClick={() => removeFilter("maxPrice")} className="hover:text-hovertext" />
                    </div>
                    )}
                </div>)}


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="relative flex flex-col group justify-between items-center h-96 p-6 rounded-2xl bg-[#E2EFEF] shadow-sm hover:shadow-lg transition group"
                >
                    <img
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    className="w-auto h-[60%] object-contain rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                    }}
                    />
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
                ))}
            </div>


            {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                <p className="text-xl text-darkblue/60">
                    No se encontraron productos con estos filtros
                </p>
                </div>
            )}
            {/* Paginación */}
            {filteredProducts.length > 0 && (
                <div className="flex justify-center items-center mt-10 gap-4 text-darkblue">
                    <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full border border-darkblue transition ${
                        currentPage === 1
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-darkblue hover:text-white"
                    }`}
                    >
                    <ChevronLeft size={24} />
                    </button>


                    <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-full font-semibold transition ${
                            currentPage === page
                            ? "bg-darkblue text-white"
                            : "hover:bg-darkblue/10 text-darkblue"
                        }`}
                        >
                        {page}
                        </button>
                    ))}
                    </div>


                    <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full border border-darkblue transition ${
                        currentPage === totalPages
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-darkblue hover:text-white"
                    }`}
                    >
                    <ChevronRight size={24} />
                    </button>
                </div>
                )}
            </div>
            <Footer />
        </div>
        </div>
    );
}



