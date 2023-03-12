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
import Login from "./components/Login";

function App() {
  return (
    <>
      <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
        <SideBar />
        <Feed />
        <Modal>{/* <Login /> */}</Modal>
      </main>
      <SignupBar />
    </>
  );
}

export default App;
