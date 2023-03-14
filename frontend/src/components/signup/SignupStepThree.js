import Signup from "./Signup";
import SignupInput from "./SignupInput";
import { useState } from "react";
import { useCheckIfHandleValidMutation } from "../../store/mainApi";

function SignupStepThree({ changeSignupStep, handle, setHandle }) {
  const [checkIfHandleValid] = useCheckIfHandleValidMutation();
  const [handleError, setHandleError] = useState("");

  function twitterHandleChangeHandler(e) {
    setHandleError("");
    setHandle(e.target.value);
  }

  function moveToSignupStepFour() {
    if (handle.length === 0) {
      setHandleError("Required Field");
      return;
    }
    checkIfHandleValid(handle)
      .unwrap()
      .then((payload) => {
        changeSignupStep();
      })
      .catch((error) => {
        setHandleError(error.data.detail);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-7">
        Create your account
      </h1>

      <SignupInput
        changeFunction={twitterHandleChangeHandler}
        error={handleError}
        placeholder="Handle"
        value={handle}
        type="text"
      />

      <p className="text-sm self-start text-[#5a5a5a] mb-4">
        Have an account already?{" "}
        <span className="text-primaryColor">Log in</span>
      </p>
      <button
        onClick={moveToSignupStepFour}
        className="bg-blackText text-white w-full rounded-full py-4 font-bold text-sm mb-2"
      >
        Next
      </button>
    </div>
  );
}

export default SignupStepThree;
