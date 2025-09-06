const RoutineData = [
  {
    title: "1. Limpiadores",
    description:
      "Elimina impurezas, restos de maquillaje y exceso de grasa para dejar la piel lista para absorber los productos siguientes.",
  },
  {
    title: "2. Exfoliantes",
    description:
      "Renueva la piel eliminando células muertas y mejorando la textura. Se recomienda 1-2 veces por semana.",
  },
  {
    title: "3. Tónicos",
    description:
      "Equilibra el pH de la piel, hidrata y prepara el rostro para maximizar los beneficios de los tratamientos posteriores.",
  },
  {
    title: "4. Sérums",
    description:
      "Concentrado de activos potentes como vitamina C, ácido hialurónico o niacinamida para tratar necesidades específicas.",
  },
  {
    title: "5. Tratamientos",
    description:
      "Incluye productos como cremas despigmentantes, antiacné o reafirmantes, que actúan sobre problemas concretos.",
  },
  {
    title: "6. Cremas",
    description:
      "Mantiene la piel nutrida, suave y protegida, sellando la hidratación durante todo el día o la noche.",
  },
];

export default function RoutineLine() {
  return (
    <section className="relative w-full flex justify-center py-16 bg-defaultbg">
      <div className="w-full max-w-4xl relative">
        {/* Línea vertical */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-rectangles transform -translate-x-1/2"></div>

        <div className="flex flex-col gap-16">
          {RoutineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex items-center relative ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* Punto central */}
                <div className="absolute left-1/2 w-4 h-4 bg-rectangles rounded-full transform -translate-x-1/2 z-10"></div>

                {/* Barra Horizontal */}
                <div
                  className={`absolute top-18 h-[2px] bg-rectangles ${
                    isLeft
                      ? "right-1/2 w-[25%] origin-left"
                      : "left-1/2 w-[25%] origin-right"
                  }`}
                  style={{
                    transform: isLeft
                      ? "translateX(0)" 
                      : "translateX(0)",
                  }}
                ></div>

                {/* Caja de contenido */}
                <div
                  className={`bg-defaultbg shadow-lg border border-gray-200 rounded-xl p-6 w-72 transition-transform hover:scale-105 text-center z-10`}
                >
                  <h3 className="text-lg font-bold text-rectangles">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

