const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});