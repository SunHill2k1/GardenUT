import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authDoLogin } from "~/redux/slices/auth";
import { dispatch, useSelector } from "~/redux/store";

type props = {
  children: any;
};

function PrivateRoutes({ children }: props) {
  const { userInfor } = useSelector((state) => state.auth);

  return userInfor?.role === "Admin" || userInfor?.role === "Shipper" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
