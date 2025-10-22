
import { useState, useEffect } from 'react';
import { Star, Trophy } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../assets/modelo19.jpg';
import { Link } from 'react-router-dom';


type Product = {
  id: number;
  name: string;
  brand: string;
  rating: number | null;
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


export default function Stats() {
    const [topProducts, setTopProducts] = useState<Product[]>([]);
    const [bottomProducts, setBottomProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchTopProducts();
        fetchBottomProducts();
    }, []);


    const fetchTopProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/products");
            if (response.ok) {
                const data = await response.json();
                // Sort by rating and get top 3
                const sorted = data
                    .filter((p: Product) => p.rating !== null)
                    .sort((a: Product, b: Product) => (b.rating || 0) - (a.rating || 0))
                    .slice(0, 3);
                setTopProducts(sorted);
            }
        } catch (err) {
            console.error("Error fetching top products:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBottomProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/products");
            if (response.ok) {
                const data = await response.json();
                // Sort by rating and get top 3
                const sorted = data
                    .filter((p: Product) => p.rating !== null)
                    .sort((a: Product, b: Product) => (a.rating || 0) - (b.rating || 0))
                    .slice(0, 3);
                setBottomProducts(sorted);
            }
        } catch (err) {
            console.error("Error fetching top products:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-background relative font-geist">
            <Header />


            <div className="w-[90%] pt-10 pb-5">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img
                        src={img1}
                        alt="Rhode"
                        className="w-full object-cover"
                    />
                </div>
            </div>

            {/* Top Rated Products Section */}
            {!loading && topProducts.length > 0 && (
                <div className="w-[90%] bg-rectangles rounded-3xl my-5 p-10">
                    <div className="w-full flex flex-row justify-start items-center mb-5">
                        <Trophy className="text-darkblue h-8 w-8 mr-3"/>
                        <h2 className="text-3xl font-bold text-darkblue">Productos Más Valorados</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {topProducts.map((product, index) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="relative flex flex-col items-center group bg-white rounded-2xl p-6 hover:shadow-xl transition-all group"
                            >
                                {/* Ranking Badge */}
                                <div className="absolute top-3 left-3 bg-darkblue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10">
                                    {index + 1}
                                </div>


                                <div className="absolute top-5 right-5 bg-darkblue/60 text-white font-semibold px-3 h-8 flex items-center rounded-2xl z-10">
                                    <p>{categoryDisplayNames[product.category] || product.category}</p>
                                </div>

                                <img
                                    src={product.imageUrl || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-48 object-contain rounded-xl mb-4 group-hover:scale-105 transition-transform"
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
                </div>
            )}

            <div className="w-[90%] bg-rectangles rounded-3xl my-5 p-10">
                <div className="w-full flex flex-row justify-start items-center mb-5">
                    <Trophy className="text-darkblue h-8 w-8 mr-3"/>
                    <h2 className="text-3xl font-bold text-darkblue">Productos Menos Valorados</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bottomProducts.map((product, index) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="relative flex flex-col items-center group bg-white rounded-2xl p-6 hover:shadow-xl transition-all group"
                            >
                                {/* Ranking Badge */}
                                <div className="absolute top-3 left-3 bg-darkblue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10">
                                    {index + 1}
                                </div>


                                <div className="absolute top-5 right-5 bg-darkblue/60 text-white font-semibold px-3 h-8 flex items-center rounded-2xl z-10">
                                    <p>{categoryDisplayNames[product.category] || product.category}</p>
                                </div>

                                <img
                                    src={product.imageUrl || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-48 object-contain rounded-xl mb-4 group-hover:scale-105 transition-transform"
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
            </div>

            <div className="w-[90%] bg-rectangles rounded-3xl my-5 p-10">
                <div className="w-full flex flex-row justify-start items-center mb-5">
                    <Trophy className="text-darkblue h-8 w-8 mr-3"/>
                    <h2 className="text-3xl font-bold text-darkblue">Tipos de Piel Más Usados</h2>
                </div>
            </div>

            <div className="w-[90%] bg-rectangles rounded-3xl my-5 p-10">
                <div className="w-full flex flex-row justify-start items-center mb-5">
                    <Trophy className="text-darkblue h-8 w-8 mr-3"/>
                    <h2 className="text-3xl font-bold text-darkblue">Productos Más Recomendados</h2>
                </div>
            </div>

            <Footer />
        </div>
    );
}