const TripDetailsModel = require('../models/TripDetails');
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

async function ListBill(req, res) {
    try {
        console.log("Request Body:", req.body);

        const { startDate, endDate, vendor, truckNo } = req.body;
        console.log("searchParam::>>>>>>", startDate, endDate, vendor, truckNo);

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const vendor_s = vendor ? vendor : "";
        const truckNo_s = truckNo ? truckNo : "";

        console.log("search::-------", start, end, vendor_s, truckNo_s);

        let fetchedList = [], searchParam = { TransactionStatus: "Acknowledged" };
        if (start && end) {
            if(end)
                end.setHours(23, 59, 59, 999);
            searchParam.createdAt = { $gte: start, $lte: end }
        }else if (vendor_s){
            searchParam.Vendor = vendor_s;
        }else if (truckNo_s){
            searchParam.TruckNumber = truckNo_s;
        }
        console.log("searchParam::", searchParam);

        fetchedList = await TripDetailsModel.find(searchParam).sort({ createdAt: -1 })

        // console.log("fetchedList::>>>", fetchedList);

        if (!fetchedList || fetchedList.length === 0) {
            return res.status(404).json({ message: "No data found." });
        }
        let i = 0;
        const resultData = fetchedList.map((truck) => {
            i += 1;
            return {
                _id: truck._id,
                id: i,
                truck_no: truck.TruckNumber,
                date: truck.createdAt,
                // time: truck.Date,
                weight: truck.Weight,
                actual_weight: truck.ActualWeight,
                difference_weight: Math.ceil(truck.Weight - truck.ActualWeight),
                freight: truck.Freight,
                diesel: truck.Diesel,
                diesel_amount: truck.DieselAmount,
                advance: truck.Advance || 0,
                driver_name: truck.DriverName,
                destination_from: truck.DestinationFrom,
                destination_to: truck.DestinationTo,
                do_number: truck.DONumber,
                vendor: truck.Vendor,
                truck_type: truck.TruckType,
                transaction_status: truck.TransactionStatus,
                diesel_slip_number: truck.DieselSlipNumber
            };
        });

        console.log("Result Data:", resultData);
        res.status(200).json({resultData});
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "An error occurred while fetching transactions.", error: err });
    }
}

async function GeneratePDFBill(req, res) {
    try {
        const selectedTrucks = req.body;

        if (!selectedTrucks || selectedTrucks.length === 0)
            return res.status(400).json({ message: "No trucks selected to generate the PDF." });

        console.log("Received data for PDF generation and status update:", selectedTrucks);

        const updatePromises = selectedTrucks.map(truck =>
            TripDetailsModel.findByIdAndUpdate(
                { _id: truck.id },
                { $set: { TransactionStatus: "Billed" } },
                { new: true }
            )
        );
        const updatedTrucks = await Promise.all(updatePromises);
        console.log("Updated tripDeatils to Billed");
        // const TDS = 10; // Example static value
        const Short = 12; // Example static value
        const O_Chg = 15; // Example static value

        const pdfData = updatedTrucks.map(truck => [
            new Date(truck.createdAt).toLocaleDateString(),
            new Date(truck.createdAt).toLocaleTimeString(),
            truck.Vendor,
            truck.DestinationTo,
            (truck.TruckNumber).split(' ').join(''),
            truck.bags || 0,
            truck.Weight,
            truck.ActualWeight,
            truck.Rate = Math.ceil(truck.Freight / truck.Weight),
            truck.Freight,
            // truck.Diesel,
            truck.DieselAmount,
            truck.Advance || 0,
            truck.Toll || 0,
            truck.TDS_Rate || 0,
            Short,
            O_Chg,
            truck.Amount = truck.Freight - (truck.DieselAmount + truck.Advance + truck.Toll
                + truck.TDS_Rate + Short + O_Chg),
            // truck.TruckType,
            // truck.TransactionStatus,
            // truck.DieselSlipNumber,
        ]);

        const doc = new jsPDF({
            format: "a4",
            orientation: "landscape",
        });
        doc.setFontSize(16);
        doc.text("Billing Report", 150, 18, { align: "center" });

        doc.autoTable({
            startY: 20,
            head: [
                [
                    "Date", "Time", "Vendor", "Dest To",
                    "Truck No", "Bags", "Wt.(Tons)", "A. Wt.",
                    "Rate", "Freight", "Diesel",
                    "Advance", "Toll", "TDS", "Short", "O.Chg",
                    "Amount"
                ],
            ],
            body: pdfData,
            theme: "striped",
            styles: {
                fontSize: 9,
                cellPadding: 1,
                overflow: "linebreak",
                halign: "center",
                valign: "middle",
            },
            headStyles: {
                fillColor: [23, 162, 184],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: "bold",
            },
            columnStyles: {
                0: { cellWidth: 18 }, // Date
                1: { cellWidth: 18 }, // Time
                2: { cellWidth: 18 }, // Vendor
                3: { cellWidth: 20 }, // Destination To
                4: { cellWidth: 30 }, // Truck No
                5: { cellWidth: 12 }, // Bags
                6: { cellWidth: 20 }, // Weight
                7: { cellWidth: 15 }, // Actual Weight
                8: { cellWidth: 10 }, // Rate
                9: { cellWidth: 15 }, // Freight
                10: { cellWidth: 18 }, // Diesel Amount
                11: { cellWidth: 18 }, // Advance
                12: { cellWidth: 10 }, // Toll
                13: { cellWidth: 10 }, // TDS
                14: { cellWidth: 12 }, // Short
                15: { cellWidth: 15 }, // O.Chg
                16: { cellWidth: 15 } // Amount
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Light gray alternate rows
            },
            margin: { top: 20, left: 10, right: 10 }, // Adjusted margins for landscape
            didDrawPage: (data) => {
                const totalWeight = pdfData.reduce((sum, row) => sum + row[6], 0); // Freight
                const totalActWeight = pdfData.reduce((sum, row) => sum + row[7], 0); // Freight
                const totalFreight = pdfData.reduce((sum, row) => sum + row[9], 0); // Freight
                const totalDiesel = pdfData.reduce((sum, row) => sum + row[10], 0); // Diesel
                const totalAdvance = pdfData.reduce((sum, row) => sum + row[11], 0); // Advance
                const totalToll = pdfData.reduce((sum, row) => sum + row[12], 0); // Advance
                const totalTDS = pdfData.reduce((sum, row) => sum + row[13], 0); // Advance
                const totalShort = pdfData.reduce((sum, row) => sum + row[14], 0); // Advance
                const totalOChg = pdfData.reduce((sum, row) => sum + row[15], 0); // Advance
                const totalAmount = pdfData.reduce((sum, row) => sum + row[16], 0); // Amount
        
                const startY = data.cursor.y + 10; // Start position for the summary
        
                // Draw summary
                doc.setFontSize(9);
                // doc.setFont("bold");
                doc.text(`Total:`, 90, startY)
                doc.text(`${totalWeight.toFixed(2)}`, 130, startY); // Wt.:
                doc.text(`${totalActWeight.toFixed(2)}`, 150, startY); //A.Wt.: 
                doc.text(`${totalFreight.toFixed(2)}`, 173, startY); // Freight: 
                doc.text(`${totalDiesel.toFixed(2)}`, 190, startY);  // Diesel: 
                doc.text(`${totalAdvance.toFixed(2)}`, 205, startY); // Advance: 
                doc.text(`${totalToll.toFixed(2)}`, 220, startY);   // Toll: 
                doc.text(`${totalTDS.toFixed(2)}`, 232, startY);    // TDS: 
                doc.text(`${totalShort.toFixed(2)}`, 243, startY);  // Short: 
                doc.text(`${totalOChg.toFixed(2)}`, 256, startY);   // O. Chg.: 
                doc.text(`${totalAmount.toFixed(2)}`, 270, startY);  // Amount: 
        
                // Draw remarks section
                const remarksStartY = startY + 10;
                doc.setFontSize(9);
                // doc.text("Remarks:", 10, remarksStartY);
        
                doc.autoTable({
                    startY: remarksStartY,
                    body: [
                        [{ content: "Signature", colSpan: 15 }],
                    ],
                    theme: "plain",
                    styles: {
                        fontSize: 15,
                        cellPadding: 3,
                        halign: "right", // Right-align text in the remarks cell
                        valign: "bottom", // Align text at the top
                    },
                });
            },
        });
        
        const pdfBuffer = doc.output("arraybuffer");

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=GeneratedBill.pdf`
        );

        res.status(200).send(Buffer.from(pdfBuffer));
        console.log("PDF generated and sent successfully.");
    } catch (error) {
        console.error("Error in GeneratePDFBill:", error);
        res.status(500).json({ message: "An error occurred while generating the PDF.", error });
    }
}

module.exports = { ListBill, GeneratePDFBill };