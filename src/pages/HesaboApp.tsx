import Image from "../assets/images/appcase.png";
import { useEffect } from "react";

const HesaboApp = () => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        event.keyCode === 123 || // F12
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I
        (event.ctrlKey && event.key === "U") // Ctrl + U (View Source)
      ) {
        event.preventDefault();
        alert("Inspect Element is disabled! 🚫");
      }
    };

    const handleContextMenu = (event: any) => {
      event.preventDefault();
      alert("Right Click is disabled! 🚫");
    };

    const checkDevTools = setInterval(() => {
      if (
        window.outerWidth - window.innerWidth > 200 ||
        window.outerHeight - window.innerHeight > 200
      ) {
        alert("Developer Tools Detected! Closing Page...");
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
  }, []);

  return (
    <div className="w-full h-full text-white bg-black flex flex-col items-center relative">
      {/* Large Image */}
      <img
        src={Image}
        alt="Large Image"
        className="container w-full md:w-full object-cover mb-6 select-none"
        onContextMenu={(e) => e.preventDefault()}
        draggable="false"
      />
      {/* Transparent Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
    </div>
  );
};

export default HesaboApp;
