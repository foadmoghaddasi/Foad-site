import { Avatar } from "@heroui/react/avatar";
import { Card } from "@heroui/react/card";
import { Surface } from "@heroui/react/surface";
import aboutPicture from "../assets/images/about-pic.jpeg";
import Reveal from "./Reveal";

const About = () => {
  return (
    <Surface
      variant="secondary"
      className="about-section w-full px-4 py-16 md:py-24"
    >
      <Reveal className="mx-auto w-full max-w-3xl text-foreground">
        <div dir="rtl" className="mb-6 flex items-center gap-3">
          <h2 className="shrink-0 text-xl font-bold md:text-2xl">درباره من</h2>
          <span className="h-px w-full bg-border" aria-hidden="true" />
        </div>

        <div dir="rtl" className="flex items-start gap-3 md:gap-4">
          <Avatar size="lg" color="accent" variant="soft" className="shrink-0">
            <Avatar.Image src={aboutPicture} alt="Foad Moghaddasi" className="object-cover" />
            <Avatar.Fallback className="font-semibold">FM</Avatar.Fallback>
          </Avatar>

          <Card variant="tertiary" className="about-comment min-w-0 flex-1 shadow-none">
            <Card.Header className="items-start justify-between gap-4 pb-2">
              <div>
                <Card.Title className="text-base font-semibold md:text-lg">فؤاد مقدسی</Card.Title>
                <Card.Description className="mt-1 text-xs md:text-sm">Product Designer</Card.Description>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                معرفی کوتاه
              </span>
            </Card.Header>

            <Card.Content className="pt-0">
              <p className="text-right text-sm leading-8 text-muted md:text-base md:leading-9">
                سلام! من فؤاد هستم؛ طراح محصول و دانشجوی کارشناسی ارشد طراحی
                صنعتی. بیش از پنج ساله که روی تجربه‌های دیجیتال کار می‌کنم و
                سعی می‌کنم بین نیاز واقعی کاربر، هدف کسب‌وکار و اجرای ساده تعادل
                بسازم. طراحی کاربرمحور برای من فقط یک عبارت نیست؛ روشی است برای
                ساختن محصولاتی که هم زیبا باشند و هم واقعاً به کار بیایند. همیشه
                در حال یادگیری‌ام و از حل مسئله‌های تازه لذت می‌برم.
              </p>
            </Card.Content>
          </Card>
        </div>
      </Reveal>
    </Surface>
  );
};

export default About;
