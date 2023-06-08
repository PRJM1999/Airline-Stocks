import React, { useState } from "react";

type Props = {};

const Options = (props: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<
    "blackScholes" | "monteCarlo"
  >("blackScholes");

  const handleMethodChange = (method: "blackScholes" | "monteCarlo") => {
    setSelectedMethod(method);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const stockPrice = (e.target as any).stockPrice.value;
    const strikePrice = (e.target as any).strikePrice.value;
    const riskFreeRate = (e.target as any).riskFreeRate.value;
    const volatility = (e.target as any).volatility.value;
    const timeToMaturity = (e.target as any).timeToMaturity.value;
    const numberOfSimulations = (e.target as any).numberOfSimulations.value;

    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="container mx-auto p-4" style={{ minHeight: "100vh" }}>
      <h1 className="text-3xl font-bold mb-2 text-gray-600">
        Options Pricing Calculator
      </h1>

      <p className="text-gray-600 mt-4 mb-5">
        Below the Black-Scholes and Monte Carlo methods can be used to calculate
        the call option price.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <label className="mr-4 w-1/3" htmlFor="stockPrice">
            Stock Price
          </label>
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 w-2/3"
            type="number"
            name="stockPrice"
            id="stockPrice"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex items-center">
          <label className="mr-4 w-1/3" htmlFor="strikePrice">
            Strike Price
          </label>
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 w-2/3"
            type="number"
            name="strikePrice"
            id="strikePrice"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex items-center">
          <label className="mr-4 w-1/3" htmlFor="riskFreeRate">
            Risk Free Rate
          </label>
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 w-2/3"
            type="number"
            name="riskFreeRate"
            id="riskFreeRate"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex items-center">
          <label className="mr-4 w-1/3" htmlFor="volatility">
            Volatility
          </label>
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 w-2/3"
            type="number"
            name="volatility"
            id="volatility"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex items-center">
          <label className="mr-4 w-1/3" htmlFor="daysToMaturity">
            Days to Maturity
          </label>
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 w-2/3"
            type="number"
            name="daysToMaturity"
            id="daysToMaturity"
            min="0"
            step="1"
          />
        </div>
      </div>

      <div className="flex justify-center items-center mb-4 mt-5">
        <button
          className={`mr-4 py-2 px-4 rounded-lg ${
            selectedMethod === "blackScholes"
              ? "bg-gray-800 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleMethodChange("blackScholes")}
        >
          Black-Scholes
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedMethod === "monteCarlo"
              ? "bg-gray-800 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleMethodChange("monteCarlo")}
        >
          Monte Carlo
        </button>
      </div>

      <div className="flex justify-center items-center mb-4">
        <button
          className="mr-4 py-2 px-4 rounded-lg bg-gray-800 text-white"
          //   onClick={() => handleMethodChange("blackScholes")}
        >
          Calculate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-10">
        {/* Other content */}
      </div>
    </div>
  );
};

export default Options;
