import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GoCopy } from "react-icons/go";
import PairCanvas from "../components/PairCanvas";
import { API_ENDPOINT } from "../config/constants";
import { useUser } from "@clerk/clerk-react";
import React from "react";

const PairHome: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("your canvas");
  const [imageSrc, setImageSrc] = useState<string>(""); // State to hold image source
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/get-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pairID: id,
            user: user?.emailAddresses[0].emailAddress,
          }),
        });
        if (response.ok) {
          const imageData = await response.json();
          // Set image source once data is received
          setImageSrc("data:image/png;base64," + imageData.data);
        } else {
          console.error("Failed to get image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [id, user]);

  const copyToClipboard = () => {
    if (id) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center gap-2 mt-2">
        <h3 className="text-lg">
          Use this code to invite friends to your pairing: {id}
        </h3>
        <button
          title="Copy your unique pair code and use it to invite friends"
          className="p-1 rounded-md hover:bg-gray-200"
          onClick={copyToClipboard}
        >
          {copied ? "Copied!" : <GoCopy size={20} />}
        </button>
      </div>

      <div className="mt-4 flex space-x-4 justify-center items-center mx-auto">
        <button
          className={`py-2 px-4 rounded-md ${
            activeTab === "your canvas"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("your canvas")}
        >
          Your Canvas
        </button>
        <button
          className={`py-2 px-4 rounded-md ${
            activeTab === "pair canvas"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("pair canvas")}
        >
          Pair Canvas
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "your canvas" && (
          <div>
            <PairCanvas pairId={id} />
          </div>
        )}
        {activeTab === "pair canvas" && (
          <div id="img" className="flex justify-center items-center mx-auto">
            <img src={imageSrc} alt="" />
          </div>
        )}
      </div>
    </>
  );
};

export default PairHome;
