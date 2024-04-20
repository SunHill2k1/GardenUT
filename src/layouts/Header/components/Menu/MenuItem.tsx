import { useState } from "react";

//style
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
// component
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";

const cx = classNames.bind(style);

type props = {
  data?: any;
  className?: string;
};

function MenuItem({ data, className }: props) {
  const { label, icon, path } = data;

  const [visible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return data?.children ? (
    <div
      className={
        visible
          ? cx("menu-item", "visible", className)
          : cx("menu-item", className)
      }
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {icon}
      <Button to="/" className={cx("menu-btn")}>
        {label}
      </Button>
      {data?.children && (
        <div className={cx("menu-item-child")}>
          {data?.children.map((item: any, index: number) => (
            <MenuItem key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <div
      onClick={() => handleClick(path)}
      className={cx("menu-item", className)}
    >
      {icon}
      <Button to={path} className={cx("menu-btn")}>
        {label}
      </Button>
    </div>
  );
}

export default MenuItem;
