import { useState } from 'react';
import ImgSlider from '../components/ImgSlider';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center bg-defaultbg min-h-screen">
            <div className="relative flex w-[90%] h-[550px] overflow-hidden rounded-3xl mt-5 mb-4 bg-rectangles">
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
