
import { useState, useEffect } from 'react';
import { Star, Trophy } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../assets/modelo15.jpg';
import img2 from '../assets/modelo1.png';
import img3 from '../assets/foto-producto.jpg';
import videoSrc from '../assets/video.mp4';
import { Link } from 'react-router-dom';
import RoutineLine from '../components/RoutineLine';


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
                        <h2 className="text-3xl font-bold text-darkblue">Productos Mejor Valorados</h2>
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


            <div className="flex w-[90%]  sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl my-5 overflow-hidden bg-transparent">
                <video
                    src={videoSrc}
                    className="w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>


            <div className="flex w-[90%] sm:h-[300px] md:h-[400px] lg:h-[450px] bg-rectangles rounded-3xl my-5">
                <div className="w-1/2 p-14 flex flex-col justify-end">
                    <h2 className="text-2xl sm:text-xl font-bold text-darkblue font-geist">RECORRE LO DESTACADO</h2>
                    <p className="mt-2 text-sm text-darkblue font-geist
                                    max-w-[90%] text-left">
                        Cada piel es única, y tu rutina también debería serlo. Nuestro sistema te ayuda a identificar tu tipo de piel y te recomienda productos específicos que se adaptan a tus necesidades.
                    </p>


                    <Link to="/products"
                        type="submit"
                        className="w-[135px] mt-4 rounded-full px-5 py-2 bg-darkblue
                        font-semibold text-white text-sm font-geist text-center
                        hover:bg-hovertext transition"
                    >
                        PRODUCTOS
                    </Link>
                </div>


                <div className="flex-1 w-1/2 overflow-hidden rounded-3xl">
                    <img
                        src={img3}
                        alt="Dior"
                        className="w-full h-full object-cover scale-105"
                    />
                </div>
            </div>


            <div className="lg:flex md:flex sm:flex-none w-[90%] sm:h-auto md:h-[400px] lg:h-[450px] gap-6 bg-rectangles
                            rounded-3xl mb-5 mt-5">
                <div className="w-1/2 overflow-hidden rounded-3xl">
                    <img
                        src={img2}
                        alt="Cuidado diario"
                        className="w-full h-full object-cover scale-105"
                    />
                </div>
                <div className="w-1/2 p-14 flex flex-col bg-rectangles rounded-3xl
                                lg:justify-end lg:items-end md:justify-end md:items-end
                                sm:justify-center sm:items-center">
                    <h2 className="text-2xl font-bold text-darkblue
                                lg:text-right md:text-right sm:text-center font-geist">
                        PREGUNTAS FRECUENTES
                    </h2>
                    <p className="mt-2 text-sm text-darkblue pl-5 font-geist
                                lg:text-right md:text-right sm:text-center">
                        Respondemos las dudas más comunes sobre el cuidado de la piel,
                        el uso de nuestros productos y cómo sacarles el máximo provecho.  
                        Encontrá la respuesta que buscás en un solo lugar.
                    </p>
                    <Link to="/faq"
                        type="submit"
                        className="w-[135px] mt-4 rounded-full px-4 py-2
                                font-semibold text-white bg-darkblue text-sm font-geist text-center
                                hover:bg-hovertext transition
                                ">
                        PREGUNTAS
                    </Link>
                </div>
            </div>


            <div className="flex flex-col items-center justify-center w-[90%] my-10">
                <div className="flex flex-row items-center justify-center w-full mb-6">
                    <div className="flex flex-col items-center justify-start">
                        <h1 className="text-5xl font-bold text-center text-darkblue">
                            ¿No sabés cómo armar tu rutina?
                        </h1>
                        <p className="text-xl font-normal text-start text-darkblue/60 my-2">
                            Estos son los pasos que no te pueden faltar.
                        </p>
                        </div>
                    </div>
                <RoutineLine />
            </div>

            <Footer />
        </div>
    );
}
