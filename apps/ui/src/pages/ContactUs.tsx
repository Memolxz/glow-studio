import Header from '../components/Header';
import Footer from '../components/Footer';
import img from '../assets/imagen.png';

export default function ContactUs() {
    return (
        <div className="flex flex-col justify-center items-center bg-defaultbg min-h-screen">
            <Header />

            <div className="w-[90%] mt-6">
                <div className="w-full h-[400px] overflow-hidden rounded-3xl shadow-lg">
                    <img
                        src={img}
                        alt="hero"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <Footer />
    </div>
    );
}
