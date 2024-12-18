const mongoose = require('mongoose')

const freightSchema = mongoose.Schema({
    id: {
        type: Number,
        required: false,
    },
    from: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    to: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    rate: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: "Value must be a positive number",
        }
    },
})

freightSchema.index({ from: 1, to: 1 }, { unique: true })

module.exports = mongoose.model("freights", freightSchema)