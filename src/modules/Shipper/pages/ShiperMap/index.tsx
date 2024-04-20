import classNames from "classnames/bind";
import style from "./Map.module.scss";
import Button from "~/components/Button";
import Map from "~/components/Map";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "~/redux/store";
import {
  getOrderDetail,
  shipperDoneOrder,
  shipperTakeOrder,
} from "~/redux/slices/order";
import LoadingScreen from "~/components/LoadingScreen";
import { useSnackbar } from "notistack";

const cx = classNames.bind(style);

const api_key = "AIzaSyDYD9JqsEEPxMNNF4Hkiz5R6MRidEu0AhM";

function ShipperMap() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const params = useParams();

  const { address, id } = params;

  const { orderSelected, isLoading } = useSelector((state) => state.order);

  // const api_key = "AIzaSyB5oqhddnQVcOLFayrEurhz7-eEJtyIj_M";

  const [addressPos, setAddressPos] = useState<any>({
    lat: 10.8651766,
    lng: 106.6163858,
  });

  const fetchPostition = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidHJhbmRvbmciLCJhIjoiY2xiNXp5MHF2MDcyYTNubGVtYmsxZGtscCJ9.cBh0MPsJtN7haJeTt1uQPA`
      );

      setAddressPos({
        lng: response.data.features[0].center[0],
        lat: response.data.features[0].center[1],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostition();
  }, [id, address]);

  const handleDelivery = () => {
    const response = dispatch(shipperTakeOrder({ idOrder: id })).then((res) => {
      if (res?.data.message === "Thành công") {
        enqueueSnackbar("Thành công", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
      dispatch(getOrderDetail({ idOrder: id }));
    });
  };

  const navigate = useNavigate();

  const handleDoneOrder = () => {
    const response = dispatch(shipperDoneOrder({ idOrder: id })).then((res) => {
      if (res?.data.message === "Thành công") {
        enqueueSnackbar("Thành công", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        navigate(-2);
      }
    });
  };

  return (
    <div className={cx("shipper-map")}>
      {isLoading && <LoadingScreen />}
      <div className={cx("map")}>
        {address && (
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDKnOQHCyoF9gVlfFMvJP9uC7JYghHjxD0&libraries=places&callback=initMap`}
            containerElement={
              <div
                style={{
                  height: `100%`,
                  margin: `auto`,
                }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
            loadingElement={<LoadingScreen />}
            addressLat={addressPos.lat}
            addressLng={addressPos.lng}
            addressText={address}
          />
        )}
      </div>

      {/* button */}
      <div className={cx("delivery")}>
        <div className={cx("name")}>
          <i className="bx bx-user"></i>
          {orderSelected[0]?.idOrderNavigation?.idUserNavigation?.fullName}
        </div>
        <div className={cx("phone")}>
          <i className="bx bxs-phone"></i>
          {orderSelected[0]?.idOrderNavigation?.idUserNavigation?.phoneNumber}
        </div>
        {orderSelected[0]?.idOrderNavigation?.status === 8 || orderSelected[0]?.idOrderNavigation?.status === 9 ? (
          <Button onClick={handleDoneOrder} primary>
            Đã giao
          </Button>
        ) : (
          <Button onClick={handleDelivery} primary>
            Giao hàng
          </Button>
        )}
      </div>
    </div>
  );
}

export default ShipperMap;
