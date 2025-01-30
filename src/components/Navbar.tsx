import { Link } from "react-router-dom";
import Logo from "../assets/images/fm-logo.png";

const Navbar = () => {
  return (
    <div className="w-full h-[10px] bg-black flex items-center justify-end px-2 m-8">
      <img 
        src={Logo} 
        alt="Logo" 
        className="h-14 md:h-20"
      />    </div>
  );
};

export default Navbar;
