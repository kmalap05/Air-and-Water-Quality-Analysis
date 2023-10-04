import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart'; // Import the updated Chart component

const fieldIds = [1, 2, 3];

const fetchData = async (fieldId) => {
  const response = await axios.get(
    `https://environment-monitoring.onrender.com/fields-data/${fieldId}`
  );
  return response.data;
};

const initialFieldData = fieldIds.reduce((acc, fieldId) => {
  acc[`field${fieldId}Data`] = [];
  acc[`field${fieldId}Id`] = [];
  return acc;
}, {});

const HomePage = () => {
  const [fieldData, setFieldData] = useState(initialFieldData);

  useEffect(() => {
    const fetchingData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      for (const fieldId of fieldIds) {
        const response = await fetchData(fieldId);
        const fieldValues = response.map((item) =>
          item[`field${fieldId}`].trim()
        );
        const fieldIdValues = response.map((item) => item.entry_id);

        setFieldData((prevData) => ({
          ...prevData,
          [`field${fieldId}Data`]: fieldValues,
          [`field${fieldId}Id`]: fieldIdValues,
        }));
      }
    };

    fetchingData();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen p-4">
      <h1 className="pt-2 pb-2 text-2xl font-semibold text-center shadow-md bg-slate-100">
        Water Quality Monitoring {'( IOE Mini Project )'}
      </h1>
      <div className="ml-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {fieldIds.map((fieldId) => (
          <div
            key={fieldId}
            className={`p-4 bg-white rounded-md shadow-md border-2 border-gray-200 hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105`}
            style={{ width: '100%', height: '100%' }}
          >
            <h2 className="text-xl font-semibold mb-2">
              {fieldId === 1
                ? 'pH Value'
                : fieldId === 2
                ? 'TDS Value'
                : fieldId === 3
                ? 'Turbidity'
                : ''}
            </h2>
            {/* Use the updated Chart component with props */}
            <Chart
              fieldId={fieldData[`field${fieldId}Id`]}
              fieldData={fieldData[`field${fieldId}Data`]}
              fieldName={
                fieldId === 1
                  ? 'pH Value'
                  : fieldId === 2
                  ? 'TDS Value'
                  : fieldId === 3
                  ? 'Turbidity'
                  : ''
              }
              fieldColor={
                fieldId === 1
                  ? 'rgb(255, 0, 0)'
                  : fieldId === 2
                  ? 'rgba(0, 0, 255)' // Custom color for TDS Value
                  : fieldId === 3
                  ? 'rgba(60, 180, 113)' // Custom color for Turbidity
                  : ''
              }
              width={800}
              height={400}
              xAxisLabel={fieldId === 1
                ? 'Entries '
                : fieldId === 2
                ? 'Entries '
                : fieldId === 3
                ? 'Entries ' 
                : ''}
              yAxisLabel={fieldId === 1
                ? 'PH'
                : fieldId === 2
                ? 'mg/l'
                : fieldId === 3
                ? 'NTU' 
                : ''} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
