import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RegisterResponse {
  ok: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
  mensaje?: string;
}

export default function RegisterForm({ onToggle }: { onToggle: () => void }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

        const data: RegisterResponse = await response.json();

        if (response.ok && data.ok && data.data) {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            
            navigate("/selection");
        } else {
            setError(data.mensaje || "Error al crear la cuenta");
        }
        } catch (error) {
            console.error("Register error:", error);
            setError("Error de conexión. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-transparent">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-3xl font-bold font-geist text-darkblue">
                    Registrarse
                </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Nombre Completo"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-darkblue font-geist
                            border-0
                            placeholder:text-darkblue
                            focus:outline-none focus:ring-2 focus:ring-darkblue"
                        />
                    </div>
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-darkblue font-geist
                            border-0
                            placeholder:text-darkblue
                            focus:outline-none focus:ring-2 focus:ring-darkblue"
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-darkblue font-geist
                            border-0
                            placeholder:text-darkblue
                            focus:outline-none focus:ring-2 focus:ring-darkblue"
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center">
                        {error}
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 rounded-full bg-transparent px-4 py-2 border-2 border-darkblue
                            text font-semibold text-darkblue font-geist
                            hover:bg-darkblue hover:text-white transition
                            focus:outline-none focus:ring-2 focus:ring-darkblue"
                        >
                            {loading ? "Creando..." : "Crear Cuenta"}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm font-geist text-darkblue">
                    ¿Ya tenés una cuenta?{' '}
                    <button onClick={onToggle} className="font-bold font-geist text-darkblue hover:text-hovertext">
                        ¡Iniciá Sesión!
                    </button>
                </p>
            </div>
        </div>
    );
}
