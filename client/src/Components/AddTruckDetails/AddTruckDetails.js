import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import './AddTruckDetails.css';
import '../../Pages/HomePage/HomePage.css'

const AddTruckDetails = () => {
  const [TruckNumber, setTruckNumber] = useState('');
  const [DONumber, setDONumber] = useState('');
  // const [Time, setTime] = useState('');
  const [Date, setDate] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [Vendor, setVendor] = useState('');
  const [DestinationFrom, setDestinationFrom] = useState('');
  const [DestinationTo, setDestinationTo] = useState('');
  const [TruckType, setTruckType] = useState('');
  const [TransactionStatus, setTransactionStatus] = useState('');
  const [Weight, setWeight] = useState('');
  const [DifferenceInWeight, setDifferenceInWeight] = useState('');
  const [Freight, setFreight] = useState('');
  const [Diesel, setDiesel] = useState('');
  const [DieselAmount, setDieselAmount] = useState('');
  const [DieselSlipNumber, setDieselSlipNumber] = useState('');
  const [Advance, setAdvance] = useState('');
  const [Toll, setToll] =useState('');
  const [Adblue, setAdblue] = useState('');
  const [Greasing, setGreasing] = useState('');
  const [truckImage, setTruckImage] = useState(null);
  const [loadingAdvice, setLoadingAdvice] = useState(null);
  const [invoiceCompany, setInvoiceCompany] = useState(null);
  const [weighmentSlip, setWeighmentSlip] = useState(null);

  const handleTruckImageUpload = (e) => {
    setTruckImage(e.target.files[0]);
  };

  const handleLoadingAdviceUpload = (e) => {
    setLoadingAdvice(e.target.files[0]);
  };

  const handleInvoiceCompanyUpload = (e) => {
    setInvoiceCompany(e.target.files[0]);
  };

  const handleWeighmentSlipUpload = (e) => {
    setWeighmentSlip(e.target.files[0]);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      TruckNumber,
      DONumber,
      Date,
      DriverName,
      Vendor,
      DestinationFrom,
      DestinationTo,
      TruckType,
      TransactionStatus,
      Weight,
      Freight,
      Diesel,
      DieselAmount,
      DieselSlipNumber,
      Advance,
      Toll,
      Adblue,
      Greasing
    })
  };


  

  return (
    <div
      className={`add-truck-details-container`}
    >
{/* 
      <h2 className="add-truck-details-title">Upload Truck Details</h2>

      <div className="image-upload-section">
        <div className="image-upload-item">
          <label htmlFor="truckImage" className="image-upload-label">
            <FiUploadCloud className="image-upload-icon" />
            Upload Truck Image
          </label>
          <input
            type="file"
            id="truckImage"
            onChange={handleTruckImageUpload}
            className="image-upload-input"
          />
        </div>
        <div className="image-upload-item">
          <label htmlFor="loadingAdvice" className="image-upload-label">
            <FiUploadCloud className="image-upload-icon" />
            Loading Advice
          </label>
          <input
            type="file"
            id="loadingAdvice"
            onChange={handleLoadingAdviceUpload}
            className="image-upload-input"
          />
        </div>
        <div className="image-upload-item">
          <label htmlFor="invoiceCompany" className="image-upload-label">
            <FiUploadCloud className="image-upload-icon" />
            Invoice-Company
          </label>
          <input
            type="file"
            id="invoiceCompany"
            onChange={handleInvoiceCompanyUpload}
            className="image-upload-input"
          />
        </div>
        <div className="image-upload-item">
          <label htmlFor="weighmentSlip" className="image-upload-label">
            <FiUploadCloud className="image-upload-icon" />
            Weighment Slip
          </label>
          <input
            type="file"
            id="weighmentSlip"
            onChange={handleWeighmentSlipUpload}
            className="image-upload-input"
          />
        </div>
      </div>
 */}

      <form onSubmit={handleSubmit} className="add-truck-details-form">
        <div className="form-group">
          <label htmlFor="truckNumber">Truck Number:</label>
          <input
            type="text"
            id="truckNumber"
            value={TruckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
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
            <label htmlFor="date">Select a date:</label>
            <input 
                type="date" 
                id="date" 
                value={Date}
                onChange={(e) => setDate(e.target.value)} 
            />
        </div>
        <div className="form-group">
          <label htmlFor="driverName">Driver Name:</label>
          <input
            type="text"
            id="driverName"
            value={DriverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vendor">Vendor:</label>
          <select
            id="vendor"
            value={Vendor}
            onChange={(e) => setVendor(e.target.value)}
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
          >
            <option value="">Select Transaction Status</option>
            <option value="open">Open</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Weight">Weight (tons):</label>
          <input
            type="text"
            id="Weight"
            value={Weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Freight">Freight:</label>
          <input
            type="text"
            id="Freight"
            value={Freight}
            onChange={(e) => setFreight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Diesel">Diesel (Ltr):</label>
          <input
            type="text"
            id="Diesel"
            value={Diesel}
            onChange={(e) => setDiesel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Diesel Amount">Diesel Amount:</label>
          <input
            type="text"
            id="Diesel Amount"
            value={DieselAmount}
            onChange={(e) => setDieselAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="DieselSlipNumber">Diesel Slip Number:</label>
          <input
            type="text"
            id="DieselSlipNumber"
            value={DieselSlipNumber}
            onChange={(e) => setDieselSlipNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Advance">Advance:</label>
          <input
            type="text"
            id="Advance"
            value={Advance}
            onChange={(e) => setAdvance(e.target.value)}
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