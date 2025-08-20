import serum1 from "../assets/serum1.png";
import toner1 from "../assets/toner1.png";
import cleanser1 from "../assets/cleanser1.png";
import lotion1 from "../assets/lotion1.png";
import sunscreen1 from "../assets/sunscreen1.png";
import mask1 from "../assets/mask1.png";
import moisturizer1 from "../assets/moisturizer1.png";
import exfoliant1 from "../assets/exfoliant1.png";
import essence1 from "../assets/essence1.png";
import Footer from "../components/Footer";

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
        <div className="min-h-screen flex flex-col bg-white px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-warmdarkgray">
            Recommended Products for You
        </h1>

        {categories.map((cat) => {
            const filtered = products.filter(
            (p) => p.category.toLowerCase() === cat
            );

            if (filtered.length === 0) return null;

            return (
            <div key={cat} className="mb-10">
                <h2 className="text-2xl text-warmdarkgray font-semibold capitalize mb-4">{cat}</h2>
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {filtered.map((product) => (
                    <div
                    key={product.id}
                    className="flex-shrink-0 w-40 rounded-xl bg-defaultbg
                                p-3 shadow-sm hover:shadow-lg transition"
                    >
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-t-xl"
                    />
                    <p className="text-center p-2 text-sm font-medium text-warmgray">
                        {product.name}
                    </p>
                    </div>
                ))}
                </div>
            </div>
            );
        })}
        <Footer />
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
    ];

    return <ProductRecommendations products={products} />;
}
