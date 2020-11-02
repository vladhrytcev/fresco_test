import React from "react";
import Header from "../Header";

const HeaderTemplate = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderTemplate;
