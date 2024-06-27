import { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import { API_ENDPOINT } from "../config/constants";
import { useUser } from "@clerk/clerk-react";
import React from "react";

interface Pair {
  _id: { $oid: string };
  id: string;
  pairName: string;
  adminUser: string;
  otherUser: string;
  imageA: string;
  imageB: string;
  thumbnail: number;
  __v: { $numberInt: string };
}

const Pairlist: FunctionComponent = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/get-all-pairs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user?.emailAddresses[0].emailAddress,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setPairs(data);
        } else {
          // Handle error if required
          console.error("Failed to fetch pair list");
        }
      } catch (error) {
        // Handle error if required
        console.error("Error fetching pair list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Define emojis for each thumbnail number
  const thumbnailEmojis: { [key: number]: string } = {
    1: "🌈",
    2: "🥳",
    3: "🍄",
    4: "🪷",
    5: "🚀",
    6: "😎",
    7: "👽",
  };

  // Function to handle navigation to pair detail
  const navigateToPair = (pairId: string) => {
    navigate(`/pair/${pairId}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-xl mt-4 overflow-hidden">
        <h2 className="text-lg font-semibold bg-gray-200 py-2 px-4">
          Your Pairings
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pairs.map((pair) => (
              <li key={pair.id} className="hover:bg-gray-200">
                <button
                  className="flex items-center w-full px-4 py-3 focus:outline-none"
                  onClick={() => navigateToPair(pair.id)} // Navigate to pair detail on click
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                    {/* Display emoji for thumbnail if available */}
                    {thumbnailEmojis[pair.thumbnail] ? (
                      <span role="img" aria-label="Thumbnail Emoji">
                        {thumbnailEmojis[pair.thumbnail]}
                      </span>
                    ) : (
                      <span className="text-gray-500">No Emoji</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium">{pair.pairName}</div>
                    {/* You can add more information about each pair here */}
                    <div className="text-xs text-gray-500 flex flex-col">
                      <p>{pair.adminUser}</p>
                      <p>{pair.otherUser || "Invite a second user"}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Pairlist;
