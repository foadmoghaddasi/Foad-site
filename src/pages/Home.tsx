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
      <div className="w-full h-[800px] md:h-screen flex flex-col justify-start items-center md:justify-start px-4 bg-black">
        <Navbar />

        <div className="text-center z-10 md:mt-80 mt-50 relative">
          <div className="w-[320px] h-[200px] md:h-[320px] absolute md:top-0 top-0 bg-gradient-to-b from-[#cc00ff] to-[#00b7ff] rounded-full blur-[200px]"></div>
          <h1 className="relative text-4xl font-[800] sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
            Foad Moghaddasi
          </h1>
        </div>

        <div className="relative mt-5 max-w-2xl sm:max-w-3xl lg:max-w-4xl z-10">
          <p className="text-white font-[200] text-center leading-8">
            <span className="text-3xl md:text-6xl font-[400]">Product Designer @Hesabo</span>
            <span className="block text-2xl md:text-5xl md:leading-18">previously at Jabama and Asanito</span>
          </p>
        </div>

        <div className="relative mt-12 md:mt-20 z-10">
          <button className="px-6 py-3 bg-white/20 text-white text-base font-[600] sm:text-lg rounded-full border-[1px] hover:bg-gray-700 transition flex gap-2">
            Download CV
            <DocumentDownload size="24" color="#FFF" variant="Broken" />
          </button>
        </div>

        <div className="relative flex flex-col items-center md:mt-90 mt-30 z-10">
          <h2 className="text-white text-lg md:text-xl font-[200] md:font-semibold mb-4">Case Studies</h2>

          {/* دکمه اسکرول */}
          <div className="relative w-[34px] h-[53px] cursor-pointer" onClick={scrollToCards}>
            <div className="w-[34px] h-[53px] left-0 top-0 absolute bg-white/20 rounded-[76px] border border-white backdrop-blur-sm"></div>
            <div className="w-6 h-6 left-[5px] top-[23px] absolute justify-center items-center inline-flex">
              <div className="w-6 h-6 items-center ml-1 mb-1">
                <ArrowCircleDown size="28" color="#FFF" variant="Broken" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <About />

      <div ref={cardsRef}>
        <Cards />
      </div>
    </>
  );
};

export default Home;
