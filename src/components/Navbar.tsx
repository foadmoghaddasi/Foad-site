import { useEffect, useState } from "react";
import { Book, Home2, MedalStar, Moon, Sun1 } from "iconsax-react";
import { Switch } from "@heroui/react/switch";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/fm-logo.png";
import LightLogo from "../assets/images/fm-logo-light.png";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isFa, direction } = useLanguage();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";
  const isArticlesPage = pathname.startsWith("/articles");
  const isChallengePage = pathname === "/daily-design-challenge";

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 24);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  return (
    <header
      dir={direction}
      className={`glass-navbar fixed left-1/2 z-50 flex h-16 -translate-x-1/2 items-center justify-end gap-3 px-4 md:h-18 md:px-5 ${
        isScrolled ? "is-scrolled" : "is-top"
      }`}
    >
      <Link
        to="/"
        aria-label={isFa ? "بازگشت به صفحه اصلی" : "Back to home"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="navbar-brand-link flex min-w-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <img
          src={theme === "light" ? LightLogo : Logo}
          alt="Foad Moghaddasi"
          className="h-10 shrink-0 object-contain md:h-12"
        />
      </Link>
      <nav
        className="navbar-icon-links"
        aria-label={isFa ? "دسترسی سریع" : "Quick access"}
      >
        <Link
          to="/"
          className={`navbar-icon-link${isHomePage ? " is-selected" : ""}`}
          aria-label={isFa ? "رفتن به صفحه اصلی" : "Go to home page"}
          aria-current={isHomePage ? "page" : undefined}
          title={isFa ? "صفحه اصلی" : "Home"}
        >
          <Home2 size="18" color="currentColor" variant="Broken" />
        </Link>
        <Link
          to="/articles"
          className={`navbar-icon-link${isArticlesPage ? " is-selected" : ""}`}
          aria-label={isFa ? "رفتن به صفحه مقاله‌ها" : "Go to articles"}
          aria-current={isArticlesPage ? "page" : undefined}
          title={isFa ? "مقاله‌ها" : "Articles"}
        >
          <Book size="19" color="currentColor" variant="Broken" />
        </Link>
        <Link
          to="/daily-design-challenge"
          className={`navbar-icon-link${isChallengePage ? " is-selected" : ""}`}
          aria-label={
            isFa
              ? "رفتن به صفحه چالش‌های هفتگی طراحی"
              : "Go to weekly design challenges"
          }
          aria-current={isChallengePage ? "page" : undefined}
          title={isFa ? "چالش‌های هفتگی" : "Weekly challenges"}
        >
          <MedalStar size="19" color="currentColor" variant="Broken" />
        </Link>
      </nav>
      <Switch
        dir="ltr"
        isSelected={theme === "light"}
        onChange={() => toggleTheme()}
        aria-label={
          isFa
            ? `تغییر به حالت ${theme === "dark" ? "روشن" : "تیره"}`
            : `Switch to ${theme === "dark" ? "light" : "dark"} mode`
        }
      >
        {({ isSelected }) => (
          <Switch.Content>
            <Switch.Control
              className={`h-[31px] w-[51px] transition-colors duration-300 ${
                isSelected
                  ? "bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.55)]"
                  : "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.35)]"
              }`}
            >
              <Switch.Thumb
                className={`!ms-0.5 size-[27px] rounded-lg bg-white shadow-sm transition-transform duration-300 ${
                  isSelected ? "translate-x-5 shadow-lg" : ""
                }`}
              >
                <Switch.Icon
                  className={`flex size-full items-center justify-center transition-colors duration-300 ${
                    isSelected ? "text-amber-400" : "text-blue-500"
                  }`}
                >
                  {isSelected ? (
                    <Sun1 size="16" color="currentColor" variant="Bold" />
                  ) : (
                    <Moon size="16" color="currentColor" variant="Bold" />
                  )}
                </Switch.Icon>
              </Switch.Thumb>
            </Switch.Control>
          </Switch.Content>
        )}
      </Switch>
    </header>
  );
};

export default Navbar;
