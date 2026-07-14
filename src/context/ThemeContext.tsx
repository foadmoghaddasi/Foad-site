import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const appRoot = document.getElementById("root");

    if (!appRoot) {
      applyTheme(nextTheme);
      setTheme(nextTheme);
      return;
    }

    const switchElement = document.querySelector('[role="switch"]');
    const switchRect = switchElement?.getBoundingClientRect();
    const x = switchRect
      ? switchRect.left + switchRect.width / 2
      : window.innerWidth * 0.94;
    const y = switchRect
      ? switchRect.top + switchRect.height / 2
      : window.innerHeight * 0.04;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const collapsed = `circle(0px at ${x}px ${y}px)`;
    const expanded = `circle(${radius}px at ${x}px ${y}px)`;

    const overlay = document.createElement("div");
    const overlayTheme = nextTheme === "light" ? nextTheme : theme;
    overlay.className = overlayTheme;
    overlay.dataset.theme = overlayTheme;
    overlay.dataset.themeTransitionOverlay = "true";
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "2147483646",
      overflow: "hidden",
      pointerEvents: "none",
      background: "var(--background)",
    });

    const snapshot = appRoot.cloneNode(true) as HTMLElement;
    snapshot.querySelectorAll(".cursor-circle").forEach((node) => node.remove());
    Object.assign(snapshot.style, {
      position: "absolute",
      top: `${-window.scrollY}px`,
      left: "0",
      width: "100%",
    });
    overlay.appendChild(snapshot);
    document.body.appendChild(overlay);

    if (nextTheme === "dark") {
      applyTheme(nextTheme);
      flushSync(() => setTheme(nextTheme));
    }

    const animation = overlay.animate(
      {
        clipPath:
          nextTheme === "light"
            ? [collapsed, expanded]
            : [expanded, collapsed],
      },
      {
        duration: 650,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "both",
      },
    );

    animation.finished.finally(() => {
      if (nextTheme === "light") {
        applyTheme(nextTheme);
        flushSync(() => setTheme(nextTheme));
      }
      overlay.remove();
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
