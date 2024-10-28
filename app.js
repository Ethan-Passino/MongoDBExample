const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
mongoose.connect('mongodb://localhost:27017/mydatabase');


// Define a Mongoose schema for items
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

// API Routes

// 1. Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err });
  }
});

// 2. Get a single item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item', error: err });
  }
});

// 3. Create a new item
app.post('/api/items', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err });
  }
});

// 4. Update an item by ID
app.put('/api/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err });
  }
});

// 5. Delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
