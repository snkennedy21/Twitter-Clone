import { useState, useRef } from "react";
import { useUpdateUserMutation } from "../../store/mainApi";
import blankProfilePicture from "../../assets/blank-profile-picture.png";
import { useGetUserDataQuery } from "../../store/mainApi";
import { HiOutlineCamera } from "react-icons/hi2";

function EditProfileForm() {
  const [updateUser] = useUpdateUserMutation();
  const [userHandle, setUserHandle] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { data: userData, isLoading: userDataLoading } = useGetUserDataQuery(
    JSON.parse(localStorage.getItem("currentUserId"))
  );
  const photoPickerRef = useRef(null);

  function updateUserProfile(e) {
    e.preventDefault();
    console.log("hello");
    updateUser(e.target);
  }

  function userHandleChangeHandler(e) {
    setUserHandle(e.target.value);
  }

  function profilePictureChangeHandler(e) {
    setProfilePicture(e.target.value);
  }

  return (
    <form onSubmit={updateUserProfile}>
      <button>Submit</button>
      <input
        onChange={profilePictureChangeHandler}
        name="file"
        type="file"
        hidden
        value={profilePicture}
        ref={photoPickerRef}
      />
      <div className="bg-[#cfd9de] w-full h-48 relative">
        <img
          src={userData.photo_url ? userData.photo_url : blankProfilePicture}
          className="w-32 h-32 rounded-full absolute bottom-0 left-4 translate-y-1/2 border-white border-4"
        />
        <div
          onClick={() => {
            photoPickerRef.current.click();
          }}
          className="bg-black w-12 h-12 rounded-full flex justify-center items-center absolute top-[169px] left-[54px] opacity-75 hover:cursor-pointer hover:opacity-70"
        >
          <HiOutlineCamera className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex flex-col w-full px-3 mt-20">
        <input
          onChange={userHandleChangeHandler}
          value={userHandle}
          type="text"
          placeholder="Handle"
          className="border border-[#d0d0d0] placeholder-[#606060] py-3 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor"
        />
      </div>
    </form>
  );
}

export default EditProfileForm;
