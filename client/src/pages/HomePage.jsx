import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';

const fieldIds = [1, 2, 3];

const fetchData = async (fieldId) => {
  const response = await axios.get(
    `http://localhost:5000/fields-data/${fieldId}`
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
          [`field${fieldId}Id`]: fieldIdValues
        }));
      }
    };

    fetchingData();
  }, []);

  return (
    <>
      <h1 className="pt-2 pb-2 text-2xl font-semibold text-center shadow-md bg-slate-200">
        Water Quality Monitoring {'( IOE Mini Project )'}
      </h1>
      <div className="m-7 flex flex-wrap justify-center">
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
