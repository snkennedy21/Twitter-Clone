import { useCheckIfEmailValidMutation } from "../../store/mainApi";
import { useLazyQuery } from "@reduxjs/toolkit/query";
import { useState } from "react";

function SignupStepTwo({
  changeSignupStep,
  email,
  setFirstName,
  setLastName,
  setEmail,
}) {
  const [checkIfEmailValid, result] = useCheckIfEmailValidMutation();
  const [emailError, setEmailError] = useState("");

  function checkEmail() {
    if (email.length === 0) return;
    checkIfEmailValid(email)
      .unwrap()
      .then((payload) => {})
      .catch((error) => {
        setEmailError(error.data.detail);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-7">
        Create your account
      </h1>

      <input
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        type="text"
        placeholder="First Name"
        className="border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-7"
      />

      <input
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        type="text"
        placeholder="Last Name"
        className="border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-7"
      />
      {emailError ? (
        <p className="self-start text-red-500 -mt-5 text-sm">{emailError}</p>
      ) : (
        <></>
      )}
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        onBlur={checkEmail}
        type="text"
        placeholder="Email"
        className={`border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-10 ${
          emailError ? "border-red-500 placeholder-red-500 text-red-500" : ""
        }`}
      />

      <p className="text-sm self-start text-[#5a5a5a] mb-4">
        Have an account already?{" "}
        <span className="text-primaryColor">Log in</span>
      </p>
      <button
        onClick={changeSignupStep}
        className="bg-blackText text-white w-full rounded-full py-4 font-bold text-sm mb-2"
      >
        Next
      </button>
    </div>
  );
}

export default SignupStepTwo;
