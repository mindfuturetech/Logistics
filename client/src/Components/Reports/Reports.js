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
  const [vendorQuery, setVendorQuery] = useState('');
  const [truckQuery, setTruckQuery] = useState('');
  const [showVendorDropdown, setShowVendorDropdown] = useState(false);
  const [showTruckDropdown, setShowTruckDropdown] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleDownload = async (id, field, originalname) => {
    try {
      const response = await axios.get(`/api/download/${id}/${field}`, {
        responseType: 'blob' // Important: This tells axios to handle the response as a binary blob
      });
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] 
      });
      
      // Create a download link and trigger it
      saveAs(blob, originalname || 'download');
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close vendor dropdown if click is outside
      console.log('closest:', event.target.closest('.d1'));
      if (showVendorDropdown && !event.target.closest('.d1')) {
        setShowVendorDropdown(false);
      }
      // Close truck dropdown if click is outside
      if (showTruckDropdown && !event.target.closest('.d2')) {
        setShowTruckDropdown(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVendorDropdown, showTruckDropdown]);


  useEffect(() => {
    // Fetch vendors and truck numbers for dropdowns
    fetchVendors();
    fetchTruckNumbers();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get('/api/vendors');
      
      setVendors(response.data.vendorData);
      console.log(vendors);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      alert('Error fetching vendors')
    }
  };

  const fetchTruckNumbers = async () => {
    try {
      const response = await axios.get('/api/trucks');
      
      setTruckNumbers(response.data.truckData);
      console.log(truckNumbers);

    } catch (error) {
      if(error.response){
        if(error.response.data.message){
          alert(error.response.data.message);
        }
      }
      console.error('Error fetching truck numbers:', error);
      alert('Error fetching truck numbers')
    }
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.company_name.toLowerCase().startsWith(vendorQuery.toLowerCase())
  )

  const filteredTrucks = truckNumbers.filter((truck) =>
    truck.truck_no.toLowerCase().startsWith(truckQuery.toLowerCase())
  );



  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setShowTruckDropdown(false);
    setShowVendorDropdown(false);
    console.log('filters: ', filters);
    if (!(filters.startDate && filters.endDate) && !filters.vendor && !filters.truckNumber) {
      alert('Please select at least one filter');
      return;
    }

    try {
      const response = await axios.get('/api/reports', { params: filters });
      console.log('table data :',response.data.tableData);
      setTableData(response.data.tableData);

      if(response?.data?.tableData?.length===0){
        alert('No records available');
      }
    } catch (error) {
      if(error.response.data.message){
        alert(error.response.data.message);
      }else{
        alert('Error fetching Table data');
      }
      console.error('Error fetching reports:', error);
    }
  };

  const handleEdit = (rowId) => {
    setEditingRow(rowId);
    setSelectedFiles({});
  };

  const handleFileSelect = (e, rowId, fieldName) => {
    const file = e.target.files[0];
    setSelectedFiles({
      ...selectedFiles,
      [`${rowId}-${fieldName}`]: e.target.files[0]
    });
    
  };

  const handleSave = async (row) => {
    
    const formData = new FormData();
    formData.append('id', row._id);
    formData.append('transactionStatus', row.TransactionStatus);
    formData.append('weight', row.Weight);
    formData.append('actualWeight', row.ActualWeight);


    // Append any selected files
    Object.keys(selectedFiles).forEach(key => {
      if (key.startsWith(row._id)) {
        const fieldName = key.split('-')[1];
        formData.append(fieldName, selectedFiles[key]);
      }
    });

    try {
      await axios.post(`/api/reports/${row._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Refresh data
      const response = await axios.get('/api/reports', { params: filters });
      setTableData(response.data);
      setEditingRow(null);
      setSelectedFiles({});

      if(response.data.message){
        alert(response.data.message);
      }
    } catch (error) {
      if(error.response.data.message){
        alert(error.response.data.message);
      }
      else{
        alert('Error updating the record');
      }
    }
  };

  const todayList = async()=>{

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);
    

    const todayFilters = {
      startDate: today.toISOString(),
      endDate: todayEnd.toISOString(),
      vendor: '',
      truckNumber: ''
    };

    try{
      console.log('startdate:',todayFilters.startDate)
      console.log('endDate:',todayFilters.endDate)
      const response = await axios.get('/api/reports', { params: todayFilters });
      console.log('today table data :',response.data.tableData);
      setTableData(response.data.tableData);

      if(response?.data?.tableData?.length===0){
        alert('No records available');
      }
      
    }catch(error){
      if(error.response.data.message){
        alert(error.response.data.message)
      }else{
        alert(`Error fetching Today's list`);
      }
    }
  }

  const downloadExcel = () => {
    
    const ExcelData=tableData.map(row=>{

      const {DieselSlipImage, LoadingAdvice, InvoiceCompany, WeightmentSlip, _id,TruckNumber, DONumber, createdAt, updatedAt,__v, ...keepFields} = row;

      return {
        TruckNumber,
        DONumber,
        Date: new Date(row.createdAt).toLocaleDateString(), 
        Time: new Date(row.createdAt).toLocaleTimeString(),
        ...keepFields 
      }
    });


    const worksheet = XLSX.utils.json_to_sheet(ExcelData);
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

            <div className="filter-item d1">
            <label>Vendor</label>
        <input
          type="text"
          name="vendor"
          autocomplete="off"
          value={vendorQuery}
          onChange={(e) => {
            setVendorQuery(e.target.value)
            handleFilterChange(e);
            }}
          onClick={() => setShowVendorDropdown(true)}
          
        />
        {showVendorDropdown && vendorQuery && (
          <ul className="dropdown">
            {filteredVendors.map((vendor) => (
              <li
                key={vendor._id }
                onClick={() => {
                  setFilters({ ...filters, vendor: vendor.company_name });
                  setVendorQuery(vendor.company_name);
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

            <div className="filter-item d2">
            <label>Truck Number</label>
        <input
          type="text"
          name="truckNumber"
          autocomplete="off"
          value={truckQuery}
          onChange={(e) => {
            setTruckQuery(e.target.value);
            handleFilterChange(e);
          
          }}
          onClick={() => setShowTruckDropdown(true)}
         
        />
        {showTruckDropdown && truckQuery && (
          <ul className="dropdown">
            {filteredTrucks.map((truck) => (
              <li
                key={truck._id}
                onClick={() => {
                  setFilters({ ...filters, truckNumber: truck.truck_no});
                  setTruckQuery(truck.truck_no);
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
          </div>

            <div className="button-group">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="today-list-btn" onClick={todayList}>Today's List</button>
              {tableData.length > 0
               && (
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
              <thead id='sticky-header'>
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
                  <th>TDS_Rate</th>
                  <th>Advance</th>
                  <th>Toll</th>
                  <th>Adblue</th>
                  <th>Greasing</th>
                  <th>Diesel Slip Image</th>
                  <th>Loading Advice</th>
                  <th>Invoice Company</th>
                  <th>Weightment Slip</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr key={row._id}>
                    <td>{row.TruckNumber}</td>
                    <td>{row.DONumber}</td>
                    <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(row.createdAt).toLocaleTimeString()}</td>
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
                          <option value="Open">Open</option>
                          <option value="Acknowledged">Acknowledged</option>

                        </select>
                      ) : (
                        row.TransactionStatus
                      )}</td>
                    <td>{row.Weight}</td>
                    <td>
                      {editingRow === row._id ? (
                        <input
                        className='editInput'
                          type="number"
                          value={row.ActualWeight}
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
                      {row.DifferenceInWeight}
                    </td>
                    <td>{row.Freight}</td>
                    <td>{row.Diesel}</td>
                    <td>{row.DieselAmount}</td>
                    <td>{row.DieselSlipNumber}</td>
                    <td>{row.TDS_Rate}</td>
                    <td>{row.Advance}</td>
                    <td>{row.Toll}</td>
                    <td>{row.Adblue}</td>
                    <td>{row.Greasing}</td>
                    {['DieselSlipImage', 'LoadingAdvice', 'InvoiceCompany', 'WeightmentSlip'].map(field => (
                      <td key={field}>
                        {editingRow === row._id ? (
                          <input
                            type="file"
                            name={field}
                            onChange={(e) => handleFileSelect(e, row._id, field)}
                            accept="image/*,.pdf"
                            max="1"
                          />
                        ) : row[field]?.filepath ? (
                            <button
                            className="download-link-btn"
                            onClick={() => handleDownload(row._id, field, row[field].originalname)}
                          >
                            Download {row[field].originalname}
                          </button>
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