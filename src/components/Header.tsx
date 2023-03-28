import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCaseStudiesClick = () => {
    navigate('/casestudy');
  };


  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Airline Stocks</h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <button onClick={handleHomeClick} className="hover:text-gray-300">
                Home
              </button>
            </li>
            <li>
              <button onClick={handleCaseStudiesClick} className="hover:text-gray-300" data-test>
                Case Studies
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;