import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Vendor.css";

const getVendorDataUrl = "https://logistics.mindfuturetech.com/logistics/list-vendor";
const insertVendorDataUrl = "https://logistics.mindfuturetech.com/logistics/add-vendor";

const Vendor = () => {
    
    const [result, setResult] = useState([]);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        companyOwner: "",
        tdsRate: 0,
        pan: "",
        gst: "",
    });
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        document.title = "Vendor";
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setError(false);
            const response = await axios.get(getVendorDataUrl);
            console.log("response:::>", response.data.resultData)
            setResult(response.data.resultData || []);
        } catch (error) {
            setError(true);
            console.error("Error while fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(formData)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        try {
            const response = await axios.post(insertVendorDataUrl, formData);
            console.log("response:::>>>>>", response.data)
            setFormData({
                companyName: "",
                companyOwner: "",
                tdsRate: "",
                pan: "",
                gst: ""
            });
            if (response.status === 200) {
                setSubmitMessage(response.data.message);
            } else {
                setSubmitMessage(response.data.message);
            }
            fetchData()
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setSubmitMessage("Duplicate entry detected. Please check the data.");
            } else {
                setSubmitMessage("Failed to submit data. Please try again.");
            }
        }
    }

    return (
        <div id="vendor">
            {/* <h1>Vendor Master</h1> */}
            <div className="container-vendor">
                <form className="vendorForm" onSubmit={handleFormSubmit}>
                    <label htmlFor="companyName">Vendor Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required />
                    <label htmlFor="companyOwner">Vendor Owner:</label>
                    <input
                        type="text"
                        id="companyOwner"
                        name="companyOwner"
                        value={formData.companyOwner}
                        onChange={handleInputChange}
                        required />
                    <label htmlFor="tdsRate">TDS Rate (%):</label>
                    <input
                        type="number"
                        id="tdsRate"
                        name="tdsRate"
                        step="0.01"
                        value={formData.tdsRate}
                        onChange={handleInputChange}
                        required />
                    <label htmlFor="pan">PAN:</label>
                    <input
                        type="text"
                        id="pan"
                        name="pan"
                        value={formData.pan}
                        onChange={handleInputChange}
                        required />
                    <label htmlFor="gst">GST:</label>
                    <input
                        type="text"
                        id="gst"
                        name="gst"
                        value={formData.gst}
                        onChange={handleInputChange}
                        required />
                    <button className="submit-button" type="submit">Submit</button>
                    <p>{submitMessage}</p>
                </form>
                <div className="table-wrapper" id="results">
                    {/* <h2>Companies</h2> */}
                    <table id="resultsTable">
                        <thead>
                            <tr>
                                <th>Vendor Name</th>
                                <th>Vendor Owner</th>
                                <th>TDS Rate (%)</th>
                                <th>GST</th>
                                <th>PAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="5">Error fetching data. Please try again later.</td>
                                </tr>
                            ) : result.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="empty-row">
                                        No data available.
                                    </td>
                                </tr>
                            ) : (
                                result.map((vendor) => (
                                    <tr key={vendor.id}>
                                        <td>{vendor.companyName}</td>
                                        <td>{vendor.companyOwner}</td>
                                        <td>{vendor.tdsRate}%</td>
                                        <td>{vendor.gst}</td>
                                        <td>{vendor.pan}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Vendor;