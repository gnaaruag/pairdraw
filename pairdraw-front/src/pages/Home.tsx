import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import React from "react";

const NavigationCard: FunctionComponent<{
  title: string;
  link: string;
  description: string;
}> = ({ title, link, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div className="w-full md:w-1/3 p-6 " onClick={handleClick}>
      <div className="bg-white border rounded-lg shadow-xl p-4 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer bg-purple-200">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Home: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        <NavigationCard
          title="neues paar erstellen"
          link="/new-pair"
          description="Klicken Sie hier, um ein neues Paar mit jemandem zu beginnen"
        />
        <NavigationCard
          title="vorhandene paare anzeigen"
          link="/pairlist"
          description="Besuchen Sie alle Ihre aktuellen Paarungen"
        />
        {/* Add more NavigationCards as needed */}
      </div>

    </>
  );
};

export default Home;
