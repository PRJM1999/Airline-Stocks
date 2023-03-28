import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export function AirlineCard({airline}: any) {
  const { fleet_size, on_order_fleet, passengers_carried, stock_2023, code, Country } = airline;
  const stockRise = stock_2023 > 0;
  const stockIcon = stockRise ? <FaArrowUp className="text-green-500" /> : <FaArrowDown className="text-red-500" />;

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-medium mb-4">{code} ({Country})</h2>
      <div className="flex items-center">
        <div className="text-gray-600 mr-4">Stock Change 2023:</div>
        <div className="flex items-center">
          {stockIcon}
          <div className={`ml-2 font-bold ${stockRise ? 'text-green-500' : 'text-red-500'}`}>{stock_2023}%</div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="text-gray-600 mr-4">Passengers carried:</div>
        <div>{passengers_carried}</div>
      </div>
    </div>
  );
}

