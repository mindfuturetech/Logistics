import React, { useState, useEffect, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import './AddTruckDetails.css';
import '../../Pages/HomePage/HomePage.css'
import axios from 'axios';
axios.defaults.baseURL = 'https://logistics.mindfuturetech.com/logistics';


const AddTruckDetails = () => {
  const [TruckNumber, setTruckNumber] = useState('');
  const [DONumber, setDONumber] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [Vendor, setVendor] = useState('');
  const [DestinationFrom, setDestinationFrom] = useState('');
  const [DestinationTo, setDestinationTo] = useState('');
  const [TruckType, setTruckType] = useState('');
  const [TransactionStatus, setTransactionStatus] = useState('');
  const [Weight, setWeight] = useState('');
  const [Freight, setFreight] = useState('');
  const [Diesel, setDiesel] = useState('');
  const [DieselAmount, setDieselAmount] = useState('');
  const [DieselSlipNumber, setDieselSlipNumber] = useState('');
  const [TDS_Rate, setTDS_Rate] = useState('');
  const [Advance, setAdvance] = useState('');
  const [Toll, setToll] = useState('');
  const [Adblue, setAdblue] = useState('');
  const [Greasing, setGreasing] = useState('');

  
    const [vendorsList, setVendorsList] = useState([]);
    const [truckNumbersList, setTruckNumbersList] = useState([]);
    const [destinationList, setDestinationList] = useState([]);

    const [showVendorDropdown, setShowVendorDropdown] = useState(false);
    const [showTruckDropdown, setShowTruckDropdown] = useState(false);
    const [showDestinationFromDropdown, setShowDestinationFromDropdown] = useState(false);
    const [showDestinationToDropdown, setShowDestinationToDropdown] = useState(false);

     const[Rate,setRate] = useState([]);

    const inputRef1 = useRef(null);
    const inputRef2= useRef(null);
    const inputRef3 = useRef(null);

      
    useEffect(() => {
      // Fetch vendors and truck numbers for dropdowns
      fetchVendors();
      fetchTruckNumbers();
      fetchDestinationData();
    }, []);
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Close vendor dropdown if click is outside
        if (showVendorDropdown && !event.target.closest('.da1')) {
          setShowVendorDropdown(false);
        }
        // Close truck dropdown if click is outside
        if (showTruckDropdown && !event.target.closest('.da2')) {
          setShowTruckDropdown(false);
        }
        // Close DestinationFrom dropdown if click is outside
        if (showDestinationFromDropdown && !event.target.closest('.da3')) {
          setShowDestinationFromDropdown(false);
        }
        // Close DestinationTo dropdown if click is outside
        if (showDestinationToDropdown && !event.target.closest('.da4')) {
          setShowDestinationToDropdown(false);
        }
      };
  
      // Add event listener
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showVendorDropdown, showTruckDropdown, showDestinationFromDropdown, showDestinationToDropdown]);


    useEffect(() => {
      const calculateRate = async () => {
            const validFrom = destinationList.some(dest => 
              dest.from.toLowerCase() === DestinationFrom.toLowerCase()
            );
            const validTo = destinationList.some(dest => 
              dest.to.toLowerCase() === DestinationTo.toLowerCase()
            );
  

            if (validFrom && validTo) {
              const matchingRoutes = destinationList.filter(destination => 
                destination.from.toLowerCase() === DestinationFrom.toLowerCase() &&
                destination.to.toLowerCase() === DestinationTo.toLowerCase()
              );
  
              if (matchingRoutes.length > 0) {
                setRate(matchingRoutes);
                if (Weight) {
                  setFreight(matchingRoutes[0].rate * Weight);
                }
              } else {

                setRate([]);
                setFreight(0);
              }
            } else {

              setRate([]);
              setFreight(0);
            }
      };
      
      calculateRate();
    }, [DestinationFrom, DestinationTo, Weight]);
  

    useEffect(()=>{
      const getTDS = async()=>{
        if(Vendor){

          // const isVendorNotFocused = inputRef3.current && document.activeElement !== inputRef3.current;
          // const isVendorFocused = inputRef3.current && document.activeElement === inputRef3.current;
          
          console.log('Vendor:', Vendor);

          const currentVendor = vendorsList.some((vendor) =>
            vendor.company_name.toLowerCase() === Vendor.toLowerCase()
          )   

          if(currentVendor){
               const getVendor = vendorsList.filter((vendor) =>
                 vendor.company_name.toLowerCase()=== Vendor.toLowerCase()
               )
         
           if(getVendor.length>0){
              const TDS_Value = getVendor[0].tds_rate
              setTDS_Rate(TDS_Value);
            }
          }
        else{setTDS_Rate(0)};

        }
      }

      getTDS();


    },[Vendor])

    const fetchVendors = async () => {
      try {
        const response = await axios.get('/api/vendors');
        
        setVendorsList(response.data.vendorData);
        console.log(vendorsList);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };
  
    const fetchTruckNumbers = async () => {
      try {
        const response = await axios.get('/api/trucks');
    
        setTruckNumbersList(response.data.truckData);
        console.log(truckNumbersList);
  
      } catch (error) {
        console.error('Error fetching truck numbers:', error);
      }
    };

    const fetchDestinationData = async ()=>{
      try {
        const response = await axios.get('/api/destination');
    
        setDestinationList(response.data.destinationData);
        console.log(destinationList);
  
      } catch (error) {
        console.error('Error fetching destination data:', error);
      }    
    }
  
    const filteredVendors = vendorsList.filter((vendor) =>
      vendor.company_name.toLowerCase().startsWith(Vendor.toLowerCase())
    )
  
    const filteredTrucks = truckNumbersList.filter((truck) =>
      truck.truck_no.toLowerCase().startsWith(TruckNumber.toLowerCase())
    );

    const filteredDestinationFrom =destinationList.filter((destinationFrom) =>
      destinationFrom.from.toLowerCase().startsWith(DestinationFrom.toLowerCase())

    );

    const filteredDestinationTo =destinationList.filter((destinationTo) =>
      destinationTo.to.toLowerCase().startsWith(DestinationTo.toLowerCase())
    );
  

  const handleSubmit = async (e) => {

    const validTruckNumber = truckNumbersList.some((truckNumber)=>
      truckNumber.truck_no.toLowerCase() === TruckNumber.toLowerCase()
    )

    if(!validTruckNumber){
      alert('Please enter valid truck number');
      return;
    }

    const validVendor = vendorsList.some((vendor) =>
      vendor.company_name.toLowerCase() === Vendor.toLowerCase()
    )   

    if(!validVendor || !TDS_Rate || TDS_Rate===0){
      alert('Please enter valid vendor');
      return;
    }

    const validFrom = destinationList.some(dest => 
      dest.from.toLowerCase() === DestinationFrom.toLowerCase()
    );
    const validTo = destinationList.some(dest => 
      dest.to.toLowerCase() === DestinationTo.toLowerCase()
    );

    if(!validFrom || !validTo || !Freight || Freight===0){
      alert('Please enter valid destinations');
      return;
    }

    if(!TruckNumber || !DONumber || !DriverName || !Vendor || !DestinationFrom || !DestinationTo || !TruckType || !TransactionStatus || !Weight || !Freight
      || !Diesel || !DieselAmount || !DieselSlipNumber || !TDS_Rate || !Advance || !Toll || !Adblue || !Greasing){
        alert('Please fill all the fields before submitting');
        return;
      }
    

    e.preventDefault();
    // Handle form submission logic here
    setTruckNumber('');
    setDONumber('');
    setDriverName('');
    setVendor('');
    setDestinationFrom('');
    setDestinationTo('');
    setTruckType('');
    setTransactionStatus('');
    setWeight('');
    setFreight('');
    setDiesel('');
    setDieselAmount('');
    setDieselSlipNumber('');
    setTDS_Rate('');
    setAdvance('');
    setToll('');
    setAdblue('');
    setGreasing('');


    let sendData = {
      TruckNumber, DONumber,DriverName, Vendor, DestinationFrom, DestinationTo,
      TruckType, TransactionStatus, Weight, Freight, Diesel, DieselAmount, DieselSlipNumber,TDS_Rate ,Advance, Toll, Adblue, Greasing
    }

    try {
      const response = await axios.post('/reports', sendData, {
        withCredentials: true
      });

      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }



  };




  return (
    <div
      className={`add-truck-details-container`}
    >

      <form onSubmit={handleSubmit} className="add-truck-details-form">
        <div className="form-group da2">
          <label htmlFor="truckNumber">Truck Number:</label>
          <input
            type="text"
            id="truckNumber"
            autocomplete="off"
            value={TruckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
            onClick={() => setShowTruckDropdown(true)}
            required
          />
          {showTruckDropdown && TruckNumber && (
          <ul className="TVdropdown">
            {filteredTrucks.map((truck) => (
              <li
                key={truck._id}
                onClick={() => {
                  setTruckNumber(truck.truck_no);
                  setShowTruckDropdown(false);
                }}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {truck.truck_no}
              </li>
            ))}
            {filteredTrucks.length === 0 && (
              <li style={{ padding: '5px' }}>No trucks found</li>
            )}
          </ul>
        )}
        </div>
        <div className="form-group">
          <label htmlFor="doNumber">DO Number:</label>
          <input
            type="number"
            step="any"
            id="doNumber"
            value={DONumber}
            onChange={(e) => setDONumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="driverName">Driver Name:</label>
          <input
            type="text"
            id="driverName"
            value={DriverName}
            onChange={(e) => setDriverName(e.target.value)}
            required
          />
        </div>
        <div className="form-group da1">
          <label htmlFor="vendors">Vendor:</label>
          <input
            ref={inputRef3}
            type="text"
            id="vendors"
            autocomplete="off"
            value={Vendor}
            onChange={(e) => setVendor(e.target.value)}
            onClick={() => setShowVendorDropdown(true)}
            required
          />
          {showVendorDropdown && Vendor && (
          <ul className="TVdropdown">
            {filteredVendors.map((vendor) => (
              <li
                key={vendor._id }
                onClick={() => {
                  setVendor(vendor.company_name);
                  setShowVendorDropdown(false);
                }}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {vendor.company_name}
              </li>
            ))}
            {filteredVendors.length === 0 && (
              <li style={{ padding: '5px' }}>No vendors found</li>
            )}
          </ul>
        )}
        </div>
        <div className="form-group da3">
          <label htmlFor="destinationFrom">Destination From:</label>
          <input
            ref={inputRef1}
            type="text"
            id="destinationFrom"
            autocomplete="off"
            value={DestinationFrom}
            onChange={(e) => setDestinationFrom(e.target.value)}
            onClick={() => setShowDestinationFromDropdown(true)}
            required
          />
          {showDestinationFromDropdown && DestinationFrom && (
          <ul className="TVdropdown">
            {filteredDestinationFrom.map((destinationfrom) => (
              <li
                key={destinationfrom._id }
                onClick={() => {
                  setDestinationFrom(destinationfrom.from);
                  setShowDestinationFromDropdown(false);
                }}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {destinationfrom.from}
              </li>
            ))}
            {filteredDestinationFrom.length === 0 && (
              <li style={{ padding: '5px' }}>No data found</li>
            )}
          </ul>
        )}
        </div>
        <div className="form-group da4">
          <label htmlFor="destinationTo">Destination To:</label>
          <input
            ref={inputRef2}
            className="DestinationToClass"
            type="text"
            id="destinationTo"
            autoComplete="off"
            value={DestinationTo}
            onChange={(e) => setDestinationTo(e.target.value)}
            onClick={() => setShowDestinationToDropdown(true)}
            required
          />
            {showDestinationToDropdown && DestinationTo && (
          <ul className="TVdropdown">
            {filteredDestinationTo.map((destinationto) => (
              <li
                key={destinationto._id }
                onClick={() => {
                  setDestinationTo(destinationto.to);
                  setShowDestinationToDropdown(false);
                }}
                style={{
                  padding: '5px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {destinationto.to}
              </li>
            ))}
            {filteredDestinationTo.length === 0 && (
              <li style={{ padding: '5px' }}>No data found</li>
            )}
          </ul>
        )}
        </div>
        <div className="form-group">
          <label htmlFor="truckType">Truck Type:</label>
          <select
            id="truckType"
            value={TruckType}
            onChange={(e) => setTruckType(e.target.value)}
            required
          >
            <option value="">Select Truck Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="transactionStatus">Transaction Status:</label>
          <select
            id="transactionStatus"
            value={TransactionStatus}
            onChange={(e) => setTransactionStatus(e.target.value)}
            required
          >
            <option value="">Select Transaction Status</option>
            <option value="open">Open</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Weight">Weight (tons):</label>
          <input
            type="number"
            step="any"
            id="Weight"
            value={Weight}
            onChange={(e) => {
              setWeight(e.target.value)
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Freight">Freight:</label>
          <input
            type="number"
            step="any"
            id="Freight"
            value={Freight}
            disabled
          />  
        </div>
        <div className="form-group">
          <label htmlFor="Diesel">Diesel (Ltr):</label>
          <input
            type="text"
            id="Diesel"
            value={Diesel}
            onChange={(e) => setDiesel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Diesel Amount">Diesel Amount:</label>
          <input
            type="number"
            step="any"
            id="Diesel Amount"
            value={DieselAmount}
            onChange={(e) => setDieselAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="DieselSlipNumber">Diesel Slip Number:</label>
          <input
            type="number"
            step="any"
            id="DieselSlipNumber"
            value={DieselSlipNumber}
            onChange={(e) => setDieselSlipNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="TDS_Rate">TDS Rate:</label>
          <input
            type="number"
            step="any"
            id="TDS_Rate"
            value={TDS_Rate}
            onChange={(e) => setTDS_Rate(e.target.value)}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="Advance">Advance:</label>
          <input
            type="text"
            id="Advance"
            value={Advance}
            onChange={(e) => setAdvance(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Toll">Toll:</label>
          <input
            type="number"
            step="any"
            id="Toll"
            value={Toll}
            onChange={(e) => setToll(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Adblue">Adblue:</label>
          <input
            type="number"
            step="any"
            id="Adblue"
            value={Adblue}
            onChange={(e) => setAdblue(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Greasing">Greasing:</label>
          <input
            type="number"
            step="any"
            id="Greasing"
            value={Greasing}
            onChange={(e) => setGreasing(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTruckDetails;