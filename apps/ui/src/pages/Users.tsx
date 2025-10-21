import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from '../assets/fondo.png'


type User = {
    id: number;
    name: string;
    brand: string;
    description: string;
    rating: number | null;
    officialUrl: string;
    imageUrl: string | null;
    price: string | null;
    category: string;
};




export default function Users() {
        const [users, setUsers] = useState<User[]>([]);
        const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(true);


        useEffect(() => {
            fetchUsers();
        }, []);


        const fetchUsers = async () => {
            try {
            const response = await fetch("http://localhost:8000/users");
            if (!response.ok) throw new Error("Error al cargar usuarios");
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
            } catch (err) {
            console.error("Error fetching users:", err);
            setError("Error al cargar usuarios");
            } finally {
            setLoading(false);
            }
        };


        // Estado de carga
        if (loading) {
            return (
            <div className="bg-background relative font-geist flex flex-col justify-center items-center">
                <Header />
                <div className="w-[90%] pt-10 pb-10">
                    <div className="w-full h-24 overflow-hidden rounded-3xl relative">
                        <img
                            src={img1}
                            alt="Agua Header"
                            className="w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                </div>
                <div className="w-[90%] pt-10 pb-10">
                <div className="w-full h-24 overflow-hidden rounded-3xl relative">
                    <img
                        src={img1}
                        alt="Agua Header"
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>
                <div className="w-[90%]">
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="text-xl font-semibold text-darkblue mb-4">
                        Cargando usuarios...
                        </div>
                        <div className="w-8 h-8 border-4 border-darkblue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
                <Footer />
            </div>
            );
        }


        // Estado de error
        if (error) {
            return (
            <div className="bg-background relative flex flex-col justify-between items-center font-geist min-h-screen">
                <Header />
                <div className="w-[90%] pt-10 pb-10">
                    <div className="w-full h-24 overflow-hidden rounded-3xl relative">
                        <img
                            src={img1}
                            alt="Agua Header"
                            className="w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">


                    <div className="w-[90%]">
                        <div className="flex flex-col items-center justify-center py-10">
                            <div className="text-xl font-semibold text-red-600 mb-4">{error}</div>
                            <button
                            onClick={fetchUsers}
                            className="px-6 py-2 bg-darkblue text-white rounded-full hover:bg-hovertext transition"
                            >
                            Reintentar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <Footer />
                </div>
            </div>
            );
        }


        // Vista principal
        return (
            <div className="bg-background flex flex-col justify-center items-center relative font-geist min-h-screen">
            <Header />
            <div className="w-[90%] pt-10 pb-10">
                <div className="w-full h-24 overflow-hidden rounded-3xl relative">
                    <img
                        src={img1}
                        alt="Agua Header"
                        className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="items-start justify-start w-[90%] mb-10">


                {/* Grid de usuarios */}
                <div className="border-b border-darkblue/60 w-full my-5"></div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {users.map((user) => (
                    <div
                        className="relative flex flex-col group justify-between items-center h-96 p-6 rounded-2xl bg-[#E2EFEF] shadow-sm hover:shadow-lg transition group"
                    >
                        <p className="text-center p-2 text-sm font-semibold text-darkblue group-hover:text-hovertext">
                        {user.name}
                        </p>
                        <div className="flex flex-row justify-center items-center w-full mt-2">
                            <div className="h-1 w-1 bg-darkblue rounded-full mx-2"></div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                <Footer />
            </div>
            </div>
    );
}




