import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GenerateBill.css";

const getBillingDataUrl = "http://localhost:5000/logistics/list-billing";
const generatePDFBillUrl = "http://localhost:5000/logistics/generate-pdf-bill";
const getVendorDataUrl = "http://localhost:5000/logistics/list-vendor";
const getVehicleDataUrl = "http://localhost:5000/logistics/list-vehicle";

const Bill = () => {

    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        vendor: '',
        truckNumber: ''
    });

    const [results, setResults] = useState([]);
    const [noDataMessage, setNoDataMessage] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [truckNumbers, setTruckNumbers] = useState([]);
    const [vendorQuery, setVendorQuery] = useState('');
    const [truckQuery, setTruckQuery] = useState('');
    const [showVendorDropdown, setShowVendorDropdown] = useState(false);
    const [showTruckDropdown, setShowTruckDropdown] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setShowTruckDropdown(false);
        setShowVendorDropdown(false);

        if((filters.startDate && filters.endDate)) {
            if (new Date(filters.startDate) > new Date(filters.endDate)) {
                alert("End date should be greater than or equal to Start Date.");
                return;
            }
        }

        const validatedFilters = {
            startDate: filters.startDate || '', // Default to empty string if not provided
            endDate: filters.endDate || '',
            vendor: filters.vendor || '',
            truckNumber: filters.truckNumber || ''
        };
    
        // Set filters and make the API call
        setFilters(validatedFilters);

        setNoDataMessage("");
        setShowTable(false);

        try {
            
            const response = await axios.post(getBillingDataUrl, filters);
            console.log("response.data.resultData:", response.data.resultData);
            if (response.data.resultData && response.data.resultData.length > 0) {
                setResults(response.data.resultData);
                setShowTable(true);
            } else {
                setResults([]);
                setNoDataMessage("No results found for the given criteria.");
                setShowTable(false);
            }
        } catch (error) {
            // console.error("Error fetching data:", error);
            setNoDataMessage("No data found!.");
            setShowTable(false);
        }
    };

    const fetchVendors = async () => {
        try {
            const response = await axios.get(getVendorDataUrl);
            console.log("vendors:>",response.data.resultData);

            setVendors(response.data.resultData);
            
        } catch (error) {
            console.error('Error fetching vendors:', error);
            alert('Error fetching vendors')
        }
    };

    const fetchTruckNumbers = async () => {
        try {
            const response = await axios.get(getVehicleDataUrl);
            console.log("truckNumbers:>",response.data.resultData);
            setTruckNumbers(response.data.resultData);
        } catch (error) {
            if (error.response) {
                if (error.response.data.message) {
                    alert(error.response.data.message);
                }
            }
            console.error('Error fetching truck numbers:', error);
            alert('Error fetching truck numbers')
        }
    };

    const filteredVendors = vendors.filter((vendor) =>
        vendor.companyName.toLowerCase().startsWith(vendorQuery.toLowerCase())
    );

    const filteredTrucks = truckNumbers.filter((truck) =>
        truck.truck_no.toLowerCase().startsWith(truckQuery.toLowerCase())
    );

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }
    
    useEffect(() => {
        document.title = "Billing";

        fetchVendors();
        fetchTruckNumbers();
        
        const handleClickOutside = (event) => {
            // Close vendor dropdown if click is outside
            console.log('closest:', event.target.closest('.d1'));
            console.log('closest:', event.target.closest('.d2'));
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

    async function fetchData() {
        console.log("Refetching data ...");
        try {
            const response = await axios.post(getBillingDataUrl, filters);
            console.log("response.data.resultData:", response.data.resultData);
            if (response.data.resultData && response.data.resultData.length > 0) {
                setResults(response.data.resultData);
                setShowTable(true);
            } else if(!response.data.resultData){
                setResults([]);
                setNoDataMessage("No results found for the given criteria.");
                setShowTable(false);
            }
        } catch (error) {
            setFilters({ ...filters,
                startDate: "",
                endDate: "",
                vendor: "",
                truckNumber: "",
            });
            // console.error("Error fetching data:", error);
            setNoDataMessage("No more data remained to fetch.");
            setShowTable(false);
        }
    }

    const generatePDF = async (e) => {
        const selectedRows = document.querySelectorAll(".truck-checkbox:checked");

        if (selectedRows.length === 0) {
            alert("Please select at least one row to generate the bill.");
            return;
        }

        const payload = Array.from(selectedRows).map((checkbox) => ({
            id: checkbox.dataset.primarykey,
            transaction_status: checkbox.dataset.trans_st
        }));

        console.log("payload:::>>>", payload);

        try {
            const response = await axios.post(
                generatePDFBillUrl,
                payload,
                { responseType: "blob" }
            );
            console.log("Status update:::>>>>", response.data);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `GeneratedBill.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert("Bill generated and transaction status updated.");
            fetchData();
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate the PDF. Please try again.");
        }
    };

    return (
        <div className="generate_bill">
            <div className="filter-box">
                <form onSubmit={handleSearch}>
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
                                            key={vendor._id}
                                            onClick={() => {
                                                setFilters({ ...filters, vendor: vendor.companyName || ""});
                                                setVendorQuery(vendor.companyName);
                                                setShowVendorDropdown(false);
                                            }}
                                            style={{
                                                padding: '5px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #ddd',
                                            }}
                                        >
                                            {vendor.companyName}
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
                                placeholder="Search Truck"
                            />
                            {showTruckDropdown && truckQuery && (
                                <ul className="dropdown">
                                    {filteredTrucks.map((truck) => (
                                        <li
                                            key={truck._id}
                                            onClick={() => {
                                                setFilters({ ...filters, truckNumber: truck.truck_no || ""});
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
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>
            
            {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
            {noDataMessage && <div className="no-data-message">{noDataMessage}</div>}


            {showTable && (
                <div className="bill-tabel">
                    <div className="table-wrapper">
                        <table id="resultsTable">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Index</th>
                                    <th>Truck Number</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Weight (tons)</th>
                                    <th>Actual Weight</th>
                                    <th>Difference In Weight</th>
                                    <th>Freight</th>
                                    <th>Diesel (liters)</th>
                                    <th>Diesel Amount</th>
                                    <th>Advance</th>
                                    <th>Driver Name</th>
                                    <th>Destination From</th>
                                    <th>Destination To</th>
                                    <th>DO Number</th>
                                    <th>Vendor</th>
                                    <th>Truck Type</th>
                                    <th>Transaction Status</th>
                                    <th>Diesel Slip Number</th>
                                    {/* <th>Edit</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, _id) => (
                                    <tr key={result._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="truck-checkbox"
                                                data-primarykey={result._id}
                                                data-truckno={result.truck_no}
                                                data-dt={new Date(result.date).toLocaleDateString()}
                                                data-tm={new Date(result.date).toLocaleTimeString()}
                                                data-wt={result.weight}
                                                data-actual_wt={result.actual_weight}
                                                data-diff_wt={result.difference_weight}
                                                data-frgt={result.freight}
                                                data-dsel={result.diesel}
                                                data-dsel_amt={result.diesel_amount}
                                                data-adv={result.advance}
                                                data-dri_nm={result.driver_name}
                                                data-dest_frm={result.destination_from}
                                                data-dest_to={result.destination_to}
                                                data-do_num={result.do_number}
                                                data-ven={result.vendor}
                                                data-trk_type={result.truck_type}
                                                data-trans_st={result.transaction_status}
                                                data-dsel_slpnum={result.diesel_slip_number}
                                            />
                                        </td>
                                        <td>{result.id}</td>
                                        <td>{result.truck_no}</td>
                                        <td>{new Date(result.date).toLocaleDateString()}</td>
                                        <td>{new Date(result.date).toLocaleTimeString()}</td>
                                        <td>{result.weight}</td>
                                        <td>{result.actual_weight}</td>
                                        <td>{result.difference_weight}</td>
                                        <td>{result.freight}</td>
                                        <td>{result.diesel}</td>
                                        <td>{result.diesel_amount}</td>
                                        <td>{result.advance}</td>
                                        <td>{result.driver_name}</td>
                                        <td>{result.destination_from}</td>
                                        <td>{result.destination_to}</td>
                                        <td>{result.do_number}</td>
                                        <td>{result.vendor}</td>
                                        <td>{result.truck_type}</td>
                                        <td>{result.transaction_status}</td>
                                        <td>{result.diesel_slip_number}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showTable && (
                <button
                    className="generatePDF"
                    onClick={generatePDF}
                >
                    Generate Bill
                </button>
            )}
        </div>
    );

}

export default Bill;
