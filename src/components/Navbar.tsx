import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-auto bg-amber-100 flex justify-between">
      <div className="text-2xl m-8">
        <h1>Foad Designer</h1>
      </div>
      <div className="text-lg m-8">
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Navbar;
