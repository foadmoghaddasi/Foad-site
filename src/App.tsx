import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import CV from "./pages/CV";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import DailyDesignChallengePage from "./pages/DailyDesignChallengePage";
import { useLanguage } from "./context/LanguageContext";
import SEO from "./components/SEO";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  React.useLayoutEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isFa, direction } = useLanguage();
  const { pathname } = useLocation();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasError, setHasError] = useState(false);

  const correctPassword =
    "39f863febc730452f592496af946e176a8d28066cb0db11c02c854b8b0d3168e"; // Set your password here

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hashPassword(password).then((hashed) => {
      if (hashed === correctPassword) {
        setIsAuthenticated(true);
      } else {
        setHasError(true);
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title={isFa ? "پروژه محافظت‌شده | فؤاد مقدسی" : "Protected Project | Foad Moghaddasi"}
          description={isFa ? "این پروژه با رمز عبور محافظت شده است." : "This project is password protected."}
          path={pathname}
          noindex
        />
        <Surface
          dir={direction}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 px-4"
        >
          <Lock1
            size="56"
            color="currentColor"
            className="mb-4 text-danger"
            variant="Broken"
          />
          <Card variant="tertiary" className="w-full max-w-sm text-center">
            <Card.Header className="flex-col">
              <Card.Title>
                {isFa ? "لطفاً رمز عبور را وارد کنید" : "Please enter the password"}
              </Card.Title>
              <Card.Description>
                {isFa ? "برای دریافت رمز عبور" : "To get the password"}
                <br />
                {isFa
                  ? "در لینکدین به من پیام بدهید"
                  : "send me a message on LinkedIn"}
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                  type="password"
                  fullWidth
                  variant="secondary"
                  aria-label={isFa ? "رمز عبور" : "Password"}
                  placeholder={isFa ? "رمز عبور را اینجا وارد کنید" : "Enter the password here"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {hasError && (
                  <p className="w-full text-start text-sm text-danger">
                    {isFa
                      ? "رمز عبوری که وارد کردید اشتباه است"
                      : "Oops! The password you entered is incorrect"}
                  </p>
                )}
                <Button type="submit" fullWidth variant="primary">
                  {isFa ? "ادامه" : "Continue"}
                </Button>
              </Form>
            </Card.Content>
            <Card.Footer className="justify-center">
              <Link
                href="https://www.linkedin.com/in/foadmoghaddasi"
                target="_blank"
              >
                {isFa ? "پروفایل لینکدین من" : "My LinkedIn Profile"}
              </Link>
            </Card.Footer>
          </Card>
        </Surface>
      </>
    );
  }

  return (
    <>
      <SEO
        title={isFa ? "پروژه محافظت‌شده | فؤاد مقدسی" : "Protected Project | Foad Moghaddasi"}
        description={isFa ? "این پروژه با رمز عبور محافظت شده است." : "This project is password protected."}
        path={pathname}
        noindex
      />
      {children}
    </>
  );
};

const NotFound = () => {
  const { isFa, direction } = useLanguage();
  const { pathname } = useLocation();

  return (
    <main dir={direction} className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-5 text-center text-foreground">
      <SEO
        title={isFa ? "صفحه پیدا نشد | فؤاد مقدسی" : "Page Not Found | Foad Moghaddasi"}
        description={isFa ? "این صفحه پیدا نشد." : "This page could not be found."}
        path={pathname}
        noindex
      />
      <strong className="text-6xl">404</strong>
      <p>{isFa ? "صفحه‌ای که می‌خواستید پیدا نشد." : "The page you requested could not be found."}</p>
      <Link href="/">{isFa ? "بازگشت به خانه" : "Back to home"}</Link>
    </main>
  );
};
const App: React.FC = () => {
  return (
    <>
      <CustomCursor />
      <BrowserRouter>
        <ScrollToTop />
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
          <Route path="/cv" element={<CV />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/daily-design-challenge" element={<DailyDesignChallengePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
