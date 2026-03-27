import { useState } from 'react';
import ImgSlider from '../components/ImgSlider';
import ImgSliderVertical from '../components/ImgSliderVertical';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center bg-defaultbg min-h-screen">

            {/* DESKTOP / TABLET */}
            <div className="hidden sm:flex relative w-[90%] h-[550px] overflow-hidden rounded-3xl mt-5 mb-4 bg-rectangles">
            
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

            {/* MOBILE */}
            <div className="flex sm:hidden w-full min-h-screen flex-col items-center">

                <div className="relative w-[90%] h-[620px] md:h-[550px] overflow-hidden rounded-3xl mt-5 mb-4 py-2 md:py-10 bg-rectangles">

                    <div
                        className={`absolute top-0 h-1/2 w-full transition-all duration-700 z-20 ${
                            isLogin ? 'top-0' : 'top-1/2'
                        }`}
                    >
                        <ImgSliderVertical />
                    </div>

                    <div className="flex flex-col w-full h-full z-10">
                        <div className="w-full h-1/2 flex items-center justify-center">
                            <RegisterForm onToggle={() => setIsLogin(true)} />
                        </div>
                        <div className=" w-full h-1/2 flex items-center justify-center">
                            <LoginForm onToggle={() => setIsLogin(false)} />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}