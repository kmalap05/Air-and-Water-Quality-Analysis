import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import { Link } from 'react-router-dom';

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
      await new Promise((resolve) => setTimeout(resolve, 0));

      for (const fieldId of fieldIds) {
        const response = await fetchData(fieldId);
        const fieldValues = response.map((item) =>
          item[`field${fieldId}`].trim()
        );
        const fieldIdValues = response.map((item) => item.entry_id);

        setFieldData((prevData) => ({
          ...prevData,
          [`field${fieldId}Data`]: fieldValues,
          [`field${fieldId}Id`]: fieldIdValues
        }));
      }
    };

    fetchingData();
  }, [fieldData]);

  return (
    <>
      <nav className="flex justify-between items-center px-12 py-2">
        <h1 className="pt-2 pb-2 text-2xl font-semibold text-center text-black p-5 rounded-2xl">
          Water Quality Monitoring
        </h1>
        <div className="flex gap-8 items-center justify-center ">
          <Link to="/">Graph</Link>
          <Link to="/analysis">Analysis</Link>
        </div>
      </nav>
      <div className="m-8 mt-3 grid grid-cols-2">
        {fieldIds.map((fieldId) => (
          <Chart
            key={fieldId}
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
                ? 'green'
                : fieldId === 2
                ? 'aqua'
                : fieldId === 3
                ? 'brown'
                : ''
            }
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
