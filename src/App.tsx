import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HeasboApp from "./pages/HesaboApp";
import HeasboPanel from "./pages/HesaboPanel";
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-xl font-semibold mb-4">رمز خود را وارد کنید</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="رمز خود را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md"
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
  );
};

export default App;
