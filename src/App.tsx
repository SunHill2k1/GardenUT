import { Fragment, Suspense, useEffect } from "react";
//router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { privateRoutes, publicRoutes } from "./Routes";
// -----------------
import { useSelector, dispatch } from "./redux/store";
import { getProducts } from "./redux/slices/product";
import Home from "./modules/Garden/pages/Home";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { authGetInfor, authRefreshToken } from "./redux/slices/auth";
import LoadingScreen from "./components/LoadingScreen";
import { getFavoriteList } from "./redux/slices/favorite";

function App() {
  const { userInfor } = useSelector((state) => state.auth);
  // console.log(userInfor);

  const fetchAuth = async () => {
    try {
      await dispatch(authGetInfor());
      await dispatch(authRefreshToken());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  useEffect(() => {
    if (userInfor) {
      dispatch(getFavoriteList());
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* private */}
          {privateRoutes.map((route, index) => {
            const Page: any = route.component;
            let Layout: any = DefaultLayout;

            if (route?.layout) {
              Layout = route?.layout;
            } else if (route?.layout === null) {
              // eslint-disable-next-line no-undef
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Suspense fallback={<LoadingScreen />}>
                      <PrivateRoutes>
                        <Page />
                      </PrivateRoutes>
                    </Suspense>
                  </Layout>
                }
              />
            );
          })}
          {/* public */}
          {publicRoutes.map((route, index) => {
            const Page: any = route.component;
            let Layout: any = DefaultLayout;

            if (route?.layout) {
              Layout = route?.layout;
            } else if (route?.layout === null) {
              // eslint-disable-next-line no-undef
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Layout>
                      <Page />
                    </Layout>
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
