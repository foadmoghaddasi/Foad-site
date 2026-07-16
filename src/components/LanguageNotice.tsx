import { useEffect, useState } from "react";
import { Alert } from "@heroui/react/alert";
import { Button } from "@heroui/react/button";
import { CloseCircle, LanguageSquare } from "iconsax-react";
import { useLanguage } from "../context/LanguageContext";

let dismissedDuringCurrentVisit = false;

const LanguageNotice = () => {
  const { isFa } = useLanguage();
  const noticeDirection = isFa ? "ltr" : "rtl";
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (dismissedDuringCurrentVisit) return;

    const showTimer = window.setTimeout(() => setIsVisible(true), 3000);
    return () => window.clearTimeout(showTimer);
  }, []);

  const dismissNotice = () => {
    dismissedDuringCurrentVisit = true;
    setIsLeaving(true);
    window.setTimeout(() => setIsVisible(false), 260);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`language-notice-wrap${isLeaving ? " is-leaving" : ""}`}
      dir={noticeDirection}
    >
      <Alert
        status="accent"
        role="status"
        className="language-notice"
      >
        <Alert.Indicator className="language-notice-indicator">
          <LanguageSquare size="24" color="currentColor" variant="Broken" />
        </Alert.Indicator>
        <Alert.Content className="language-notice-content">
          <span className="language-notice-eyebrow">
            {isFa ? "QUICK TIP" : "راهنمای سریع"}
          </span>
          <Alert.Title className="language-notice-title">
            {isFa ? "Prefer English?" : "ترجیح می‌دهید فارسی ببینید؟"}
          </Alert.Title>
          <Alert.Description className="language-notice-description">
            {isFa
              ? "Switch the website language anytime from the button in the footer."
              : "زبان سایت را از دکمه تغییر زبان در پایین صفحه عوض کنید."}
          </Alert.Description>
        </Alert.Content>
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          onPress={dismissNotice}
          aria-label={isFa ? "Dismiss message" : "بستن پیام"}
          className="language-notice-close"
        >
          <CloseCircle size="18" color="currentColor" variant="Broken" />
        </Button>
      </Alert>
    </div>
  );
};

export default LanguageNotice;
