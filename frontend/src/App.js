import "./App.css";
import Test from "./components/Test";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HiBeaker } from "react-icons/hi";
import profile from "./images/profile.png";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
import Modal from "./components/Modal";

function App() {
  return (
    <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
      <SideBar />
      <Feed />
      <Modal />
      {/* <SignupBar /> */}
    </main>
  );
}

export default App;
