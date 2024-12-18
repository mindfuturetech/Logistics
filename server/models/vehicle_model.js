const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
    truck_no: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    company_owner: {
        type: String,
        required: true,
    },
    documents: {
        registration: {
            file_path: { type: String },
            start_date: { type: Date },
            end_date: { type: Date }
        },
        insurance: {
            file_path: { type: String },
            start_date: { type: Date },
            end_date: { type: Date }
        },
        fitness: {
            file_path: { type: String },
            start_date: { type: Date },
            end_date: { type: Date }
        },
        mv_tax: {
            file_path: { type: String },
            start_date: { type: Date },
            end_date: { type: Date }
        },
        puc: {
            file_path: { type: String },
            start_date: { type: Date },
            end_date: { type: Date }
        },
        ka_tax: {
            file_path: { type: String },
            start_date: { type: Date },
            end_date: { type: Date }
        },
        basic_and_KA_permit: {
            file_path: { type: String },
            start_date: { type: Date },
            end_date: { type: Date }
        },
    },
})


module.exports = mongoose.model("vehicles", vehicleSchema)