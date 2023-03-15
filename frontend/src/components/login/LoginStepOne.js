function LoginStepOne({ setUsername, username, changeLoginStep }) {
  return (
    <div className="flex flex-col items-center justify-center w-[475px] px-20">
      <h1 className="font-bold text-3xl self-start mb-8">Sign in to Twitter</h1>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        type="text"
        placeholder="Email or username"
        className="border border-[#d0d0d0] placeholder-[#606060] py-3 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor"
      />

      <button
        onClick={changeLoginStep}
        className="bg-blackText text-white w-full rounded-full py-2 font-bold text-sm mt-6 mb-10"
      >
        Next
      </button>

      <p className="text-sm self-start text-[#5a5a5a]">
        Don't have an account?
        <span className="text-primaryColor"> Sign up</span>
      </p>
    </div>
  );
}

export default LoginStepOne;
