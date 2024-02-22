const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
    make: {type:String},
    model: {type:String},
    year: {type:Number},
    dcNumber: {type:String},
    poNumber:{type:String},
    checkedOut: { type: Boolean, default: false },
    securityCheckStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    image:{type:String}
},
    { versionKey: false }
)

const VehicleModel = mongoose.model('vehicle', vehicleSchema)

module.exports = { VehicleModel }