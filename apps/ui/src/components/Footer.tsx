import phoneIcon from "../assets/celular.png";
import instagramIcon from "../assets/instagram.png";
import facebookIcon from "../assets/facebook.png";
import tiktokIcon from "../assets/tiktok.png";

export default function Footer() {
    return (
        <footer className="relative flex justify-between items-center w-[90%] rounded-3xl mt-5 mb-10 bg-rectangles h-[165px] px-6">

        <div className="text-darkblue font-bold text-xl pl-10 mb-8">
            GLOW STUDIO
        </div>

        <div className="flex gap-6 pr-6 mb-8">
            <img src={phoneIcon} alt="Celular" className="w-12 h-12 cursor-pointer hover:opacity-70" />
            <img src={instagramIcon} alt="Instagram" className="w-12 h-12 cursor-pointer hover:opacity-70" />
            <img src={facebookIcon} alt="Facebook" className="w-12 h-12 cursor-pointer hover:opacity-70" />
            <img src={tiktokIcon} alt="TikTok" className="w-12 h-12 cursor-pointer hover:opacity-70" />
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-6">
            <hr className="border-t border-darkblue -mb-2" />
            <div className="text-center text-darkblue text-xs select-none mt-8 ">
            &copy; 2025 Glow Studio. Todos los derechos reservados.
            </div>
        </div>
        </footer>
    );
}

