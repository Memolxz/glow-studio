import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import img1 from '../assets/fondo.png'


function Banner () {
  return (
    <div className="w-[90%] pt-6 md:pt-10 pb-6 md:pb-10">
          <div className="w-full h-20 md:h-24 overflow-hidden rounded-3xl relative">
              <img
                  src={img1}
                  alt="Agua Header"
                  className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
          </div>
      </div>
    );
}

export default function FAQ() {
const questions = [
    {
        question: "¿Cómo sé qué tipo de piel tengo?",
        answer: "Podés identificar tu tipo de piel viendo la breve descripción de cada tipo de piel en nuestra pagina de selección de tipos de piel."
    },
    {
        question: "¿Puedo usar los mismos productos de día y de noche?",
        answer: "Algunos productos sirven para ambos momentos, pero es ideal tener una rutina específica para cada uno: por la mañana se prioriza la protección solar y por la noche, la reparación."
    },
    {
        question: "¿Por qué es importante usar protector solar todos los días?",
        answer: "El protector solar protege contra el envejecimiento prematuro, las manchas y el cáncer de piel. Debe aplicarse incluso en días nublados o si estás en interiores con exposición a pantallas."
    },
    {
        question: "¿Qué significa que un producto sea ‘no comedogénico’?",
        answer: "Significa que está formulado para no obstruir los poros, lo cual ayuda a prevenir granos y puntos negros, especialmente en pieles grasas o con tendencia acneica."
    },
    {
        question: "¿Qué productos son básicos para empezar una rutina?",
        answer: "Los tres esenciales son: limpiador facial, hidratante y protector solar. Luego podés sumar sueros o tratamientos según tus necesidades."
    },
    {
        question: "¿Cómo puedo recibir recomendaciones personalizadas?",
        answer: "Primero tenés que registrarte e ingresar con tu cuenta. Selecciona tu tipo de piel y nosotros te recomendamos lo mejor para vos!!"
    },
    {
        question: "Tengo granitos que no desaparecen con el tiempo, ¿qué hago?",
        answer: "Podría tratarse de un caso más complejo, como acné hormonal o una reacción a ciertos productos. En ese caso, te recomendamos consultar a tu médico o dermatólogo de confianza."
    },
    {
        question: "Tengo manchas oscuras en la piel, ¿cómo puedo tratarlas?",
        answer: "Las manchas pueden tener distintas causas (sol, hormonas, inflamación). Si no desaparecen con productos despigmentantes suaves, podría tratarse de un caso más complejo; consultá a tu dermatólogo de confianza."
    },
    {
        question: "Tengo descamación o picazón después de aplicar una crema, ¿es normal?",
        answer: "Podría ser una reacción a algún ingrediente. Suspendé su uso y consultá a tu médico o dermatólogo de confianza."
    },
    {
        question: "Tengo enrojecimiento frecuente en el rostro, ¿qué puede ser?",
        answer: "Podría tratarse de sensibilidad, rosácea o una reacción alérgica. En ese caso, te recomendamos consultar con un dermatólogo para recibir un diagnóstico adecuado."
    }
];
    const [openIndex, setOpenIndex] = useState<number | null>(null);


    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    return (
    <div className="flex flex-col items-center bg-background relative font-geist min-h-screen">
        <Header />
        
        <Banner />

        {/* Título */}
        <div className="flex flex-col w-[90%] md:w-1/2 items-center text-center mb-8 md:mb-10 px-2">
        <h1 className="text-2xl md:text-5xl font-bold text-darkblue leading-tight">
            Tenés Preguntas.<br />Nosotros Respuestas.
        </h1>

        <p className="text-sm md:text-xl text-darkblue/60 mt-2">
            Si estás perdido y no sabés por dónde empezar, no te preocupes.
            Este es el sector pensado para vos, donde reunimos las dudas más comunes.
        </p>
        </div>

        {/* Preguntas */}
        <div className="flex flex-col items-center w-full mb-10 gap-3 md:gap-4">
        {questions.map((item, index) => (
            <div
            key={index}
            className={`w-[90%] md:w-[70%] bg-rectangles rounded-2xl md:rounded-3xl text-darkblue transition-all duration-300 overflow-hidden ${
                openIndex === index
                ? "max-h-[500px] p-4 md:p-6"
                : "max-h-[70px] md:max-h-[80px] p-4 md:p-6"
            }`}
            >
            <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex justify-between items-center text-left"
            >
                <h2 className="text-sm md:text-xl font-semibold pr-2">
                {item.question}
                </h2>

                {openIndex === index ? (
                <Minus className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                <Plus className="w-5 h-5 md:w-6 md:h-6" />
                )}
            </button>

            <div
                className={`text-darkblue/80 text-sm md:text-xl mt-3 transition-all duration-300 ${
                openIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
            >
                {openIndex === index && <p>{item.answer}</p>}
            </div>
            </div>
        ))}
        </div>

        <Footer />
    </div>
    );
}


