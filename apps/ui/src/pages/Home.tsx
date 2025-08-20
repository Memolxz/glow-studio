import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../assets/modelo4.jpg';
import img2 from '../assets/modelo1.png';
import img3 from '../assets/dior.jpg';
import videoSrc from '../assets/video.mp4';
import img4 from '../assets/modelo2.png';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center bg-white min-h-screen relative font-inter">
            <Header />

            <div className="w-[90%] py-10 -mt-22">
                <div className="w-full h-[450px] overflow-hidden rounded-3xl relative">
                    <img
                        src={img1}
                        alt="Rhode"
                        className="w-full h-[500px] object-cover"
                    />
                </div>
            </div>


            <div className="flex w-[90%] h-[450px] gap-6 bg-defaultbg rounded-3xl mb-5">
                <div className="flex-1 p-14 flex flex-col justify-end">
                    <h2 className="text-2xl font-bold text-warmgray font-inter">RECORRE LO DESTACADO</h2>
                    <p className="mt-2 text-sm text-warmgray pr-5 font-inter">
                        Cada piel es única, y tu rutina también debería serlo. Nuestro sistema te ayuda a identificar tu tipo de piel y te recomienda productos específicos que se adaptan a tus necesidades.
                    </p>
                    <Link to="/products"
                        type="submit"
                        className="w-[135px] mt-4 rounded-full bg-transparent px-5 py-2 border border-warmgray
                        font-semibold text-warmgray text-sm font-inter text-center
                        hover:bg-warmgray hover:text-defaultbg transition
                        focus:outline-none focus:ring-2 focus:ring-warmgray"
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

            <div className="flex w-[90%] h-[450px] rounded-3xl mt-5 mb-5 overflow-hidden bg-transparent">
                <video
                    src={videoSrc}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>


            <div className="flex w-[90%] h-[450px] gap-6 bg-defaultbg rounded-3xl mb-5 mt-5">
                <div className="flex-1 overflow-hidden rounded-3xl">
                    <img 
                        src={img2}
                        alt="Cuidado diario" 
                        className="w-full h-full object-cover scale-105"
                    />
                </div>


                <div className="flex-1 p-14 flex flex-col justify-end items-end">
                    <h2 className="text-2xl font-bold text-warmgray font-inter">CUIDADO DIARIO</h2>
                    <p className="mt-2 text-sm text-right text-warmgray pl-5 font-inter">
                        Descubrí cómo incorporar los productos a tu rutina, qué ingredientes buscar, y aprovechá al máximo cada momento de cuidado personal. Empezá a sentirte seguro con lo que tu piel necesita.
                    </p>
                    <Link to="/routine"
                        type="submit"
                        className="w-[110px] mt-4 rounded-full bg-transparent px-4 py-2 border border-warmgray
                        font-semibold text-warmgray text-sm font-inter text-center
                        hover:bg-warmgray hover:text-defaultbg transition
                        focus:outline-none focus:ring-2 focus:ring-warmgray"
                    >
                        RUTINA
                    </Link>
                </div>
            </div>

            <div 
                className="relative flex flex-col justify-center items-center w-[90%] h-[450px] rounded-3xl mb-5 mt-5 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${img4})` }}
            >
                <div className="absolute inset-0 bg-black/20"></div>

                <h2 className="text-2xl font-bold text-white mb-2 z-10 font-inter">SÉ TU MEJOR VERSIÓN</h2>
                <p className="mt-2 text-sm text-white text-center max-w-[35%] z-10 font-inter">
                    Tu piel habla de vos, y dedicarte un momento para conocerla es el primer paso para cuidarte. En tu perfil vas a poder guardar tus preferencias, seguir tu progreso y tener siempre a mano los productos y rutinas.
                </p>
                <button
                    type="submit"
                    className="w-24 mt-6 rounded-full bg-transparent px-6 py-2 border border-white
                            font-semibold text-white text-sm font-inter
                            hover:bg-white hover:text-[#676161] transition-colors
                            focus:outline-none focus:ring-2 focus:ring-white z-10"
                >
                    PERFIL
                </button>
            </div>

            <Footer />
        </div>
    );
}