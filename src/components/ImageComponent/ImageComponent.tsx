//style
import style from "./ImageComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

type props = {
  src: string;
  alt: string;
  className?: any;
  onClick?: any;
};

function ImageComponent({ src, alt, onClick, className }: props) {
  return (
    <img
      onClick={onClick}
      className={cx("wrapper", {
        [className]: className,
      })}
      src={src}
      alt={alt}
    />
  );
}

export default ImageComponent;
