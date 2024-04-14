import { FunctionComponent } from "react";
import { SignIn } from "@clerk/clerk-react";

const Onboard: FunctionComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-md w-full px-6 py-8  rounded-lg ">
		<h1 className="text-2xl">Pairdraw</h1>
        <SignIn redirectUrl={"/home"} routing="path" path="/" />
      </div>
    </div>
  );
};

export default Onboard;
