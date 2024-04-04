const express = require("express");

const app = express();
app.set('view engine', 'pug')

app.get("/", async (_req, res) => {
    res.render('index', {message: "Hello World!"})
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
});
