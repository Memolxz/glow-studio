import { useState } from 'react';
import ImgSlider from '../components/ImgSlider';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center bg-white min-h-screen">
            <header className="w-full absolute top-14 left-0 z-50 bg-transparent">
                <div className="max-w-[1100px] mx-auto py-3 flex items-center font-inter text-warmgray">
                    <h1 className="flex-1 text-center text-4xl ml-6 font-bold tracking-wide text-inherit">
                    GLOW STUDIO
                    </h1>
                </div>
            </header>
            
            <div className="relative flex w-[90%] h-[450px] overflow-hidden rounded-3xl mt-9 mb-4 bg-defaultbg">
                <div
                    className={`absolute top-0 h-full w-1/2 transition-all duration-700 z-20 ${
                        isLogin ? 'left-0' : 'left-1/2'
                    }`}
                    >
                    <ImgSlider />
                </div>

                <div className="flex w-full h-full z-10">
                    <div className="w-1/2 flex items-center justify-center">
                        <RegisterForm onToggle={() => setIsLogin(true)} />
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <LoginForm onToggle={() => setIsLogin(false)} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
