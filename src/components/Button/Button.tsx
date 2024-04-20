//style
import styles from "./Button.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Fragment, ReactNode } from "react";

const cx = classNames.bind(styles);

type props = {
  to?: string;
  href?: string;
  primary?: boolean;
  outline?: boolean;
  text?: boolean;
  rounded?: boolean;
  iconOnly?: boolean;
  shadow?: boolean;
  small?: boolean;
  large?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: any;
  children?: any;
  onClick?: Function;
  onMouseEnter?: Function;
  onMouseLeave?: Function;
  onBlur?: Function;
};

export default function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  iconOnly = false,
  shadow = false,
  small = false,
  large = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onBlur,
  ...passProps
}: props) {
  const props: { [key: string]: any } = {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onBlur,
    to,
    href,
    ...passProps,
  };

  let Comp: React.ElementType = "button";

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  //Remove event listener when button is disabled
  if (disabled) {
    Object.keys(props).forEach((key: any) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  const classes = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    text,
    rounded,
    iconOnly,
    shadow,
    small,
    large,
    disabled,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}
