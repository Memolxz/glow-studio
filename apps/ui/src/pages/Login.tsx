import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
import Footer from "../components/Footer"

const Home = () => {
    return (
        <>
        <Header />
        <main className="flex flex-col items-center mt-8 gap-8 px-4">
            <section className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
            <img src="/assets/modelo.png" alt="modelo" className="w-full md:w-1/2 rounded-lg object-cover" />
            <LoginForm />
            </section>
        </main>
        <Footer />
        </>
    )
}

export default Home;
