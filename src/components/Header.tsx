import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleVarClick = () => {
    navigate('/var');
  };

  const handleCaseStudiesClick = () => {
    navigate('/casestudy');
  };

  const handleOptionsClick = () => {
    navigate('/options');
  };

  const handleResize = () => {
    setIsMobileScreen(window.innerWidth < 768);
  };

  window.addEventListener('resize', handleResize);

  return (
    <>
      {isMobileScreen ? (
        // Mobile header
        <header className="bg-gray-800 text-white">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Airline Stocks</h1>
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FiMenu />
            </button>
          </div>
          <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="md:flex md:space-x-8 bg-gray-800 text-white text-xl font-bold justify-end">
              <li className="md:inline-block">
                <button onClick={handleHomeClick} className="hover:text-gray-300 block px-4 py-2 text-sm">
                  Home
                </button>
              </li>
              <li className="md:inline-block">
                <button onClick={handleVarClick} className="hover:text-gray-300 block px-4 py-2 text-sm">
                  Var
                </button>
              </li>
              <li className="md:inline-block">
                <button onClick={handleOptionsClick} className="hover:text-gray-300 block px-4 py-2 text-sm">
                  Options
                </button>
              </li>
              <li className="md:inline-block">
                <button onClick={handleCaseStudiesClick} className="hover:text-gray-300 block px-4 py-2 text-sm" data-test>
                  Case Studies
                </button>
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        // Desktop header
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
                  <button onClick={handleVarClick} className="hover:text-gray-300">
                    Var
                  </button>
                </li>
                <li>
                  <button onClick={handleOptionsClick} className="hover:text-gray-300">
                    Options
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
      )}
    </>
  );
};

export default Header;