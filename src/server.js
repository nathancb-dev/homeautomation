const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./serverStartFunction')();
require('./controllers/api')(app);

app.get("/", (req, res) => {
    res.send("OK");
})

app.listen(3000, () => { console.log("server stared at port 3000. http://localhost:3000") });