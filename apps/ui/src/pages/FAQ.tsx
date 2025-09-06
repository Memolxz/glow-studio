export default function FAQ() {
    const items = [
        { icon: "🎚", title: "My Account and Subscriptions" },
        { icon: "💈", title: "About Keeps" },
        { icon: "🚚", title: "Orders and Shipping" },
        { icon: "🩺", title: "Medical Care" },
        { icon: "🧑‍🦲", title: "Hair Loss" },
        { icon: "🧑‍⚕️", title: "Keeps Hair Restoration" },
        { icon: "🧴", title: "Our Products" },
        { icon: "📦", title: "Other Questions" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center bg-defaultbg">
        <div
            className="w-full h-[450px] bg-cover bg-center relative flex flex-col items-center justify-center"
            style={{
            backgroundImage: "url('/images/fondo1.png')"
            }}
        >
            <div className="absolute inset-0 bg-black/20"></div>

            <h1 className="relative z-10 text-5xl mt-96 mb-20 font-bold text-center text-white">
            Tenes Preguntas.<br />Nosotros Respuestas.
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 z-10">
                {items.map((item, idx) => (
                <div
                    key={idx}
                    className="flex flex-col items-center justify-center w-40 h-40 border border-gray-200 bg-defaultbg rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition"
                >
                    <div className="text-4xl">{item.icon}</div>
                    <p className="mt-4 text-center text-sm font-medium text-gray-700">
                    {item.title}
                    </p>
            </div>
            ))}
        </div>
        </div>
        </div>
    );
}
