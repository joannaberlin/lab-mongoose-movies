const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');

require("dotenv/config");
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
 

const celebrities = [
  {
    name: "Beyonce",
    occupation: "Singer",
    catchPhrase: "bla"
  },
  {
    name: "Jay-Z",
    occupation: "Rapper",
    catchPhrase: "blabla"
  },
  {
    name: "Rihanna",
    occupation: "Singer",
    catchPhrase: "blablabla"
  }
] 

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Success! Added ${celebrities.length} celebrities to the database`)
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  })