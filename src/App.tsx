import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HeasboApp from "./pages/HesaboApp";
import HeasboPanel from "./pages/HesaboPanel";
import { Lock1 } from "iconsax-react";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import { Form } from "@heroui/react/form";
import { Input } from "@heroui/react/input";
import { Link } from "@heroui/react/link";
import { Surface } from "@heroui/react/surface";
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
      <Surface className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 px-4">
        <Lock1 size="56" color="currentColor" className="mb-4 text-danger" variant="Broken" />
        <Card variant="tertiary" className="w-full max-w-sm text-center">
          <Card.Header className="flex-col">
            <Card.Title>Please enter the password</Card.Title>
            <Card.Description>
            To get the password <br /> send me a message on LinkedIn
            </Card.Description>
          </Card.Header>
          <Card.Content>
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="password"
              fullWidth
              variant="secondary"
              aria-label="Password"
              placeholder="Enter the password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="w-full text-left text-sm text-danger">{error}</p>
            )}
            <Button type="submit" fullWidth variant="primary">
              Continue
            </Button>
          </Form>
          </Card.Content>
          <Card.Footer className="justify-center">
            <Link href="https://www.linkedin.com/in/foadmoghaddasi" target="_blank">
              My LinkedIn Profile
            </Link>
          </Card.Footer>
        </Card>
      </Surface>
    );
  }

  return <>{children}</>;
};
const App: React.FC = () => {
  return (
    <>
      <CustomCursor />
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
