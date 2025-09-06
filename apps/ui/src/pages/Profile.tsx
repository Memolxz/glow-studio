import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
    return (
        <div className="flex flex-col items-center bg-defaultbg min-h-screen">
        <Header />

        <main className="flex flex-col justify-center items-center w-[90%] flex-grow mt-20 mb-20">
            <div className="flex flex-col justify-center items-center bg-[#F3F3F3] rounded-3xl shadow-md w-full max-w-3xl py-20 px-10 text-center">
            <h1 className="text-4xl font-bold text-rectangles mb-6">Página en Desarrollo</h1>
            <p className="text-rectangles text-lg mb-6 max-w-md">
                Estamos trabajando para brindarte la mejor experiencia. Esta sección estará disponible próximamente.
            </p>
            <span className="inline-block px-6 py-3 text-white bg-rectangles rounded-full text-xl font-semibold tracking-wide shadow-md">
                PRÓXIMAMENTE
            </span>
            </div>
        </main>

        <Footer />
        </div>
    );
}
