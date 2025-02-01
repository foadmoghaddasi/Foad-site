import { useRef } from "react";
import { ArrowCircleDown, DocumentDownload } from "iconsax-react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import About from "../components/About";

const Home = () => {
  const cardsRef = useRef<any>(null);

  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-start items-center px-4 bg-black">
        <Navbar />

        {/* پس‌زمینه گرادینت */}
        <div className="text-center z-10 mt-40 md:mt-40 2xl:mt-50 relative">
          <div className="w-[320px] h-[200px] md:w-[400px] md:h-[300px] absolute -top-10 bg-gradient-to-b from-[#cc00ff] to-[#00b7ff] rounded-full blur-[200px]"></div>
          <h1 className="relative text-4xl font-[800] sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
            Foad Moghaddasi
          </h1>
        </div>

        {/* توضیحات */}
        <div className="relative mt-5 max-w-2xl sm:max-w-3xl lg:max-w-4xl z-10 text-center">
          <p className="text-white font-[200] leading-8 text-2xl md:text-4xl">
            <span>Product Designer @Hesabo</span>
            <span className="block text-xl md:text-3xl">
              previously at Jabama and Asanito
            </span>
          </p>
        </div>

        {/* دکمه دانلود CV */}
        <div className="relative mt-10 z-10">
          <button className="px-6 py-3 bg-white/20 text-white text-base font-[600] sm:text-lg rounded-full border-[1px] hover:bg-gray-700 transition flex gap-2">
            Download CV
            <DocumentDownload size="24" color="#FFF" variant="Broken" />
          </button>
        </div>

        {/* بخش اسکرول */}
        <div className="relative flex flex-col items-center mt-50 md:mt-20 2xl:mt-[250px] z-10">
          <h2 className="text-white text-lg md:text-xl font-[200] md:font-semibold mb-4">
            Case Studies
          </h2>

          {/* دکمه اسکرول */}
          <div
            className="relative w-[34px] h-[53px] cursor-pointer"
            onClick={scrollToCards}
          >
            <div className="w-[34px] h-[53px] left-0 top-0 absolute bg-white/20 rounded-[76px] border border-white backdrop-blur-sm"></div>
            <div className="w-6 h-6 left-[5px] top-[23px] absolute flex justify-center items-center">
              <ArrowCircleDown size="28" color="#FFF" variant="Broken" />
            </div>
          </div>
        </div>
      </div>

      <About />

      {/* سکشن کارت‌ها */}
      <div ref={cardsRef}>
        <Cards />
      </div>
    </>
  );
};

export default Home;
