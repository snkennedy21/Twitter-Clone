import { useCheckIfEmailValidMutation } from "../../store/mainApi";
import { useLazyQuery } from "@reduxjs/toolkit/query";
import { useState } from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

function SignupStepTwo({
  changeSignupStep,
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,
}) {
  const [checkIfEmailValid, result] = useCheckIfEmailValidMutation();
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState("");

  function checkEmail() {
    if (email.length === 0) return;
    checkIfEmailValid(email)
      .unwrap()
      .then((payload) => {
        const firstNameEmpty = checkFirstName();
        const lastNameEmpty = checkLastName();
        if (firstNameEmpty || lastNameEmpty) return;
        changeSignupStep();
      })
      .catch((error) => {
        setEmailError(error.data.detail);
        checkFirstName();
        checkLastName();
      });
  }

  function checkFirstName() {
    if (firstName.length === 0) {
      setFirstNameError(true);
      return true;
    }
    return false;
  }

  function checkLastName() {
    if (lastName.length === 0)
      setLastNameError(true, () => {
        return false;
      });
  }

  function firstNameChangeHandler(e) {
    setFirstNameError(false);
    setFirstName(e.target.value);
  }

  function lastNameChangeHandler(e) {
    setLastNameError(false);
    setLastName(e.target.value);
  }

  function emailChangeHandler(e) {
    setEmailError("");
    setEmail(e.target.value);
  }

  function moveToStepThreeHandler() {
    checkEmail();
  }

  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-7">
        Create your account
      </h1>

      {firstNameError ? (
        <p className="self-start text-red-500 -mt-5 text-sm">Required Field</p>
      ) : (
        <></>
      )}

      <input
        onChange={firstNameChangeHandler}
        type="text"
        placeholder="First Name"
        className={`border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-7 ${
          firstNameError
            ? "border-red-500 placeholder-red-500 text-red-500"
            : ""
        }`}
      />

      {lastNameError ? (
        <p className="self-start text-red-500 -mt-5 text-sm">Required Field</p>
      ) : (
        <></>
      )}
      <input
        onChange={lastNameChangeHandler}
        type="text"
        placeholder="Last Name"
        className={`border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-7 ${
          lastNameError ? "border-red-500 placeholder-red-500 text-red-500" : ""
        }`}
      />
      {emailError ? (
        <p className="self-start text-red-500 -mt-5 text-sm">{emailError}</p>
      ) : (
        <></>
      )}
      <input
        onChange={emailChangeHandler}
        value={email}
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
        onClick={moveToStepThreeHandler}
        className="bg-blackText text-white w-full rounded-full py-4 font-bold text-sm mb-2"
      >
        Next
      </button>
    </div>
  );
}

export default SignupStepTwo;
