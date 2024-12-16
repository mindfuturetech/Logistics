const FreightModel = require('../model/freight_model');
FreightModel.createIndexes(); // Used indexing for uniqueness of data

async function ListFreight(req, res) {
    try {
        const fetchedList = await FreightModel.find({});
        let resultData = [], result = {};
        console.log("Document fetched:", fetchedList, typeof(fetchedList));

        if (!fetchedList || fetchedList.length === 0) 
            return res.status(404).send("No data found");
        
        for (let i = 0; i < fetchedList.length; i++) {
            result.id = i + 1;
            result.from = fetchedList[i].from;
            result.to = fetchedList[i].to;
            result.rate = fetchedList[i].rate;
            resultData.push(result);
            result = {};
        }
        console.log("resultData::>", resultData);
        res.status(200).json(resultData);
    } catch (err) {
        console.error("Error fetching freight documents:", err);
        res.status(500).send(err);
    }
}

async function AddFreight(req, res) {
    let { from_destination, to_destination, rate } = req.body;
    console.log("::>", from_destination, to_destination, rate);
    
    if (!from_destination || !to_destination || !rate) {
        return res.status(400).send("Missing required fields: from_destination, to_destination, or rate");
    } else {
        try {
            const freight = new FreightModel({ from: from_destination, to: to_destination, rate: rate });
            await freight.save()
                .then((docs) => {
                    console.log("Document inserted:", docs);
                    res.status(200).json({
                        message: "Freight data inserted successfully",
                        freight
                    });
                }).catch(err => {
                    if (err.code === 11000) {
                        console.error("Duplicate entry detected:", err.message);
                        res.status(409).json({message: "Duplicate entry detected"});
                    } else {
                        console.error("Error:", err);
                        res.send(err);
                    }
                });
        } catch (err) {
            console.log("Error while inserting", err);
            return res.status(400).send("BAD REQUEST!");
        }
    }
}

async function UpdateFreight(req, res) {
    const { from: oldFrom, to: oldTo, rate: oldRate } = req.body.old;
    const { from: newFrom, to: newTo, rate: newRate } = req.body.new;

    // Check for missing required fields
    if (!oldFrom || !oldTo || oldRate === undefined || !newFrom || !newTo || newRate === undefined) {
        return res.status(400).send("Missing required fields: old or new values are incomplete");
    }

    try {
        // Find the document with old values and update it to new values
        const updatedFreight = await FreightModel.findOneAndUpdate(
            { from: oldFrom, to: oldTo, rate: oldRate },
            { from: newFrom, to: newTo, rate: newRate },
            { new: true } // Return the updated document
        );

        if (!updatedFreight) {
            console.log("Freight entry not found for:", { oldFrom, oldTo, oldRate });
            return res.status(404).send("Freight entry not found");
        }

        console.log("Document updated successfully:", updatedFreight);
        res.status(200).json({
            message: "Freight data updated successfully",
            updatedFreight
        });
    } catch (err) {
        console.error("Error while updating document:", err);
        res.status(500).send("Error while updating freight data");
    }
}

module.exports = { ListFreight, AddFreight, UpdateFreight };