export const MarketSize = ({ data }: { data: any }) => {
    return (
      <div className="p-4 bg-white rounded shadow flex items-center justify-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">Market Size (2019)</h2>
          <p className="text-gray-600 text-center text-4xl font-bold">
            {data.marketSize}
          </p>
        </div>
      </div>
    );
  };
  
  export const TotalJourneys = ({ data }: { data: any }) => {
    return (
      <div className="p-4 bg-white rounded shadow flex items-center justify-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">Total Journeys (2019)</h2>
          <p className="text-gray-600 text-center text-4xl font-bold">
            {data.Journeys}
          </p>
        </div>
      </div>
    );
  };