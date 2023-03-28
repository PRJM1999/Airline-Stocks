import casestudies from '../../assets/casestudies.json'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


interface AirlineData {
    name: string;
    main_image: string;
    second_image: string;
    header: string;
    text: string;
  }
  
  interface AirlineDataMap {
    [key: string]: AirlineData;
  }

  const CaseStudies = () => {
    const { airline }: any  = useParams<{ airline: string }>();
    const airlineData = (casestudies as AirlineDataMap)[airline];
    const paragraphs = airlineData.text.split('\n\n');
  
    return (
      <div className="bg-gray-100" style={{minHeight: `calc(100vh - ${60}px)`}}>
        <div className="container mx-auto">
          <div className="relative group overflow-hidden">
            <img
              src={airlineData.second_image}
              alt={airlineData.name}
              className="w-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="m-8">
          <h1 className="text-3xl font-bold mt-4 text-gray-800">{airlineData.header}</h1>
          <div className="p-4"/>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg mt-2 mb-8 text-gray-800">
            {paragraph}
            </p>
            ))}
            </div>
            <div className="flex justify-center">
            <Link to="/casestudy" className="inline-block mt-10 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            Back to Case Studies
            </Link>
            </div>
            <div className="p-4"/>
        </div>
      </div>
    );
  };
  
  export default CaseStudies;