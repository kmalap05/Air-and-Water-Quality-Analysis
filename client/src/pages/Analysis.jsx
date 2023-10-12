import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import '../css/Analysis.css'

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
    <div className='analyze'>
    <nav className="navbar">
    
    <span className="navbar-toggle" id="js-navbar-toggle">
            <i className="fas fa-bars"></i>
        </span>
   
    <a style={{fontSize:'30px', color:'white', fontWeight:'800',marginLeft:'3vw'}}  href="#"className="logo">
     <h1>AquaLizer</h1>
    </a>
    <ul className="main-nav" id="js-menu">
      <li>
        <a href="/" className="nav-links nab">Home</a>
      </li>
      <li>
        <a href="/analysis" className="nav-links nab">Analysis</a>
      </li>
      {/* <li>
        <a href="#" className="nav-links">Blog</a>
      </li> */}
      {/* <li>
        <a href="#" className="nav-links">Contact Us</a>
      </li> */}
    
    </ul>
   
  </nav>
      <div className="m-8 mt-3 grid grid-cols-2" style={{marginTop:'15vh'}}>
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
      </div>
    </>
  );
};

export default HomePage;
