import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
import Modal from "./components/Modal";
import SignupBar from "./components/SignupBar";
import CurrentTweet from "./components/CurrentTweet";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { invalidateToken, validateToken } from "./store/tokenSlice";
import { useDispatch } from "react-redux";
import React from "react";
import BottomBar from "./components/BottomBar";
import ProfilePage from "./components/ProfilePage";

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

  return (
    <React.Fragment>
      <BrowserRouter>
        <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
          <SideBar />
          <Feed>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tweets/:tweetId" element={<CurrentTweet />} />
            </Routes>
          </Feed>

          <Modal>{/* <Login /> */}</Modal>
        </main>
        {token ? <BottomBar /> : <SignupBar />}
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
