import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("snkennedy21");
  const [password, setPassword] = useState("");
  const [loginStep, setLoginStep] = useState(2);

  return (
    <div className="flex h-full items-center justify-center sm:items-start sm:mt-10 relative">
      {loginStep === 1 ? (
        <div className="flex flex-col items-center justify-center w-[475px] px-20">
          <h1 className="font-bold text-3xl self-start mb-8">
            Sign in to Twitter
          </h1>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
            placeholder="Email or username"
            className="border border-[#d0d0d0] placeholder-[#606060] py-3 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor"
          />

          <button className="bg-blackText text-white w-full rounded-full py-2 font-bold text-sm mt-6 mb-10">
            Next
          </button>

          <p className="text-sm self-start text-[#5a5a5a]">
            Don't have an account?
            <span className="text-primaryColor"> Sign up</span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between w-[475px]">
          <h1 className="font-bold text-3xl self-start mb-6">
            Enter your password
          </h1>
          <div className="w-full bg-[#f6f6f6] py-5 px-2 mb-4 text-[#a4a4a4] rounded-md">
            {username}
          </div>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="text"
            placeholder="Password"
            className="border border-[#d0d0d0] placeholder-[#606060] py-5 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor"
          />

          <div className="absolute bottom-24 w-[475px]">
            <button className="bg-blackText text-white w-full rounded-full py-3 font-bold text-lg mt-6 mb-6">
              Log in
            </button>

            <p className="text-sm self-start text-[#5a5a5a]">
              Don't have an account?
              <span className="text-primaryColor"> Sign up</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
