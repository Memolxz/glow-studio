import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SkinSelection() {
    const skinTypes = [
        { label: "Acne-Prone", desc: "Prone to breakouts and blemishes." },
        { label: "Dry Skin", desc: "Lacks moisture, often rough or flaky." },
        { label: "Oily Skin", desc: "Excess sebum and shine." },
        { label: "Hyperpigmentation", desc: "Dark spots or uneven tone." },
        { label: "Aging Skin", desc: "Fine lines, wrinkles, loss of firmness." },
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
        <div className="min-h-screen flex flex-col items-center bg-defaultbg font-inter py-16">
        <h1 className="text-4xl font-bold text-darkblue mb-12 text-center">
            Choose Your Skin Condition(s)
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
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
                className="flex flex-col items-center justify-center w-40 h-40 border border-gray-200 bg-defaultbg rounded-xl shadow-sm 
                            hover:shadow-lg cursor-pointer transition 
                            peer-checked:border-blue-600 peer-checked:bg-defaultbg peer-checked:shadow-md"
                >
                <p className="text-center text-sm font-medium text-darkblue">
                    {type.label}
                </p>
                <p className="mt-1 text-center text-xs text-rectangles">{type.desc}</p>
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
                ? "border-rectangles text-rectangles cursor-not-allowed bg-transparent"
                : "border-rectangles text-rectangles hover:bg-rectangles hover:text-defaultbg cursor-pointer transition"
            }`}
        >
            Continue
        </button>
        </div>
    );
}
