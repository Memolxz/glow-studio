import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative flex w-[90%] overflow-hidden rounded-3xl mt-5 mb-10
                    justify-center items-center bg-defaultbg h-[200px] shadow-md px-10">
    
            {/* Columna Izquierda */}
            <div className="text-warmgray font-bold text-2xl">
                GLOW STUDIO
            </div>

            {/* Columna Derecha (más compacto) */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-warmgray text-sm font-medium ml-12">
                <Link to="/products">PRODUCTOS</Link>
                <Link to="/routine">RUTINA</Link>
                <Link to="/fq">GUÍA</Link>
                <Link to="/contactus">CONTACTO</Link>
                <Link to="/profile">PERFIL</Link>
                <Link to="/fq">FQ</Link>
            </div>
        </footer>

    );
}
