const TripDetailsModel = require('../models/TripDetails');

async function ListAllTransactions(req, res) {
    try {
        console.log("Request Body:", req.body);

        const { startDate, endDate } = req.body;

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (end) {
            end.setHours(23, 59, 59, 999);
        }

        let fetchedList = [];
        if (!start && !end) {
            fetchedList = await TripDetailsModel.find({
                TransactionStatus: "Billed"
            }).sort({createdAt: -1});
        } else {
            fetchedList = await TripDetailsModel.find({
                createdAt: { $gte: start, $lte: end },
                TransactionStatus: "Billed"
            }).sort({createdAt: -1});
        }
        // console.log("fetchedList::>>>", fetchedList);
        
        if (!fetchedList || fetchedList.length === 0) {
            return res.status(404).json({ message: "No data found." });
        }

        const resultData = fetchedList.map((truck) => {
            // const tds = 10; // Example static value
            const short = 12; // Example static value
            const otherCharges = 15; // Example static value

            // let Dest_From = truck.DestinationFrom
            // let Dest_To = truck.DestinationTo

            return {
                date: truck.createdAt,
                time: truck.createdAt,
                vendor: truck.Vendor,
                truck_no: truck.TruckNumber,
                destination_to: truck.DestinationTo,
                bags: truck.Bags || 0,
                weight: truck.Weight,
                actual_weight: truck.ActualWeight,
                freight: truck.Freight,
                rate: Math.ceil(truck.Freight/truck.Weight),
                diesel: truck.DieselAmount,
                advance: truck.Advance || 0,
                toll: truck.Toll,
                tds: truck.TDS_Rate,
                short,
                other_charges: otherCharges,
                transaction_status: truck.TransactionStatus,
                amount: truck.Freight - (truck.DieselAmount + truck.Advance + truck.Toll 
                    + truck.TDS_Rate + short + otherCharges),
            };
        });

        console.log("Result Data:", resultData);
        return res.status(200).json(resultData);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "An error occurred while fetching transactions.", error: err });
    }
}

module.exports = { ListAllTransactions };