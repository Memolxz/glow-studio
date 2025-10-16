import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../assets/modelo4.jpg';
import img2 from '../assets/modelo1.png';
import img3 from '../assets/dior.jpg';
import videoSrc from '../assets/video.mp4';
import img4 from '../assets/modelo2.png';
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

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} className="h-4 w-4 text-darkblue fill-current" />);
        }

        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative h-4 w-4">
                    <Star className="absolute h-4 w-4 text-darkblue" />
                    <div className="absolute h-4 w-4 overflow-hidden" style={{ width: '50%' }}>
                        <Star className="h-4 w-4 text-darkblue fill-current" />
                    </div>
                </div>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-darkblue" />);
        }

        return stars;
    };

    return (
        <div className="flex flex-col items-center bg-defaultbg relative font-inter">
            <Header />

            <div className="w-[90%] py-10">
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
                <div className="w-[90%] bg-rectangles rounded-3xl mb-5 p-10">
                    <h2 className="text-3xl font-bold text-darkblue mb-6">Productos Mejor Valorados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {topProducts.map((product, index) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="relative flex flex-col items-center bg-[#d7eaea] rounded-2xl p-6 hover:shadow-xl transition-all group"
                            >
                                {/* Ranking Badge */}
                                <div className="absolute top-3 left-3 bg-darkblue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10">
                                    {index + 1}
                                </div>
                                
                                <img
                                    src={product.imageUrl || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-48 object-contain rounded-xl mb-4 group-hover:scale-105 transition-transform"
                                    onError={(e) => {
                                        e.currentTarget.src = "/placeholder.png";
                                    }}
                                />
                                
                                <h3 className="text-darkblue font-bold text-lg text-center mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                
                                <p className="text-darkblue/60 text-sm mb-2">{product.brand}</p>
                                
                                <p className="text-xs text-darkblue/50 mb-3">
                                    {categoryDisplayNames[product.category] || product.category}
                                </p>
                                
                                {product.rating && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                            {renderStars(product.rating)}
                                        </div>
                                        <span className="text-darkblue font-semibold text-sm">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>
                                )}
                                
                                {product.price && (
                                    <p className="text-darkblue font-bold text-lg">
                                        $ {parseFloat(product.price).toLocaleString('es-AR')}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                    
                    <div className="flex justify-center mt-8">
                        <Link
                            to="/products"
                            className="px-8 py-3 bg-darkblue text-white rounded-full hover:bg-hovertext transition font-semibold"
                        >
                            Ver Todos los Productos
                        </Link>
                    </div>
                </div>
            )}

            <div className="flex w-[90%]  sm:h-[300px] md:h-[400px] lg:h-[450px] bg-rectangles rounded-3xl mb-5">
                <div className="flex-1 p-14 flex flex-col justify-end">
                    <h2 className="text-2xl sm:text-xl font-bold text-darkblue font-inter">RECORRE LO DESTACADO</h2>
                    <p className="mt-2 text-sm text-darkblue font-inter 
                                    max-w-[90%] text-left">
                        Cada piel es única, y tu rutina también debería serlo. Nuestro sistema te ayuda a identificar tu tipo de piel y te recomienda productos específicos que se adaptan a tus necesidades.
                    </p>
                    <Link to="/products"
                        type="submit"
                        className="w-[135px] mt-4 rounded-full bg-transparent px-5 py-2 border border-darkblue
                        font-semibold text-darkblue text-sm font-inter text-center
                        hover:bg-darkblue hover:text-rectangles transition
                        focus:outline-none focus:ring-2 focus:ring-darkblue"
                    >
                        PRODUCTOS
                    </Link>
                </div>

                <div className="flex-1 overflow-hidden rounded-3xl">
                    <img 
                        src={img3}
                        alt="Dior" 
                        className="w-full h-full object-cover scale-105"
                    />
                </div>
            </div>

            <div className="flex w-[90%]  sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl mt-5 mb-5 overflow-hidden bg-transparent">
                <video
                    src={videoSrc}
                    className="w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>


            <div className="lg:flex md:flex sm:flex-none w-[90%] sm:h-auto md:h-[400px] lg:h-[450px] gap-6 bg-rectangles
                            rounded-3xl mb-5 mt-5">
                <div className="flex-1 overflow-hidden rounded-3xl">
                    <img 
                        src={img2}
                        alt="Cuidado diario" 
                        className="w-full h-full object-cover scale-105"
                    />
                </div>

                <div className="flex-1 p-14 flex flex-col bg-rectangles rounded-3xl
                lg:justify-end lg:items-end md:justify-end md:items-end 
                sm:justify-center sm:items-center xs:i">
                    <h2 className="text-2xl font-bold text-darkblue 
                                lg:text-right md:text-right sm:text-center font-inter">
                        CUIDADO DIARIO
                    </h2>
                    <p className="mt-2 text-sm text-darkblue pl-5 font-inter 
                                lg:text-right md:text-right sm:text-center lg:w-[75%] md:w-[100%] sm:w-[60%] xs:w-[40%]">
                        Descubrí cómo incorporar los productos a tu rutina, qué ingredientes buscar, y aprovechá al máximo cada momento de cuidado personal. 
                        Empezá a sentirte seguro con lo que tu piel necesita.
                    </p>
                    <Link to="/routine"
                        type="submit"
                        className="w-[135px] mt-4 rounded-full bg-transparent px-4 py-2 border border-darkblue
                                font-semibold text-darkblue text-sm font-inter text-center
                                hover:bg-darkblue hover:text-rectangles transition
                                focus:outline-none focus:ring-2 focus:ring-darkblue">
                        RUTINA
                    </Link>
                </div>

            </div>

            <div 
                className="relative flex p-6 flex-col justify-center items-center w-[90%] sm:h-auto md:h-[400px] lg:h-[450px] rounded-3xl mb-5 mt-5 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${img4})` }}
            >
                <div className="absolute inset-0 bg-black/20"></div>

                <h2 className="text-2xl font-bold text-white mb-2 z-10 font-inter">SÉ TU MEJOR VERSIÓN</h2>
                <p className="mt-2 text-sm text-white text-center lg:w-[35%] md:w-[50%] sm:w-[70%] z-10 font-inter">
                    Tu piel habla de vos, y dedicarte un momento para conocerla es el primer paso para cuidarte. En tu perfil vas a poder guardar tus preferencias, seguir tu progreso y tener siempre a mano los productos y rutinas.
                </p>
                <button
                    type="submit"
                    className="w-24 mt-6 rounded-full bg-transparent px-6 py-2 border border-white
                            font-semibold text-white text-sm font-inter
                            hover:bg-defaultbg hover:text-[#676161] transition-colors
                            focus:outline-none focus:ring-2 focus:ring-white z-10"
                >
                    PERFIL
                </button>
            </div>

            <Footer />
        </div>
    );
}