import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Freight.css";

const getFreightDataUrl = "http://localhost:5000/logistics/list-freight";
const insertFreightDataUrl = "http://localhost:5000/logistics/add-freight";
const updateFreightDataUrl = "http://localhost:5000/logistics/update-freight";

const Freight = () => {

    // const navigate = useNavigate()

    const [result, setResult] = useState([]);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        from_destination: "",
        to_destination: "",
        rate: "",
    });
    const [submitMessage, setSubmitMessage] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({});

    useEffect(() => {
        document.title = "Freight";
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setError(false);
            const response = await axios.get(getFreightDataUrl);
            setResult(response.data || []);
        } catch (error) {
            setError(true);
            console.error("Error while fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(insertFreightDataUrl, formData);
            const newEntry = {
                id: result.length + 1,
                from: formData.from_destination,
                to: formData.to_destination,
                rate: formData.rate,
            };
            setResult((prev) => [...prev, newEntry]);
            setFormData({
                from_destination: "",
                to_destination: "",
                rate: ""
            });
            setSubmitMessage("Data submitted successfully!");
        } catch (error) {
            console.error("Error while submitting data:", error);
            if (error.response && error.response.status === 409) {
                setSubmitMessage("Duplicate entry detected. Please check the data.");
            } else {
                setSubmitMessage("Failed to submit data. Please try again.");
            }
        }
    };

    const handleEdit = (id) => {
        const shipment = result.find((item) => item.id === id);
        setEditingId(id);
        setEditingData({ ...shipment });
    };

    const handleEditingChange = (e) => {
        const { name, value } = e.target;
        setEditingData({ ...editingData, [name]: value });
    };

    const handleSave = async (id) => {
        try {
            const payload = {
                old: result.find((item) => item.id === id),
                new: editingData,
            };
            const response = await axios.post(updateFreightDataUrl, payload);
            if (response.status === 200) {
                setResult((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...editingData } : item
                    )
                );
                setEditingId(null);
                alert("Row updated successfully!");
            }
        } catch (error) {
            console.error("Error updating row:", error);
            alert("Failed to update row.");
        }
    };

    return (
        <div id="freight">
            {/* <div className="header-buttons">
            <button className="home-button" onClick={() => navigate("/login-form")}>
                    Home
                </button>
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div> */}
            {/* <h1>Freight Master</h1> */}
            <div className="container-freight">
                <form id="shipmentForm" onSubmit={handleFormSubmit}>
                    <label htmlFor="from_destination">From Destination:</label>
                    <input
                        type="text"
                        id="from_destination"
                        name="from_destination"
                        value={formData.from_destination}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="to_destination">To Destination:</label>
                    <input
                        type="text"
                        id="to_destination"
                        name="to_destination"
                        value={formData.to_destination}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="rate">Rate:</label>
                    <input
                        type="number"
                        id="rate"
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        required
                    />
                    <button className="submit-button" type="submit">Submit</button>
                    <p>{submitMessage}</p>
                </form>
                <div className="table-wrapper" id="results">
                    <h2>Your Current Rates</h2>
                    <table id="resultsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>From Destination</th>
                                <th>To Destination</th>
                                <th>Rate</th>
                                <th>Edit</th>
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
                                result.map((shipment) => (
                                    <tr key={shipment.id}>
                                        <td>{shipment.id}</td>
                                        <td>
                                            {shipment.from}
                                        </td>
                                        <td>
                                            {shipment.to}
                                        </td>
                                        <td>
                                            {editingId === shipment.id ? (
                                                <input
                                                    type="number"
                                                    name="rate"
                                                    value={editingData.rate || ""}
                                                    onChange={handleEditingChange}
                                                />
                                            ) : (
                                                shipment.rate
                                            )}
                                        </td>
                                        <td>
                                            {editingId === shipment.id ? (
                                                <button onClick={() => handleSave(shipment.id)}>Save</button>
                                            ) : (
                                                <i
                                                    className="fas fa-pencil-alt edit-icon"
                                                    onClick={() => handleEdit(shipment.id)}
                                                ></i>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Freight;
