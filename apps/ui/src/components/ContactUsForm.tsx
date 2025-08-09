export default function ContactForm() {
    return (
        <section className="flex flex-col justify-center w-[90%] mx-auto bg-defaultbg
                            rounded-3xl px-8 py-12 mt-16 mb-5 text-center shadow-md">
            <h2 className="text-2xl font-bold text-warmgray mb-2">CONTACTANOS</h2>
            <p className="text-sm text-warmgray mb-8">
                Descubrí cómo incorporar los productos a tu rutina, qué ingredientes buscar, y aprovechá al máximo cada momento de cuidado personal.
            </p>

            <form className="flex flex-col gap-4 items-center">
                <input
                    type="text"
                    placeholder="nombre y apellido*"
                    className="w-1/3 px-10 py-3 rounded-full
                            block bg-white
                            text-base text-warmgray font-inter
                            border-0
                            placeholder:text-warmgray
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                />
                <input
                    type="email"
                    placeholder="email*"
                    className="w-1/3 px-10 py-3 rounded-full
                            block bg-white
                            text-base text-warmgray font-inter
                            border-0
                            placeholder:text-warmgray
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                />
                <textarea
                    placeholder="detalles*"
                    rows={4}
                    className="w-1/3 px-10 py-3 rounded-2xl
                            block bg-white
                            text-base text-warmgray font-inter
                            border-0
                            placeholder:text-warmgray
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                />
                <button
                    type="submit"
                    className="mt-4 px-8 py-2 rounded-full bg-transparent border-2 border-warmgray
                            text-base font-semibold text-warmgray font-inter
                            hover:bg-warmgray hover:text-defaultbg transition
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                >
                    ENVIAR
                </button>
            </form>
        </section>
    );
}
