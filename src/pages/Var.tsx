import React, { useState, useEffect } from "react";
import sampleapi from "../../public/assets/sampleapi.json";
import { format, addDays } from "date-fns";

function Var() {
  const [data, setData] = useState<any>({
    forecast: [],
  });
  const [time, setTime] = useState<number>(0);

  const dates = Array.from({ length: 10 }, (_, i) =>
    format(addDays(new Date(), i), "MM/dd")
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://18.168.204.211:3000/initial_data");
      const data = await response.json();
      setData(data);
      setTime(data.date);
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://18.168.204.211:3000/model");
    const data = await response.json();
    if (data.message === "Internal Server Error") {
      console.warn("Internal Server Error - Api limit reached");
    } else {
      setData(data);
      setTime(data.date);
    }
  };

  return (
    <div style={{ minHeight: `calc(100vh - ${60}px)` }} className="p-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-600 font-bold">
        VAR Model
      </h1>
      <p className="text-gray-600 mb-4 mt-5">
        The VAR (Vector Autoregression) model is a statistical model that is
        used to capture the interdependencies among multiple time series
        variables.
      </p>
      <p className="text-gray-600 mb-4 mt-5">
        Below a model has been built providing daily updates. It uses data from
        3 sources:
      </p>
      <ul className="list-disc list-inside text-gray-600 mb-4 mt-5">
        <li>S&P 500 Index</li>
        <li>Global Oil Price</li>
        <li>American Airlines Stock</li>
      </ul>
      <p className="text-gray-600 mb-4 mt-5">
        The table below provides a forecast for the next 10 days.
      </p>
      {data && (
        <table className="table-auto border-collapse border border-gray-400 mx-auto">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2 bg-gray-600 text-white">
                Date
              </th>
              <th className="border border-gray-400 px-4 py-2 bg-gray-600 text-white">
                American Airlines Stock
              </th>
              <th className="border border-gray-400 px-4 py-2 bg-gray-600 text-white">
                S&P 500 Index
              </th>
              <th className="border border-gray-400 px-4 py-2 bg-gray-600 text-white">
                Global Oil Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data.forecast.map((row: number[], index: number) => (
              <tr key={index}>
                <td
                  key={`${index}-date`}
                  className="border border-gray-400 px-4 py-2 text-center"
                >
                  {dates[index]}
                </td>
                {row.map((cell: number, index: number) => (
                  <td
                    key={index}
                    className="border border-gray-400 px-4 py-2 text-center"
                  >
                    {cell.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-10" />
      Due to a limit on api calls I am not able to provide a live update,
      however if you click the button below it will fetch fresh data:
      <div className="mt-5 flex justify-center">
        <button
          onClick={() => {
            fetchData();
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Fetch Data
        </button>        
      </div>
      <p className="text-gray-600 mt-10">Last Updated: {time}</p>
    </div>
  );
}

export default Var;
