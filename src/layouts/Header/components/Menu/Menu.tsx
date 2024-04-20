/* eslint-disable array-callback-return */
//style
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import style from "./Menu.module.scss";

//component
import MenuItem from "./MenuItem";

const cx = classNames.bind(style);

type props = {
  items: any;
  className?: any;
};

function Menu({ items, className }: props) {
  return (
    <div className={cx("menu-list", className)}>
      {items.map((item: any, index: number) => (
        <MenuItem key={index} data={item} />
      ))}
    </div>
  );
}

export default Menu;
