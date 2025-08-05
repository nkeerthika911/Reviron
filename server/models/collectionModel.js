const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productSize:{
      type: Number,
      required: true,
    },
    address:{
      type: String,
      required: true,
    },
    collectionStatus: {
      type: String,
      enum: ['processing', 'pickup initiated', 'collected'],
      default: 'processing',
    },
    employeeStatus:{
      type: String,
      enum: ['unassigned','assigned'],
      default: "unassigned"
    },
    employeeId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    pickupBy:{
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
