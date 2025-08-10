import img from '../assets/modelo.png';

export default function ImgSlider() {
    return (
        <div className="w-full h-full">
            <img
                src={img}
                alt="login"
                className="w-full h-full object-cover shadow-xl rounded-3xl"
            />
        </div>
    );
}
