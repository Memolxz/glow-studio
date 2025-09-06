import Header from '../components/Header';
import Footer from '../components/Footer';
import img from '../assets/modelo7.png';
import RoutineLine from '../components/RoutineLine';

export default function Routine() {
    return (
        <div className="flex flex-col items-center bg-defaultbg min-h-screen relative font-inter">
            <Header />

            <div className="w-[90%] py-10 -mt-22">
                <div className="w-full h-[450px] overflow-hidden rounded-3xl relative">
                    <img
                        src={img}
                        alt="Rhode"
                        className="w-full h-[500px] object-cover"
                    />
                </div>
            </div>

            <RoutineLine />

            <div 
                className="relative flex flex-col justify-center items-center w-[90%] h-[450px] rounded-3xl mb-5 mt-5 bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url('./images/fondo1.png')` }}
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