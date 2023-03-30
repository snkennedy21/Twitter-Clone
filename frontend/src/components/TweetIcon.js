import { useState } from "react";

function TweetIcon({
  Icon,
  backgroundColor,
  textColor,
  rotate,
  clickFunction,
  number,
  iconToggled,
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
          className={`h-5 w-5 transition hover:cursor-pointer ${
            isHovered ? textColor : ""
          } ${rotate && "-rotate-90"} ${iconToggled ? textColor : ""}`}
        />
      </div>
      <span
        className={`text-sm transition ${isHovered ? textColor : ""} ${
          iconToggled ? textColor : ""
        }`}
      >
        {number}
      </span>
    </div>
  );
}

export default TweetIcon;
