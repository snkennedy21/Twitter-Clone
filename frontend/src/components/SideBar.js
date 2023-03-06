import { FaTwitter } from "react-icons/fa";
import {
  HiHome,
  HiOutlineBell,
  HiOutlineHashtag,
  HiOutlineBookmark,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineDotsHorizontal,
  HiOutlineInbox,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import SidebarLink from "./SidebarLink";
import profilePicture from "../images/profile.png";

function SideBar() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation hover:bg-[#e8f5fe] p-0 xl:ml-24">
        <FaTwitter className="w-8 h-8 text-primaryColor" />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HiHome} active />
        <SidebarLink text="Explore" Icon={HiOutlineHashtag} />
        <SidebarLink text="Notifications" Icon={HiOutlineBell} />
        <SidebarLink text="More" Icon={HiOutlineInbox} />
        <SidebarLink text="Messages" Icon={HiOutlineBookmark} />
        <SidebarLink text="Bookmarks" Icon={HiOutlineClipboardList} />
        <SidebarLink text="Lists" Icon={HiOutlineUser} />
        <SidebarLink text="Profile" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <button className="hidden xl:inline ml-auto bg-primaryColor text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div className="text-blackText flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto">
        <div>
          <img
            src={profilePicture}
            className="h-10 w-10 rounded-full xl:mr-2.5"
          />
        </div>
        <div className="hidden xl:inline leading-5">
          <h4>Users Name</h4>
          <p>@Handle</p>
        </div>
        <HiOutlineDotsHorizontal className="hidden h-5 w-5 ml-10 xl:inline" />
      </div>
    </div>
  );
}

export default SideBar;
