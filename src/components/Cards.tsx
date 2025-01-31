import { ArrowCircleLeft } from "iconsax-react";
import Image from "../assets/images/Slide.png";
import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img4.webp";
import img5 from "../assets/images/img5.webp";
import img6 from "../assets/images/img6.webp";
import img7 from "../assets/images/img7.webp";
import img8 from "../assets/images/img8.webp";
import img9 from "../assets/images/img9.webp";
import img10 from "../assets/images/img10.webp";
import img11 from "../assets/images/img11.webp";
import img12 from "../assets/images/img12.webp";
import img13 from "../assets/images/img13.webp";
import img14 from "../assets/images/img14.webp";
import img15 from "../assets/images/img15.webp";
import img16 from "../assets/images/img16.webp";
import img17 from "../assets/images/img17.webp";
import img18 from "../assets/images/img18.webp";
import img19 from "../assets/images/img19.webp";
import img20 from "../assets/images/img20.webp";
import img21 from "../assets/images/img21.webp";
import img22 from "../assets/images/img22.webp";
import img23 from "../assets/images/img23.webp";
import img24 from "../assets/images/img24.webp";
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
          پروژه هایUI/UX  من
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row justify-center gap-6">
            {/* کارت تصویر 1 */}
            <div className="flex flex-col items-start">
              <img
                src={img1}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">طراحی داشبورد مدیریت</h3>
              <p className="text-gray-300 text-sm">تحلیل و بازطراحی فرآیند‌های مدیریتی</p>
            </div>

            {/* کارت تصویر 2 */}
            <div className="flex flex-col items-start mt-6 md:mt-0">
              <img
                src={img2}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>

            {/* کارت تصویر 3 */}
            <div className="flex flex-col items-start mt-6 md:mt-0">
              <img
                src={img3}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>

            {/* کارت تصویر 4 */}
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img4}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img5}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img6}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img7}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img8}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img9}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img10}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img11}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img12}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img13}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img14}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img15}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img16}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img17}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img18}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img19}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img20}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img21}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img22}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img23}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-4 text-left">بهینه‌سازی تجربه کاربری</h3>
              <p className="text-gray-300 text-sm">پژوهش و آزمایش برای بهبود دسترسی‌پذیری</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img24}
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
