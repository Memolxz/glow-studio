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
    <section className="relative w-full flex justify-center bg-background mt-5">
      <div className="w-full max-w-4xl relative px-4 md:px-0">

        {/* Línea vertical SIEMPRE en el medio */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-darkblue -translate-x-1/2"></div>

        <div className="flex flex-col gap-12 md:gap-16">
          {RoutineData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`
                  flex items-center relative
                  justify-center
                  md:${isLeft ? "justify-start" : "justify-end"}
                `}
              >

                {/* PUNTO (solo desktop) */}
                <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-darkblue rounded-full transform -translate-x-1/2 z-10"></div>

                {/* BARRA (solo desktop) */}
                <div
                  className={`
                    hidden md:block absolute top-18 h-[2px] bg-darkblue
                    ${isLeft ? "right-1/2 w-[25%]" : "left-1/2 w-[25%]"}
                  `}
                ></div>
                


                {/* CARD */}
                <div
                  className={`
                    bg-[#d7eaea] shadow-lg border border-gray-200 rounded-xl
                    p-5 md:p-6
                    w-full max-w-sm md:w-72
                    text-center z-10
                    transition-transform hover:scale-105

                    ${isLeft ? "md:mr-auto" : "md:ml-auto"}
                  `}
                >
                  <h3 className="text-base md:text-lg font-bold text-darkblue">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-2">
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
