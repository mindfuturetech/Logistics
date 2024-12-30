const path = require('path');
const fs = require('fs');
const VehicleModel = require('../models/vehicle_model');

async function ListVehicle(req, res) {
    try {
        const fetchedList = await VehicleModel.find({});

        if (!fetchedList || fetchedList.length === 0) {
            return res.status(404).send("No data found");
        }

        const resultData = fetchedList.map(vehicle => ({
            truck_no: vehicle.truck_no,
            make: vehicle.make,
            companyOwner: vehicle.company_owner,
            documents: Object.fromEntries(
                Object.entries(vehicle.documents || {}).map(([key, value]) => [
                    key,
                    formatDocument(value),
                ])
            ),
        }));
        console.log("resultData::-->", resultData);
        return res.status(200).json({resultData});
    } catch (error) {
        console.error("Error fetching vehicle documents:", error);
        res.status(500).send(error);
    }
}

function formatDocument(document) {
    if (!document) return null;

    return {
        file_path: document.file_path || null,
        start_date: document.start_date ? new Date(document.start_date).toISOString().split("T")[0] : null,
        end_date: document.end_date ? new Date(document.end_date).toISOString().split("T")[0] : null,
        days_left: document.end_date ? calculateDaysLeft(document.end_date) : null,
    };
}

function calculateDaysLeft(endDate) {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function formatDocument(document) {
    if (!document) return null;

    return {
        file_path: document.file_path,
        start_date: document.start_date ? document.start_date.toISOString().split("T")[0] : null,
        end_date: document.end_date ? document.end_date.toISOString().split("T")[0] : null,
        days_left: calculateDaysLeft(document.end_date),
    };
}

function calculateDaysLeft(endDate) {
    if (!endDate) return null;

    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

async function AddVehicle(req, res) {
    console.log("Files:", req.files);
    console.log("Body:", req.body);
    const { truck_no, make, companyOwner } = req.body;

    if (!truck_no || !make || !companyOwner) {
        return res.status(400).send("Missing required fields: truck_no, make, companyOwner");
    }
    console.log("Files received:", req.files);
    try {
        const registrationPath = req.files.registration ? req.files.registration[0].path : null;
        const registration_startDate = req.body.registration_startDate || "";
        const registration_endDate = req.body.registration_endDate || ""; const insurancePath = req.files.insurance ? req.files.insurance[0].path : null;
        const insurance_startDate = req.body.insurance_startDate || ""; const insurance_endDate = req.body.insurance_endDate || "";
        const fitnessPath = req.files.fitness ? req.files.fitness[0].path : null;
        const fitness_startDate = req.body.fitness_startDate || ""; const fitness_endDate = req.body.fitness_endDate || ""; const mvTaxPath = req.files.mv_tax ? req.files.mv_tax[0].path : null;
        const mv_tax_startDate = req.body.mv_tax_startDate || "";
        const mv_tax_endDate = req.body.mv_tax_endDate || "";
        const pucPath = req.files.puc ? req.files.puc[0].path : null;
        const puc_startDate = req.body.puc_startDate || "";
        const puc_endDate = req.body.puc_endDate || "";
        const kaTaxPath = req.files.ka_tax ? req.files.ka_tax[0].path : null;
        const ka_tax_startDate = req.body.ka_tax_startDate || "";
        const ka_tax_endDate = req.body.ka_tax_endDate || "";
        const permitPath = req.files.basic_and_KA_permit ? req.files.basic_and_KA_permit[0].path : null;
        const basic_and_KA_permit_startDate = req.body.basic_and_KA_permit_startDate || ""; const basic_and_KA_permit_endDate = req.body.basic_and_KA_permit_endDate || "";
        const vehicle = new VehicleModel({
            truck_no: truck_no,
            make: make,
            company_owner: companyOwner,
            documents: {
                registration: {
                    file_path: registrationPath,
                    start_date: new Date(registration_startDate),
                    end_date: new Date(registration_endDate)
                },
                insurance: {
                    file_path: insurancePath,
                    start_date: new Date(insurance_startDate),
                    end_date: new Date(insurance_endDate)
                },
                fitness: {
                    file_path: fitnessPath,
                    start_date: new Date(fitness_startDate),
                    end_date: new Date(fitness_endDate)
                },
                mv_tax: {
                    file_path: mvTaxPath,
                    start_date: new Date(mv_tax_startDate),
                    end_date: new Date(mv_tax_endDate)
                },
                puc: {
                    file_path: pucPath,
                    start_date: new Date(puc_startDate),
                    end_date: new Date(puc_endDate)
                },
                ka_tax: {
                    file_path: kaTaxPath,
                    start_date: new Date(ka_tax_startDate),
                    end_date: new Date(ka_tax_endDate)
                },
                basic_and_KA_permit: {
                    file_path: permitPath,
                    start_date: new Date(basic_and_KA_permit_startDate),
                    end_date: new Date(basic_and_KA_permit_endDate)
                }
            }
        });

        await vehicle.save();
        res.status(200).json({
            message: "Vehicle data inserted successfully",
            vehicle
        });
    } catch (err) {
        console.error("Error while inserting:", err);
        res.status(400).send("BAD REQUEST!");
    }
}

async function DownloadFile(req, res) {
    const { truck_no, fieldName, fileName } = req.params;

    const decodedTruckNo = decodeURIComponent(truck_no);
    const decodedFileName = decodeURIComponent(fileName);

    // Construct file path
    const filePath = path.join(__dirname, `../upload/${decodedTruckNo}/${fieldName}-${decodedFileName}`);

    console.log('File path:', filePath);

    fs.exists(filePath, (exists) => {
        if (exists) {
            res.download(filePath);
        } else {
            res.status(404).send('File not found.');
        }
    });
};


module.exports = { ListVehicle, AddVehicle, DownloadFile };

