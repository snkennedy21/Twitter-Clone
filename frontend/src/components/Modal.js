import React from "react";
import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { FaTwitter } from "react-icons/fa";

function Modal() {
  return (
    <div className="bg-orange-200 absolute top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
      <div className="bg-white w-full h-screen p-3">
        {/* <HiXMark /> */}
        <div className="flex justify-center">
          <FaTwitter className="h-8 w-8 text-primaryColor" />
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center justify-center w-[475px] px-20">
            <h1 className="font-bold text-2xl self-start mb-8">
              Join Twitter today
            </h1>
            <button className="bg-blackText text-white w-full rounded-full py-2 font-bold text-sm mb-2">
              Create account
            </button>
            <p className="text-sm pb-10 text-[#5a5a5a]">
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </p>
            <p className="text-sm self-start text-[#5a5a5a]">
              Have an account already? Log in
            </p>
          </div>
        </div>
      </div>

      {/* <div className="relative bg-white w-[600px] h-[625px] rounded-2xl"></div> */}
    </div>
  );
}

export default Modal;
