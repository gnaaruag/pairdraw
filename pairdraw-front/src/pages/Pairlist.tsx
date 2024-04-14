import { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import Navbar from "../components/Navbar";

interface Pair {
  id: string;
  name: string;
}

const Pairlist: FunctionComponent = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);

  useEffect(() => {
    // Dummy pairs data (replace with actual data when backend is ready)
    const dummyPairs: Pair[] = [
      { id: "1", name: "Pair 1" },
      { id: "2", name: "Pair 2" },
      { id: "3", name: "Pair 3" },
    ];

    setPairs(dummyPairs);
  }, []);

  return (
    <>
      <Navbar />
      <div className=" max-w-md mx-auto bg-gray-100 rounded-lg shadow-xl mt-4 overflow-hidden">
        <h2 className="text-lg font-semibold bg-gray-200 py-2 px-4">
          Your Pairings
        </h2>
        <ul className="divide-y divide-gray-200">
          {pairs.map((pair) => (
            <li key={pair.id} className="hover:bg-gray-200">
              <button className="flex items-center w-full px-4 py-3 focus:outline-none">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                  {/* You can put an icon or initials of the pair here */}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium">{pair.name}</div>
                  {/* You can add more information about each pair here */}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Pairlist;
