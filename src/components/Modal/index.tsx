import classNames from "classnames/bind";
import style from "./Modal.module.scss";

const cx = classNames.bind(style);

type props = {
  setShowModal: Function;
  children?: JSX.Element;
};

function Modal({ children, setShowModal }: props) {
  return (
    <div className={cx("modal-container")}>
      <div className={cx("overlay")} onClick={() => setShowModal(false)}></div>
      <div className={cx("modal")}>
        <div className={cx("modal-header")}>
          <div className={cx("btn-close")} onClick={() => setShowModal(false)}>
            <i className="bx bx-x"></i>
          </div>
        </div>
        <div className={cx("modal-content")}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
