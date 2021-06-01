const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("OK");
})

require('./controllers/authController')(app);
require('./controllers/rolesController')(app);

app.listen(3000, () => { console.log("server stared at port 3000. http://localhost:3000") });