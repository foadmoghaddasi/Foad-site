import Cards from "../components/Cards";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      {/* بخش ویدیویی پس‌زمینه */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
        {/* ویدیو در پس‌زمینه */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/src/videos/background.mp4" // مسیر ویدیو را اینجا تنظیم کن
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute  top-0 left-0 w-full h-full bg-black opacity-70 "></div>
        {/* محتوای روی ویدیو */}
        <div className="relative text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
            Foad Moghaddasi
          </h1>
        </div>

        <div className="relative mt-8 max-w-2xl sm:max-w-3xl lg:max-w-4xl z-10">
          <p className="text-white text text-lg sm:text-xl md:text-lg text-center leading-relaxed drop-shadow-md">
            طراح محصول با ۵ سال تجربه در طراحی تجربه کاربری (UX) و رابط کاربری
            (UI). تمرکزم روی بهینه‌سازی تعاملات دیجیتال و توسعه سیستم‌های
            مقیاس‌پذیر است. به طراحی‌هایی که تجربه‌ای روان و کارآمد برای کاربران
            ایجاد کند، اهمیت می‌دهم و همیشه به دنبال راه‌حل‌های مؤثر برای بهبود
            محصولات دیجیتال هستم.
          </p>
        </div>

        <div className="relative mt-12 z-10">
          <button className="px-6 py-3 bg-gray-800 text-white text-base sm:text-lg rounded-md hover:bg-gray-700 transition">
            Download CV
          </button>
        </div>
      </div>

      <Cards />
    </>
  );
};

export default Home;
