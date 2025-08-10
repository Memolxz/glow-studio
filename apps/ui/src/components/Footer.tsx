import {Phone} from "lucide-react"

export default function Footer() {
    return (
        <footer className="relative flex w-[90%] overflow-hidden rounded-3xl mt-5 mb-10
                    justify-start items-center bg-defaultbg h-[150px] shadow-md px-10">

            {/* Columna Izquierda */}
            <div className="text-warmgray font-bold text-3xl">
                GLOW STUDIO
            </div>

            {/* Columna Derecha (más compacto) */}
            <div className="relative grid grid-cols-3 gap-x-6 gap-y-2 text-warmgray text-md font-medium ml-12">
                <div className="flex justify-center items-center">
                    <Phone className="w-5 h-5 text-warmgray" />
                    <p className="ml-3">11 1111-1111</p>
                </div>
            </div>
        </footer>
    );
}
