import profilePic from "../images/profile.png";
import { useState, useRef } from "react";
import {
  HiCalendar,
  HiChartBar,
  HiEmojiHappy,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiOutlineXCircle,
  HiXCircle,
} from "react-icons/hi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useCreateTweetMutation } from "../store/mainApi";

function Input({ placeholder, tweetId }) {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);
  const [createTweet] = useCreateTweetMutation();

  function addImageToTweet() {}

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  function createTweetHandler() {
    const tweetData = {
      content: input,
      parent_tweet_id: tweetId,
    };
    console.log(tweetData);
    createTweet(tweetData);
  }

  return (
    <div
      className={`border-b border-greyBorder p-3 flex space-x-3 overflow-y-scroll `}
    >
      <img
        src={profilePic}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-greyBorder">
        <div className={``}>
          <textarea
            className="bg-transparent outline-none text-blackText text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder={placeholder}
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

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div
              className="icon"
              onClick={() => {
                filePickerRef.current.click();
              }}
            >
              <HiOutlinePhotograph className="h-[22px] w-[22px] text-[#1d9bf0]" />
              <input
                type="file"
                hidden
                onChange={addImageToTweet}
                ref={filePickerRef}
              />
            </div>

            <div className="icon rotate-90">
              <HiOutlineChartBar className="text-[#1d9bf0] h-[22px] w-[22px]" />
            </div>
            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <HiOutlineEmojiHappy className="text-[#1d9bf0] h-[22px] w-[22px]" />
            </div>
            <div className="icon">
              <HiOutlineCalendar className="text-[#1d9bf0] h-[22px] w-[22px]" />
            </div>
            {showEmojis && (
              <Picker
                onEmojiSelect={addEmoji}
                style={{
                  position: "absolute",
                  marginTop: "465px",
                  marginLeft: -40,
                  maxWidth: "320px",
                  borderRadius: "20px",
                }}
                theme="dark"
              />
            )}
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input.trim() && !selectedFile}
            onClick={createTweetHandler}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
