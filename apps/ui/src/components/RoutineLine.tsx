const RoutineData = [
    {
        title: "Limpiadores",
        description:
        "Elimina impurezas, restos de maquillaje y exceso de grasa para dejar la piel lista para absorber los productos siguientes.",
    },
    {
        title: "Exfoliantes",
        description:
        "Renueva la piel eliminando células muertas y mejorando la textura. Se recomienda 1-2 veces por semana.",
    },
    {
        title: "Tónicos",
        description:
        "Equilibra el pH de la piel, hidrata y prepara el rostro para maximizar los beneficios de los tratamientos posteriores.",
    },
    {
        title: "Sérums",
        description:
        "Concentrado de activos potentes como vitamina C, ácido hialurónico o niacinamida para tratar necesidades específicas.",
    },
    {
        title: "Tratamientos",
        description:
        "Incluye productos como cremas despigmentantes, antiacné o reafirmantes, que actúan sobre problemas concretos.",
    },
    {
        title: "Cremas",
        description:
        "Mantiene la piel nutrida, suave y protegida, sellando la hidratación durante todo el día o la noche.",
    },
    ];

export default function RoutineLine() {
    return (
        <section className="relative w-full flex justify-center py-16 bg-white">
        <div className="w-full max-w-4xl relative">
            {/* Línea vertical central */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-warmgray transform -translate-x-1/2"></div>

            <div className="flex flex-col gap-16">
            {RoutineData.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                <div
                    key={index}
                    className={`flex items-start relative ${
                    isLeft ? "justify-start" : "justify-end"
                    }`}
                >
                    {/* Punto central */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-warmdarkgray rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
                    {/* Línea horizontal que conecta al título */}
                    <div
                        className={`absolute top-1/2 h-[2px] bg-warmgray transform -translate-y-1/2 ${
                            isLeft
                            ? "right-1/2 w-[calc(50%-9rem)]"
                            : "left-1/2 w-[calc(50%-9rem)]"
                        }`}
                    />

                    {/* Contenido */}
                    <div
                    className={`w-72 ${
                        isLeft ? "mr-auto text-left" : "ml-auto text-right"
                    }`}
                    >
                    {/* Título redondeado */}
                    <div
                        className={`inline-block rounded-full px-4 py-2 border-2 border-warmgray text-base font-semibold text-warmgray font-inter bg-white`}
                    >
                        <h3 className="text-lg font-bold text-warmdarkgray m-0">
                        {item.title}
                        </h3>
                    </div>

                    {/* Descripción */}
                    <p
                        className={`text-gray-600 text-sm mt-3 ${
                        isLeft ? "text-left" : "text-right"
                        }`}
                    >
                        {item.description}
                    </p>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </section>
    );
}
