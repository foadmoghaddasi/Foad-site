import { ArrowCircleLeft } from "iconsax-react";
import Image from "../assets/images/Slide.png";
import panleimage from "../assets/images/panel-card.png";
import qursatimage from "../assets/images/qursat-card.png";
import { Navigate, useNavigate } from "react-router-dom";

const Cards = () => {

  const navigate = useNavigate()

  return (
    <div>
      {/* عنوان بخش کیس استادی‌ها */}
      <div className="w-full h-15 md:h-20 pt-10 text-2xl bg-black font-bold flex items-center justify-center">
        <h1 className="text-white text-center items-end md:mt-0 mt-0">کیس استادی‌ها</h1>
      </div>

      {/* کارت‌های اصلی */}
      <div className="w-full bg-black py-8 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* کارت 1 */}
          <div className="w-[345px] h-[410px] bg-[#4F34E3]/20 backdrop-blur-[14px] border border-white/10 p-2 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <img
              src={Image}
              alt="Image"
              className="w-full h-50 object-cover rounded-2xl mb-4"
            />
            <h1 className="text-white text-xl font-bold text-center mb-2">
              فرآیند طراحی اپلیکیشن حسابو
            </h1>
            <div className="flex justify-center mb-8">
              <button className="py-3 px-4 bg-white/20 text-white text-[14px] font-[600] sm:text-sm rounded-full border-[1px] hover:bg-gray-700 transition flex gap-2 items-center"  onClick={() => navigate("/app")}>
                مطالعه کیس استادی
                <ArrowCircleLeft size="24" color="#FFF" variant="Broken"/>
              </button>
            </div>
          </div>

          {/* کارت 2 */}
          <div className="w-[345px] h-[410px] bg-[#00A7FA]/20 backdrop-blur-[14px] border border-white/10 p-2 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <img
              src={panleimage}
              alt="Image"
              className="w-full h-50 object-cover rounded-2xl mb-4"
            />
            <h1 className="text-white text-xl font-bold text-center mb-2">
             طراحی پنل های مدیریت حسابو
            </h1>
            <div className="flex justify-center mb-8">
              <button className="py-3 px-4 bg-white/20 text-white text-[14px] font-[600] sm:text-sm rounded-full border-[1px] hover:bg-gray-700 transition flex gap-2 items-center" onClick={() => navigate("/panel")}>
                مطالعه کیس استادی
                <ArrowCircleLeft size="24" color="#FFF" variant="Broken"/>
              </button>
            </div>
          </div>

          {/* کارت 3 */}
          <div className="w-[345px] h-[410px] bg-[#38A3A5]/20 backdrop-blur-[14px] border border-white/10 p-2 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <img
              src={qursatimage}
              alt="Image"
              className="w-full h-50 object-cover rounded-2xl mb-4"
            />
            <h1 className="text-white text-xl font-bold text-center mb-2">
              قرصات | اپلیکیشن مدیریت دارو ها
            </h1>
            <div className="flex justify-center mb-8">
              <button className="py-3 px-4 bg-white/20 text-white/60 text-[14px] font-[600] sm:text-sm rounded-full  transition flex gap-2 items-center">
                به زودی
              </button>
            </div>
          </div>
        </div>

        

        {/* 🔹 بخش جدید: دو کارت با متن زیر هر عکس */}
        <div className="w-full flex flex-col items-center mt-12">
          {/* عنوان بخش جدید */}
          <h2 className="text-white text-2xl md:text-2xl font-bold text-center mb-6">
            سایر مطالعات طراحی
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row justify-center gap-6">
            {/* کارت تصویر 1 */}
            <div className="flex flex-col items-start">
              <img
                src={Image}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">طراحی داشبورد مدیریت</h3>
              <p className="text-gray-300 text-sm">تحلیل و بازطراحی فرآیند‌های مدیریتی</p>
            </div>

            {/* کارت تصویر 2 */}
            <div className="flex flex-col items-start mt-6 md:mt-0">
              <img
                src={Image}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>

            {/* کارت تصویر 3 */}
            <div className="flex flex-col items-start mt-6 md:mt-0">
              <img
                src={Image}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>

            {/* کارت تصویر 4 */}
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={Image}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
