export default function Footer() {
    return (
        <footer className="relative flex w-[90%] overflow-hidden rounded-3xl mb-10
                            justify-center items-center bg-defaultbg h-[200px]">
                <div className="text-warmgray text-4xl text-center">GLOW STUDIO</div>
                <div className="flex gap-10 col-span-6">
                    <a href="#">PRODUCTOS</a>
                    <a href="#">RUTINA</a>
                    <a href="#">GUÍA</a>
                    <a href="#">CONTACTO</a>
                    <a href="#">PERFIL</a>
                </div>
        </footer>
    );
}
