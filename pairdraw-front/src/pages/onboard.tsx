/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from "react";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Onboard: FunctionComponent = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      // console.log("si");
      return navigate("/");
    } else {
      return navigate("/home");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl top-0 text-center mt-2">Pairdraw</h1>
      <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-md w-full px-6 py-8  rounded-lg ">
        <SignedOut>
          <div className="flex m-4 flex-col md:flex-row justify-center items-center gap-4 ">
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="text-xl text-center">Create an account here</h3>
              <SignUp redirectUrl={"/home"} routing="path" path="/" />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="text-xl text-center">Already have an account? Sign in here</h3>
              <SignIn redirectUrl={"/home"} routing="path" path="/" />
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="mt-2 flex flex-col gap-2 justify-center items-center mx-auto">
            <h3 className="text-xl">You are already logged in</h3>
            <a href="/home" className="text-purple-400">
              Go to home page
            </a>
          </div>
        </SignedIn>
      </div>
    </div>
    </div>
  );
};

export default Onboard;
