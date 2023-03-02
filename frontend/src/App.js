import "./App.css";
import Test from "./components/Test";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HiBeaker } from "react-icons/hi";
import profile from "./images/profile.png";
import SideBar from "./components/SideBar";

function App() {
  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <SideBar />
    </main>
  );
}

export default App;
