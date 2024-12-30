const VendorModel = require('../models/vendor_model');
VendorModel.createIndexes(); // Used indexing for uniqueness of data

async function ListVendor(req, res) {
    try {
        const fetchedList = await VendorModel.find({});
        let resultData = [], result = {};
        console.log("Document fetched:", fetchedList, typeof(fetchedList));

        if (!fetchedList || fetchedList.length === 0) 
            return res.status(404).send("No data found");
        
        for (let i = 0; i < fetchedList.length; i++) {
            result.companyName = fetchedList[i].company_name;
            result.companyOwner = fetchedList[i].company_owner;
            result.tdsRate = fetchedList[i].tds_rate;
            result.pan = fetchedList[i].pan;
            result.gst = fetchedList[i].gst;
            resultData.push(result);
            result = {};
        }
        console.log("resultData::>", resultData);
        return res.status(200).json({resultData});
    } catch (err) {
        console.error("Error fetching documents:", err);
        res.status(500).send(err);
    }
}

async function AddVendor(req, res) {
    let { companyName, companyOwner, tdsRate, pan, gst } = req.body;
    console.log("req.body::>", req.body);
    
    if (!companyName || !companyOwner || tdsRate == 0 || !pan || !gst) {
        return res.status(400).send("Missing required fields: companyName, companyOwner, tdsRate, pan, gst");
    } else {
        try {
            const vendor = new VendorModel({ 
                company_name: companyName, 
                company_owner: companyOwner, 
                tds_rate: tdsRate, 
                pan: pan, 
                gst: gst,
            });
            await vendor.save()
                .then((docs) => {
                    console.log("Vendor document inserted:", docs);
                    res.status(200).json({
                        message: "Vendor data inserted successfully",
                        vendor
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

module.exports = { ListVendor, AddVendor }