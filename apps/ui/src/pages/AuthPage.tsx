import { useState } from 'react';
import ImgSlider from '../components/ImgSlider';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center bg-white min-h-screen">
            <div>
                <h2 className="flex-col mb-16 mt-16 text-5xl font-bold font-inter text-warmgray">GLOW STUDIO</h2>
            </div>
            <div className="relative flex w-[90%] overflow-hidden rounded-3xl shadow-lg bg-defaultbg">
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
        </div>
    );
}
