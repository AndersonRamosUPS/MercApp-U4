const { Schema, model } = require('mongoose')

const productoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

productoSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
  },
})

module.exports = model('Product', productoSchema)
