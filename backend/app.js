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
const jwt = require('./src/utils/jwt');
const cors = require("cors");
const app = express();
const db = require("./src/models");
const PORT = process.env.APP_PORT || 8000;

app.use('*/uploads',express.static('uploads'));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require("./src/routes")(app);

app.get("/", (req, res) => {
  res.sendStatus(404);
});



app.listen(PORT, () => {
  db.sequelize.sync();
  console.log("Starting Application "+new Date().toString());
});

module.exports = app