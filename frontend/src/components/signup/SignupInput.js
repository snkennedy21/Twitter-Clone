import React from "react";

function SignupInput({ changeFunction, error, placeholder, value }) {
  return (
    <React.Fragment>
      {error ? (
        <p className="self-start text-red-500 -mt-5 text-sm">{error}</p>
      ) : (
        <></>
      )}

      <input
        onChange={changeFunction}
        type="text"
        placeholder={placeholder}
        value={value}
        className={`border border-[#d0d0d0] placeholder-[#606060] py-4 px-2 w-full rounded-md outline-none focus:border-primaryColor focus:placeholder-primaryColor mb-7 ${
          error ? "border-red-500 placeholder-red-500 text-red-500" : ""
        }`}
      />
    </React.Fragment>
  );
}

export default SignupInput;
