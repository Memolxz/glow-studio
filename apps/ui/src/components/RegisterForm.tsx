export default function RegisterForm({ onToggle }: { onToggle: () => void }) {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-transparent">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-3xl font-thin font-inter text-warmgray">
                    REGISTRATE
                </h2>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="nombre completo"
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-warmgray font-inter
                            border-0
                            placeholder:text-warmgray
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                        />
                    </div>

                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="email"
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-warmgray font-inter
                            border-0
                            placeholder:text-warmgray
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                        />
                    </div>

                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            placeholder="contraseña"
                            className="block w-full rounded-full bg-white px-10 py-3
                            text-base text-warmgray font-inter
                            border-0
                            placeholder:text-warmgray
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 rounded-full bg-transparent px-4 py-2 border-2 border-warmgray
                            text-base font-semibold text-warmgray font-inter
                            hover:bg-warmgray hover:text-defaultbg transition
                            focus:outline-none focus:ring-2 focus:ring-warmgray"
                        >
                            CREAR CUENTA
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm font-inter text-warmgray">
                    ¿Ya tenés una cuenta?{' '}
                    <button onClick={onToggle} className="font-bold font-inter text-warmgray hover:text-warmdarkgray">
                        ¡Iniciá Sesión!
                    </button>
                </p>
            </div>
        </div>
    );
}
