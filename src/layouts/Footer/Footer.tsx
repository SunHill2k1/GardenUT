import React from "react";
//style
import classNames from "classnames/bind";
import style from "./Footer.module.scss";

// image
import logo from "~/access/images/logo.png";
import bgFooter from "~/access/images/footer.jpg";
import { Link } from "react-router-dom";
import { orange } from "@mui/material/colors";

const cx = classNames.bind(style);
function Footer() {
  return (
    <div
      className={cx("footer")}
      style={{ backgroundImage: `url(${bgFooter})`, objectFit: "contain" }}
    >
      <div className={cx("infor")}>
        <div className={cx("logo")}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={cx("infor-item")}>
          <div className={cx("btn")}>
            <i className="bx bxs-map"></i>
          </div>
          <p>70 Tô Ký, Tân Chánh Hiệp, quận 12, TP.HCM</p>
        </div>
        <div className={cx("infor-item")}>
          <div className={cx("btn")}>
            <i className="bx bxs-phone"></i>
          </div>
          <p>0283 8992862</p>
        </div>
        <div className={cx("infor-item")}>
          <div className={cx("btn")}>
            <i className="bx bxs-envelope"></i>
          </div>
          <p>ut-hcmc@ut.edu.vn</p>
        </div>
        
      </div>
      <div className={cx("links")}>
        <div className={cx("link-group")}>
          <div className={cx("link")}>Trang chủ</div>
          <div className={cx("link")}>Sản phẩm</div>
          <div className={cx("link")}>Cây trong nhà</div>
          <div className={cx("link")}>Hoa cưới</div>
          <div className={cx("link")}>Xương rồng</div>
        </div>
        <div className={cx("link-group")}>
          <div className={cx("link")}>Thông tin chung</div>
          <div className={cx("link")}>Đơn hàng</div>
          <div className={cx("link")}>Địa chỉ</div>
          <div className={cx("link")}>Sản phẩm yêu thích</div>
          <div className={cx("link")}>Cài đặt</div>
        </div>
      </div>
      <div className={cx("list-logo")}>
          <div className={cx("logo-item")} style={{ color: "#0075f5" }}>
            <i className="bx bxl-facebook-circle"></i>
          </div>
          <div className={cx("logo-item")} style={{ color: "#01c2f4" }}>
            <i className="bx bxl-twitter"></i>
          </div>
          <div className={cx("logo-item")} style={{ color: "#ff6d00" }}>
            <i className="bx bxl-google-plus-circle"></i>
          </div>
          <div className={cx("logo-item")} style={{ color: "#ee0400" }}>
            <i className="bx bxl-youtube"></i>
          </div>
        </div>
    </div>
  );
}

export default Footer;
