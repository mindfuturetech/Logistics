const mongoose = require('mongoose');

const tripDetailsSchema = new mongoose.Schema({
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
        default:0
    },
    DifferenceInWeight:{
        type:Number,
        default:0
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
    TDS_Rate:{
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
    BillId:{
        type:Number,
        default:0
    },
    DieselSlipImage:{
        filepath:{type:String,default:null},
        originalname:{type:String,default:null}
    },
    LoadingAdvice:{
        filepath:{type:String,default:null},
        originalname:{type:String,default:null}
    },
    InvoiceCompany:{
        filepath:{type:String,default:null},
        originalname:{type:String,default:null}
    },
    WeightmentSlip:{
        filepath:{type:String,default:null},
        originalname:{type:String,default:null}
    },


},{timestamps:true});



module.exports = mongoose.model('TripDetails',tripDetailsSchema);
