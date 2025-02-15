/*jshint esversion: 8 */

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3050;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Read and parse car records from JSON file so we can later populate the database
const carsData = JSON.parse(fs.readFileSync('car_records.json', 'utf8'));

// Connect to MongoDB using Mongoose. Connects to a MongoDB instance running on 'mongo_db' at port 27017,
// and specifies 'dealershipsDB' as the database to use.
mongoose.connect('mongodb://mongo_db:27017/', { dbName: 'dealershipsDB' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Import the Cars model from the 'inventory' module (which defines the schema for car documents)
const Cars = require('./inventory');

// populate the database
try {

  Cars.deleteMany({}).then(() => {
    Cars.insertMany(carsData.cars);
  });
} catch (error) {
  console.error(error);
  // Handle errors properly here
}

app.get('/', async (req, res) => {
  res.send('Welcome to the Mongoose API');
});


// Route: GET /cars/:id
// Fetch car records based on the dealer ID provided in the URL parameter.
app.get('/cars/:id', async (req, res) => {
  try {
    const documents = await Cars.find({dealer_id: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});


// Route: GET /carsbymake/:id/:make
// Fetch car records for a specific dealer and car make.
app.get('/carsbymake/:id/:make', async (req, res) => {
  try {
    const documents = await Cars.find({dealer_id: req.params.id, make: req.params.make});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews by car make and model' });
  }
});


// Route: GET /carsbymodel/:id/:model
// Fetch car records for a specific dealer and car model.
app.get('/carsbymodel/:id/:model', async (req, res) => {
  try {
    const documents = await Cars.find({ dealer_id: req.params.id, model: req.params.model });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by ID' });
  }
});


// Route: GET /carsbymaxmileage/:id/:mileage
// Fetch car records filtered by a mileage range for a specific dealer.
app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
  try {
    let mileage = parseInt(req.params.mileage)
    let condition = {}
    if(mileage === 50000) {
      condition = { $lte : mileage}
    } else if (mileage === 100000){
      condition = { $lte : mileage, $gt : 50000}
    } else if (mileage === 150000){
      condition = { $lte : mileage, $gt : 100000}
    } else if (mileage === 200000){
      condition = { $lte : mileage, $gt : 150000}
    } else {
      condition = { $gt : 200000}
    }
    const documents = await Cars.find({ dealer_id: req.params.id, mileage : condition });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by ID' });
  }
});

// Route: GET /carsbyprice/:id/:price
// Fetch car records filtered by a price range for a specific dealer.
app.get('/carsbyprice/:id/:price', async (req, res) => {
    try {
        let price = parseInt(req.params.price)
        let condition = {}
        if(price === 20000) {
          condition = { $lte : price}
        } else if (price=== 40000){
          console.log("\n \n \n "+ price)  
          condition = { $lte : price, $gt : 20000}
        } else if (price === 60000){
          condition = { $lte : price, $gt : 40000}
        } else if (price === 80000){
          condition = { $lte : price, $gt : 60000}
        } else {
          condition = { $gt : 80000}
        }
        const documents = await Cars.find({ dealer_id: req.params.id, price : condition });
        res.json(documents);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching dealers by ID' });
      }
});


// Route: GET /carsbyyear/:id/:year
// Fetch car records for a specific dealer with a year greater than or equal to the provided year.
app.get('/carsbyyear/:id/:year', async (req, res) => {
  try {
    const documents = await Cars.find({ dealer_id: req.params.id, year : { $gte :req.params.year }});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by ID' });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});