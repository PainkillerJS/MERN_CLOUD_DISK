import "./common/normalize.scss";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store/store";
import Main from "./page/Main";
import Auth from "./page/Auth";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
        </Route>
        <Route path="/auth">
          <Route path=":action" element={<Auth />} />
        </Route>
      </Routes>
    </Provider>
  </Router>,
  document.getElementById("root")
);
