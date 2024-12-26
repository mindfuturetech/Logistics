import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import './AddTruckDetails.css';
import '../../Pages/HomePage/HomePage.css'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/logistics';


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


  const handleSubmit = async (e) => {
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
        <div className="form-group">
          <label htmlFor="truckNumber">Truck Number:</label>
          <input
            type="text"
            id="truckNumber"
            value={TruckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
            required
          />
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
        {/* <div className="form-group">
            <label htmlFor="time">Select a time:</label>
            <input 
                type="time" 
                id="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)} 
            />
        </div> */}
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
        <div className="form-group">
          <label htmlFor="vendors">Vendor:</label>
          <select
            id="vendors"
            value={Vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
          >
            <option value="">Select Vendor</option>
            <option value="vendor1">Vendor 1</option>
            <option value="vendor2">Vendor 2</option>
            <option value="vendor3">Vendor 3</option>
            
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="destinationFrom">Destination From:</label>
          <select
            id="destinationFrom"
            value={DestinationFrom}
            onChange={(e) => setDestinationFrom(e.target.value)}
            required
          >
            <option value="">Select Destination From</option>
            <option value="destination1">Destination 1</option>
            <option value="destination2">Destination 2</option>
            <option value="destination3">Destination 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="destinationTo">Destination To:</label>
          <select
            id="destinationTo"
            value={DestinationTo}
            onChange={(e) => setDestinationTo(e.target.value)}
            required
          >
            <option value="">Select Destination To</option>
            <option value="destination1">Destination 1</option>
            <option value="destination2">Destination 2</option>
            <option value="destination3">Destination 3</option>
          </select>
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
            onChange={(e) => setWeight(e.target.value)}
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
            onChange={(e) => setFreight(e.target.value)}
            required
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
            required
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