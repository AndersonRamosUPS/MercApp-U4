const { Schema, model } = require('mongoose')

const categoriaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

categoriaSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
  },
})

module.exports = model('Category', categoriaSchema)
