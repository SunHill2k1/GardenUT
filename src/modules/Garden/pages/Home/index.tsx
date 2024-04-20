import React, { useEffect } from "react";
//style
import classNames from "classnames/bind";
import style from "./Home.module.scss";
//media
import image3 from "~/access/images/image3.png";
import image5 from "~/access/images/image5.png";
import image6 from "~/access/images/image6.png";
import hoasn from "~/access/images/hoasn.jpg";

//redux
import { useSelector, useDispatch } from "~/redux/store";

//components
import HeroSlide from "../../components/HeroSlide/HeroSlide";
import Button from "../../../../components/Button";
import ProductItem from "../../components/ProductItem";
import { getTopNewProducts } from "~/redux/slices/product";
import { Link } from "react-router-dom";
import LoadingScreen from "~/components/LoadingScreen";

const cx = classNames.bind(style);

function Home() {
  const { productList: topNewProductList, isLoading } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopNewProducts());
  }, []);

  return (
    <div className={cx("home")}>
      <HeroSlide />

      <div className="container">
        <div className={cx("category")}>
          <div className={cx("box-item")}>
            <div className={cx("category-item")}>
              <div className={cx("image")}>
                <img src={image3} />
              </div>
              <div>
                {/* <span>Giảm giá</span> */}
                <div className={cx("name")}>Cây Cảnh</div>
                <Link to="/products" className={cx("shop-now")}>
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("box-item")}>
            <div className={cx("category-item")}>
              <div className={cx("image")}>
                <img src={image6} />
              </div>
              <div>
                <div className={cx("name")}>Hoa Cưới</div>
                <Link to="/products" className={cx("shop-now")}>
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
          <div className={cx("box-item")}>
            <div className={cx("category-item")}>
              <div className={cx("image")}>
                <img src={hoasn} />
              </div>
              <div>
                {/* <span>Giảm giá</span> */}
                <div className={cx("name")}>Hoa Sinh Nhật</div>
                <Link to="/products" className={cx("shop-now")}>
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("service")}>
        <div className="container">
          <div className={cx("service-list")}>
            <div className={cx("service-item")}>
              <div className={cx("icon")}>
                <i className="bx bxs-truck"></i>
              </div>
              <div className={cx("content")}>
                <div className={cx("title")}>Miễn phí giao hàng</div>
                <div className={cx("desc")}>Đơn hàng trên 50000 VNĐ</div>
              </div>
            </div>
            <div className={cx("service-item")}>
              <div className={cx("icon")}>
                <i className="bx bxs-contact"></i>
              </div>
              <div className={cx("content")}>
                <div className={cx("title")}>Dịch vụ thân thiện</div>
                <div className={cx("desc")}>
                  Hoàn trả hàng trong vòng 30 ngày
                </div>
              </div>
            </div>
            <div className={cx("service-item")}>
              <div className={cx("icon")}>
                <i className="bx bxs-wallet-alt"></i>
              </div>
              <div className={cx("content")}>
                <div className={cx("title")}>Thanh toán nhanh</div>
                <div className={cx("desc")}>100% thanh toán an toàn</div>
              </div>
            </div>
            <div className={cx("service-item")}>
              <div className={cx("icon")}>
                <i className="bx bx-support"></i>
              </div>
              <div className={cx("content")}>
                <div className={cx("title")}>Hỗ trợ 24/7</div>
                <div className={cx("desc")}>Hỗ trợ nhanh chóng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={cx("trending-products")}>
          <div className={cx("title")}>
            <h4>Sản phẩm thịnh hành</h4>
          </div>
          <div className={cx("list-product")}>
            {isLoading && <LoadingScreen />}
            {topNewProductList &&
              topNewProductList.map((product, index) => (
                <ProductItem data={product} key={index} />
              ))}
          </div>
        </div>
      </div>

      <div className={cx("best-outdoor-plants")}>
        <div className="container">
          <div className={cx("container-item")}>
            <div className={cx("image")}>
              <img src={image5} alt="" />
            </div>
            <div className={cx("content")}>
              <span className={cx("sale")}>Giảm giá siêu tận hưởng 20%</span>
              <h2>Cây trong nhà tốt nhất</h2>
              <div className={cx("desc")}>
                Một khu vườn là một phức hợp của ý định thẩm mỹ và nhựa; và thực
                vật, đối với một nghệ sĩ phong cảnh, không chỉ là một loài thực
                vật - hiếm, khác thường, bình thường hoặc sắp biến mất - mà bản
                thân nó còn là một màu sắc, một hình dạng, một thể tích hoặc một
                nét vẽ.
              </div>
              <Button to="/products" primary large>
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("use-plants")}>
        <div className="container">
          <div className={cx("container-item")}>
            <div className={cx("content")}>
              <h2>Cách chăm sóc cây cảnh</h2>
              <div className={cx("desc")}>
                Biết các bạn cũng yêu cây cối biết bao nhiêu. Chúng tôi quyết
                định tập hợp một hướng dẫn thực vật, một cái gì đó dành cho bạn.
              </div>
              <Button to="/products" primary large>
                Mua ngay
              </Button>
              <div className={cx("info")}>
                <div>
                  <div>Chiều cao</div>
                  <span>150 CM</span>
                </div>
                <div>
                  <div>Chiều dài</div>
                  <span>70 CM</span>
                </div>
                <div>
                  <div>Trọng lượng</div>
                  <span>20 KG</span>
                </div>
              </div>
            </div>
            <div className={cx("image")}>
              <img src={image3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
