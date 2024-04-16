/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from "react";
import { SignIn, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-md w-full px-6 py-8  rounded-lg ">
        <h1 className="text-2xl">Pairdraw</h1>
        <SignedOut>
          <div className="mt-2 mb-2 flex flex-col gap-2 justify-center items-center mx-auto">
          <h3 className="text-lg">If you do not have an account </h3>
          <a className="text-purple-400 underline" href="https://main-walrus-3.accounts.dev/sign-up?redirect_url=https%3A%2F%2Fpairdraw.vercel.app%2Fhome">Click here to make one</a>
          </div>
          <SignIn redirectUrl={"/home"} routing="path" path="/" />
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
  );
};

export default Onboard;
