import { ArrowCircleLeft } from "iconsax-react";
import Image from "../assets/images/Slide.webp";
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
import img25 from "../assets/images/img25.webp";
import img26 from "../assets/images/img26.webp";
import img27 from "../assets/images/img27.webp";
import img28 from "../assets/images/img28.webp";
import img29 from "../assets/images/img29.webp";
import img30 from "../assets/images/img30.webp";
import img31 from "../assets/images/img31.webp";
import panleimage from "../assets/images/panel-card.webp";
import qursatimage from "../assets/images/qursat-card.webp";
import { Navigate, useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* عنوان بخش کیس استادی‌ها */}
      <div className="w-full h-15 md:h-20 pt-10 text-2xl bg-black font-bold flex items-center justify-center">
        <h1 className="text-white text-center items-end md:mt-0 mt-0">
          کیس استادی‌ها
        </h1>
      </div>

      {/* کارت‌های اصلی */}
      <div className="w-full bg-black py-8 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* کارت 3 */}
          <div className="w-[345px] h-[410px] bg-[#38A3A5]/20 backdrop-blur-[14px] border border-white/10 p-2 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div className="h-50 overflow-hidden rounded-2xl">
              <img
                src={qursatimage}
                alt="Image"
                className="w-full h-50 hover:scale-110 duration-200 scale-100 object-cover rounded-2xl mb-4"
              />
            </div>
            <h1 className="text-white text-xl font-bold text-center mb-2">
              Limevee <br />
              راه حل تماشای گروهی فیلم و سریال
            </h1>
            <div className="flex justify-center mb-8">
              <button
                className="py-3 px-4 bg-white/20 text-white text-[14px] font-[600] sm:text-sm rounded-full border-[1px] hover:bg-white hover:text-black transition flex gap-2 items-center"
                onClick={() => {
                  navigate("/Limevee");
                }}
              >
                مطالعه کیس استادی
                <ArrowCircleLeft size="24" variant="Broken" />
              </button>
            </div>
          </div>
          {/* کارت 1 */}
          <div className="w-[345px] h-[410px] overflow-x-hidden bg-[#4F34E3]/20 backdrop-blur-[14px] border border-white/10 p-2 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div className="h-50 overflow-hidden rounded-2xl">
              <img
                src={Image}
                alt="Image"
                className="w-full h-50 hover:scale-110 duration-200 scale-100 object-cover rounded-2xl mb-4"
              />
            </div>
            <h1 className="text-white text-xl font-bold text-center mb-2">
              فرآیند طراحی اپلیکیشن حسابو
            </h1>
            <div className="flex justify-center mb-8">
              <button
                className="py-3 px-4 bg-white/20 text-white text-[14px] font-[600] sm:text-sm rounded-full border-[1px] transition flex gap-2 items-center"
                //onClick={() => {
                //navigate("/app");
                //}}
              >
                غیرقابل انتشار(NDA)
              </button>
            </div>
          </div>

          {/* کارت 2 */}
          <div className="w-[345px] h-[410px] bg-[#00A7FA]/20 backdrop-blur-[14px] border border-white/10 p-2 rounded-3xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div className="h-50 overflow-hidden rounded-2xl">
              <img
                src={panleimage}
                alt="Image"
                className="w-full h-50 hover:scale-110 duration-200 scale-100 object-cover rounded-2xl mb-4"
              />
            </div>
            <h1 className="text-white text-xl font-bold text-center mb-2">
              طراحی پنل های مدیریت حسابو
            </h1>
            <div className="flex justify-center mb-8">
              <button
                className="py-3 px-4 bg-white/20 text-white text-[14px] font-[600] sm:text-sm rounded-full border-[1px] transition flex gap-2 items-center"
                //onClick={() => navigate("/panel")}
              >
                غیرقابل انتشار(NDA)
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 بخش جدید: دو کارت با متن زیر هر عکس */}
        <div className="w-full flex flex-col items-center mt-12">
          {/* عنوان بخش جدید */}
          <h2 className="text-white text-2xl md:text-2xl font-bold text-center">
            پروژه هایUI/UX من
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row justify-center gap-6">
            <div className="flex flex-col items-start mt-4 md:mt-6">
              <img
                src={img29}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی اپلیکیشن تاداتون (کانادا)
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۴</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-6">
              <img
                src={img28}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی اپلیکیشن تاداتون (کانادا)
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۴</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-6">
              <img
                src={img31}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی وب‌اپلیکیشن قرصات
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۴</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-6">
              <img
                src={img30}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی پنل ادمین قرصات
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۴</p>
            </div>
            <div className="flex flex-col items-start mt-1 md:mt-6">
              <img
                src={img26}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی اپلیکیشن دل به دل (لندن)
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۳</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-6">
              <img
                src={img27}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                بازطراحی فروشگاه اینترنتی سارمو استایل
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۳</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img2}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی سایت آموزش برنامه‌نویسی
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۲</p>
            </div>

            {/* کارت تصویر 3 */}

            {/* کارت تصویر 4 */}

            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img5}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی پلتفرم صرافی آنلاین
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۲</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img6}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی سایت همگرام
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۱</p>
            </div>

            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img7}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی پلتفرم همگرام
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۱</p>
            </div>

            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img12}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی لندینگ دانلود اپلیکیشن حسابو
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۱</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img4}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی فروشگاه اینترنتی خشکبار ناتژی
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۰</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img25}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی فروشگاه کیک نظری
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۰</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img3}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی سایت Voices to Action
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۰</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img8}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی سایت رزرو آنلاین وقت دکتر - جان‌افزا
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۴۰۰</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img10}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی سایت کاریزما کراد
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img11}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی فروشگاه اینترنتی ویگال
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img1}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت نئومورفیسم iOS
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img9}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه طراحی پنل های مدیریتی کاریزما کراد
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>

            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img13}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت اپلیکیشن مدیریت خواب
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img14}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت اپلیکیشن پایش سلامت
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img15}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت اپلیکیشن وضعیت آب و هوا
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img16}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                طراحی سایت صرافی کنزکس
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img17}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت فروشگاه برنامه های موبایل
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img18}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                بازطراحی گوگل کروم به سبک نئومورفیسم
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img19}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت فروشگاه بازی های آنلاین
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img20}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت اپلیکیشن سفارش قهوه
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img21}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت موزیک پلیر به سبک نئومورفیسم
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img22}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت قندشکن
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img23}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                کانسپت اپلیکیشن ساعت به سبک نئومورفیسم
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
            <div className="flex flex-col items-start mt-6 md:mt-12">
              <img
                src={img24}
                alt="Image"
                className="w-[335px] md:w-[348px] h-64 md:h-65 object-cover rounded-2xl"
              />
              <h3 className="text-white text-lg font-bold mt-1 text-left">
                پروژه کارآموزی شرکت ستاره اول
              </h3>
              <p className="text-gray-300 text-sm">سال ۱۳۹۹</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-16 w-full mb-8">
            <a
              href="https://dribbble.com/foadmoghaddasi"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-white/20 text-white text-[14px] font-[600] sm:text-sm rounded-full border-[1px] 
                   hover:bg-white hover:text-black transition flex gap-2 items-center"
            >
              مشاهده بیشتر در Dribbble
              <ArrowCircleLeft size="24" variant="Broken" />
            </a>
          </div>
        </div>
        <div className="bg-black text-white items-center text-lg leading-8 font-[300] text-center mt-20 mb-10">
          Foadmoghaddasi.com <br />
          Email: moghadasi.foad@gmail.com
          <br />
          Linkedin:{" "}
          <a
            href="https://www.linkedin.com/in/foadmoghaddasi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            www.linkedin.com/in/foadmoghaddasi
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cards;
