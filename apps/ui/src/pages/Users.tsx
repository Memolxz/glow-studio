import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/fondo.png";
import { UserRound, Mail, ChevronDown, ChevronUp, Droplet, Trash2, X, RotateCcw } from "lucide-react";

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
  deletedAt: Date | string | null;
  createdAt: Date | string | null;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userSkinTypes, setUserSkinTypes] = useState<Record<number, UserSkinType[]>>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isDeleteUserAccountOpen, setIsDeleteUserAccountOpen] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [isRestoreUserAccountOpen, setIsRestoreUserAccountOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchUsers()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
        
      if (!token) {
        window.location.href = "/register";
        return;
      }

      const response = await fetch("http://localhost:8000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });;
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const result = await response.json();
      if (!result.ok) throw new Error("Error en la respuesta del servidor");
      setUsers(result.data.filter((u: User) => !u.deletedAt));

      const response2 = await fetch("http://localhost:8000/users/deleted", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });;;
      if (!response2.ok) throw new Error("Error al cargar usuarios eliminados");
      const result2 = await response2.json();
      if (!result2.ok) throw new Error("Error en la respuesta del servidor");
      setDeletedUsers(result2.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error al cargar usuarios");
    }
  };

  const toggleUserSkinTypes = async (userId: number, index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    if (userSkinTypes[userId]) return;

    try {
      const token = localStorage.getItem("accessToken");
        
      if (!token) {
        window.location.href = "/register";
        return;
      }

      const response = await fetch(`http://localhost:8000/users/skintype/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });;;
      if (!response.ok) throw new Error("Error al cargar tipos de piel");
      const result = await response.json();
      setUserSkinTypes((prev) => ({ ...prev, [userId]: result.ok ? result.data : [] }));
    } catch (err) {
      console.error("Error fetching skin types:", err);
      setUserSkinTypes((prev) => ({ ...prev, [userId]: [] }));
    }
  };

  const handleDeleteUserAccount = async () => {
    if (!selectedUserId) return;
    setDeleting(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/users/${selectedUserId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const deletedUser = users.find((u) => u.id === selectedUserId);
        if (deletedUser) {
          setDeletedUsers((prev) => [...prev, { ...deletedUser, deletedAt: new Date() }]);
          setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
        }
        setIsDeleteUserAccountOpen(false);
        setSelectedUserId(null);
      } else {
        throw new Error("Error al eliminar cuenta");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Error al eliminar la cuenta");
    } finally {
      setDeleting(false);
    }
  };


  const handleRestoreUserAccount = async () => {
    if (!selectedUserId) return;
    setRestoring(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:8000/users/restore/${selectedUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

    if (response.ok) {
          // Buscamos al usuario en deletedUsers
          const restoredUser = deletedUsers.find((u) => u.id === selectedUserId);
          if (restoredUser) {
            setUsers((prev) => [...prev, { ...restoredUser, deletedAt: null }]);
            setDeletedUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
          }

          setIsRestoreUserAccountOpen(false);
          setSelectedUserId(null);
        } else {
          throw new Error("Error al restaurar la cuenta");
        }
      } catch (err) {
        console.error("Error restoring account:", err);
        setError("Error al restaurar la cuenta");
      } finally {
        setRestoring(false);
      }
    };

  if (loading) {
    return (
    <div className="bg-background flex flex-col justify-between items-center relative font-geist min-h-screen">
      <Header />
      <div className="w-[90%] pt-10 pb-10">
        <div className="w-full h-24 overflow-hidden rounded-3xl relative">
          <img src={img1} alt="Agua Header" className="w-full object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
        <div className="w-[90%]">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="text-xl font-semibold text-darkblue mb-4">Cargando usuarios...</div>
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
    <div className="bg-background flex flex-col justify-between items-center relative font-geist min-h-screen">
      <Header />
      <div className="w-[90%] pt-10 pb-10">
        <div className="w-full h-24 overflow-hidden rounded-3xl relative">
          <img src={img1} alt="Agua Header" className="w-full object-cover" />
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
        <Footer />
      </div>
    );
  }

  // Vista principal
  
  return (
    <div className="bg-background flex flex-col justify-between items-center relative font-geist min-h-screen">
      <Header />
      
            <div className="w-[90%] pt-10 pb-5">
                <div className="w-full sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl relative">
                    <img
                        src={img1}
                        alt="Rhode"
                        className="w-full object-cover"
                    />
                </div>
            </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-[90%]">
          <h2 className="text-4xl font-bold text-start text-darkblue">Usuarios</h2>
                <p className="text-xl font-normal text-start text-darkblue/60">
                    Todos los usuarios activos con sus tipos de piel
                </p>
                <div className="border-b border-darkblue/60 mt-5 w-full"></div>

          {/* Usuarios activos */}
          <div className="flex flex-col items-center mb-5 justify-center w-full">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="relative flex flex-col justify-between items-center p-6 rounded-2xl bg-rectangles w-full mt-5 transition-all duration-300"
              >
                <div className="w-full flex flex-row items-center">
                  <div className="bg-darkblue rounded-full h-16 w-16 text-white flex justify-center items-center mr-5">
                    <UserRound className="h-9 w-9" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-darkblue font-geist">{user.name}</h2>
                    <div className="w-full flex flex-row justify-start items-center">
                      <Mail className="h-4 w-4 text-darkblue/60 mr-1" />
                      <p className="text-md text-darkblue/60 font-geist">{user.email}</p>
                    </div>
                    <p className="text-sm text-darkblue/60 font-geist italic">
                      Se unio el {new Date(user.createdAt!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="absolute top-5 right-5 flex flex-col justify-end items-end">
                    <p
                      className={`px-3 py-1 rounded-full text-md font-medium ${
                        user.isAdmin ? "bg-green-100 text-hovertext" : "bg-gray-200 text-hovertext"
                      }`}
                    >
                      {user.isAdmin ? "Administrador" : "Usuario"}
                    </p>
                    <button
                      className="text-darkblue hover:text-hovertext mt-2"
                      onClick={() => toggleUserSkinTypes(user.id, index)}
                    >
                      {openIndex === index ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8" />
                      )}
                    </button>
                  </div>
                </div>

                <div
                  className={`w-full transition-all flex flex-row items-center duration-500 ease-in-out overflow-hidden ${
                    openIndex === index
                      ? "max-h-[500px] opacity-100 translate-y-0 w-full mt-4"
                      : "w-full max-h-0 opacity-0 -translate-y-2"
                  }`}
                >
                  <div className="bg-[#E2EFEF] w-full flex flex-row justify-start items-center rounded-2xl p-5 mr-5">
                    <div className="w-44 flex flex-row justify-start items-center">
                      <Droplet className="text-darkblue h-5 w-5 mr-2" />
                      <h3 className="text-xl text-darkblue font-geist font-bold text-left">
                        Tipos de Piel
                      </h3>
                    </div>
                    <div className="flex flex-row flex-wrap justify-start items-center gap-3">
                      {userSkinTypes[user.id] && userSkinTypes[user.id].length > 0 ? (
                        userSkinTypes[user.id].map((ust) => (
                          <div
                            key={ust.skinTypeId}
                            className="bg-darkblue text-white px-4 py-2 rounded-full text-sm font-geist font-bold"
                          >
                            {ust.skinType.name}
                          </div>
                        ))
                      ) : (
                        <p className="ml-5 mt-2 text-md text-gray-500 text-left italic">
                          No ha seleccionado tipos de piel
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="bg-red-900 rounded-full h-16 w-16 flex justify-center items-center ml-1"
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setIsDeleteUserAccountOpen(true);
                    }}
                  >
                    <Trash2 className="text-white h-9 w-9" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Papelera */}
          {deletedUsers.length > 0 && (
            <div className="mt-10 w-full">
              <h2 className="text-4xl font-bold text-start text-darkblue">Papelera</h2>
                <p className="text-xl font-normal text-start text-darkblue/60">
                    Todos los usuarios eliminados
                </p>
                <div className="border-b border-darkblue/60 mt-5 w-full"></div>
              <div className="flex flex-col items-center mb-5 justify-center w-full opacity-80">
                {deletedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-row justify-between items-center p-6 rounded-2xl bg-gray-200 mt-5 w-full"
                  >
                    <div className="w-full flex flex-row items-center">
                      <div className="bg-gray-500 rounded-full h-16 w-16 text-white flex justify-center items-center mr-5">
                        <UserRound className="h-9 w-9" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <h2 className="text-3xl font-bold text-gray-700 font-geist">{user.name}</h2>
                        <div className="w-full flex flex-row justify-start items-center">
                          <Mail className="h-4 w-4 text-darkblue/60 mr-1" />
                          <p className="text-md text-darkblue/60 font-geist">{user.email}</p>
                        </div>
                        <p className="text-sm text-gray-400 italic">
                          Eliminado el {new Date(user.deletedAt!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-green-800 rounded-full h-10 w-10 flex justify-center items-center ml-1"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setIsRestoreUserAccountOpen(true);
                      }}
                    >
                      <RotateCcw className="text-white h-6 w-6" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal de eliminación */}
        {isDeleteUserAccountOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-[90%] relative">
              <button
                onClick={() => setIsDeleteUserAccountOpen(false)}
                className="absolute top-4 right-4"
              >
                <X size={30} className="text-darkblue hover:text-hovertext" />
              </button>
              <h1 className="text-2xl font-bold text-darkblue mb-2">¿Eliminar Usuario?</h1>
              <p className="text-darkblue/60 mb-6">
                ¿Estás seguro de que querés eliminar este usuario? Tendrás 30 días para reestablecerlo.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteUserAccount}
                  disabled={deleting}
                  className="flex-1 py-2 px-4 bg-red-900 text-white rounded-full hover:bg-red-800 transition disabled:opacity-50"
                >
                  {deleting ? "Eliminando..." : "Eliminar"}
                </button>
                <button
                  onClick={() => setIsDeleteUserAccountOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de eliminación */}
        {isRestoreUserAccountOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-[90%] relative">
              <button
                onClick={() => setIsRestoreUserAccountOpen(false)}
                className="absolute top-4 right-4"
              >
                <X size={30} className="text-darkblue hover:text-hovertext" />
              </button>
              <h1 className="text-2xl font-bold text-darkblue mb-2">¿Restaurar Usuario?</h1>
              <p className="text-darkblue/60 mb-6">
                ¿Estás seguro de que querés restaurar este usuario?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleRestoreUserAccount}
                  disabled={restoring}
                  className="flex-1 py-2 px-4 bg-green-900 text-white rounded-full hover:bg-green-800 transition disabled:opacity-50"
                >
                  {restoring ? "Restaurando..." : "Aceptar"}
                </button>
                <button
                  onClick={() => setIsRestoreUserAccountOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}