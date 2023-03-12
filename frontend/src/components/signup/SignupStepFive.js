function SignupStepFive() {
  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-7">
        Create your account
      </h1>

      <div className="w-full bg-[#f6f6f6] py-5 px-2 mb-4 text-[#a4a4a4] rounded-md">
        Joe Schmoe
      </div>

      <div className="w-full bg-[#f6f6f6] py-5 px-2 mb-4 text-[#a4a4a4] rounded-md">
        joe@gmail.com
      </div>

      <div className="w-full bg-[#f6f6f6] py-5 px-2 mb-4 text-[#a4a4a4] rounded-md">
        joemoneyman
      </div>

      <p className="text-sm self-start text-[#5a5a5a] mb-4">
        Have an account already?{" "}
        <span className="text-primaryColor">Log in</span>
      </p>
      <button className="bg-primaryColor text-white w-full rounded-full py-4 font-bold text-sm mb-2">
        Sign Up
      </button>
    </div>
  );
}

export default SignupStepFive;
