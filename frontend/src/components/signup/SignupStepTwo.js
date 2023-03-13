import { useCheckIfEmailValidMutation } from "../../store/mainApi";
import { useLazyQuery } from "@reduxjs/toolkit/query";
import { useState } from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import SignupInput from "./SignupInput";

function SignupStepTwo({
  changeSignupStep,
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,
}) {
  const [checkIfEmailValid] = useCheckIfEmailValidMutation();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  function moveToStepThreeHandler() {
    const emailEmpty = checkIfEmailEmpty();
    if (emailEmpty) return;
    checkIfEmailValid(email)
      .unwrap()
      .then((payload) => {
        const firstNameEmpty = checkIfFirstNameEmpty();
        const lastNameEmpty = checkIfLastNameEmpty();
        if (firstNameEmpty || lastNameEmpty) return;
        changeSignupStep();
      })
      .catch((error) => {
        setEmailError(error.data.detail);
        checkIfFirstNameEmpty();
        checkIfLastNameEmpty();
      });
  }

  function checkIfEmailEmpty() {
    if (email.length === 0) {
      setEmailError("Required Field");
      checkIfFirstNameEmpty();
      checkIfLastNameEmpty();
      return true;
    }
    return false;
  }

  function checkIfFirstNameEmpty() {
    if (firstName.length === 0) {
      setFirstNameError("Required Field");
      return true;
    }
    return false;
  }

  function checkIfLastNameEmpty() {
    if (lastName.length === 0) {
      setLastNameError("Required Field");
      return true;
    }
    return false;
  }

  function firstNameChangeHandler(e) {
    setFirstNameError("");
    setFirstName(e.target.value);
  }

  function lastNameChangeHandler(e) {
    setLastNameError("");
    setLastName(e.target.value);
  }

  function emailChangeHandler(e) {
    setEmailError("");
    setEmail(e.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-7">
        Create your account
      </h1>

      <SignupInput
        changeFunction={firstNameChangeHandler}
        error={firstNameError}
        placeholder="First Name"
        value={firstName}
      />
      <SignupInput
        changeFunction={lastNameChangeHandler}
        error={lastNameError}
        placeholder="Last Name"
        value={lastName}
      />

      <SignupInput
        changeFunction={emailChangeHandler}
        error={emailError}
        placeholder="Email"
        value={email}
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
