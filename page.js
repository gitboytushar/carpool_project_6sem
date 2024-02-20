let express = require('express');
let app = require('../CarPool/app');
let router = express();

router.get('/', (req, res) => {
  app.find({})
  .then((x) => {
    
  })
});
