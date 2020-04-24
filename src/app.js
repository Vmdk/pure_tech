const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const router = require("./router");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, err => {
    if (err) {
        return console.log("something bad happened", err);
    }

    console.log(`server is listening on ${port}`);
});