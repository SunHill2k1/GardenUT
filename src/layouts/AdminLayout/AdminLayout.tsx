import React from "react";

//style
import classNames from "classnames/bind";
import style from "./AdminLayout.module.scss";

//component
import Sidebar from "../Sidebar";
import Header from "../Header";

const cx = classNames.bind(style);

type props = {
  children: any;
};

function AdminLayout({ children }: props) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* <Header /> */}
        <Sidebar />
        <div className={cx("content")}>
          <div className={cx("children")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
