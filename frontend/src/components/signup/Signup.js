import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const [password, setPassword] = useState("");

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
      <SignupStepTwo changeSignupStep={changeSignupStepHandler} />
    );
  } else if (signupStep === 3) {
    displayedSignupStep = (
      <SignupStepThree changeSignupStep={changeSignupStepHandler} />
    );
  } else if (signupStep === 4) {
    displayedSignupStep = (
      <SignupStepFour changeSignupStep={changeSignupStepHandler} />
    );
  } else if (signupStep === 5) {
    displayedSignupStep = <SignupStepFive />;
  }

  return (
    <div className="flex items-center justify-center sm:items-start sm:mt-10 px-5 overflow-y-sroll">
      {displayedSignupStep}
    </div>
  );
}

export default Signup;
