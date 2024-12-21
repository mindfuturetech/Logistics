// Reports.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './Reports.css';

axios.defaults.baseURL = 'http://localhost:5000/logistics';


const Reports = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    vendor: '',
    truckNumber: ''
  });

  const [vendors, setVendors] = useState([]);
  const [truckNumbers, setTruckNumbers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    // Fetch vendors and truck numbers for dropdowns
    fetchVendors();
    fetchTruckNumbers();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get('/api/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const fetchTruckNumbers = async () => {
    try {
      const response = await axios.get('/api/trucks');
      setTruckNumbers(response.data);
    } catch (error) {
      console.error('Error fetching truck numbers:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(filters.startDate && !filters.endDate) && !filters.vendor && !filters.truckNumber) {
      alert('Please select at least one filter');
      return;
    }

    try {
      const response = await axios.get('/api/reports', { params: filters });
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleEdit = (rowId) => {
    setEditingRow(rowId);
    setSelectedFiles({});
  };

  const handleFileSelect = (e, rowId, fieldName) => {
    setSelectedFiles({
      ...selectedFiles,
      [`${rowId}-${fieldName}`]: e.target.files[0]
    });
  };

  const handleSave = async (row) => {
    const formData = new FormData();
    formData.append('id', row._id);
    formData.append('transactionStatus', row.TransactionStatus);
    formData.append('actualWeight', row.ActualWeight);
    formData.append('differenceInWeight', row.DifferenceInWeight);

    // Append any selected files
    Object.keys(selectedFiles).forEach(key => {
      if (key.startsWith(row._id)) {
        const fieldName = key.split('-')[1];
        formData.append(fieldName, selectedFiles[key]);
      }
    });

    try {
      await axios.put(`/api/reports/${row._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Refresh data
      const response = await axios.get('/api/reports', { params: filters });
      setTableData(response.data);
      setEditingRow(null);
      setSelectedFiles({});
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'reports.xlsx');
  };

  return (
    <div className="reports-container">
      <div className="filter-box">
        <form onSubmit={handleSubmit}>
          <div className="filters-grid">
            <div className="filter-item">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>

            <div className="filter-item">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>

            <div className="filter-item">
              <label>Vendor</label>
              <select
                name="vendor"
                value={filters.vendor}
                onChange={handleFilterChange}
              >
                <option value="">Select Vendor</option>
                <option value="">Select Vendor1</option>
                <option value="">Select Vendor2</option>

                {/* {vendors.map(vendor => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.name}
                  </option>
                ))} */}
              </select>
            </div>

            <div className="filter-item">
              <label>Truck Number</label>
              <select
                name="truckNumber"
                value={filters.truckNumber}
                onChange={handleFilterChange}
              >
                <option value="">Select Truck</option>
                <option value="">Select Truck1</option>
                <option value="">Select Truck2</option>
                <option value="">Select Truck3</option>

                {/* {truckNumbers.map(truck => (
                  <option key={truck._id} value={truck.number}>
                    {truck.number}
                  </option>
                ))} */}
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            {tableData.length > 0 && (
              <button type="button" className="download-btn" onClick={downloadExcel}>
                Download Excel
              </button>
            )}
          </div>
        </form>
      </div>

      {tableData.length > 0 && (
        <div className="table-box">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Truck Number</th>
                  <th>DO Number</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Driver Name</th>
                  <th>Vendor</th>
                  <th>Destination From</th>
                  <th>Destination To</th>
                  <th>Truck Type</th>
                  <th>Transaction Status</th>
                  <th>Weight</th>
                  <th>Actual Weight</th>
                  <th>Difference</th>
                  <th>Freight</th>
                  <th>Diesel</th>
                  <th>Diesel Amount</th>
                  <th>Diesel Slip Number</th>
                  <th>Advance</th>
                  <th>Toll</th>
                  <th>Adblue</th>
                  <th>Greasing</th>
                  <th>Diesel Slip Image</th>
                  <th>Loading Advice</th>
                  <th>Invoice Company</th>
                  <th>Weightment Slip</th>
                  {/* <th>% TDS</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr key={row._id}>
                    <td>{row.TruckNumber}</td>
                    <td>{row.DONumber}</td>
                    <td>{new Date(row.Date).toLocaleDateString()}</td>
                    <td>{new Date(row.Date).toLocaleTimeString()}</td>
                    <td>{row.DriverName}</td>
                    <td>{row.Vendor}</td>
                    <td>{row.DestinationFrom}</td>
                    <td>{row.DestinationTo}</td>
                    <td>{row.TruckType}</td>
                    <td>   
                      {editingRow === row._id ? (
                        <select
                          value={row.TransactionStatus}
                          onChange={(e) => {
                            const newData = tableData.map(item =>
                              item._id === row._id
                                ? { ...item, TransactionStatus: e.target.value }
                                : item
                            );
                            setTableData(newData);
                          }}
                        >
                          <option value="Acknowledged">Pending</option>
                        
                        </select>
                      ) : (
                        row.TransactionStatus
                      )}</td>
                    <td>{row.Weight}</td>
                    <td>
                      {editingRow === row._id ? (
                        <input
                          type="number"
                          value={row.ActualWeight || ''}
                          onChange={(e) => {
                            const newData = tableData.map(item =>
                              item._id === row._id
                                ? { ...item, ActualWeight: e.target.value }
                                : item
                            );
                            setTableData(newData);
                          }}
                        />
                      ) : (
                        row.ActualWeight
                      )}
                    </td>
                    <td>
                      {editingRow === row._id ? (
                        <input
                          type="number"
                          value={row.DifferenceInWeight || ''}
                          onChange={(e) => {
                            const newData = tableData.map(item =>
                              item._id === row._id
                                ? { ...item, DifferenceInWeight: e.target.value }
                                : item
                            );
                            setTableData(newData);
                          }}
                        />
                      ) : (
                        row.DifferenceInWeight
                      )}
                    </td>
                    <td>{row.Freight}</td>
                    <td>{row.Diesel}</td>
                    <td>{row.DieselAmount}</td>
                    <td>{row.DieselSlipNumber}</td>
                    <td>{row.Advance}</td>
                    <td>{row.Toll}</td>
                    <td>{row.Adblue}</td>
                    <td>{row.Greasing}</td>
                    {/* <td>{row.DieselSlipImage}</td>
                    <td>{row.LoadingAdvice}</td>
                    <td>{row.InvoiceCompany}</td>
                    <td>{row.WeightmentSlip}</td> */}
                    {/* <td>{row.PercentTDS}</td> */}
                    {['DieselSlipImage', 'LoadingAdvice', 'InvoiceCompany', 'WeightmentSlip'].map(field => (
                      <td key={field}>
                        {editingRow === row._id ? (
                          <input
                            type="file"
                            onChange={(e) => handleFileSelect(e, row._id, field)}
                            accept="image/*,.pdf"
                          />
                        ) : row[field]?.filepath ? (
                          <a
                            href={`/api/download/${row._id}/${field}`}
                            download
                          >
                            e.target.files[0].name;
                          </a>
                        ) : (
                          'No file'
                        )}
                      </td>
                    ))}
                    <td>
                      {editingRow === row._id ? (
                        <button
                          className="save-btn"
                          onClick={() => handleSave(row)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(row._id)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;