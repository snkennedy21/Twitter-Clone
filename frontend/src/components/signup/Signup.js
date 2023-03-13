import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateAccountMutation } from "../../store/mainApi";
import SignupStepOne from "./SignupStepOne";
import SignupStepTwo from "./SignupStepTwo";
import SignupStepThree from "./SignupStepThree";
import SignupStepFour from "./SignupStepFour";
import SignupStepFive from "./SignupStepFive";

function Signup() {
  const [signupStep, setSignupStep] = useState(1);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createAccount] = useCreateAccountMutation();

  function createAccountHandler() {
    const signupData = {
      handle: handle,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    };
    createAccount(signupData);
  }

  useEffect(() => {
    if (!isModalOpen) setSignupStep(1);
  }, [isModalOpen]);

  function changeSignupStepHandler() {
    setSignupStep(signupStep + 1);
  }

  let displayedSignupStep;

  if (signupStep === 1) {
    displayedSignupStep = (
      <SignupStepOne changeSignupStep={changeSignupStepHandler} />
    );
  } else if (signupStep === 2) {
    displayedSignupStep = (
      <SignupStepTwo
        changeSignupStep={changeSignupStepHandler}
        firstName={firstName}
        lastName={lastName}
        email={email}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
      />
    );
  } else if (signupStep === 3) {
    displayedSignupStep = (
      <SignupStepThree
        changeSignupStep={changeSignupStepHandler}
        setHandle={setHandle}
      />
    );
  } else if (signupStep === 4) {
    displayedSignupStep = (
      <SignupStepFour
        changeSignupStep={changeSignupStepHandler}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
    );
  } else if (signupStep === 5) {
    displayedSignupStep = (
      <SignupStepFive
        createAccount={createAccountHandler}
        name={firstName + lastName}
        email={email}
        handle={handle}
      />
    );
  }

  return (
    <div className="flex items-center justify-center sm:items-start sm:mt-10 px-5 overflow-y-sroll">
      {displayedSignupStep}
    </div>
  );
}

export default Signup;
