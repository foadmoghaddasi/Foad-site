import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react/button";
import { Surface } from "@heroui/react/surface";
import { ArrowCircleDown, DocumentDownload } from "iconsax-react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Reveal from "../components/Reveal";

const Home = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/FoadMoghaddasi-CV.pdf"; // Ensure the file is in the 'public' folder
    link.download = "Foad_Moghaddasi_CV.pdf"; // Set the filename for download
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      document.body.removeChild(link);
      navigate("/cv");
    }, 150);
  };

  return (
    <>
      <Navbar />

      <Surface className="relative isolate w-full min-h-screen overflow-hidden flex flex-col justify-start items-center px-4 bg-background text-foreground">
        {/* پس‌زمینه گرادینت */}
        <div aria-hidden="true" className="hero-mesh" />

        <div className="hero-content">
          <Reveal className="hero-title text-center z-10 mt-40 md:mt-40 2xl:mt-50 relative">
            <h1 className="relative text-3xl font-[800] sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
              Foad Moghaddasi
            </h1>
          </Reveal>

          {/* توضیحات */}
          <Reveal
            delay={80}
            className="hero-description relative mt-5 max-w-2xl sm:max-w-3xl lg:max-w-4xl z-10 text-center"
          >
            <p className="text-foreground font-[200] leading-10 text-2xl md:leading-16 md:text-5xl">
              <span>Product Designer @Hesabo</span>
              <span className="block text-base sm:text-xl md:text-3xl">
                previously at Jabama and Asanito
              </span>
            </p>
          </Reveal>

          {/* دکمه دانلود CV */}
          <Reveal delay={160} className="hero-download relative mt-10 z-10">
            <Button
              onPress={handleDownload}
              variant="secondary"
              size="lg"
              className="hero-glass-button !h-14 px-7"
            >
              Download CV
              <DocumentDownload
                size="32"
                color="currentColor"
                variant="Broken"
              />
            </Button>
          </Reveal>
        </div>

        {/* بخش اسکرول */}
        <Reveal
          delay={220}
          className="case-studies-control relative flex flex-col items-center mt-50 md:mt-24 lg:mt-24 2xl:mt-[150px] z-10"
        >
          <h2 className="text-muted text-lg md:text-xl font-[200] md:font-semibold mb-4">
            Case Studies
          </h2>

          {/* دکمه اسکرول */}
          <Button
            isIconOnly
            variant="outline"
            size="lg"
            onPress={scrollToCards}
            aria-label="Scroll to case studies"
            className="hero-glass-button"
          >
            <ArrowCircleDown size="26" color="currentColor" variant="Broken" />
          </Button>
        </Reveal>
      </Surface>

      <About />

      {/* سکشن کارت‌ها */}
      <div ref={cardsRef}>
        <Cards />
      </div>
    </>
  );
};

export default Home;
