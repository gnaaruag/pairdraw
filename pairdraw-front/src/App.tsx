// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
//   SignOutButton,
// } from "@clerk/clerk-react";

import { RouterProvider } from "react-router-dom";

import router from "./routes";



export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

{
  /* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <p>you are now signed in</p>
      </SignedIn>
      Sign Out 
      <SignOutButton /> */
}
