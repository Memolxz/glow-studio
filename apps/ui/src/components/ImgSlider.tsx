import img from '../assets/modelo20.jpg';

export default function ImgSlider() {
    return (
        <div className="w-full h-full">
            <img
                src={img}
                alt="login"
                className="w-full h-[550px] object-cover shadow-xl rounded-3xl"
            />
        </div>
    );
}
