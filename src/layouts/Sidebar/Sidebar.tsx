import React from "react";

//style
import classNames from "classnames/bind";
import style from "./Sidebar.module.scss";
//router-dom
import { useLocation, Link } from "react-router-dom";

//redux

//component
import logo from "~/access/images/logo.png";

const cx = classNames.bind(style);

type tabProps = {
  label: string;
  icon: JSX.Element;
  path: string;
};
const TABS: tabProps[] = [
  {
    label: "General",
    icon: <></>,
    path: "/admin",
  },
  {
    label: "User",
    icon: <></>,
    path: "/admin/users",
  },
  {
    label: "Order",
    icon: <></>,
    path: "/admin/orders",
  },
  {
    label: "Product",
    icon: <></>,
    path: "/admin/products",
  },
];

function Sidebar() {
  const { pathname } = useLocation();

  const active = TABS.findIndex((e) => e.path === pathname);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <ul className={cx("menu")}>
        {TABS.map((tab, i) => (
          <Link to={tab.path} key={i}>
            <li
              className={`${
                i === active ? cx("nav-link", "active") : cx("nav-link")
              }`}
            >
              {tab.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
