const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

Recipe.insertMany(data)
.then((recipes) => {
  recipes.forEach((recipe) => {
    console.log(recipe.title)
  })
})

Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then(() => {
  console.log('Recipe updated')
})
.catch((error) => {
  console.log(error)
})

Recipe.deleteOne({title: 'Carrot Cake'})
.then(() => {
  console.log('Recipe deleted')
  mongoose.connection.close();
})
.catch((error) => {
  console.log(error)
})