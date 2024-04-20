//style
import classNames from "classnames/bind";
import style from "./ShipperLayout.module.scss";

import { Link, useNavigate } from "react-router-dom";
import { dispatch, useSelector } from "~/redux/store";
import AvatarCustom from "~/modules/Auth/Components/Avatar/AvatarCustom";

// image
import logo from "~/access/images/logo.png";
import { useState } from "react";
import { authDoLogOut } from "~/redux/slices/auth";
import Modal from "~/components/Modal";
import AuthSetting from "~/modules/Auth/Pages/Auth/AuthSetting";

const cx = classNames.bind(style);

type props = {
  children: any;
};
function ShipperLayout({ children }: props) {
  const { userInfor } = useSelector((state) => state.auth);
  const [popupAccount, setPopupAccount] = useState<boolean>(false);
  const [showModalSetting, setShowModalSetting] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(authDoLogOut);
    navigate("/");
    setPopupAccount(false);
  };

  const handleSetting = () => {
    setPopupAccount(false);
    setShowModalSetting(true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("logo")}>
          <Link to="/shipper">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div
          className={cx("avatar")}
          onClick={() => setPopupAccount(!popupAccount)}
        >
          {userInfor?.Fullname && (
            <AvatarCustom fullName={userInfor?.Fullname} />
          )}
          {popupAccount && (
            <div className={cx("modal-account")}>
              <p className={cx("name")}> {userInfor?.Fullname}</p>
              <hr></hr>
              <div className={cx("item")} onClick={handleSetting}>
                Cài đặt
              </div>
              <hr></hr>
              <div className={cx("item")} onClick={handleLogOut}>
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("children")}>{children}</div>
      </div>

      {showModalSetting && (
        <Modal setShowModal={setShowModalSetting}>
          <AuthSetting setShowModal={setShowModalSetting} />
        </Modal>
      )}
    </div>
  );
}

export default ShipperLayout;
