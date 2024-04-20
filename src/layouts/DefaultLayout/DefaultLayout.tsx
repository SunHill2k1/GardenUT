import React from "react";
import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
import Header from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
const cx = classNames.bind(style);

type props = {
  children: JSX.Element;
};

function DefaultLayout({ children }: props) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      {children}
      <ScrollToTop/>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
