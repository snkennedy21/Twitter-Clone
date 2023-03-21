import "./App.css";
import Test from "./components/Test";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HiBeaker } from "react-icons/hi";
import profile from "./images/profile.png";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
import Modal from "./components/Modal";
import SignupBar from "./components/SignupBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { invalidateToken, validateToken } from "./store/tokenSlice";
import { useDispatch } from "react-redux";
import React from "react";

function App() {
  const token = useSelector((state) => state.token).token;
  const dispatch = useDispatch();

  useEffect(() => {
    const authorizationCookie = document.cookie;
    if (authorizationCookie === "session=true") {
      dispatch(validateToken());
    } else {
      dispatch(invalidateToken());
    }
  });

  console.log("User Is Logged In:", token);
  return (
    <React.Fragment>
      <BrowserRouter>
        <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
          <SideBar />
          <Feed>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/home" element={<Test />} />
            </Routes>
          </Feed>

          <Modal>{/* <Login /> */}</Modal>
        </main>
        <SignupBar />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
