import SignupInput from "./SignupInput";
import { useState } from "react";

function SignupStepFour({
  changeSignupStep,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) {
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function moveToStepFiveHandler() {
    if (password !== confirmPassword) {
      setPasswordError("Passwords must match");
      setConfirmPasswordError("Passwords must match");
      return;
    }

    if (password.length === 0) setPasswordError("Required Field");
    if (confirmPassword.length === 0) setConfirmPasswordError("Required Field");

    if (password.length === 0 || confirmPassword.length === 0) {
      return;
    }

    changeSignupStep();
  }

  function passwordChangeHandler(e) {
    setPasswordError("");
    setConfirmPasswordError("");
    setPassword(e.target.value);
  }

  function confirmPasswordChangeHandler(e) {
    setPasswordError("");
    setConfirmPasswordError("");
    setConfirmPassword(e.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-7">
        Create your account
      </h1>

      <SignupInput
        changeFunction={passwordChangeHandler}
        error={passwordError}
        placeholder="Password"
        value={password}
        type="password"
      />
      <SignupInput
        changeFunction={confirmPasswordChangeHandler}
        error={confirmPasswordError}
        placeholder="Confirm Password"
        value={confirmPassword}
        type="password"
      />

      <p className="text-sm self-start text-[#5a5a5a] mb-4">
        Have an account already?{" "}
        <span className="text-primaryColor">Log in</span>
      </p>
      <button
        onClick={moveToStepFiveHandler}
        className="bg-blackText text-white w-full rounded-full py-4 font-bold text-sm mb-2"
      >
        Next
      </button>
    </div>
  );
}

export default SignupStepFour;
