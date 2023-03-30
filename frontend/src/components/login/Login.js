import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/mainApi";
import LoginStepOne from "./LoginStepOne";
import LoginStepTwo from "./LoginStepTwo";
import { validateToken } from "../../store/tokenSlice";
import { closeModal } from "../../store/modalSlice";

function Login() {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStep, setLoginStep] = useState(1);

  async function loginHandler(e) {
    e.preventDefault();
    const payload = await login(e.target);
    localStorage.setItem("currentUserId", JSON.stringify(payload.data.user.id));
    console.log(payload);
    let expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000);
    document.cookie = `session=true; expires=${expirationTime.toUTCString()}; path=/`;
    dispatch(validateToken());
    dispatch(closeModal());
  }

  useEffect(() => {
    if (!isModalOpen) setLoginStep(1);
    setUsername("");
  }, [isModalOpen]);

  function changeLoginStepHandler() {
    if (username.length === 0) return;
    setLoginStep(2);
  }

  // <div className="flex items-center justify-center sm:items-start sm:mt-10 relative overflow-y-scroll">
  return (
    <div className="flex items-center justify-center sm:items-start sm:mt-10 relative overflow-y-scrolls">
      {loginStep === 1 ? (
        <LoginStepOne
          setUsername={setUsername}
          username={username}
          changeLoginStep={changeLoginStepHandler}
        />
      ) : (
        <LoginStepTwo
          username={username}
          setPassword={setPassword}
          password={password}
          login={loginHandler}
        />
      )}
    </div>
  );
}

export default Login;
