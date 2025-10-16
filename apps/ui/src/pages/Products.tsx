import { useState } from "react";
import serum1 from "../assets/producto1.png";
import toner1 from "../assets/producto2.png";
import cleanser1 from "../assets/producto3.png";
import lotion1 from "../assets/producto1.png";
import sunscreen1 from "../assets/producto2.png";
import mask1 from "../assets/producto3.png";
import moisturizer1 from "../assets/producto1.png";
import exfoliant1 from "../assets/producto2.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/modelo3.png";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Star } from "lucide-react";
import { Link } from "react-router-dom";

type Product = {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
};

const categories = [
    "serum",
    "tonificador",
    "limpiador",
    "protector solar",
    "mascarilla",
    "hidratante",
    "exfoliante",
    "tratamiento",
];

function ProductRecommendations({ products }: { products: Product[] }) {
    const sortedProducts = [...products].sort((a, b) => a.id - b.id);

    return (
        <div className="bg-white relative font-inter">
            <div className="flex flex-col items-center">
                <Header />
                <div className="w-[90%] py-10 -mt-22">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img src={img1} alt="Rhode" className="w-full object-cover" />
                </div>
                </div>

                <div className="items-start justify-start w-[90%]">
                    <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex flex-col items-start justify-start w-2/3">
                            <h1 className="text-4xl font-bold text-start text-darkblue">Productos</h1>
                            <p className="text-xl font-normal text-start text-darkblue/60">Descubre los productos que ofrecemos.</p>
                        </div>
                        <div className="flex flex-col items-end justify-center w-1/3">
                            <button className="flex flex-row items-center justify-center w-48 h-10 bg-darkblue hover:bg-hovertext text-white rounded-2xl">
                                <h1 className="text-lg font-semibold text-start mr-2">Mostrar Filtros</h1>
                                <SlidersHorizontal className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>

                    <div className="border-b border-darkblue/60 w-full my-5"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sortedProducts.map((product) => (
                        <Link
                            key={product.id + product.name}
                            to="/product"
                            className="flex flex-col justify-between items-center h-[380px] p-6 rounded-2xl bg-[#d7eaea] shadow-sm hover:shadow-lg transition group">
                            <img src={product.imageUrl} alt={product.name} className="w-auto h-[85%] object-contain rounded-t-xl group-hover:scale-105 transition-transform duration-300"/>
                            <p className="text-center p-2 text-sm font-semibold text-darkblue mt-10 hover:text-hovertext">{product.name}</p>
                            <div className="flex flex-row justify-center items-center w-full">
                                <div className="flex flex-row justify-center items-center mr-5">
                                    <Star className="h-4 w-4 text-darkblue fill-current mr-2"/>
                                    <p className="text-darkblue font-semibold text-md">4.5</p>
                                </div>
                                <p className="text-darkblue font-semibold text-md">$ 16.000</p>
                            </div>
                        </Link>))}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default function RecommendationsPage() {
    const products = [
        { id: 1, name: "Serum Hidratante", imageUrl: serum1, category: "serum" },
        { id: 2, name: "Tonificador Suave", imageUrl: toner1, category: "tonificador" },
        { id: 3, name: "Limpiador Espumante", imageUrl: cleanser1, category: "limpiador" },
        { id: 4, name: "Loción Calmante", imageUrl: lotion1, category: "tratamiento" },
        { id: 5, name: "Protector Solar SPF 50", imageUrl: sunscreen1, category: "protector solar" },
        { id: 6, name: "Mascarilla Hidratante", imageUrl: mask1, category: "mascarilla" },
        { id: 7, name: "Crema Hidratante", imageUrl: moisturizer1, category: "hidratante" },
        { id: 8, name: "Exfoliante", imageUrl: exfoliant1, category: "exfoliante" },
    ];

    return <ProductRecommendations products={products} />;
}
