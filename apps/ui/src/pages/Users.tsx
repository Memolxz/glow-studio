import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from '../assets/fondo.png'
import { UserRound, Mail, ChevronDown, ChevronUp } from "lucide-react";

type SkinType = {
    id: number;
    name: string;
    description: string;
};

type UserSkinType = {
    userId: number;
    skinTypeId: number;
    skinType: SkinType;
};

type User = {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
    deletedAt: Date;
    createdAt: Date;
};

export default function Users() {
        const [users, setUsers] = useState<User[]>([]);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(true);
        const [userSkinTypes, setUserSkinTypes] = useState<Record<number, UserSkinType[]>>({});



        useEffect(() => {
            fetchUsers();
        }, []);


        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:8000/users");
            if (!response.ok) throw new Error("Error al cargar usuarios");
            const result = await response.json();
            if (!result.ok) throw new Error("Error en la respuesta del servidor");
            setUsers(result.data);
          } catch (err) {
            console.error("Error fetching users:", err);
            setError("Error al cargar usuarios");
          } finally {
            setLoading(false);
          }
        };

        const [openIndex, setOpenIndex] = useState<number | null>(null);
        const toggleUserSkinTypes = async (userId: number, index: number) => {
          setOpenIndex(openIndex === index ? null : index);

          // Si ya los tenemos cargados, no hacemos fetch de nuevo
          if (userSkinTypes[userId]) return;

          try {
            const response = await fetch(`http://localhost:8000/users/skintype/${userId}`);
            if (!response.ok) throw new Error("Error al cargar tipos de piel");
            const result = await response.json();
            if (result.ok) {
              setUserSkinTypes(prev => ({ ...prev, [userId]: result.data }));
            } else {
              setUserSkinTypes(prev => ({ ...prev, [userId]: [] }));
            }
          } catch (error) {
            console.error("Error fetching skin types:", error);
            setUserSkinTypes(prev => ({ ...prev, [userId]: [] }));
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
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-[90%]">
                  <h2 className="text-4xl font-bold text-start text-darkblue mb-6">Usuarios</h2>
                  <div className="flex flex-col items-center justify-center w-full">
                    {users.map((user, index) => (
                      <div
                        key={user.id}
                        className="relative flex flex-col justify-between items-center p-6 rounded-2xl bg-[#E2EFEF] my-5 w-full"
                      >
                      <div className='w-full flex flex-row'>
                          <div className='bg-darkblue rounded-full h-16 w-16 text-white flex justify-center items-center mr-5'>
                              <UserRound className='h-9 w-9' strokeWidth={1.5}/>
                          </div>
                          <div className='flex flex-col'>
                              <h2 className="text-4xl font-bold text-darkblue font-geist">{user?.name}</h2>
                              <div className='w-full flex flex-row justify-start items-center'>
                                  <Mail className="h-4 w-4 text-darkblue/60 mr-1" />
                                  <p className="text-md text-darkblue/60 font-geist">{user?.email}</p>
                              </div>
                          </div>
                          <div className="absolute top-5 right-5 flex flex-col justify-end items-end">
                            <p
                              className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                                user.isAdmin
                                  ? "bg-green-200 text-green-800"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              {user.isAdmin ? "Administrador" : "Usuario"}
                            </p>
                            <button
                              className="h-6 w-6 text-darkblue"
                              onClick={() => toggleUserSkinTypes(user.id, index)}
                            >
                              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                            </button>
                          </div>
                          {openIndex === index && (
                          <div className="mt-4 w-full flex flex-wrap gap-2">
                            {userSkinTypes[user.id] && userSkinTypes[user.id].length > 0 ? (
                              userSkinTypes[user.id].map((ust) => (
                                <div key={ust.skinTypeId} className="bg-darkblue text-white px-3 py-1 rounded-full text-sm">
                                  {ust.skinType.name}
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 italic">No ha seleccionado tipos de piel</p>
                            )}
                          </div>
                        )}

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




