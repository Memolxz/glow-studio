export default function Header() {
    return (
        <header className="w-full bg-transparent ">
            <div className="max-w-6xl mx-auto mt-5 py-1 flex justify-between items-center text-sm text-warmgray font-medium">
                <nav className="flex gap-6">
                    <a href="#">PRODUCTOS</a>
                    <a href="#">RUTINA</a>
                    <a href="#">GUÍA</a>
                </nav>

                <h1 className="text-lg font-bold tracking-wide">GLOW STUDIO</h1>

                <nav className="flex gap-6">
                    <a href="#">CONTACTO</a>
                    <a href="#">PERFIL</a>
                </nav>
            </div>
        </header>
    );
}
