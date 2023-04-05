function SignupStepOne({ changeSignupStep }) {
  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-20">
      <h1 className="font-bold text-3xl self-start mb-7">Join Twitter today</h1>
      <button
        onClick={changeSignupStep}
        className="bg-blackText text-white w-full rounded-full py-2 font-bold text-sm mb-2"
      >
        Create account
      </button>
      <p className="text-sm pb-10 text-[#5a5a5a]">
        By signing up, you agree to the{" "}
        <span className="text-primaryColor">Terms of Service</span> and{" "}
        <span className="text-primaryColor">Privacy Policy</span> , including{" "}
        <span className="text-primaryColor">Cookie Use.</span>
      </p>
      <p className="text-sm self-start text-[#5a5a5a]">
        Have an account already?{" "}
        <span className="text-primaryColor">Log in</span>
      </p>
    </div>
  );
}

export default SignupStepOne;
