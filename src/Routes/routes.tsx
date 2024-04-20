import { lazy } from "react";
//Public
import Home from "~/modules/Garden/pages/Home";
import Cart from "~/modules/Garden/pages/Cart";
import Order from "~/modules/Garden/pages/Order";
import Products from "~/modules/Garden/pages/Products";
import ProductDetail from "~/modules/Garden/components/ProductDetail";
import Search from "~/modules/Garden/pages/Search";
import LoadingScreen from "~/components/LoadingScreen";
import Checkout from "~/modules/Garden/pages/Checkout/Checkout";

// Auth
import Auth from "~/modules/Auth/Pages/Auth";
import Login from "~/modules/Auth/Pages/Login";
import Register from "~/modules/Auth/Pages/Register/Register";

// admin
import AdminLayout from "~/layouts/AdminLayout";
import { default as UserManage } from "~/modules/Admin/pages/Users";
import { default as OrderManage } from "~/modules/Admin/pages/Orders";
import { default as ProductsManage } from "~/modules/Admin/pages/Products";
import UploadProduct from "~/modules/Admin/pages/UploadProduct";
import EditProduct from "~/modules/Admin/pages/UploadProduct/EditProduct";
import AuthSetting from "~/modules/Auth/Pages/Auth/AuthSetting";

import ShipperLayout from "~/layouts/ShipperLayout";
import Shipper from "~/modules/Shipper/pages";
import ShipperDetail from "~/modules/Shipper/pages/ShipperDetail";
import ShipperMap from "~/modules/Shipper/pages/ShiperMap";

type routeType = {
  path: string;
  component: JSX.Element | React.ReactNode | React.FunctionComponent;
  layout?: React.FC<any>;
};

const HomeLazy = lazy(() => import("~/modules/Garden/pages/Home"));
const ProductLazy = lazy(() => import("~/modules/Garden/pages/Products"));
const ProductDetailLazy = lazy(
  () => import("~/modules/Garden/components/ProductDetail")
);
const SearchLazy = lazy(() => import("~/modules/Garden/pages/Search"));
const CartLazy = lazy(() => import("~/modules/Garden/pages/Cart"));

const OrderLazy = lazy(() => import("~/modules/Garden/pages/Order"));
const CheckoutLazy = lazy(
  () => import("~/modules/Garden/pages/Checkout/Checkout")
);

// const LoginLazy = lazy(() => import("~/modules/Auth/Pages/Login"));
const RegisterLazy = lazy(
  () => import("~/modules/Auth/Pages/Register/Register")
);

// Shipper
const ShipperLazy = lazy(() => import("~/modules/Shipper/pages"));
const ShipperMapLazy = lazy(() => import("~/modules/Shipper/pages/ShiperMap"));
const ShipperDetailLazy = lazy(
  () => import("~/modules/Shipper/pages/ShipperDetail")
);

const shippingLazy = lazy(() => import("~/modules/Shipper/pages/Shipping"));

const AuthLazy = lazy(() => import("~/modules/Auth/Pages/Auth"));
const UserManagerLazy = lazy(() => import("~/modules/Admin/pages/Users"));
const OrderManageLazy = lazy(() => import("~/modules/Admin/pages/Orders"));
const ProductsManageLazy = lazy(() => import("~/modules/Admin/pages/Products"));
const GeneralLazy = lazy(() => import("~/modules/Admin/pages/General"));

export const publicRoutes: routeType[] = [
  { path: "/", component: HomeLazy },
  { path: "/products", component: ProductLazy },
  { path: "/products/type/:idType", component: ProductLazy },
  { path: "/products/:id", component: ProductDetailLazy },
  { path: "/products/search/:search", component: SearchLazy },
  { path: "/cart", component: CartLazy },
  { path: "/order", component: OrderLazy },
  { path: "/checkout", component: CheckoutLazy },
  { path: "/login", component: Login },
  { path: "/register", component: RegisterLazy },
  { path: "*", component: LoadingScreen },
  { path: "/auth", component: Auth },
  { path: "/auth/settings", component: AuthSetting },
];

export const privateRoutes: routeType[] = [
  { path: "/admin", component: GeneralLazy, layout: AdminLayout },
  { path: "/admin/users", component: UserManagerLazy, layout: AdminLayout },
  { path: "/admin/orders", component: OrderManageLazy, layout: AdminLayout },
  { path: "/admin/general", component: GeneralLazy, layout: AdminLayout },
  {
    path: "/admin/products",
    component: ProductsManageLazy,
    layout: AdminLayout,
  },
  {
    path: "/admin/product/edit/:id",
    component: EditProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/products/upload",
    component: UploadProduct,
    layout: AdminLayout,
  },
  // shipper
  { path: "/shipper", component: ShipperLazy, layout: ShipperLayout },
  { path: "/shipping", component: shippingLazy, layout: ShipperLayout },
  { path: "/shipper/:id", component: ShipperDetailLazy, layout: ShipperLayout },
  {
    path: "/shipper/:id/map/:address",
    component: ShipperMapLazy,
    layout: ShipperLayout,
  },
];
