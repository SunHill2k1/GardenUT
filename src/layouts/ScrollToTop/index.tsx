import classNames from "classnames/bind";
import style from './ScrollToTop.module.scss'

import { useState, useEffect } from "react";

const cx = classNames.bind(style);
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      <button
        className={isVisible ? cx("scrollToTop", "active") : cx("scrollToTop")}
        onClick={scrollToTop}
      >
        <div className={cx("icon-scroll")}><i className='bx bxs-chevron-up' ></i></div>
      </button>
    </div>
  );
}

export default ScrollToTop;
