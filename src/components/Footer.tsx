import { Button } from "@heroui/react/button";
import { Link } from "@heroui/react/link";
import { ArrowUp2, LanguageSquare, Sms } from "iconsax-react";
import { FaDribbble, FaLinkedinIn } from "react-icons/fa6";
import Reveal from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { isFa, direction, toggleLanguage } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Reveal className="mt-12">
      <footer dir={direction} className="footer-panel p-6 md:p-8">
        <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
          <div className="footer-identity text-center">
            <p className="text-lg font-semibold text-foreground">
              {isFa ? "فؤاد مقدسی" : "Foad Moghaddasi"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {isFa ? "طراح محصول" : "Product Designer"}
            </p>
            <nav
              aria-label={isFa ? "لینک‌های تماس" : "Contact links"}
              className="footer-contact-links mt-4 flex items-center justify-center gap-3"
            >
              <Link
                href="mailto:moghadasi.foad@gmail.com"
                className="footer-social-link"
                aria-label={isFa ? "ارسال ایمیل" : "Send email"}
              >
                <Sms size="22" color="currentColor" variant="Broken" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/foadmoghaddasi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={isFa ? "پروفایل لینکدین" : "LinkedIn profile"}
              >
                <FaLinkedinIn size="20" aria-hidden="true" />
              </Link>
              <Link
                href="https://dribbble.com/foadmoghaddasi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={isFa ? "پروفایل دریبل" : "Dribbble profile"}
              >
                <FaDribbble size="20" aria-hidden="true" />
              </Link>
            </nav>
          </div>

          <div className="footer-actions">
            <Button
              variant="outline"
              className="footer-language-button"
              onPress={toggleLanguage}
              aria-label={isFa ? "تغییر زبان به انگلیسی" : "Switch language to Persian"}
            >
              <LanguageSquare size="20" color="currentColor" variant="Broken" />
              {isFa ? "English" : "فارسی"}
            </Button>
            <Button
              isIconOnly
              size="lg"
              variant="outline"
              className="footer-top-button"
              onPress={scrollToTop}
              aria-label={isFa ? "بازگشت به بالا" : "Back to top"}
            >
              <ArrowUp2 size="24" color="currentColor" variant="Broken" />
            </Button>
          </div>
        </div>

        <p className="footer-copyright mt-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} Foadmoghaddasi.com
        </p>
      </footer>
    </Reveal>
  );
};

export default Footer;
