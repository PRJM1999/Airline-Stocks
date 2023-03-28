import React from 'react'
import ryanair_main from '../../assets/images/ryanair_main.jpeg'
import casestudies from '../../assets/casestudies.json'
import { useNavigate } from 'react-router-dom';


type CardProps = {
    image: string;
    title: string;
    onClick: () => void;
  };
  
const Card: React.FC<CardProps> = ({ image, title, onClick }) => {
  return (
    <div className="relative p-4 border rounded-lg shadow-lg text-center">
      <img
        src={image}
        alt={title}
        className="w-full rounded-lg transition-transform duration-300 hover:scale-105 mb-4"
      />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={onClick}
      >
        View Case Study
      </button>
    </div>
  );
};

export const CaseStudies = () => {

    const navigate = useNavigate();

    console.log(casestudies)

    const airlines = {
    "Ryanair" : {
        image: casestudies.Ryanair.main_image,
        title: casestudies.Ryanair.name,
    }
    };

    const handleCardClick = (airline: string) => {
        navigate(`/casestudy/${airline}`);
    };

    return (
    <div className="container mx-auto p-4 " style={{minHeight: "100vh"}}>
      <h1 className="text-3xl font-bold mb-2">Airline Case Studies</h1>
      <p className="text-gray-600 mb-4">
        Explore our collection of case studies on various airlines.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  m-10">
        {Object.entries(casestudies).map(([key, airline]) => (
          <Card
            key={airline.name}
            image={airline.main_image}
            title={airline.name}
            onClick={() => handleCardClick(airline.name)}
          />
        ))}
      </div>
    </div>
    );
}