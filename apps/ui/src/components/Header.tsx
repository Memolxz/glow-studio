const Header = () => {
    return (
        <header className="flex justify-between items-center p-6 bg-white">
        <nav className="flex gap-6 text-gray-500 text-sm">
            <a href="#">PRODUCTOS</a>
            <a href="#">RUTINA</a>
            <a href="#">GUÍA</a>
        </nav>
        <h1 className="text-2xl font-bold text-gray-700">GLOW STUDIO</h1>
        <nav className="flex gap-6 text-gray-500 text-sm">
            <a href="#">CONTACTO</a>
            <a href="#">PERFIL</a>
        </nav>
        </header>
    )
}

export default Header;
