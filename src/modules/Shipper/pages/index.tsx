import {useState } from "react";
import classNames from "classnames/bind";
import style from "./Shipper.module.scss";
import { useSelector } from "~/redux/store";
import LoadingScreen from "~/components/LoadingScreen";
import Shipping from "./Shipping";
import ShippingDone from "./Shipping/ShippingDone";
import ShippingNew from "./Shipping/ShippingNew";

const cx = classNames.bind(style);

function Shipper() {
  const { isLoading } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState("new");
  return (
    <div className="container">
      <div className={cx("shipper")}>
        {isLoading && <LoadingScreen />}

        <div className={cx("tabs")}>
          <div
            className={
              activeTab == "new" ? cx("tab-item", "active") : cx("tab-item")
            }
            onClick={() => setActiveTab("new")}
          >
            Đơn mới
          </div>
          <div
            className={
              activeTab == "processing"
                ? cx("tab-item", "active")
                : cx("tab-item")
            }
            onClick={() => setActiveTab("processing")}
          >
            Đang giao
          </div>
          <div
            className={
              activeTab == "done" ? cx("tab-item", "active") : cx("tab-item")
            }
            onClick={() => setActiveTab("done")}
          >
            Đã giao
          </div>
        </div>
        {/* Đơn mới */}
        {activeTab == "new" && <ShippingNew />}

        {/* Đang giao */}
        {activeTab == "processing" && <Shipping />}

        {/* Đã giao */}
        {activeTab === "done" && <ShippingDone />}
      </div>
    </div>
  );
}

export default Shipper;
