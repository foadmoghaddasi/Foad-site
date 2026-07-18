import { Avatar } from "@heroui/react/avatar";
import { Card } from "@heroui/react/card";
import { Surface } from "@heroui/react/surface";
import aboutPicture from "../assets/images/about-pic.webp";
import Reveal from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { isFa, direction } = useLanguage();
  return (
    <Surface
      variant="secondary"
      className="about-section w-full px-4 pt-16 pb-8 md:py-24"
    >
      <Reveal className="mx-auto w-full max-w-3xl text-foreground">
        <div dir={direction} className="mb-6 flex items-center gap-3">
          <h2 className="shrink-0 text-xl font-bold md:text-2xl">
            {isFa ? "درباره من" : "About me"}
          </h2>
          <span className="h-px w-full bg-border" aria-hidden="true" />
        </div>

        <div dir={direction} className="about-message">
          <Avatar
            size="lg"
            color="accent"
            variant="soft"
            className="about-avatar shrink-0"
          >
            <Avatar.Image
              src={aboutPicture}
              alt={isFa ? "فؤاد مقدسی" : "Foad Moghaddasi"}
              className="object-cover"
            />
            <Avatar.Fallback className="font-semibold">FM</Avatar.Fallback>
          </Avatar>

          <Card variant="tertiary" className="about-comment min-w-0 w-full shadow-none">
            <Card.Header className="items-start justify-between gap-4 pb-2">
              <div>
                <Card.Title className="text-base font-semibold md:text-lg">
                  {isFa ? "فؤاد مقدسی" : "Foad Moghaddasi"}
                </Card.Title>
                <Card.Description className="mt-1 text-xs md:text-sm">
                  {isFa ? "طراح محصول" : "Product Designer"}
                </Card.Description>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                {isFa ? "معرفی کوتاه" : "Quick introduction"}
              </span>
            </Card.Header>

            <Card.Content className="pt-0">
              <p className="about-copy text-sm leading-8 text-muted md:text-base md:leading-9">
                {isFa
                  ? "سلام! من فؤاد هستم؛ طراح محصول و دانشجوی کارشناسی ارشد طراحی صنعتی. بیش از پنج سال است که روی تجربه‌های دیجیتال کار می‌کنم و سعی می‌کنم بین نیاز واقعی کاربر، هدف کسب‌وکار و اجرای ساده تعادل بسازم. طراحی کاربرمحور برای من فقط یک عبارت نیست؛ روشی است برای ساختن محصولاتی که هم زیبا باشند و هم واقعاً به کار بیایند. همیشه در حال یادگیری‌ام و از حل مسئله‌های تازه لذت می‌برم."
                  : "Hi! I’m Foad, a product designer and a master’s student in Industrial Design. For more than five years, I’ve worked on digital experiences and tried to balance genuine user needs, business goals, and practical implementation. User-centered design is more than a phrase to me; it is how I create products that are both thoughtful and genuinely useful. I’m always learning and enjoy solving new problems."}
              </p>
            </Card.Content>
          </Card>
        </div>
      </Reveal>
    </Surface>
  );
};

export default About;
