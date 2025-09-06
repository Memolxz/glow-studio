import serum1 from "../assets/producto1.png";
import toner1 from "../assets/producto2.png";
import cleanser1 from "../assets/producto3.png";
import lotion1 from "../assets/producto1.png";
import sunscreen1 from "../assets/producto2.png";
import mask1 from "../assets/producto3.png";
import moisturizer1 from "../assets/producto1.png";
import exfoliant1 from "../assets/producto2.png";
import essence1 from "../assets/producto3.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/modelo11.jpg"

type Product = {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
};

const categories = [
    "serum",
    "toner",
    "cleanser",
    "lotion",
    "sunscreen",
    "mask",
    "moisturizer",
    "exfoliant",
    "essence",
];

function ProductRecommendations({products}: {products: Product[]}) {
    return (
        <div className="bg-white relative font-inter">
            <div className="flex flex-col items-center">
                <Header />
                <div className="w-[90%] py-10 -mt-22">
                    <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                        <img
                            src={img1}
                            alt="Rhode"
                            className="w-full object-cover"
                        />
                    </div>
                </div>

            <div className="items-start justify-start w-[90%]">
            <h1 className="text-4xl font-bold mb-8 text-start text-darkblue">
                Recommended Products for You
            </h1>
                {categories.map((cat) => {
                    const filtered = products.filter(
                    (p) => p.category.toLowerCase() === cat
                    );

                    if (filtered.length === 0) return null;

                    return (
                    <div key={cat} className="mb-10">
                        <h2 className="text-2xl text-darkblue font-semibold capitalize mb-4">{cat}</h2>
                        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                            {filtered.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col justify-between items-center 
                                            w-[250px] h-[320px] p-6 rounded-2xl bg-rectangles 
                                            shadow-sm hover:shadow-lg transition">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-auto h-[85%] object-contain rounded-t-xl"
                                />
                                <p className="text-center p-2 text-sm font-semibold text-darkblue">
                                    {product.name}
                                </p>
                            </div>
                            ))}
                        </div>
                    </div>
                    );
                })}
            </div>
            <Footer />
            </div>
        </div>
    );
}

export default function RecommendationsPage() {
    const products = [
        { id: 1, name: "Hydrating Serum", imageUrl: serum1, category: "serum" },
        { id: 2, name: "Gentle Toner", imageUrl: toner1, category: "toner" },
        { id: 3, name: "Foaming Cleanser", imageUrl: cleanser1, category: "cleanser" },
        { id: 4, name: "Soothing Lotion", imageUrl: lotion1, category: "lotion" },
        { id: 5, name: "SPF 50 Sunscreen", imageUrl: sunscreen1, category: "sunscreen" },
        { id: 6, name: "Hydrating Mask", imageUrl: mask1, category: "mask" },
        { id: 7, name: "Moisturizing Cream", imageUrl: moisturizer1, category: "moisturizer" },
        { id: 8, name: "Exfoliating Scrub", imageUrl: exfoliant1, category: "exfoliant" },
        { id: 9, name: "Brightening Essence", imageUrl: essence1, category: "essence" },
        { id: 1, name: "Hydrating Serum", imageUrl: serum1, category: "serum" },
        { id: 2, name: "Gentle Toner", imageUrl: toner1, category: "toner" },
        { id: 3, name: "Foaming Cleanser", imageUrl: cleanser1, category: "cleanser" },
        { id: 4, name: "Soothing Lotion", imageUrl: lotion1, category: "lotion" },
        { id: 5, name: "SPF 50 Sunscreen", imageUrl: sunscreen1, category: "sunscreen" },
        { id: 6, name: "Hydrating Mask", imageUrl: mask1, category: "mask" },
        { id: 7, name: "Moisturizing Cream", imageUrl: moisturizer1, category: "moisturizer" },
        { id: 8, name: "Exfoliating Scrub", imageUrl: exfoliant1, category: "exfoliant" },
        { id: 9, name: "Brightening Essence", imageUrl: essence1, category: "essence" },
        { id: 1, name: "Hydrating Serum", imageUrl: serum1, category: "serum" },
        { id: 2, name: "Gentle Toner", imageUrl: toner1, category: "toner" },
        { id: 3, name: "Foaming Cleanser", imageUrl: cleanser1, category: "cleanser" },
        { id: 4, name: "Soothing Lotion", imageUrl: lotion1, category: "lotion" },
        { id: 5, name: "SPF 50 Sunscreen", imageUrl: sunscreen1, category: "sunscreen" },
        { id: 6, name: "Hydrating Mask", imageUrl: mask1, category: "mask" },
        { id: 7, name: "Moisturizing Cream", imageUrl: moisturizer1, category: "moisturizer" },
        { id: 8, name: "Exfoliating Scrub", imageUrl: exfoliant1, category: "exfoliant" },
        { id: 9, name: "Brightening Essence", imageUrl: essence1, category: "essence" },
        { id: 1, name: "Hydrating Serum", imageUrl: serum1, category: "serum" },
        { id: 2, name: "Gentle Toner", imageUrl: toner1, category: "toner" },
        { id: 3, name: "Foaming Cleanser", imageUrl: cleanser1, category: "cleanser" },
        { id: 4, name: "Soothing Lotion", imageUrl: lotion1, category: "lotion" },
        { id: 5, name: "SPF 50 Sunscreen", imageUrl: sunscreen1, category: "sunscreen" },
        { id: 6, name: "Hydrating Mask", imageUrl: mask1, category: "mask" },
        { id: 7, name: "Moisturizing Cream", imageUrl: moisturizer1, category: "moisturizer" },
        { id: 8, name: "Exfoliating Scrub", imageUrl: exfoliant1, category: "exfoliant" },
        { id: 9, name: "Brightening Essence", imageUrl: essence1, category: "essence" },
        { id: 1, name: "Hydrating Serum", imageUrl: serum1, category: "serum" },
        { id: 2, name: "Gentle Toner", imageUrl: toner1, category: "toner" },
        { id: 3, name: "Foaming Cleanser", imageUrl: cleanser1, category: "cleanser" },
        { id: 4, name: "Soothing Lotion", imageUrl: lotion1, category: "lotion" },
        { id: 5, name: "SPF 50 Sunscreen", imageUrl: sunscreen1, category: "sunscreen" },
        { id: 6, name: "Hydrating Mask", imageUrl: mask1, category: "mask" },
        { id: 7, name: "Moisturizing Cream", imageUrl: moisturizer1, category: "moisturizer" },
        { id: 8, name: "Exfoliating Scrub", imageUrl: exfoliant1, category: "exfoliant" },
        { id: 9, name: "Brightening Essence", imageUrl: essence1, category: "essence" },
    ];

    return <ProductRecommendations products={products} />;
}
