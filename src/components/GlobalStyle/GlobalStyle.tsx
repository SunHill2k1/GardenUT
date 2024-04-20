import "./GlobalStyle.scss";

type props = {
  children: JSX.Element;
};

function GlobalStyle({ children }: props) {
  return children;
}

export default GlobalStyle;
