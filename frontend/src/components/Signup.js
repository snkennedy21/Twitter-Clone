import { useState } from "react";

function Signup() {
  const [signupStep, setSignupStep] = useState(2);

  return (
    <div className="flex h-full items-center justify-center sm:items-start sm:mt-10 px-5">
      {signupStep === 1 ? (
        <div className="flex flex-col items-center justify-center w-[475px]">
          <h1 className="font-bold text-3xl self-start mb-8">
            Join Twitter today
          </h1>
          <button className="bg-blackText text-white w-full rounded-full py-2 font-bold text-sm mb-2">
            Create account
          </button>
          <p className="text-sm pb-10 text-[#5a5a5a]">
            By signing up, you agree to the{" "}
            <span className="text-primaryColor">Terms of Service</span> and{" "}
            <span className="text-primaryColor">Privacy Policy</span> ,
            including <span className="text-primaryColor">Cookie Use.</span>
          </p>
          <p className="text-sm self-start text-[#5a5a5a]">
            Have an account already?{" "}
            <span className="text-primaryColor">Log in</span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-[475px] px-5">
          <h1 className="font-bold text-3xl self-start mb-7">
            Create your account
          </h1>

          <input
            type="text"
            placeholder="Name"
            className="border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-6"
          />

          <input
            type="text"
            placeholder="Email"
            className="border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-10"
          />

          <h2 className="font-semibold self-start mb-2">Date of birth</h2>

          <p className="text-sm pb-10 text-[#5a5a5a]">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
          <p className="text-sm self-start text-[#5a5a5a]">
            Have an account already?{" "}
            <span className="text-primaryColor">Log in</span>
          </p>
          <button className="bg-blackText text-white w-full rounded-full py-2 font-bold text-sm mb-2">
            Create account
          </button>
        </div>
      )}
    </div>
  );
}

export default Signup;
