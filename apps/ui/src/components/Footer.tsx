import { useState } from "react";
import { Phone, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
    const [active, setActive] = useState<string | null>(null);

    const toggle = (icon: string) => {
        setActive(active === icon ? null : icon);
    };

    const contacts = [
        { id: "phone", icon: Phone, text: "+54 9 11 1234-5678" },
        { id: "mail", icon: Mail, text: "contacto@glowstudio.com" },
        { id: "instagram", icon: Instagram, text: "@glowstudio" },
        { id: "facebook", icon: Facebook, text: "Glow Studio Oficial" },
    ];

    return (
        <footer className="relative flex flex-col md:flex-row items-center md:justify-between font-geist w-[90%] rounded-3xl mt-5 mb-10 bg-rectangles px-6 py-6 md:py-0 md:h-[165px]">

            {/* LOGO */}
            <div className="text-darkblue font-bold font-inter text-xl md:text-2xl md:pl-10 mb-4 md:mb-8 text-center md:text-left">
                GLOW STUDIO
            </div>

            {/* CONTACTOS */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 md:pr-6 mb-4 md:mb-8">
                {contacts.map(({ id, icon: Icon, text }) => (
                    <div
                        key={id}
                        className={`flex items-center transition-all duration-300 ${
                            active === id ? "pr-1" : ""
                        }`}
                    >
                        <div
                            onClick={() => toggle(id)}
                            className="border-darkblue rounded-full border-2 flex items-center justify-center w-8 h-8 cursor-pointer transition-transform duration-300"
                        >
                            <Icon className="w-5 h-5 text-darkblue" />
                        </div>

                        {active === id && (
                            <span className="ml-2 md:ml-3 text-darkblue text-xs md:text-sm whitespace-nowrap">
                                {text}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* BOTTOM */}
            <div className="w-full mt-4 md:mt-0 md:absolute md:bottom-6 md:left-0 md:right-0 px-2 md:px-6">
                <hr className="border-t border-darkblue" />
                <div className="text-center text-darkblue text-[10px] md:text-xs select-none mt-2 md:mt-8">
                    &copy; 2025 Glow Studio. Todos los derechos reservados.
                </div>
            </div>

        </footer>
    );
}