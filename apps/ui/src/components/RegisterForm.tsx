import { useNavigate } from "react-router-dom";

export default function RegisterForm({ onToggle }: { onToggle: () => void }) {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-transparent">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-3xl font-bold font-inter text-darkblue">
                    Registrarse
                </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6" 
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/selection");
                }}>
                    <div>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Nombre Completo"
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-darkblue font-inter
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
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-darkblue font-inter
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
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-darkblue font-inter
                            border-0
                            placeholder:text-darkblue
                            focus:outline-none focus:ring-2 focus:ring-darkblue"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 rounded-full bg-transparent px-4 py-2 border-2 border-darkblue
                            text font-semibold text-darkblue font-inter
                            hover:bg-darkblue hover:text-white transition
                            focus:outline-none focus:ring-2 focus:ring-darkblue"
                        >
                            Crear Cuenta
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm font-inter text-darkblue">
                    ¿Ya tenés una cuenta?{' '}
                    <button onClick={onToggle} className="font-bold font-inter text-darkblue hover:text-hovertext">
                        ¡Iniciá Sesión!
                    </button>
                </p>
            </div>
        </div>
    );
}
