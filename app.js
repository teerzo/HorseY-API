const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Routes
const { routeZed } = require('./src/routes/zed.js');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Routes
app.use('/zed', routeZed);

if (process.env.STAGE === 'staging') {
  // lazy local server to run locally, look into serverless offline to replace this 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
}


module.exports = app;