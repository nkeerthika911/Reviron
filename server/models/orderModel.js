const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    status: {
      type: String,
      default: 'in processing',
    },
  },
  {
    timestamps: true, // Automatically 
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
