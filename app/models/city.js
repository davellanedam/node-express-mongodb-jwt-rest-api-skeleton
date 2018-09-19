const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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
CitySchema.index({
  name: 'text'
})
CitySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('City', CitySchema)
