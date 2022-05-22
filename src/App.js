import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./container/Home/Home";
import Signup from "./container/Signup/Signup";
import Signing from "./container/Signing/Signing";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./action";
import Products from "./container/Products/Products";
import Orders from "./container/Orders/Orders";
const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signing" element={<Signing />} />
      </Routes>
    </div>
  );
};

export default App;
