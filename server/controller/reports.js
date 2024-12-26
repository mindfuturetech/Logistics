const TripDetails = require('../models/TripDetails');
const Vehicle = require('../models/vehicle_model');
const Vendor = require('../models/vendor_model');
const Destination = require('../models/freight_model');
const multer = require('multer');
const upload = require('../multer/imageMulter');
const path = require('path')
const fs = require('fs');

const reports = async(req,res) =>{
    const {TruckNumber,DONumber,DriverName,Vendor,DestinationFrom,DestinationTo,
    TruckType,TransactionStatus,Weight,Freight,Diesel,DieselAmount,DieselSlipNumber,TDS_Rate,Advance,Toll,Adblue,Greasing} = req.body;
    
    console.log(req.body);


    try{
        const data = await TripDetails.create({TruckNumber,DONumber,DriverName,Vendor,DestinationFrom,DestinationTo,
        TruckType,TransactionStatus,Weight,Freight,Diesel,DieselAmount,DieselSlipNumber,TDS_Rate,Advance,Toll,Adblue,Greasing})
      
        console.log(data);
        
        return res.json({message:'Trip details submitted succesfully'})

            
    }catch(error){
        return res.status(500).json({message:"Error submitting trip details"})
    }

}

const getTruckData = async (req,res)=>{
    try{
        const truckData = await Vehicle.find({});
        return res.status(200).json({truckData});
    }catch(error){
        return res.status(500).json({message:'Error fetching truck numbers'});
    }

}

const getVendorData = async(req,res)=>{
    try{
        const vendorData = await Vendor.find({});
        return res.status(200).json({vendorData});
    }catch(error){
        return res.status(500).json({message:'Error fetching vendors'});
    }
}


const getDestinationData = async(req,res)=>{
    try{
        const destinationData = await Destination.find({});
        return res.status(200).json({destinationData});
    }catch(error){
        return res.status(500).json({message:'Error fetching destination data'});
    }
}

const getTableData = async (req, res) => {
    const {startDate, endDate, vendor, truckNumber} = req.query;

    try {
      const query = {};
      
      if (startDate && endDate) {
        const start= new Date(startDate);
        const end=  new Date(endDate);
        end.setHours(23, 59, 59, 999);

        query.createdAt = {
          $gte: start,
          $lte: end
        };
      }
      
      if(vendor){
        query.Vendor = vendor;
      }
      if(truckNumber){
        query.TruckNumber = truckNumber;
      }

      console.log('query: ', query);
      const tableData = await TripDetails.find(query);
      console.log('Found records:', tableData.length);
      console.log('Sample record:', tableData[0]);
      console.log('Start date:', new Date(startDate));
      console.log('End Date:', new Date(endDate));

      
      if(tableData){
        return res.status(200).json({tableData:tableData});
        }else{
            return res.status(200).json({tableData:[]});
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching table data' });
    }
  };



  const updateTripData = async(req,res)=>{
    const {id, transactionStatus, weight, actualWeight} = req.body;
    console.log("Received update request with body:", req.body);
    console.log("Received files:", req.files);

    const getRelativePath = (absolutePath) => {
        const uploadDataIndex = absolutePath.indexOf('uploadData');
        if (uploadDataIndex === -1) return absolutePath;
        return absolutePath.substring(uploadDataIndex);
    };
    
    try{
        const data = await TripDetails.findById(id);
        console.log(data);
        if(!data){
            return res.status(400).json({message:"Trip Details not found"});
        }

        data.TransactionStatus = transactionStatus;
        data.ActualWeight = actualWeight;
        
        data.DifferenceInWeight = Math.abs(weight-actualWeight);

          // Handle file paths for uploaded images
      if (req.files) {
        if (req.files['DieselSlipImage']) {
          data.DieselSlipImage.filepath = getRelativePath(req.files['DieselSlipImage'][0].path);
          data.DieselSlipImage.originalname = req.files['DieselSlipImage'][0].originalname;
        
        }
        if (req.files['LoadingAdvice']) {
          data.LoadingAdvice.filepath = getRelativePath(req.files['LoadingAdvice'][0].path);
          data.LoadingAdvice.originalname = req.files['LoadingAdvice'][0].originalname;
        }
        if (req.files['InvoiceCompany']) {
          data.InvoiceCompany.filepath =getRelativePath(req.files['InvoiceCompany'][0].path);
          data.InvoiceCompany.originalname =req.files['InvoiceCompany'][0].originalname;

        }
        if (req.files['WeightmentSlip']) {
          data.WeightmentSlip.filepath = getRelativePath(req.files['WeightmentSlip'][0].path);
          data.WeightmentSlip.originalname =req.files['WeightmentSlip'][0].originalname;
        }
      }
  
      // Save the updated truck details
      await data.save();
      res.status(200).json({ message: 'Trip details updated successfully'});
    
    }catch(error){
        res.status(500).json({ message: 'Server error while updating trip details' });
    }
  }

  const downloadFile = async(req,res) =>{
    try{
        const {id, field} = req.params;

        const data = await TripDetails.findById(id);
        console.log('data: ', data);

        if(!data){
            return res.status(400).json({message:"Record not found"});
        }

        const fileData = data[field];
        console.log('fileData: ', fileData.filepath);

        if(!fileData || !fileData.filepath){
            return res.status(400).json({message:"File not found"});
        }

        const absolutePath = path.join(__dirname, '..', fileData.filepath);
        console.log('absolutePath:', absolutePath);

        if(!fs.existsSync(absolutePath)){
            return res.status(400).json({ message: 'File not found on server' });
        }

        // Set headers for file download
        res.setHeader('Content-Disposition', `attachment; filename=${fileData.originalname}`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Create read stream and pipe to response
        const fileStream = fs.createReadStream(absolutePath);
        fileStream.pipe(res);

    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ message: 'Error downloading file' });
    }
  }
  

module.exports = {reports, getTruckData, getVendorData, getDestinationData, getTableData, updateTripData, downloadFile};