import { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/modelo3.png";
import { SlidersHorizontal, Star, X } from "lucide-react";
import { Link } from "react-router-dom";

function Title() {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const filtersRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const [price, setPrice] = useState(20000);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
        const target = e.target as Node;
        if (
            isFiltersOpen &&
            filtersRef.current &&
            !filtersRef.current.contains(target) &&
            toggleRef.current &&
            !toggleRef.current.contains(target)
        ) {
            setIsFiltersOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFiltersOpen]);
    return(
    <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center justify-center w-full">
            <div className="flex flex-col items-start justify-start w-2/3">
                <h1 className="text-4xl font-bold text-start text-darkblue">Productos</h1>
                <p className="text-xl font-normal text-start text-darkblue/60">Descubre los productos que ofrecemos.</p>
            </div>

            <div className="flex flex-col items-end justify-center w-1/3 relative">
            <div className="relative">
                <button
                ref={toggleRef}
                className="flex flex-row items-center justify-center w-48 h-10 bg-darkblue hover:bg-hovertext text-white rounded-2xl"
                onClick={() => setIsFiltersOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={isFiltersOpen}
                >
                <h1 className="text-lg font-semibold text-start mr-2">Mostrar Filtros</h1>
                <SlidersHorizontal className="h-6 w-6" />
                </button>

                {isFiltersOpen && (
                <div
                    ref={filtersRef}
                    className="absolute right-0 mt-2 w-80 bg-white text-darkblue z-50 rounded-2xl p-4 shadow-lg">
                    <div className="flex flex-col gap-2">

                        <label className="font-semibold">Categoría</label>
                        <select className="w-full rounded-md p-2 text-darkblue">
                            <option value="">Todos</option>
                            <option value="serum">Serum</option>
                            <option value="tonificador">Tonificador</option>
                            <option value="limpiador">Limpiador</option>
                            <option value="exfoliante">Exfoliante</option>
                            <option value="mascarilla">Mascarilla</option>
                            <option value="protector solar">Protector Solar</option>
                            <option value="tratamiento">Tratamiento</option>
                            <option value="hidratante">Hidratante</option>
                        </select>

                        <label className="font-semibold">Marca</label>
                        <select className="w-full rounded-md p-2 text-darkblue">
                            <option value="">Todos</option>
                            <option value="serum">Clinique</option>
                            <option value="tonificador">La Roche Posay</option>
                            <option value="limpiador">Dermaglós</option>
                        </select>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Rango de precio</label>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-medium">$0</span>

                                <input
                                    type="range"
                                    min={0}
                                    max={50000}
                                    step={1000}
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-3/5 accent-darkblue cursor-pointer"
                                />

                                <span className="text-sm font-medium">${price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
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

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number | undefined>();
    const [maxRating, setMaxRating] = useState<number | undefined>();
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
        const response = await fetch("http://localhost:8000/products");
        
        if (!response.ok) {
            throw new Error("Error al cargar productos");
        }

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

    const applyFilters = async () => {
        try {
        const params = new URLSearchParams();

        if (selectedCategories.length > 0) {
            selectedCategories.forEach(cat => params.append('categories', cat));
        }
        if (minRating !== undefined) params.append('minRating', minRating.toString());
        if (maxRating !== undefined) params.append('maxRating', maxRating.toString());
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);

        const response = await fetch(`http://localhost:8000/products/filter?${params.toString()}`);
        const data = await response.json();
        
        if (data.ok) {
            setFilteredProducts(data.data);
        }
        setShowFilters(false);
        } catch (err) {
        console.error("Error applying filters:", err);
        }
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setMinRating(undefined);
        setMaxRating(undefined);
        setMinPrice("");
        setMaxPrice("");
        setFilteredProducts(products);
        setShowFilters(false);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
        );
    };

    if (loading) {
        return (
            <div className="bg-white relative font-inter">
                <div className="flex flex-col items-center w-full">
                    <Header />
                    <div className="w-[90%] py-10 -mt-22">
                        <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                            <img src={img1} alt="Rhode" className="w-full object-cover" />
                        </div>
                    </div>
                    <div className="w-[90%]">
                        <Title />
                        <div className="flex items-center justify-center bg-defaultbg w-full">
                            <div className="text-center">
                            <div className="text-xl font-semibold text-darkblue mb-4">
                                Cargando productos...
                            </div>
                            <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin mx-auto"></div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white relative font-inter">
                <div className="flex flex-col items-center w-full">
                    <Header />

                    <div className="w-[90%] py-10 -mt-22">
                        <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                            <img src={img1} alt="Rhode" className="w-full object-cover" />
                        </div>
                    </div>
                    <div className="w-[90%]">
                        <Title />
                        <div className="flex items-center justify-center bg-defaultbg">
                        <div className="text-center">
                            <div className="text-xl font-semibold text-red-600 mb-4">{error}</div>
                                <button
                                    onClick={fetchProducts}
                                    className="px-6 py-2 bg-darkblue text-white rounded-full hover:bg-hovertext transition">
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-defaultbg relative font-inter min-h-screen">
        <Header />
        
        <div className="flex flex-col items-center">
            <div className="w-[90%] py-10 mt-22">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img src={img1} alt="Products Banner" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="items-start justify-start w-[90%] mb-10">
            <div className="flex flex-row items-center justify-between w-full mb-6">
                <div className="flex flex-col items-start justify-start">
                <h1 className="text-4xl font-bold text-start text-darkblue">Productos</h1>
                <p className="text-xl font-normal text-start text-darkblue/60">
                    Descubre los productos que ofrecemos ({filteredProducts.length})
                </p>
                </div>
                <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex flex-row items-center justify-center w-48 h-10 bg-darkblue hover:bg-hovertext text-white rounded-2xl">
                <h1 className="text-lg font-semibold text-start mr-2">Mostrar Filtros</h1>
                <SlidersHorizontal className="h-6 w-6" />
                </button>
            </div>

            {/* Filters Modal */}
            {showFilters && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-rectangles rounded-3xl p-8 max-w-2xl w-[90%] max-h-[80vh] overflow-y-auto relative">
                        <button
                        onClick={() => setShowFilters(false)}
                        className="absolute top-4 right-4 text-darkblue hover:text-hovertext">
                        <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-darkblue mb-6">Filtros</h2>

                        {/* Categories */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-darkblue mb-3">Categorías</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(categoryDisplayNames).map(([key, value]) => (
                                <label key={key} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(key)}
                                    onChange={() => toggleCategory(key)}
                                    className="w-4 h-4 text-darkblue rounded"/>
                                    <span className="text-darkblue">{value}</span>
                                </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-darkblue mb-3">Calificación</h3>
                            <div className="flex gap-4">
                                <input
                                type="number"
                                placeholder="Min"
                                min="0"
                                max="5"
                                step="0.5"
                                value={minRating ?? ''}
                                onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : undefined)}
                                className="flex-1 px-4 py-2 rounded-full border border-darkblue focus:outline-none focus:ring-2 focus:ring-darkblue"/>

                                <input
                                type="number"
                                placeholder="Max"
                                min="0"
                                max="5"
                                step="0.5"
                                value={maxRating ?? ''}
                                onChange={(e) => setMaxRating(e.target.value ? Number(e.target.value) : undefined)}
                                className="flex-1 px-4 py-2 rounded-full border border-darkblue focus:outline-none focus:ring-2 focus:ring-darkblue"/>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-darkblue mb-3">Precio</h3>
                            <div className="flex gap-4">
                                <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-full border border-darkblue focus:outline-none focus:ring-2 focus:ring-darkblue"/>

                                <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-full border border-darkblue focus:outline-none focus:ring-2 focus:ring-darkblue"/>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={clearFilters}
                                className="flex-1 py-2 px-4 bg-gray-200 text-darkblue rounded-full hover:bg-gray-300 transition">
                                Limpiar
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-2 px-4 bg-darkblue text-white rounded-full hover:bg-hovertext transition">
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="border-b border-darkblue/60 w-full my-5"></div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex flex-col justify-between items-center h-[380px] p-6 rounded-2xl bg-[#d7eaea] shadow-sm hover:shadow-lg transition group"
                >
                    <img
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    className="w-auto h-[60%] object-contain rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                    }}
                    />
                    <p className="text-center p-2 text-sm font-semibold text-darkblue mt-2 hover:text-hovertext line-clamp-2">
                    {product.name}
                    </p>
                    <p className="text-xs text-gray-600">{product.brand}</p>
                    <div className="flex flex-row justify-center items-center w-full mt-2">
                    {product.rating && (
                        <div className="flex flex-row justify-center items-center mr-5">
                        <Star className="h-4 w-4 text-darkblue fill-current mr-2" />
                        <p className="text-darkblue font-semibold text-md">
                            {product.rating.toFixed(1)}
                        </p>
                        </div>
                    )}
                    {product.price && (
                        <p className="text-darkblue font-semibold text-md">
                        $ {parseFloat(product.price).toLocaleString('es-AR')}
                        </p>
                    )}
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
            </div>
        </div>
        
        <Footer />
        </div>
    );
}



/* 

import { useState, useRef, useEffect } from "react";
import serum1 from "../assets/producto1.png";
import toner1 from "../assets/producto2.png";
import cleanser1 from "../assets/producto3.png";
import lotion1 from "../assets/producto1.png";
import sunscreen1 from "../assets/producto2.png";
import mask1 from "../assets/producto3.png";
import moisturizer1 from "../assets/producto1.png";
import exfoliant1 from "../assets/producto2.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/modelo3.png";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Star } from "lucide-react";
import { Link } from "react-router-dom";

type Product = {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
};

const categories = [
    "serum",
    "tonificador",
    "limpiador",
    "protector solar",
    "mascarilla",
    "hidratante",
    "exfoliante",
    "tratamiento",
];

function ProductRecommendations({ products }: { products: Product[] }) {
    const sortedProducts = [...products].sort((a, b) => a.id - b.id);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const filtersRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const [price, setPrice] = useState(20000); // precio inicial

    // Cierra al hacer click fuera
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
        const target = e.target as Node;
        if (
            isFiltersOpen &&
            filtersRef.current &&
            !filtersRef.current.contains(target) &&
            toggleRef.current &&
            !toggleRef.current.contains(target)
        ) {
            setIsFiltersOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFiltersOpen]);

    return (
        <div className="bg-white relative font-inter">
            <div className="flex flex-col items-center">
                <Header />
                <div className="w-[90%] py-10 -mt-22">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img src={img1} alt="Rhode" className="w-full object-cover" />
                </div>
                </div>

                <div className="items-start justify-start w-[90%]">
                    <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex flex-col items-start justify-start w-2/3">
                            <h1 className="text-4xl font-bold text-start text-darkblue">Productos</h1>
                            <p className="text-xl font-normal text-start text-darkblue/60">Descubre los productos que ofrecemos.</p>
                        </div>

                        <div className="flex flex-col items-end justify-center w-1/3 relative">
                        <div className="relative">
                            <button
                            ref={toggleRef}
                            className="flex flex-row items-center justify-center w-48 h-10 bg-darkblue hover:bg-hovertext text-white rounded-2xl"
                            onClick={() => setIsFiltersOpen((s) => !s)}
                            aria-haspopup="true"
                            aria-expanded={isFiltersOpen}
                            >
                            <h1 className="text-lg font-semibold text-start mr-2">Mostrar Filtros</h1>
                            <SlidersHorizontal className="h-6 w-6" />
                            </button>

                            {isFiltersOpen && (
                            <div
                                ref={filtersRef}
                                className="absolute right-0 mt-2 w-80 bg-white text-darkblue z-50 rounded-2xl p-4 shadow-lg">
                                <div className="flex flex-col gap-2">

                                    <label className="font-semibold">Categoría</label>
                                    <select className="w-full rounded-md p-2 text-darkblue">
                                        <option value="">Todos</option>
                                        <option value="serum">Serum</option>
                                        <option value="tonificador">Tonificador</option>
                                        <option value="limpiador">Limpiador</option>
                                        <option value="exfoliante">Exfoliante</option>
                                        <option value="mascarilla">Mascarilla</option>
                                        <option value="protector solar">Protector Solar</option>
                                        <option value="tratamiento">Tratamiento</option>
                                        <option value="hidratante">Hidratante</option>
                                    </select>

                                    <label className="font-semibold">Marca</label>
                                    <select className="w-full rounded-md p-2 text-darkblue">
                                        <option value="">Todos</option>
                                        <option value="serum">Clinique</option>
                                        <option value="tonificador">La Roche Posay</option>
                                        <option value="limpiador">Dermaglós</option>
                                    </select>

                                    <div className="flex flex-col">
                                        <label className="font-semibold mb-2">Rango de precio</label>
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-sm font-medium">$0</span>

                                            <input
                                                type="range"
                                                min={0}
                                                max={50000}
                                                step={1000}
                                                value={price}
                                                onChange={(e) => setPrice(Number(e.target.value))}
                                                className="w-3/5 accent-darkblue cursor-pointer"
                                            />

                                            <span className="text-sm font-medium">${price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        </div>
                    </div>

                    <div className="border-b border-darkblue/60 w-full my-5"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedProducts.map((product) => (
                        <Link
                            key={product.id + product.name}
                            to="/product"
                            className="flex flex-col justify-center items-center p-6 rounded-2xl bg-[#d7eaea] h-96 shadow-sm hover:shadow-lg transition group">
                            <img src={product.imageUrl} alt={product.name} className="w-2/3 h-2/3 object-contain rounded-t-xl group-hover:scale-105 transition-transform duration-300"/>
                            <p className="text-center p-2 text-lg font-semibold text-darkblue mt-7 group-hover:text-hovertext">{product.name}</p>
                            <div className="flex flex-row justify-center items-center mt-2 w-full">
                                <div className="flex flex-row justify-center items-center mr-5">
                                    <Star className="h-4 w-4 text-darkblue fill-current mr-2 mb-2"/>
                                    <p className="text-darkblue font-semibold text-md">4.5</p>
                                </div>
                                <p className="text-darkblue font-semibold text-md">$ 16.000</p>
                            </div>
                        </Link>))}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default function RecommendationsPage() {
    const products = [
        { id: 1, name: "Serum Hidratante", imageUrl: serum1, category: "serum" },
        { id: 2, name: "Tonificador Suave", imageUrl: toner1, category: "tonificador" },
        { id: 3, name: "Limpiador Espumante", imageUrl: cleanser1, category: "limpiador" },
        { id: 4, name: "Loción Calmante", imageUrl: lotion1, category: "tratamiento" },
        { id: 5, name: "Protector Solar SPF 50", imageUrl: sunscreen1, category: "protector solar" },
        { id: 6, name: "Mascarilla Hidratante", imageUrl: mask1, category: "mascarilla" },
        { id: 7, name: "Crema Hidratante", imageUrl: moisturizer1, category: "hidratante" },
        { id: 8, name: "Exfoliante", imageUrl: exfoliant1, category: "exfoliante" },
    ];

    return <ProductRecommendations products={products} />;
}


























<div className="bg-white relative font-inter">
            <div className="flex flex-col items-center">
                <Header />
                <div className="w-[90%] py-10 -mt-22">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img src={img1} alt="Rhode" className="w-full object-cover" />
                </div>
                </div>

                <Footer />
            </div>
        </div>
 */