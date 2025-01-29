import Cards from "../components/Cards";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-amber-100 flex flex-col justify-center items-center px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800">
            Foad Moghaddasi
          </h1>
        </div>

        <div className="mt-8 max-w-2xl sm:max-w-3xl lg:max-w-4xl">
          <p className="text-gray-700 text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
          </p>
        </div>

        <div className="mt-12">
          <button className="px-6 py-3 bg-gray-800 text-white text-base sm:text-lg rounded-md hover:bg-gray-700 transition">
            Learn More
          </button>
        </div>
      </div>
      <Cards />
    </>
  );
};

export default Home;
