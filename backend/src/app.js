/**
 * This file is part of the Sandy Andryanto Blog Application.
 *
 * @author     Sandy Andryanto <sandy.andryanto.blade@gmail.com>
 * @copyright  2024
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require('node:http');
const jwt = require('./utils/jwt');
const cors = require("cors");
const app = express();
const db = require("./models");
const { Server } = require('socket.io');
const PORT = process.env.APP_PORT || 8000;
const server = createServer(app);
const io = new Server(server);

const fs = require('fs');
const dir = './uploads';

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*'); //LINE 5

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('*/uploads',express.static('uploads'));
app.use(bodyParser.json());
app.use(jwt());
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://127.0.0.1:5000']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

app.get("/", (req, res) => {
  res.sendStatus(404);
});

app.use(function(err, req, res, next) {
  if(err.status !== undefined && err.status != 200)
    res.status(err.status).send({error : err.message});
})

app.listen(PORT, () => {
  db.sequelize.sync();
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  console.log("Starting Application "+new Date().toString());
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.listen(8080);

module.exports = app