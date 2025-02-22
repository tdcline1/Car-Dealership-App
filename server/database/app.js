/*jshint esversion: 8 */
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const  cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

// Reads reviews.json and dealerships.json files and parses them into JavaScript objects.
const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

// Connect to the MongoDB database, specifying the database name 'dealershipsDB'
mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});

//Imports Mongoose models (review.js and dealership.js) for interacting with MongoDB.
const Reviews = require('./review');
const Dealerships = require('./dealership');

//Deletes all existing records in the Reviews and Dealerships collections.
//Inserts fresh data from the JSON files.
try {
  Reviews.deleteMany({}).then(()=>{
    Reviews.insertMany(reviews_data.reviews);
  });
  Dealerships.deleteMany({}).then(()=>{
    Dealerships.insertMany(dealerships_data.dealerships);
  });
  
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}


// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    //Reviews.find() queries the "reviews" collection in MongoDB.
    //await ensures that the database query is completed before proceeding.
    const documents = await Reviews.find();
    //Express automatically sends this JSON response to the client.
    //There’s no need to explicitly return because res.json() ends the request-response cycle.
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
      //Reviews.find() queries the "dealerships" collection in MongoDB.
      //await ensures that the database query is completed before proceeding.
      const documents = await Dealerships.find();
      //Express automatically sends this JSON response to the client.
      //There’s no need to explicitly return because res.json() ends the request-response cycle.
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching documents' });
    }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
    try {
        const documents = await Dealerships.find({state: req.params.state});
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching documents' });
    }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
    try {
        const documents = await Dealerships.find({id: req.params.id});
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching documents' });
    }
});

//Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  data = JSON.parse(req.body);
  const documents = await Reviews.find().sort( { id: -1 } );
  let new_id = documents[0].id + 1;

  const review = new Reviews({
		"id": new_id,
		"name": data.name,
		"dealership": data.dealership,
		"review": data.review,
		"purchase": data.purchase,
		"purchase_date": data.purchase_date,
		"car_make": data.car_make,
		"car_model": data.car_model,
		"car_year": data.car_year,
	});

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
		console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
