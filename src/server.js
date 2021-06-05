const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./serverStartFunction')();

app.get("/", (req, res) => {
    res.send("OK");
})

require('./controllers/authController')(app);
require('./controllers/rolesController')(app);
require('./controllers/houseController')(app);
require('./controllers/devicesController')(app);
require('./controllers/thingsController')(app);
require('./controllers/roomsController')(app);
require('./controllers/logsController')(app);

app.listen(3000, () => { console.log("server stared at port 3000. http://localhost:3000") });