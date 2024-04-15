import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_ENDPOINT } from "../config/constants";
import { useUser } from "@clerk/clerk-react";

interface NewPairProps {}

const NewPair: React.FC<NewPairProps> = () => {
  const [pairID, setPairID] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINT + "/add-to-pair", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pairID: pairID,
          user: user?.emailAddresses[0].emailAddress,
         }),
      });
      if (response.ok) {
        // If the POST request is successful, navigate to "/pairlist"
        navigate("/pairlist");
      } else {
        // Handle error
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Create New Pair</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pairID" className="block text-gray-700">
              Enter Pair ID:
            </label>
            <input
              type="text"
              id="pairID"
              value={pairID}
              onChange={(e) => setPairID(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPair;
