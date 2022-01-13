import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import Main from "./page/Main";

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
