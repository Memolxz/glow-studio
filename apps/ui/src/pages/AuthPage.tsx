import { useState } from 'react';
import ImgSlider from '../components/ImgSlider';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center bg-white min-h-screen">
                <div className="mt-10 mx-auto py-3 flex items-center font-inter text-warmgray">
                    <h1 className="flex-1 text-center text-5xl font-bold tracking-wide text-inherit">
                    GLOW STUDIO
                    </h1>
                    <div className="w-4 h-4 bg-warmgray rounded-full ml-4"></div>
                    <h1 className="flex-1 text-center text-5xl ml-4 font-bold tracking-wide text-inherit">
                    GLOW STUDIO
                    </h1>
                    <div className="w-4 h-4 bg-warmgray rounded-full ml-4"></div>
                    <h1 className="flex-1 text-center text-5xl ml-4 font-bold tracking-wide text-inherit">
                    GLOW STUDIO
                    </h1>
                    
                </div>
            
            <div className="relative flex w-[90%] h-[450px] overflow-hidden rounded-3xl mt-5 mb-4 bg-defaultbg">
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
