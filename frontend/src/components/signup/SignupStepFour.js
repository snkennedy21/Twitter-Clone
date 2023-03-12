function SignupStepFour({ changeSignupStep }) {
  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-7">
        Create your account
      </h1>

      <input
        type="text"
        placeholder="Password"
        className="border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-6"
      />

      <input
        type="text"
        placeholder="Confirm Password"
        className="border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-6"
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

export default SignupStepFour;
