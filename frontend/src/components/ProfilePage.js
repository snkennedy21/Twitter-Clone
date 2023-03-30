import React from "react";
import { HiArrowLeft } from "react-icons/hi2";

function ProfilePage() {
  return (
    <React.Fragment>
      <div className="text-[#d9d9d9] flex gap-6 items-center py-2 px-3 sticky top-0 z-30 bg-white border-b border-greyBorder mb-3">
        <div
          // onClick={returnToHome}
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
        >
          <HiArrowLeft className="w-5 h-5 text-blackText" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-blackText">Tweet</h2>
      </div>
      {/* {token && <Input placeholder="What's happening?" tweetId={null} />} */}
    </React.Fragment>
  );
}

export default ProfilePage;
