import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateAccountMutation } from "../../../store/mainApi";
import { closeModal } from "../../../store/modalSlice";
import { validateToken } from "../../../store/tokenSlice";
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
  const dispatch = useDispatch();

  async function createAccountHandler() {
    const signupData = {
      handle: handle,
      email: email,
      name: `${firstName} ${lastName}`,
      password: password,
    };
    const payload = await createAccount(signupData);
    localStorage.setItem("currentUserId", JSON.stringify(payload.data.user.id));
    let expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000);
    document.cookie = `session=true; expires=${expirationTime.toUTCString()}; path=/`;
    dispatch(validateToken());
    dispatch(closeModal());
  }

  // Returns all inputs to empty when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setSignupStep(1);
      setFirstName("");
      setLastName("");
      setEmail("");
      setHandle("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [isModalOpen]);

  function changeSignupStepHandler() {
    console.log("HELLO");
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
        handle={handle}
        setHandle={setHandle}
      />
    );
  } else if (signupStep === 4) {
    displayedSignupStep = (
      <SignupStepFour
        changeSignupStep={changeSignupStepHandler}
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
    );
  } else if (signupStep === 5) {
    displayedSignupStep = (
      <SignupStepFive
        createAccount={createAccountHandler}
        name={`${firstName} ${lastName}`}
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
