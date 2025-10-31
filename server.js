require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Order = require('./models/order');
const Message = require('./models/message');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ramji_shop';

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ✅ Counter model (for auto-increment order numbers)
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model('Counter', counterSchema);

// ✅ Root route
app.get('/', (req, res) => res.send('🍎 Ramji Fruit & Veggie Shop Backend is Running'));

// ✅ Save a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, slot, items, total } = req.body;

    if (!name || !phone || !address || !slot || !items || !total) {
      return res.status(400).json({ success: false, msg: 'Missing required fields' });
    }

    // ✅ Safely increment order counter
    const counter = await Counter.findOneAndUpdate(
      { name: 'orderNumber' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newOrder = new Order({
      orderNumber: counter.seq, // unique increasing number
      fullName: name,
      phoneNumber: phone,
      deliveryAddress: address,
      deliverySlot: slot,
      totalAmount: total,
      items,
    });

    await newOrder.save();
    console.log(`✅ Order #${counter.seq} saved successfully`);

    res.status(201).json({ success: true, orderId: newOrder._id, orderNumber: counter.seq });
  } catch (err) {
    console.error('❌ Error saving order:', err);
    res.status(500).json({ success: false, msg: '⚠️ Failed to place order. Please try again.' });
  }
});

// ✅ Get all orders (for admin)
// ✅ Fetch orders in decreasing order (newest first)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderNumber: 1 }); // -1 = descending
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


// ✅ Store customer message (Contact Form)
app.post('/api/messages', async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    if (!name || !phone || !message)
      return res.status(400).json({ success: false, msg: 'All fields required.' });

    const newMessage = new Message({ name, phone, message });
    await newMessage.save();

    res.status(200).json({ success: true, msg: 'Message saved successfully' });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

// ✅ Fetch all messages (for admin panel)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort();
    
    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ success: false, msg: 'Server error while fetching messages' });
  }
});

// ✅ Serve static frontend files (optional)
app.use(express.static(path.join(__dirname, '..')));

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
