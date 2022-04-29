const express = require('express');
const router = express.Router();

// posto smo setovali baznu rutu u app.js na /login ovde nema potrebe da pisemo opet /login vec je dovoljno da napisemo samo /
router.post('/', (req, res) => {
  const { name } = req.body;

  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  res.status(401).send('Please provide credential');
});

module.exports = router;
