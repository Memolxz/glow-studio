import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../assets/modelo2.png'
import img2 from '../assets/modelo1.png'
import img3 from '../assets/modelo3.png'
import producto1 from '../assets/producto1.png'
import producto2 from '../assets/producto2.png'
import producto3 from '../assets/producto3.png'

export default function Home() {
    return (
        <div className="flex flex-col items-center bg-white min-h-screen">
            <Header />

            <div className="w-[90%] mt-6 py-10">
                <div className="w-full h-[450px] overflow-hidden rounded-3xl shadow-md">
                    <img
                        src={img1}
                        alt="Alex Consani"
                        className="w-full h-[500px] object-cover"
                    />
                </div>
            </div>

            <div className="flex justify-between w-[90%] mt-4 mb-10">
                <div className="relative flex flex-col items-center justify-center w-[300px] h-[300px] bg-[#F3F3F3] rounded-3xl shadow-md">
                    <span className="absolute top-4 right-4 text-xs text-gray-400 font-inter">limpieza</span>
                    <img src={producto1} alt="limpieza" className="w-[30%] h-auto mt-2" />
                    <h3 className="mt-2 text-sm font-bold font-inter text-warmgray text-center">
                    SALICYLIC ACID 2% ANHYDROUS
                    </h3>
                    <p className="text-xs text-gray-400 font-inter mt-1">Oily skin</p>
                </div>

                <div className="relative flex flex-col items-center justify-center w-[300px] h-[300px] bg-[#F3F3F3] rounded-3xl shadow-md">
                    <span className="absolute top-4 right-4 text-xs text-gray-400 font-inter">serum</span>
                    <img src={producto2} alt="serum" className="w-[22%] h-auto mt-2" />
                    <h3 className="mt-2 text-sm font-bold font-inter text-warmgray">
                    SALICYLIC ACID 2% ANHYDROUS
                    </h3>
                    <p className="text-xs text-left ml-4 text-gray-400 font-inter mt-1">Oily skin</p>
                </div>

                <div className="relative flex flex-col items-center justify-center w-[300px] h-[300px] bg-[#F3F3F3] rounded-3xl shadow-md">
                    <span className="absolute top-4 right-4 text-xs text-gray-400 font-inter">crema</span>
                    <img src={producto3} alt="crema" className="w-[30%] h-auto mt-2" />
                    <h3 className="mt-2 text-sm font-bold font-inter text-warmgray">
                    SALICYLIC ACID 2% ANHYDROUS
                    </h3>
                    <p className="text-xs text-gray-400 font-inter mt-1">Oily skin</p>
                </div>

                <div className="relative flex flex-col items-center justify-center w-[300px] h-[300px] bg-[#F3F3F3] rounded-3xl shadow-md">
                    <span className="absolute top-4 right-4 text-xs text-gray-400 font-inter">limpieza</span>
                    <img src={producto1} alt="limpieza" className="w-[30%] h-auto mt-2" />
                    <h3 className="mt-2 text-sm font-bold font-inter text-warmgray text-center">
                    SALICYLIC ACID 2% ANHYDROUS
                    </h3>
                    <p className="text-xs text-gray-400 font-inter mt-1">Oily skin</p>
                </div>
            </div>


            <div className="flex w-[90%] h-[450px] gap-6 bg-defaultbg rounded-3xl mb-5 shadow-md">

                <div className="flex-1 p-8 flex flex-col justify-end">
                    <h2 className="text-lg font-bold text-warmgray">CUIDADO DIARIO</h2>
                    <p className="mt-2 text-sm text-warmgray pr-5">
                    Cada piel es única, y tu rutina también debería serlo. Nuestro sistema te ayuda a identificar tu tipo de piel y te recomienda productos específicos que se adaptan a tus necesidades.</p>
                    <button
                            type="submit"
                            className="w-1/5 mt-4 rounded-full bg-transparent px-4 py-2 border border-warmgray
                            font-semibold text-warmgray font-inter text-sm
                            hover:bg-warmgray hover:text-defaultbg transition
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                        >
                            RUTINA
                        </button>
                </div>

                <div className="flex-1 overflow-hidden rounded-3xl">
                    <img 
                    src={img2}
                    alt="Cuidado diario" 
                    className="w-full h-full object-cover scale-105"
                    />
                </div>
            </div>

            <div className="flex w-[90%] h-[450px] gap-6 bg-defaultbg rounded-3xl mb-5 mt-5 shadow-md">

                <div className="flex-1 overflow-hidden rounded-3xl">
                    <img 
                    src={img3}
                    alt="Cuidado diario" 
                    className="w-full h-full object-cover scale-105"
                    />
                </div>

                <div className="flex-1 p-8 flex flex-col justify-end items-end">
                    <h2 className="text-lg font-bold text-warmgray">APRENDÉ A CUIDAR TU PIEL</h2>
                    <p className="mt-2 text-sm text-right text-warmgray pl-5">
                    Descubrí cómo incorporar los productos a tu rutina, qué ingredientes buscar, y aprovechá al máximo cada momento de cuidado personal. Mirá, aprendé y empezá a sentirte seguro con lo que tu piel necesita.</p>
                    <button
                            type="submit"
                            className="w-1/5 mt-4 rounded-full bg-transparent px-4 py-2 border border-warmgray
                            font-semibold text-warmgray font-inter text-sm
                            hover:bg-warmgray hover:text-defaultbg transition
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                        >
                            GUÍA
                        </button>
                </div>
            </div>

            <div 
                className="relative flex flex-col justify-center items-center w-[90%] h-[450px] rounded-3xl mb-5 mt-5 shadow-md bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: "url('/images/fondo.png')" }}>

            <div className="absolute inset-0 bg-black/20"></div>

            <h2 className="text-lg font-bold text-white mb-2 z-10">CUIDÁ DE VOS</h2>
            <p className="mt-2 text-sm text-white text-center max-w-[35%] z-10">
                Tu piel habla de vos, y dedicarte un momento para conocerla es el primer paso para cuidarte. En tu perfil vas a poder guardar tus preferencias, seguir tu progreso y tener siempre a mano los productos y rutinas.
            </p>
            <button
                type="submit"
                className="mt-6 rounded-full bg-transparent px-6 py-2 border border-white
                        font-semibold text-white font-inter text-sm
                        hover:bg-white hover:text-cyan-400 transition
                        focus:outline-none focus:ring-2 focus:ring-white z-10"
            >
                PERFIL
            </button>
            </div>

            <Footer />
        </div>
    );
}
