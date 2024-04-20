import React, { useEffect, useState } from "react";
//hook
import useDebounce from "~/hooks/useDebounce";
//style
import style from "./Header.module.scss";
import classNames from "classnames/bind";
// image
import logo from "~/access/images/logo.png";

//route
import { Link, Navigate, useNavigate } from "react-router-dom";

//redux
import { dispatch, useSelector } from "~/redux/store";
import { authDoLogOut, authGetInfor } from "~/redux/slices/auth";

//components
import Button from "../../components/Button";
import ImageComponent from "~/components/ImageComponent";
import Menu from "~/layouts/Header/components/Menu";
import SearchInput from "~/components/SearchInput";
import MenuItem from "./components/Menu/MenuItem";
import Modal from "~/components/Modal";
import AuthSetting from "~/modules/Auth/Pages/Auth/AuthSetting";
import AvatarCustom from "~/modules/Auth/Components/Avatar/AvatarCustom";
import SearchResult from "./components/SearchResult";
import { getProductService } from "~/services/productServices";
import { product } from "~/@types/product";

const cx = classNames.bind(style);

type navProps = {
  label: string;
  path?: string;
  icon?: React.ReactElement | string;
  children?: navProps[];
};
const NAV: navProps[] = [
  {
    label: "Trang chủ",
    path: "/",
    icon: <i className="bx bxs-home"></i>,
  },
  {
    label: "Sản phẩm",
    path: "/products",
    icon: <i className="bx bx-leaf"></i>,
  },
  {
    label: "Cây cảnh",
    // path: "",
    icon: <i className="bx bxs-tree"></i>,
    children: [
      {
        label: "Cây trong nhà",
        path: "/products/type/1",
        icon: "",
      },
      {
        label: "Cây văn phòng",
        path: "/products/type/2",
        icon: "",
      },
    ],
  },
  {
    label: "Hoa",
    // path: "",
    icon: <i className="bx bxs-florist"></i>,
    children: [
      {
        label: "Hoa sinh nhật",
        path: "/products/type/5",
        icon: "",
      },
      {
        label: "Hoa cưới",
        path: "/products/type/6",
        icon: "",
      },
    ],
  },
  {
    label: "Khác",
    // path: "",
    icon: <i className="bx bx-spa"></i>,
    children: [
      {
        label: "Xương rồng",
        path: "/products/type/3",
        // icon: <i className="bx bxs-virus"></i>,
      },
      {
        label: "Sen đá",
        path: "/products/type/4",
        icon: "",
      },
    ],
  },
];

const USER_NAV: navProps[] = [
  { label: "Nguyen Van A", path: "/user", icon: "" },
  { label: "Log-out", path: "/", icon: "" },
];

function Header() {
  // ===========================================================================FIX HEADER
  const [isFixedHeader, setIsFixedHeader] = useState<boolean>(false);

  const toggleFixHeader = () => {
    if (window.pageYOffset > 50) {
      setIsFixedHeader(true);
    } else {
      setIsFixedHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleFixHeader);
    return () => {
      window.removeEventListener("scroll", toggleFixHeader);
    };
  }, []);

  // ============================================================================NAVIGATION
  const [showNav, setShowNav] = useState<boolean>(false);

  // =============================================================================IS LOGIN
  const { userInfor } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfor) {
      dispatch(authGetInfor());
    }
  }, [userInfor]);

  // =============================================================================SEARCH
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [resultList, setResultList] = useState<product[]>([]);

  const handleChangeValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      navigate(`/products/search/${searchValue}`);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const search = useDebounce(searchValue, 500);

  const fetchSearchResult = async () => {
    const response = await getProductService({
      idType: -1,
      search: search,
    });
    setResultList(response.data);
  };

  useEffect(() => {
    if (search) {
      fetchSearchResult();
    }
    return () => {
      setResultList([]);
    };
  }, [search]);

  // =============================================================================CART
  const { inCart } = useSelector((state) => state.auth);
  const totalProduct = inCart.reduce(
    (acc: any, item: any) => acc + item.amountInCart,
    0
  );

  // =============================================================================ACCOUNT
  const [popupAccount, setPopupAccount] = useState<boolean>(false);
  const [showModalSetting, setShowModalSetting] = useState<boolean>(false);
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
    <div className={cx("container")}>
      <div
        className={
          isFixedHeader
            ? cx("container-header", "fixed")
            : cx("container-header")
        }
      >
        <Button
          iconOnly
          rightIcon={<i className="bx bx-menu"></i>}
          onClick={() => setShowNav(!showNav)}
          className={cx("nav-btn")}
        />

        <div className={cx("logo")}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        {/* =============================================================================navigation */}

        <div className={cx("nav", showNav ? "show" : "")}>
          <div className={cx("nav-list")}>
            {showNav && (
              <>
                <Button
                  iconOnly
                  rightIcon={<i className="bx bx-x"></i>}
                  onClick={() => setShowNav(false)}
                  className={cx("close-btn")}
                />
              </>
            )}
            {NAV.map((item: any, index: number) => (
              <MenuItem key={index} data={item} className={cx("nav-item")} />
            ))}
          </div>

          {/* <Menu items={NAV} className={cx("nav-menu")} /> */}
        </div>

        {/* action */}
        <div className={cx("header-right")}>
          {/* ======================================================================SEARCH */}
          <div className={cx("search")}>
            <div className={cx("search-bar", showSearchInput ? "active" : "")}>
              <SearchInput
                type="text"
                placeHolder="Tìm kiếm"
                value={searchValue}
                handleChangeValue={handleChangeValue}
                handleSearch={handleSearch}
              />
              {resultList.length && showSearchInput ? (
                <SearchResult resultList={resultList} />
              ) : (
                ""
              )}
            </div>
            <Button
              iconOnly
              rightIcon={<i className="bx bx-search"></i>}
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={cx("search-btn")}
            />
          </div>
          {/* =============================================================================CART */}
          {
            <>
              {/* <div> */}
              <Button
                rightIcon={<i className="bx bx-cart-alt"></i>}
                to={"/cart"}
                className={cx("btn-cart", "actions-btn")}
              >
                {inCart.length !== 0 ? (
                  <span className={cx("amount-cart")}>{totalProduct}</span>
                ) : (
                  ""
                )}
              </Button>
              {/* </div> */}

              {/* ==========================================================================USER */}
              {userInfor ? (
                <div className={cx("user")}>
                  <div
                    className={cx("avata")}
                    onClick={() => setPopupAccount(!popupAccount)}
                  >
                    {userInfor?.Fullname && (
                      <AvatarCustom fullName={userInfor?.Fullname} />
                    )}
                    {/* <ImageComponent
                      src={logo}
                      alt="avata"
                      onClick={() => setPopupAccount(!popupAccount)}
                    /> */}
                  </div>
                  {popupAccount && (
                    <div className={cx("modal-account")}>
                      <p className={cx("name")}> {userInfor?.Fullname}</p>
                      <hr></hr>
                      <div
                        onClick={() => {
                          navigate("/auth");
                          setPopupAccount(false);
                        }}
                        className={cx("item")}
                      >
                        Hồ sơ của bạn
                      </div>
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
              ) : (
                <Button
                  rightIcon={<i className="bx bx-user"></i>}
                  // onClick={() => alert("show modal")}
                  to={"/login"}
                  className={cx("actions-btn")}
                />
              )}
            </>
          }
        </div>
      </div>
      {showModalSetting && (
        <Modal setShowModal={setShowModalSetting}>
          <AuthSetting setShowModal={setShowModalSetting} />
        </Modal>
      )}
    </div>
  );
}

export default Header;
