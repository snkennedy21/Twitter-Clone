import { useState } from "react";
import { useUpdateUserMutation } from "../store/mainApi";

function EditProfileForm() {
  const [updateUser] = useUpdateUserMutation();
  const [userHandle, setUserHandle] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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
      <input
        onChange={userHandleChangeHandler}
        name="handle"
        type="text"
        value={userHandle}
      />
      <input
        onChange={profilePictureChangeHandler}
        name="file"
        type="file"
        value={profilePicture}
      />

      <button>Submit</button>
    </form>
  );
}

export default EditProfileForm;
