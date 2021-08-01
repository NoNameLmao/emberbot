const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/webhook", async (req, res) => {
    const payload = req.body;
    res.sendStatus(200);
    const options = {
        method: "POST",
        url:
            process.env.HEROKU_WEBHOOK_URL,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            content: payload,
        }),
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response);
    });
});
app.listen(3000, () => console.log("heroku2discord is running on port 3000!"));