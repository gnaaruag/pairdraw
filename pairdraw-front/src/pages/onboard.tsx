/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from "react";
import { SignIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Onboard: FunctionComponent = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      // console.log("si");
      navigate("/");
    }
    else {
      navigate("/home");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-md w-full px-6 py-8  rounded-lg ">
        <h1 className="text-2xl">Pairdraw</h1>
        <SignedOut>
          <SignIn redirectUrl={"/home"} routing="path" path="/" />
        </SignedOut>
      </div>
    </div>
  );
};

export default Onboard;
