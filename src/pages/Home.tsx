import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import Map from "../components/Map";
import NumAirlinesChart from "../components/NumAirChat";
import GrowthDoughnutChart from "../components/GrowthDoughnutChart";
import { MarketSize, TotalJourneys } from "../components/TextCharts";
import { useSelector } from "react-redux";
import data from '../../public/assets/continents.json';
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-scroll';
import IndustryGraph from "../components/IndustryGraph";
import fleetsize from '../../public/assets/fleetsize.json'
import FleetSizeChart from "../components/FleetChart";
import { AirlineCard } from "../components/AirlineCard";

const Home = () => {

  const selectedContinent: string = useSelector((state: any) => state.home.selectedContinent);
  // @ts-ignore
  const [continentData, setContinentData] = useState(data[selectedContinent]);

  useEffect(() => {
    // @ts-ignore
    setContinentData(data[selectedContinent]);
  }, [selectedContinent]);

  const [ref, inView ] = useInView()
  const [ref2, inView2 ] = useInView()


  return (
    <div className="bg-gray-100 flex flex-col justify-start ">
      <div id="CONTINENT SUMMARY" style={{minHeight: `calc(100vh - ${60}px)`}} >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-5xl font-bold text-gray-800 text-left mt-8 ml-8"
        >
        Welcome to Airline Stocks
        <div className="h-3"/>
        </motion.h1>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="w-full md:w-1/2">
            <Map />
          </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 md:grid-cols-2 gap-4">
              <NumAirlinesChart data={continentData} />
              <MarketSize data={continentData} />
              <TotalJourneys data={continentData} />
              <GrowthDoughnutChart data={continentData} />
            </div>
        </div>
        <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-lg text-gray-600 text-left ml-8 mr-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">
          {selectedContinent}
          </h2>
          <div className="h-3"/>
          {continentData.Summary}
        </motion.h1>
        <div className="h-10"/>
        <Link className="absolute bottom-0 left-1/2 mb-5" to="STOCK SUMMARY" smooth={true} duration={500}>
          <FaArrowDown className="text-gray-800 text-4xl m-auto cursor-pointer hover:text-gray-600" />
        </Link>
      </div>
      <div id = "STOCK SUMMARY" style={{minHeight: "100vh"}} className="justify-center relative">
      <Link className="absolute top-0 left-1/2 mt-1" to="CONTINENT SUMMARY" smooth={true} duration={500} offset={-100}>
          <FaArrowUp className="text-gray-800 text-4xl m-auto cursor-pointer hover:text-gray-600" />
      </Link>
      <motion.h1
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 2 }}
          className="text-5xl font-bold text-gray-800 text-left mt-8 ml-8"
        >
        Historical Industry Trends
        <div className="h-3"/>
        <p className="mt-4 text-lg text-gray-600 text-left ml-8">
          Historic and cyclical trends of the U.S. aviation sector.
        </p>
        </motion.h1>
        <div className="m-20">
        <IndustryGraph />
        <motion.h1
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 2 }}
          className="text-5xl font-bold text-gray-800 text-left mt-8 ml-8"
        >
        <ul className="list-disc ml-8">
          <li className="text-gray-800 text-xl"><span className="font-bold">9/11 - </span>Consumer confidence crushed particularly in U.S and Europe.</li>
          <li className="text-gray-800 text-xl my-5"><span className="font-bold">Great Recession - </span>Airline demand plummets, large scale mergers such as United & Continental take place.</li>
          <li className="text-gray-800 text-xl"><span className="font-bold">Covid Pandemic - </span>2 years of disruption, unprecended level of aircraft retirement take place across the globe.</li>
        </ul>
        </motion.h1>
        </div>
      <Link className="absolute bottom-0 left-1/2 mb-10" to="AIRLINE SUMMARY" smooth={true} duration={500}>
          <FaArrowDown className="text-gray-800 text-4xl m-auto cursor-pointer hover:text-gray-600" />
        </Link>
     </div>
      <div id = "AIRLINE SUMMARY" style={{minHeight: "100vh"}} className="flex flex-col justify-center relative">
      <Link className="absolute top-0 left-1/2 mt-1" to="STOCK SUMMARY" smooth={true} duration={500}>
          <FaArrowUp className="text-gray-800 text-4xl m-auto cursor-pointer hover:text-gray-600" />
      </Link>
      <motion.h1
          ref={ref2}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView2 ? 1 : 0 }}
          transition={{ duration: 2 }}
          className="text-5xl font-bold text-gray-800 text-left mt-8 ml-8"
        >
        Airline Insights
        <div className="h-3"/>
        <p className="mt-4 text-lg text-gray-600 text-left">
          Historic and cyclical trends of the U.S. aviation sector.
        </p>
        </motion.h1>
        <div className="h-10"/>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <FleetSizeChart data={fleetsize}/>
        </div>
        <div className="h-20"/>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="container m-5 justify-center items-center" style={{maxWidth: "90vw"}}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(fleetsize).map((airline) => (
                  <AirlineCard key={airline.code} airline={airline} />
                ))}
              </div>
          </div>
        </div>
        <div className="h-20"/>
     </div>
    </div>
  );
};

export default Home;