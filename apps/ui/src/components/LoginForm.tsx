const LoginForm = () => {
    return (
        <div className="bg-gray-100 p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">INICIA SESIÓN</h2>
        <form className="flex flex-col gap-4">
            <input type="email" placeholder="email" className="p-2 rounded-full border border-gray-300" />
            <input type="password" placeholder="contraseña" className="p-2 rounded-full border border-gray-300" />
            <button className="p-2 border border-gray-400 rounded-full hover:bg-gray-200">INICIAR</button>
        </form>
        <p className="text-center text-xs mt-4">¿No tenés una cuenta? <a className="underline" href="#">Suscribite!</a></p>
        </div>
    )
}

export default LoginForm;
