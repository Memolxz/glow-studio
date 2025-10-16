import { Star, SquareArrowOutUpRight, ChevronLeft, MessageCircle, UserRound, StarHalf } from "lucide-react"
import img1 from "../assets/producto1.png"
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
export default function Product() {
  return(
    <div className="flex flex-col justify-center items-center bg-background w-full">
      <div className="flex flex-row justify-center items-center bg-rectangles w-[90%] rounded-3xl h-full mt-10">
        <div className="flex flex-col justify-center items-center bg-[#E2EFEF] w-1/2 h-full rounded-2xl p-10 relative">
          <Link to="/products">
            <ChevronLeft className="absolute top-5 left-5 text-darkblue h-10 w-10 z-10"/>
          </Link>
          <div className="absolute top-5 right-5 bg-darkblue/60 text-white font-semibold px-3 h-8 flex items-center rounded-2xl">
            <p>Categoría</p>
          </div>
          <img
            src={img1}
            alt="producto"
            className="h-[350px] object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col items-start bg-transparent w-1/2 p-10">
          <h1 className="text-start font-bold text-darkblue text-3xl">Nombre Producto</h1>
          <p className="text-start text-darkblue font-normal text-md mr-10 mt-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae alias totam non suscipit accusantium, cum, laborum quo labore, quae eaque esse!</p>
          <p className="text-start text-darkblue font-normal text-md mt-5"><strong>Marca: </strong>L'Oreal</p>
          <div className="flex flex-row justify-start items-center bg-transparent w-full my-5">
            <Star className="h-5 w-5 text-darkblue fill-current" />
            <Star className="h-5 w-5 text-darkblue fill-current" />
            <Star className="h-5 w-5 text-darkblue fill-current" />
            <div className="relative h-5 w-5">
              <Star className="absolute h-5 w-5 text-darkblue" />
              <StarHalf className="absolute h-5 w-5 text-darkblue fill-current" />
            </div>
            <Star className="h-5 w-5 text-darkblue" />
          </div>
          <p className="text-darkblue font-semibold text-2xl">$ 46.000</p>
          <button className="flex flex-row justify-center items-center bg-darkblue rounded-2xl hover:bg-hovertext font-semibold w-full h-10 mt-5">
            <p className="text-white">Ver en el Sitio Oficial</p>
            <SquareArrowOutUpRight className="ml-2 h-5 w-5 text-white"/>
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-rectangles w-[90%] rounded-3xl h-full mt-10 pb-5">
        <div className="flex flex-row justify-center items-center w-[95%] py-5">
          <div className="flex flex-row justify-start items-start w-1/2">
            <h1 className="text-darkblue font-semibold text-start text-2xl">Comentarios (4)</h1>
          </div>
          <div className="flex flex-row justify-end items-end w-1/2">
            <MessageCircle className="text-darkblue h-8 w-8"/>
          </div>
        </div>

        <div className="border-b border-darkblue/60 w-[95%] mb-5"></div>

        {/* Comentario 1 */}
        <div className="bg-[#E2EFEF] rounded-2xl p-5 w-[90%] my-3">
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-row justify-start items-center w-1/2">
              <div className="flex justify-center items-center h-10 w-10 bg-darkblue rounded-full">
                <UserRound className="h-7 w-7 text-white"/>
              </div>
              <div className="flex flex-col justify-start items-start ml-5">
                <h1 className="text-start font-bold text-darkblue text-xl">Nombre Apellido</h1>
                <p className="text-start text-darkblue/60 font-normal text-md">5 de enero, 2007</p>
              </div>

            </div>
            <div className="flex flex-row justify-end items-start bg-transparent w-1/2 h-full mb-7">
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue" />
            </div>
          </div>
          <p className="text-start text-darkblue font-normal text-lg w-auto ml-14 pt-5 mr-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab soluta, at maxime voluptatibus perferendis tempora eligendi fugit tenetur accusamus, odio ducimus facere enim asperiores exercitationem qui repudiandae, itaque quae aliquid.</p>
        </div>

        {/* Comentario 2 */}
        <div className="bg-[#E2EFEF] rounded-2xl p-5 w-[90%] my-3">
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-row justify-start items-center w-1/2">
              <div className="flex justify-center items-center h-10 w-10 bg-darkblue rounded-full">
                <UserRound className="h-7 w-7 text-white"/>
              </div>
              <div className="flex flex-col justify-start items-start ml-5">
                <h1 className="text-start font-bold text-darkblue text-xl">Nombre Apellido</h1>
                <p className="text-start text-darkblue/60 font-normal text-md">5 de enero, 2007</p>
              </div>

            </div>
            <div className="flex flex-row justify-end items-start bg-transparent w-1/2 h-full mb-7">
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue" />
              <Star className="h-4 w-4 text-darkblue" />
            </div>
          </div>
          <p className="text-start text-darkblue font-normal text-lg w-auto ml-14 pt-5 mr-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab soluta, at maxime voluptatibus perferendis tempora eligendi fugit tenetur accusamus, odio ducimus facere enim asperiores exercitationem qui repudiandae, itaque quae aliquid.</p>
        </div>

        {/* Comentario 3 */}
        <div className="bg-[#E2EFEF] rounded-2xl p-5 w-[90%] my-3">
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-row justify-start items-center w-1/2">
              <div className="flex justify-center items-center h-10 w-10 bg-darkblue rounded-full">
                <UserRound className="h-7 w-7 text-white"/>
              </div>
              <div className="flex flex-col justify-start items-start ml-5">
                <h1 className="text-start font-bold text-darkblue text-xl">Nombre Apellido</h1>
                <p className="text-start text-darkblue/60 font-normal text-md">5 de enero, 2007</p>
              </div>

            </div>
            <div className="flex flex-row justify-end items-start bg-transparent w-1/2 h-full mb-7">
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue" />
              <Star className="h-4 w-4 text-darkblue" />
              <Star className="h-4 w-4 text-darkblue" />
            </div>
          </div>
          <p className="text-start text-darkblue font-normal text-lg w-auto ml-14 pt-5 mr-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab soluta, at maxime voluptatibus perferendis tempora eligendi fugit tenetur accusamus, odio ducimus facere enim asperiores exercitationem qui repudiandae, itaque quae aliquid.</p>
        </div>

        {/* Comentario 4 */}
        <div className="bg-[#E2EFEF] rounded-2xl p-5 w-[90%] my-3">
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-row justify-start items-center w-1/2">
              <div className="flex justify-center items-center h-10 w-10 bg-darkblue rounded-full">
                <UserRound className="h-7 w-7 text-white"/>
              </div>
              <div className="flex flex-col justify-start items-start ml-5">
                <h1 className="text-start font-bold text-darkblue text-xl">Nombre Apellido</h1>
                <p className="text-start text-darkblue/60 font-normal text-md">5 de enero, 2007</p>
              </div>

            </div>
            <div className="flex flex-row justify-end items-start bg-transparent w-1/2 h-full mb-7">
              <Star className="h-4 w-4 text-darkblue fill-current" />
              <Star className="h-4 w-4 text-darkblue" />
              <Star className="h-4 w-4 text-darkblue" />
              <Star className="h-4 w-4 text-darkblue" />
              <Star className="h-4 w-4 text-darkblue" />
            </div>
          </div>
          <p className="text-start text-darkblue font-normal text-lg w-auto ml-14 pt-5 mr-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab soluta, at maxime voluptatibus perferendis tempora eligendi fugit tenetur accusamus, odio ducimus facere enim asperiores exercitationem qui repudiandae, itaque quae aliquid.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}