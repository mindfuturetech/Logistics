const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    company_owner: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    tds_rate: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: "Value must be a positive number",
        },
    },
    pan: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    gst: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 30,
    },
})

vendorSchema.index({ pan: 1, GST: 1 }, { unique: true })

module.exports = mongoose.model("vendors", vendorSchema)