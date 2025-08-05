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
    estimatedStartPrice:{
      type: Number,
      required: true,
    },
    estimatedEndPrice:{
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
    employeeName:{
      type: String,
      default: "NA"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
