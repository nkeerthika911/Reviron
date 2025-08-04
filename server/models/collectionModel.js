const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    }],
    status: {
      type: String,
      enum: ['processing', 'pickup initiated', 'collected'],
      default: 'processing',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
