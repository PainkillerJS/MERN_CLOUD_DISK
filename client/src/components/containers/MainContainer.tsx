import "./normalize.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "../UI/Header";
import { Modal } from "../UI/Modal";

export const MainContainer = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/auth/:action" element={<Modal />} />
      </Routes>
    </Router>
  );
};
