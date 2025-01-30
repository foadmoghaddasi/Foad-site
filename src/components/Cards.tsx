import { ArrowCircleLeft, DocumentDownload } from "iconsax-react";
import Image from "../assets/images/Slide.png";

const Cards = () => {
  return (
    <>
      <div className="text-2xl bg-black font-bold">
        <h1 className="text-white text-center items-end md:mt-0 mt-0">کیس استادی ها</h1>
      </div>
    <div className="w-full bg-black mt-0 py-12 flex justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
        {/* Card 1 */}
        <div className="w-[345px] h-[455px] bg-[#0c4ccd]/20 backdrop-blur-[14px] border border-white/10 p-6 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <img
            src={Image}
            alt="Image"
            className="w-full h-50 object-cover rounded-2xl mb-4"
          />
          <h1 className="text-white text-xl font-bold text-center mb-10">
            فرآیند طراحی اپلیکیشن حسابو
          </h1>
          <div className="flex justify-center mb-8">
                      <button className="px-6 py-3 bg-white/20 text-white text-base font-[600] sm:text-lg rounded-full border-[1px] hover:bg-gray-700 transition flex gap-2">
                        Download CV
                        <DocumentDownload size="24" color="#FFF" variant="Broken" />
                      </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-[345px] h-[455px] bg-[#0c4ccd]/20 backdrop-blur-[14px] border border-white/10 p-6 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <img
            src={Image}
            alt="Image"
            className="w-full h-50 object-cover rounded-2xl mb-4"
          />
          <h1 className="text-white text-xl font-bold text-center mb-10">
            فرآیند طراحی اپلیکیشن حسابو
          </h1>
          <div className="flex justify-center mb-8">
                      <button className="px-6 py-3 bg-white/20 text-white text-base font-[600] sm:text-lg rounded-full border-[1px] hover:bg-gray-700 transition flex gap-2">
                        Download CV
                        <DocumentDownload size="24" color="#FFF" variant="Broken" />
                      </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cards;
