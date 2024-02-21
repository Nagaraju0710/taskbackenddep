

const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      contactPerson: String,
      email: String,
      phone: String,
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
      },
}, { versionKey: false })

const VendorModel = mongoose.model('vendor', vendorSchema)

module.exports = { VendorModel }