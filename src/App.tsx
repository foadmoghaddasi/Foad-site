import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HeasboApp from "./pages/HesaboApp";
import HeasboPanel from "./pages/HesaboPanel";
import { Lock1 } from "iconsax-react";
import CustomCursor from "./components/CustomCursor";
import Limevee from "./pages/Limevee";
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const correctPassword =
    "39f863febc730452f592496af946e176a8d28066cb0db11c02c854b8b0d3168e"; // Set your password here

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hashPassword(password).then((hashed) => {
      if (hashed === correctPassword) {
        setIsAuthenticated(true);
      } else {
        setError("Oops! The password you entered is incorrect");
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center flex-col justify-center bg-black bg-opacity-80">
        <Lock1 size="60" color="#D62828" variant="Broken" />
        <div className="bg-black p-6 shadow-lg w-95 rounded-full border-[1px] text-center">
          <h2 className="text-xl text-white leading-8 font-semibold mb-1">
            Please enter the password{" "}
          </h2>
          <h2 className="text-lg text-white leading-6 font-[200] mb-4">
            To get the password <br /> send me a message on LinkedIn
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full text-white placeholder-white/25 px-4 py-2 bg-white/20 text-base font-[300] sm:text-lg rounded-full text-left mb-3"
              placeholder="Enter the password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 mb-2 text-left ml-3">{error}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-full border-[1px] text-base font-[600] sm:text-lg bg-white text-black py-2 "
            >
              Continue
            </button>
          </form>
          <a href="https://www.linkedin.com/in/foadmoghaddasi">
            <button
              type="button"
              className="w-full rounded-full text-base font-[600] sm:text-lg bg-[#1666C2] text-white py-2 mt-2 "
            >
              My LinkedIn Profile
            </button>
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
const App: React.FC = () => {
  hashPassword("0000").then((hashed) => console.log("Stored Hash:", hashed));
  return (
    <>
      <div className="custom-cursor z-50 relative">
        <CustomCursor />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <HeasboApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel"
            element={
              <ProtectedRoute>
                <HeasboPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/limevee" element={<Limevee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
