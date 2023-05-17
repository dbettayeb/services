const express = require('express');
const fs = require('fs');

const router = require("express").Router();

const cors = require("cors");







const app = express();
app.use(cors({

  origin: 'http://localhost:3000',

  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

  credentials: true

}));

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

app.post('/write', (req, res) => {
  const { string, filePath } = req.body;
  console.log(req.body);
  fs.appendFile(filePath, string, err => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to write to file' });
    } else {
      res.json({ message: 'String written to file successfully' });
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
