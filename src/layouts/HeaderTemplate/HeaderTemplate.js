import React from "react";
import Header from "../../components/Header";

const HeaderTemplate = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderTemplate;
