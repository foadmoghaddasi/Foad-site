import { Button } from "@heroui/react/button";
import { Link } from "@heroui/react/link";
import { ArrowUp2, Sms } from "iconsax-react";
import { FaDribbble, FaLinkedinIn } from "react-icons/fa6";
import Reveal from "./Reveal";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Reveal className="mt-12">
      <footer dir="ltr" className="footer-panel p-6 md:p-8">
        <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-foreground">
              Foad Moghaddasi
            </p>
            <p className="mt-1 text-sm text-muted">Product Designer</p>
            <nav
              aria-label="Contact links"
              className="mt-4 flex items-center justify-center gap-3 md:justify-start"
            >
              <Link
                href="mailto:moghadasi.foad@gmail.com"
                className="footer-social-link"
                aria-label="Send email"
              >
                <Sms size="22" color="currentColor" variant="Broken" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/foadmoghaddasi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn profile"
              >
                <FaLinkedinIn size="20" aria-hidden="true" />
              </Link>
              <Link
                href="https://dribbble.com/foadmoghaddasi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Dribbble profile"
              >
                <FaDribbble size="20" aria-hidden="true" />
              </Link>
            </nav>
          </div>

          <Button
            isIconOnly
            size="lg"
            variant="outline"
            className="footer-top-button"
            onPress={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp2 size="24" color="currentColor" variant="Broken" />
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-muted md:text-left">
          © {new Date().getFullYear()} Foadmoghaddasi.com
        </p>
      </footer>
    </Reveal>
  );
};

export default Footer;
