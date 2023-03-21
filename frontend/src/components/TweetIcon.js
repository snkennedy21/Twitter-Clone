import { useState } from "react";

function TweetIcon({
  Icon,
  backgroundColor,
  textColor,
  rotate,
  clickFunction,
  number,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={clickFunction}
      className="flex items-center gap-1"
    >
      <div
        className={`rounded-full p-2 transition ${
          isHovered ? backgroundColor : ""
        }`}
      >
        <Icon
          className={`h-5 w-5 transition ${isHovered ? textColor : ""} ${
            rotate && "-rotate-90"
          }`}
        />
      </div>
      <span className={`text-sm transition ${isHovered ? textColor : ""}`}>
        {number}
      </span>
    </div>
  );
}

export default TweetIcon;
