import profilePic from "../images/profile.png";
import { useState } from "react";
import {
  HiOutlinePhotograph,
  HiOutlineXCircle,
  HiXCircle,
} from "react-icons/hi";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll `}
    >
      <img
        src={profilePic}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={``}>
          <textarea
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="What's happening?"
            value={input}
            rows="2"
          />

          {selectedFile && (
            <div className="relative">
              <div
                onClick={() => {
                  setSelectedFile(null);
                }}
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full items-center justify-center top-1 left-1 cursor-pointer"
              >
                <HiXCircle className="text-white h-5 w-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <HiOutlinePhotograph className="h-[22px] text-[#1d9bf0]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
