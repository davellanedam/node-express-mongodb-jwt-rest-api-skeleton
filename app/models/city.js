const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
CitySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('City', CitySchema)
