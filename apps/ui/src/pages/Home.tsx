
import { useState, useEffect } from 'react';
import { Star, Trophy } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../assets/modelo15.jpg';
import img2 from '../assets/modelo1.png';
import img3 from '../assets/foto-producto2.jpg';
import videoSrc from '../assets/video.mp4';
import { Link } from 'react-router-dom';
import RoutineLine from '../components/RoutineLine';
import { API_ENDPOINTS } from '../utils/api';


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


export default function Home() {
    const [topProducts, setTopProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchTopProducts();
    }, []);


    const fetchTopProducts = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.products);
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

    return (
        // SOLO CAMBIOS DE CLASES (no lógica)

<div className="flex flex-col items-center bg-background relative font-geist">
    <Header />

    {/* Banner */}
    <div className="w-[90%] pt-6 md:pt-10 pb-5">
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
            <img
                src={img1}
                alt="Rhode"
                className="w-full h-full object-cover"
            />
        </div>
    </div>

    {/* TOP PRODUCTS */}
    {!loading && topProducts.length > 0 && (
        <div className="w-[90%] bg-rectangles rounded-3xl my-5 p-6 md:p-10">
            <div className="w-full flex items-center mb-5">
                <Trophy className="text-darkblue h-6 w-6 md:h-8 md:w-8 mr-3"/>
                <h2 className="text-xl md:text-3xl font-bold text-darkblue">
                    Productos Mejor Valorados
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {topProducts.map((product, index) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="relative flex flex-col items-center bg-white rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all group"
                    >
                        <div className="absolute top-3 left-3 bg-darkblue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10">
                            {index + 1}
                        </div>

                        <div className="absolute top-3 right-3 bg-darkblue/60 text-white text-xs md:text-sm font-semibold px-2 md:px-3 h-7 md:h-8 flex items-center rounded-2xl z-10">
                            <p>{categoryDisplayNames[product.category] || product.category}</p>
                        </div>

                        <img
                            src={product.imageUrl || "/placeholder.png"}
                            alt={product.name}
                            className="w-full h-40 md:h-48 object-contain rounded-xl mb-4 group-hover:scale-105 transition-transform"
                        />

                        <p className="text-center text-xs md:text-sm font-semibold text-darkblue group-hover:text-hovertext">
                            {product.name}
                        </p>
                        <p className="text-xs md:text-sm text-darkblue/60">{product.brand}</p>

                        <div className="flex items-center mt-2 text-xs md:text-sm">
                            {product.rating && (
                                <>
                                    <Star className="h-4 w-4 text-darkblue fill-current mr-1" />
                                    <p className="text-darkblue font-semibold">
                                        {product.rating.toFixed(1)}
                                    </p>
                                </>
                            )}
                            <div className="h-1 w-1 bg-darkblue rounded-full mx-2"></div>
                            {product.price && (
                                <p className="text-darkblue font-semibold">
                                    $ {parseFloat(product.price).toLocaleString("es-AR")}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )}

    {/* VIDEO */}
    <div className="w-[90%] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl my-5 overflow-hidden">
        <video
            src={videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
        />
    </div>

    {/* DESTACADO */}
    <div className="flex flex-col md:flex-row w-[90%] rounded-3xl my-5 bg-rectangles overflow-hidden">
        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-14 flex flex-col justify-end items-center md:items-start text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-darkblue">
                RECORRE LO DESTACADO
            </h2>
            <p className="mt-2 text-sm text-darkblue max-w-full md:max-w-[90%]">
                Cada piel es única...
            </p>

            <Link
                to="/products"
                className="w-[135px] mt-4 rounded-full px-5 py-2 bg-darkblue text-white text-sm text-center hover:bg-hovertext transition"
            >
                PRODUCTOS
            </Link>
        </div>

        <div className="w-full md:w-1/2 h-[250px] md:h-auto">
            <img
                src={img3}
                alt="Dior"
                className="w-full h-full object-cover"
            />
        </div>
    </div>

    {/* FAQ */}
    <div className="flex flex-col md:flex-row w-[90%] rounded-3xl my-5 bg-rectangles overflow-hidden">
        <div className="w-full md:w-1/2 h-[250px] md:h-auto">
            <img
                src={img2}
                alt="Cuidado diario"
                className="w-full h-full object-cover"
            />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-14 flex flex-col items-center md:items-end text-center md:text-right">
            <h2 className="text-xl md:text-2xl font-bold text-darkblue">
                PREGUNTAS FRECUENTES
            </h2>

            <p className="mt-2 text-sm text-darkblue">
                Respondemos las dudas más comunes...
            </p>

            <Link
                to="/faq"
                className="w-[135px] mt-4 rounded-full px-4 py-2 text-white bg-darkblue text-sm text-center hover:bg-hovertext transition"
            >
                PREGUNTAS
            </Link>
        </div>
    </div>

    {/* ROUTINE */}
    <div className="flex flex-col items-center w-[90%] my-5 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-darkblue">
            ¿No sabés cómo armar tu rutina?
        </h1>

        <p className="text-lg md:text-xl text-darkblue/60 my-2">
            Estos son los pasos que no te pueden faltar.
        </p>

        <RoutineLine />
    </div>

    <Footer />
</div>
    );
}
