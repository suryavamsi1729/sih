import React from "react";
import AppHeader from "../headers/AppHeader";
import type { IBasicFCProps } from "../../types";
import { Outlet } from "react-router-dom";
import AppFooter from "../footers/AppFooter";

interface AppLayoutProps extends IBasicFCProps{
  children?:React.ReactNode,
}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <AppHeader />
      {/* Main Content */}
      <main id="main" className="flex-1 mt-8 px-4 sm:px-6 lg:px-8" tabIndex={-1}>
         <Outlet />
      </main>
      {/* Footer */}
      <AppFooter/>
    </div>
  );
};

export default AppLayout;
