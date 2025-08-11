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
            {/* Línea vertical */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 transform -translate-x-1/2"></div>

            <div className="flex flex-col gap-16">
            {RoutineData.map((item, index) => (
                <div
                key={index}
                className={`flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                } relative`}
                >
                {/* Punto central */}
                <div className="absolute left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 z-10"></div>

                {/* Caja de contenido */}
                <div
                    className={`bg-white shadow-lg border border-gray-200 rounded-xl p-6 w-72 ${
                    index % 2 === 0
                        ? "mr-auto text-right"
                        : "ml-auto text-left"
                    }`}
                >
                    <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                    {item.description}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
