import Image from "../assets/images/appcase.png";
import { useEffect } from "react";
import { Surface } from "@heroui/react/surface";
import { useLanguage } from "../context/LanguageContext";

const HesaboApp = () => {
  const { isFa, direction } = useLanguage();
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        event.keyCode === 123 || // F12
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I
        (event.ctrlKey && event.key === "U") // Ctrl + U (View Source)
      ) {
        event.preventDefault();
        alert(isFa ? "ابزار بررسی غیرفعال است! 🚫" : "Inspect Element is disabled! 🚫");
      }
    };

    const handleContextMenu = (event: any) => {
      event.preventDefault();
      alert(isFa ? "کلیک راست غیرفعال است! 🚫" : "Right Click is disabled! 🚫");
    };

    const checkDevTools = setInterval(() => {
      if (
        window.outerWidth - window.innerWidth > 200 ||
        window.outerHeight - window.innerHeight > 200
      ) {
        alert(isFa ? "ابزار توسعه‌دهنده شناسایی شد؛ صفحه بسته می‌شود..." : "Developer Tools Detected! Closing Page...");
        window.close(); // Closes the tab when DevTools is detected
      }
    }, 1000);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      clearInterval(checkDevTools);
    };
  }, [isFa]);

  return (
    <Surface dir={direction} className="w-full h-full text-foreground bg-background flex flex-col items-center relative">
      {/* Large Image */}
      <img
        src={Image}
        alt={isFa ? "فرایند طراحی اپلیکیشن حسابو" : "Hesabo app design process"}
        className="container w-full md:w-full object-cover mb-6 select-none"
        onContextMenu={(e) => e.preventDefault()}
        draggable="false"
      />
      {/* Transparent Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
    </Surface>
  );
};

export default HesaboApp;
