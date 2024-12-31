import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { FaDownload, FaUpload } from "react-icons/fa";
import axios from "axios";
import "./Vehicle.css";

const getVehicleDataUrl = "http://localhost:5000/logistics/list-vehicle";
const insertVehicleDataUrl = "http://localhost:5000/logistics/add-vehicle";

const Vehicle = () => {
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        truck_no: "",
        make: "",
        companyOwner: "",
        fields: [
            { name: "registration", startDate: "", endDate: "", file: null },
            { name: "insurance", startDate: "", endDate: "", file: null },
            { name: "fitness", startDate: "", endDate: "", file: null },
            { name: "mv_tax", startDate: "", endDate: "", file: null },
            { name: "puc", startDate: "", endDate: "", file: null },
            { name: "ka_tax", startDate: "", endDate: "", file: null },
            { name: "basic_and_KA_permit", startDate: "", endDate: "", file: null },
        ],
    });

    const [result, setResult] = useState([]);
    const [submitMessage, setSubmitMessage] = useState("");

    const keyDisplayMap = {
        registration: "Registration",
        insurance: "Insurance",
        fitness: "Fitness",
        mv_tax: "MV Tax",
        puc: "PUC",
        ka_tax: "KA Tax",
        basic_and_KA_permit: "Basic & KA Permit",
    }

    useEffect(() => {
        document.title = "Vehicle Form";
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(getVehicleDataUrl);
            console.log("response:::>", response.data.resultData);
            setResult(response.data.resultData || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...formData.fields];
        updatedFields[index][field] = value;
        setFormData({ ...formData, fields: updatedFields });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("truck_no", formData.truck_no);
        formDataToSend.append("make", formData.make);
        formDataToSend.append("companyOwner", formData.companyOwner);

        formData.fields.forEach((field) => {
            if (field.file) {
                formDataToSend.append(field.name, field.file);
            }
            formDataToSend.append(`${field.name}_startDate`, field.startDate);
            formDataToSend.append(`${field.name}_endDate`, field.endDate);
        });

        try {
            const response = await axios.post(insertVehicleDataUrl, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("response:", response.data);
            setSubmitMessage("Data submitted successfully!");

            setFormData({
                truck_no: "",
                make: "",
                companyOwner: "",
                fields: [
                    { name: "registration", startDate: "", endDate: "", file: null },
                    { name: "insurance", startDate: "", endDate: "", file: null },
                    { name: "fitness", startDate: "", endDate: "", file: null },
                    { name: "mv_tax", startDate: "", endDate: "", file: null },
                    { name: "puc", startDate: "", endDate: "", file: null },
                    { name: "ka_tax", startDate: "", endDate: "", file: null },
                    { name: "basic_and_KA_permit", startDate: "", endDate: "", file: null },
                ],
            });

            fetchData();
        } catch (error) {
            console.error("Error submitting data:", error);
            setSubmitMessage("Error submitting data. Please try again.");
        }
    };

    return (
        <div id="vehicle">
            {/* <h1>Vehicle Master</h1> */}
            <form className="form-section" onSubmit={handleFormSubmit}>
                <div className="form-left">
                    <label htmlFor="truck_no">Truck No:</label>
                    <input
                        type="text"
                        id="truck_no"
                        name="truck_no"
                        value={formData.truck_no}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="make">Make (Truck Company):</label>
                    <input
                        type="text"
                        id="make"
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="companyOwner">Company Owner:</label>
                    <input
                        type="text"
                        id="companyOwner"
                        name="companyOwner"
                        value={formData.companyOwner}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-right">
                    <table className="field-table">
                        <tbody>
                            {formData.fields.map((field, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td colSpan="3">
                                            <label htmlFor={`field-${index}`}>
                                                <strong>{keyDisplayMap[field.name] || field.name} Document:</strong>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type="file"
                                                id={`field-${index}`}
                                                onChange={(e) => handleFieldChange(index, "file", e.target.files[0])}
                                                accept=".pdf"
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor={`startDate-${index}`}>Start Date</label>
                                            <input
                                                type="date"
                                                id={`startDate-${index}`}
                                                value={field.startDate}
                                                onChange={(e) => handleFieldChange(index, "startDate", e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor={`endDate-${index}`}>End Date</label>
                                            <input
                                                type="date"
                                                id={`endDate-${index}`}
                                                value={field.endDate}
                                                onChange={(e) => handleFieldChange(index, "endDate", e.target.value)}
                                                required
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="submit-button" type="submit">Submit</button>
                <p>{submitMessage}</p>
            </form>

            <div className="tiles-view">
                {result.map((vehicle, index) => (
                    <div className="tile" key={index}>
                        <div className="tile-header">
                            <h3>{(vehicle.truck_no).split(' ').join('')}</h3>
                            <b>{vehicle.make}</b>
                            <i>{vehicle.companyOwner}</i>
                        </div>
                        <hr />
                        <div className="tile-table">
                            <div className="tile-row tile-header-row">
                                <div className="tile-cell">Field</div>
                                <div className="tile-cell">Validity (days left)</div>
                                <div className="tile-cell">Download</div>
                            </div>
                            {Object.entries(vehicle.documents).map(([key, doc]) => (
                                doc && (
                                    <div className="tile-row" key={key}>
                                        <div className="tile-cell">{keyDisplayMap[key] || key}</div>
                                        <div className={`tile-cell ${doc.days_left <= 5 ? "highlighted" : ""}`}>
                                            {doc.end_date} ({doc.days_left <= 0 ? 0 : doc.days_left} days left)
                                        </div>
                                        <div className="tile-cell">
                                        {
                                            doc.days_left <= 0 ?
                                            <a
                                                href={`http://localhost:5000/logistics/download/${vehicle.truck_no}/${key}/${doc.file_path.split("\\").pop().split("-")[1]}`}
                                                className="upload-button"
                                                download
                                            >
                                            <FaUpload className="vehicle_icons" />    
                                            </a> 
                                            : 
                                            <a
                                            href="your-upload-url"
                                                className="download-button"
                                            >
                                            <FaDownload className="vehicle_icons" />
                                            </a>
                                            } 
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Vehicle;
