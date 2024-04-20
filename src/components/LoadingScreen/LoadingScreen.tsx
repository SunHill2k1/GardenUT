import React from "react";

//style
import classNames from "classnames/bind";
import style from "./LoadingScreen.module.scss";
//media
import loadingIcon from "~/access/icon/loading.gif";

const cx = classNames.bind(style);
function LoadingScreen() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("loading")}>
        <img
          className={cx("loading-icon")}
          src={loadingIcon}
          alt="loading..."
        />
      </div>
    </div>
  );
}

export default LoadingScreen;
