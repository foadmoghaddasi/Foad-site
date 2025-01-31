import Image from "../assets/images/Slide.png";
import amar1 from "../assets/images/amar1.png";
import amar2 from "../assets/images/amar2.png";
import amar3 from "../assets/images/amar3.png";
import amar4 from "../assets/images/amar4.png";
import amar5 from "../assets/images/amar5.png";
import infography from "../assets/images/infography.png";
import myrole from "../assets/images/myrole.png";

const HesaboApp = () => {
  return (
    <div className="w-full h-auto text-white bg-black flex flex-col items-center ">
      <img
        src={Image}
        alt="Large Image"
        className="w-[full] md:w-[full] md:max-h-[1080px] object-cover mb-6"
      />

      <div className="max-w-3xl text-center md:text-right leading-relaxed py-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-right">کیس استادی اپلیکیشن حسابو</h2>
        {/* <p className="text-gray-300 text-lg text-right">
          This process allows us to manage multiple projects simultaneously while consistently delivering outstanding results that align with AppleCare Business and Engineering objectives. Collaborating with the Apple Human Interface Design team provided valuable corporate guidance.
        </p> */}
      </div>

      {/* <img
        src={Image}
        alt="Small Image"
        className="max-w-[368px] md:max-w-3xl h-auto object-cover rounded-2xl my-6"
      /> */}

      <div className="max-w-3xl text-center md:text-right leading-relaxed">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-right px-4">پروژه حسابو چیست؟</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
        حسابو یک سامانه مالی نوآورانه است که به‌عنوان یک حساب اعتباری عمل می‌کند. در این سیستم، حقوق هر روز کاری کارمندان بر اساس حضورشان، به‌صورت اتوماتیک در حساب اعتباری آن‌ها در اپلیکیشن شارژ می‌شود. کارمندان می‌توانند در هر زمان، مبلغ دلخواه خود را از این حساب برداشت کنند، بدون نیاز به انتظار برای دریافت حقوق ماهانه.
        هدف اصلی حسابو، ارائه راهکاری برای پرداخت روزانه حقوق است تا دغدغه‌های مالی کارکنان کاهش یابد و مدیریت مالی آن‌ها بهبود پیدا کند. این سرویس باعث افزایش حس امنیت مالی و رضایت شغلی در بین کارمندان می‌شود.
        </p>
      </div>

      <div className="max-w-3xl text-center md:text-right leading-relaxed">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-right px-4">جامعه هدف</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
          کارمندان و کارگران <br></br>
          سطح متوسط جامعه و سن ۲۰ تا ۵۰ سال<br></br>
          دسترسی سریع به حقوق روزانه برای پوشش نیاز های مالی فوری</p>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
          کارفرمایان و مدیر های مالی و منابع انسانی<br></br>
          تسهیل فرآیند پرداخت حقوق و بهبود رضایت کارکنان<br></br>
          جایگزینی حسابو با شیوه مساعده سنتی</p>
      </div>
      <img
        src={Image}
        alt="Small Image"
        className="max-w-[368px] md:max-w-3xl h-auto object-cover rounded-2xl my-6"
      />
      <div className="max-w-3xl text-center md:text-right leading-relaxed">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-right px-4">اهداف اصلی حسابو</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
        پروژه حسابو با هدف پاسخ به مشکلات مالی و نیازهای روزمره کارمندان طراحی و اجرا شده است. در بسیاری از شرکت‌ها، فرآیند سنتی پرداخت حقوق به‌صورت ماهانه
         انجام می‌شود که می‌تواند برای کارمندانی که با مسائل مالی فوری مواجه هستند، چالش‌برانگیز باشد
        </p>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-right px-4">حل مشکلات مالی روزمره کارمندان</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
        بسیاری از کارگران و کارمندان در طول ماه با بی‌پولی و کمبود منابع مالی مواجه می‌شوند که می‌تواند بر کیفیت زندگی آن‌ها تأثیر بگذارد.
        </p>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-right px-4">مدیریت اقساط و هزینه‌ها</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
        با ارائه امکان برداشت روزانه حقوق، حسابو به کاربران این فرصت را می‌دهد که اقساط و هزینه‌های وسط ماه خود را بهتر مدیریت کنند.
        </p>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-right px-4">کاهش فرآیند مساعده سنتی</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
        در مدل‌های قدیمی، درخواست مساعده نیازمند طی کردن مراحل اداری پیچیده و زمان‌بر بود. حسابو این فرآیند را به یک سیستم خودکار و سریع تبدیل کرده است.
        </p>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-right px-4">افزایش حس امنیت مالی</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
        با دسترسی سریع و آسان به حقوق، کاربران حس بهتری از امنیت مالی خواهند داشت.
        </p>
      </div>
      <div className="max-w-3xl text-center md:text-right leading-relaxed">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-right px-4">اطلاعات پروژه</h2>
        <p className="text-gray-300 text-lg text-right py-4 px-4">
        من از فروردین سال ۱۴۰۱ به‌عنوان طراح محصول به تیم حسابو پیوستم. در آن زمان، حسابو در مرحله 
        MVP بود و طراحی استانداردی نداشت. اما با شروع کار من، رویکردی هدفمند
         برای ارتقای محصول بر اساس تحقیقات کاربری، مشاهدات اجتماعی و انتظارات کاربران آغاز شد
        </p>
      </div>
      <img
        src={infography}
        alt="Small Image"
        className="max-w-[368px] md:max-w-3xl h-auto object-cover rounded-2xl my-6"
      />
      <div className="max-w-3xl text-center md:text-right leading-relaxed">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-right px-4">نقش های من</h2>
        <img
        src={myrole}
        alt="Small Image"
        className="max-w-[368px] md:max-w-3xl h-auto object-cover rounded-2xl my-6"
      />
      </div>
    </div>
    
  );
};

export default HesaboApp;
