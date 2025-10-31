const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: Number, unique: true  },
  fullName: String,
  phoneNumber: String,
  deliveryAddress: String,
  deliverySlot: String,
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
