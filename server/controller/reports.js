const TruckDetails = require('../models/TruckDetails');

const reports = async(req,res) =>{
    const {TruckNumber,DONumber,Date,DriverName,Vendor,DestinationFrom,DestinationTo,
    TruckType,TransactionStatus,Weight,Freight,Diesel,DieselAmount,DieselSlipNumber,Advance,Toll,Adblue,Greasing} = req.body;
    
    console.log(req.body);


    try{
        const data = await TruckDetails.create({TruckNumber,DONumber,Date,DriverName,Vendor,DestinationFrom,DestinationTo,
        TruckType,TransactionStatus,Weight,Freight,Diesel,DieselAmount,DieselSlipNumber,Advance,Toll,Adblue,Greasing})
      
        console.log(data);
        // await truckDetails.save();
        return res.json({message:'Truck details submitted succesfully'})

            
    }catch(error){
        return res.status(500).json({message:"Error submitting truck details"})
    }

}


module.exports = reports;