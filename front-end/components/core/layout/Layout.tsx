import React from "react";
import Header from "@/front-end/components/core/header/Header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default Layout;
