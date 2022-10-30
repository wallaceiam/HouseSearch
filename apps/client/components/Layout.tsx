import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  readonly children?: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-full">
    <Navbar />
    {children}
  </div>
);

export default Layout;
