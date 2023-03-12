import { useDispatch } from "react-redux";

import { openModal, changeModalContent } from "../store/modalSlice";

function SignupBar() {
  const dispatch = useDispatch();

  function openModalHandler(e) {
    const buttonText = e.target.textContent;
    dispatch(changeModalContent(buttonText));
    dispatch(openModal());
  }

  return (
    <div className="w-full bg-primaryColor fixed bottom-0 p-3 sm:py-2">
      <div className="flex justify-around items-center">
        <div className="hidden sm:block">
          <h1 className="text-2xl text-white font-bold">
            Don't miss what's happening
          </h1>
          <span className="text-white">
            People on Twitter are the first to know
          </span>
        </div>
        <div className="flex justify-center gap-3 w-full sm:w-[200px]">
          <button
            className="text-white w-full py-2 px-4 border border-white border-solid rounded-full font-bold text-sm"
            onClick={openModalHandler}
          >
            Log in
          </button>
          <button
            className="py-2 px-4 w-full bg-white rounded-full font-bold text-sm"
            onClick={openModalHandler}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupBar;
