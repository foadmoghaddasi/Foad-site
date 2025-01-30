import Frame from "../assets/images/Framelg.png";
import frame from "../assets/images/Framesm.png";

const About = () => {
  return (
    <section className="relative w-full h-auto bg-black flex items-center justify-center text-center">
      <img src={Frame} alt="Frame" className="hidden md:block w-full h-auto" />
      
      <img src={frame} alt="Mobile Frame" className="block md:hidden w-full h-auto" />

      <div className="absolute top-[10%] left-0 w-full h-full flex flex-col items-center justify-start text-white px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">درباره من</h2>
        <p className="text-[16px] md:text-xl leading-relaxed max-w-lg text-justify">
          <span className="block font-semibold text-xl md:text-2xl mb-2">سلام!</span>
          من دانشجوی کارشناسی ارشد طراحی صنعتی هستم و بیش از پنج سال در حوزه طراحی محصول فعالیت دارم. 
          طراحی کاربرمحور، اصل اساسی کار من است و همواره به دنبال ایجاد تجربه‌هایی هستم که فراتر از 
          زیبایی بصری، کاربردی و مؤثر باشند. 
          یادگیری مداوم و بهبود مهارت‌هایم را بخش جدایی‌ناپذیر مسیر حرفه‌ای خود می‌دانم و همیشه در 
          تلاش برای ارتقای کیفیت طراحی و حل چالش‌های جدید در دنیای محصول هستم.
        </p>
      </div>
    </section>
  );
};

export default About;
