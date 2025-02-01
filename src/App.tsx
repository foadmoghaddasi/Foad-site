import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HeasboApp from "./pages/HesaboApp";
import HeasboPanel from "./pages/HesaboPanel";
import { Lock1 } from "iconsax-react";
import CustomCursor from "./components/CustomCursor";
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
        setError("رمز اشتباه است");
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center flex-col justify-center bg-black bg-opacity-80">
        <Lock1 size="60" color="#D62828" variant="Broken" />
        <div className="bg-black p-6 shadow-lg w-96 rounded-full border-[1px] text-center">
          <h2 className="text-xl text-white leading-8 font-semibold mb-4">
            ها ها! دیدیییی؟
            <br />
            باید رمزو از فواد بگیری
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full text-white px-4 py-2 border text-base font-[600] sm:text-lg rounded-full mb-4"
              placeholder="رمز عبور را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-full border-[1px] text-base font-[600] sm:text-lg bg-white text-black py-2 "
            >
              ورود
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
