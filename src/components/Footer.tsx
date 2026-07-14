import { Link } from "@heroui/react/link";
import { Surface } from "@heroui/react/surface";

const Footer = () => {
  return (
    <Surface variant="secondary" className="flex flex-col items-center gap-1 py-10 text-center text-muted">
      <p>Foadmoghaddasi.com</p>
      <Link href="mailto:mogadasi.foad@gmail.com">mogadasi.foad@gmail.com</Link>
      <Link href="https://www.linkedin.com/in/foadmoghaddasi" target="_blank">
        LinkedIn
      </Link>
    </Surface>
  );
};

export default Footer;
