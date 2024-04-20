import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//style
import GlobalStyle from "./components/GlobalStyle";
import { SnackbarProvider } from "notistack";
//redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <GlobalStyle>
      <SnackbarProvider
        iconVariant={{
          success: (
            <i
              style={{ fontSize: "40px", marginRight: "8px" }}
              className="bx bx-happy-beaming"
            ></i>
          ),
          error: (
            <i
              style={{ fontSize: "40px", marginRight: "8px" }}
              className="bx bx-tired"
            ></i>
          ),
          warning: "⚠️",
          info: (
            <i
              style={{ fontSize: "40px", marginRight: "8px" }}
              className="bx bx-cart-add"
            ></i>
          ),
        }}
      >
        <App />
      </SnackbarProvider>
    </GlobalStyle>
  </ReduxProvider>
  // </React.StrictMode>
);
