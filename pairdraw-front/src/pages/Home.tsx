import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
          title="Create new Pair"
          link="/new-pair"
          description="click here to start a new pair with someone"
        />
        <NavigationCard
          title="View existing pairs"
          link="/pairlist"
          description="visit all your current pairings"
        />
        {/* Add more NavigationCards as needed */}
      </div>

    </>
  );
};

export default Home;
