function LoginStepTwo({ username, setPassword, password, login }) {
  return (
    <div className="flex flex-col items-center justify-between w-[475px] px-5">
      <h1 className="font-bold text-3xl self-start mb-6">
        Enter your password
      </h1>
      <div className="w-full bg-[#f6f6f6] py-5 px-2 mb-4 text-[#a4a4a4] rounded-md">
        {username}
      </div>
      <form onSubmit={login} className="w-full">
        <input type="hidden" name="username" value={username} />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          className="border border-[#d0d0d0] placeholder-[#606060] py-5 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor"
        />

        <div className="w-full">
          <button
            type="submit"
            className="bg-blackText text-white w-full rounded-full py-3 font-bold text-lg mt-6 mb-6"
          >
            Log in
          </button>

          <p className="text-sm self-start text-[#5a5a5a]">
            Don't have an account?
            <span className="text-primaryColor"> Sign up</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginStepTwo;
