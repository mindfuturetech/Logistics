const mongoose = require('mongoose');

const truckDetailsSchema = new mongoose.Schema({
    TruckNumber:{
        type:String,
        required:true,
        trim:true
    },
    DONumber:{
        type:Number,
        required:true,
        trim:true
    },
    Date:{
        type:Date,
        required:true
    },
    DriverName:{
        type:String,
        required:true,
        trim:true
    },
    Vendor:{
        type:String,
        required:true
    },
    DestinationFrom:{
        type:String,
        required:true
    },
    DestinationTo:{
        type:String,
        required:true
    },
    TruckType:{
        type:String,
        required:true
    },
    TransactionStatus:{
        type:String,
        required:true
    },
    Weight:{
        type:Number,
        required:true
    },
    ActualWeight:{
        type:Number,
        required:true,
        default:null
    },
    DifferenceInWeight:{
        type:Number,
        required:true,
        default:null
    },
    Freight:{
        type:Number,
        required:true
    },
    Diesel:{
        type:Number,
        required:true
    },
    DieselAmount:{
        type:Number,
        required:true
    },
    DieselSlipNumber:{
        type:Number,
        required:true
    },
    Advance:{
        type:Number,
        required:true
    },
    Toll:{
        type:Number,
        required:true 
    },
    TDS:{
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 0;
            },
            message: "Value must be a positive number",
        },
    },
    Adblue:{
        type:Number,
        required:true
    },
    Greasing:{
        type:Number,
        required:true
    },
    DieselSlipImage:{
        filepath:{type:String}
    },
    LoadingAdvice:{
        filepath:{type:String}
    },
    InvoiceCompany:{
        filepath:{type:String}
    },
    WeightmentSlip:{
        filepath:{type:String}
    },


},{timestamps:true});




  module.exports = mongoose.model('TruckDetails',truckDetailsSchema);
