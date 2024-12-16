import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import UpdateUser from "./UpdateUser.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route
          path="/update_profile/:id"
          element={<UpdateUser></UpdateUser>}
        ></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
