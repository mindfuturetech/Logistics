import React, { useState } from 'react';
import './AddTruckDetails.css';
import '../../Pages/HomePage/HomePage.css'

const AddTruckDetails = ({ isSidebarCollapsed }) => {
  const [truckNumber, setTruckNumber] = useState('');
  const [doNumber, setDONumber] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [vendor, setVendor] = useState('');
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [truckType, setTruckType] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [actualWeight, setActualWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      truckNumber,
      doNumber,
      time,
      date,
      driverName,
      vendor,
      destinationFrom,
      destinationTo,
      truckType,
      transactionStatus,
      actualWeight,
    });
  };

  return (
    <div
      className={`add-truck-details-container ${
        isSidebarCollapsed ? 'sidebar-collapsed' : ''
      }`}
    >
      <h2 className="add-truck-details-title">Add Truck Details</h2>
      <form onSubmit={handleSubmit} className="add-truck-details-form">
        <div className="form-group">
          <label htmlFor="truckNumber">Truck Number:</label>
          <input
            type="text"
            id="truckNumber"
            value={truckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="doNumber">DO Number:</label>
          <input
            type="text"
            id="doNumber"
            value={doNumber}
            onChange={(e) => setDONumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="driverName">Driver Name:</label>
          <input
            type="text"
            id="driverName"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vendor">Vendor:</label>
          <select
            id="vendor"
            value={vendor}
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
            value={destinationFrom}
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
            value={destinationTo}
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
            value={truckType}
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
            value={transactionStatus}
            onChange={(e) => setTransactionStatus(e.target.value)}
          >
            <option value="">Select Transaction Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="actualWeight">Actual Weight (tons):</label>
          <input
            type="text"
            id="actualWeight"
            value={actualWeight}
            onChange={(e) => setActualWeight(e.target.value)}
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