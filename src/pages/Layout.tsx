import React from "react";
import { Outlet } from "react-router-dom";
import { Surface } from "@heroui/react/surface";

const Layout: React.FC = () => {
  return (
    <Surface className="min-h-screen bg-background text-foreground">
      <Outlet />
    </Surface>
  );
};

export default Layout;
