import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SkinSelection() {
    const skinTypes = [
        { label: "Piel Acnéica", desc: "Propensa a brotes y manchas." },
        { label: "Piel Seca", desc: "Carece de humectación y suele estar áspera o escamosa." },
        { label: "Piel Oleósa", desc: "Exceso de sebo y brillo." },
        { label: "Hiperpigmentación", desc: "Manchas oscuras o tono desigual." },
        { label: "Piel Envejecida", desc: "Líneas finas, arrugas, pérdida de firmeza." },
    ];

    const [selected, setSelected] = useState<string[]>([]);
    const navigate = useNavigate();

    const toggleSelect = (label: string) => {
        setSelected((prev) =>
        prev.includes(label)
            ? prev.filter((item) => item !== label)
            : [...prev, label]
        );
    };

    const handleContinue = async () => {
        try {
        // // send selected skin types to backend
        // const res = await fetch("/api/skin-selection", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ selectedSkinTypes: selected }),
        // });

        // if (!res.ok) throw new Error("Failed to submit selection");

        // navigate after success
        navigate("/recommendations");
        } catch (error) {
        alert("Error sending selection, please try again.");
        console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-background">
        <div
            className="w-full h-[450px] bg-cover bg-center relative flex flex-col items-center justify-center"
            style={{
            backgroundImage: "url('/images/selection-banner.jpg')"
            }}
        >
            <div className="absolute inset-0 bg-black/20"></div>

            <h1 className="relative z-10 text-5xl mt-48 mb-20 font-bold font-inter text-center text-white">
            Elegí tu(s) tipo(s) de piel
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-12 w-[72%] z-10">
                {skinTypes.map((type, idx) => (
                <div key={idx}>
                    <input
                    type="checkbox"
                    id={`skin-${type.label}`}
                    value={type.label.toLowerCase()}
                    className="hidden peer"
                    checked={selected.includes(type.label)}
                    onChange={() => toggleSelect(type.label)}
                    />
                    <label
                    htmlFor={`skin-${type.label}`}
                    className="flex flex-col items-center justify-center w-40 h-40 border border-gray-200 bg-white rounded-xl shadow-sm 
                                hover:shadow-lg cursor-pointer transition-transform hover:scale-105 z-10
                                peer-checked:bg-gray-300 peer-checked:border-gray-300"
                    >
                    <p className="text-center text-md font-inter font-semibold text-darkblue">
                        {type.label}
                    </p>
                    <p className="mt-1 text-center font-inter text-xs text-darkblue w-[85%]">{type.desc}</p>
                    </label>
                </div>
                ))}
            </div>

            <button
                disabled={selected.length === 0}
                onClick={handleContinue}
                className={`rounded-full px-4 py-2 border-2 text-base font-semibold font-inter
                ${
                    selected.length === 0
                    ? "border-darkblue text-darkblue cursor-not-allowed bg-white"
                    : "border-darkblue text-darkblue hover:bg-darkblue hover:text-white cursor-pointer transition"
                }`}
            >
                Continuar
            </button>
        </div>
        </div>
    );
}
