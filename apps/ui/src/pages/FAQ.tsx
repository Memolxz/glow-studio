import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import img1 from '../assets/fondo.png'


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
        <div className="flex flex-col items-center bg-background relative font-geist">
        <Header />


        {/* Header visual superior */}
            <div className="w-[90%] pt-10 pb-10">
                <div className="w-full h-24 overflow-hidden rounded-3xl relative">
                    <img
                        src={img1}
                        alt="Rhode"
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>


        {/* Título principal */}
        <div className="flex flex-col w-1/2 bg-background justify-center items-center text-center mb-10">
            <h1 className="text-5xl font-bold text-darkblue leading-tight">
            Tenés Preguntas.<br />Nosotros Respuestas.
            </h1>
            <p className="text-xl font-normal text-darkblue/60 my-2">
            Si estás perdido y no sabés por dónde empezar, no te preocupes.  
            Este es el sector pensado para vos, donde reunimos las dudas más comunes.
            </p>
        </div>


        {/* Contenedor de preguntas */}
        <div className="flex flex-col items-center w-full mb-10 gap-4">
            {questions.map((item, index) => (
            <div
                key={index}
                className={`w-[70%] bg-rectangles rounded-3xl text-darkblue transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-[500px] p-6" : "max-h-[80px] p-6"
                }`}
            >
                <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex justify-between items-center text-left"
                >
                <h2 className="text-xl font-semibold">{item.question}</h2>
                {openIndex === index ? (
                    <Minus className="w-6 h-6 text-darkblue" />
                ) : (
                    <Plus className="w-6 h-6 text-darkblue" />
                )}
                </button>


                <div
                className={`text-darkblue/80 text-xl mt-3 transition-all duration-300 ${
                    openIndex === index ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
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


