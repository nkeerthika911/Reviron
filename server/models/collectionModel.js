const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    productId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
