const express = require("express");
const { default: chats } = require("./data/data");

const app = express();

app.get('/', (req, res) => {
    res.send("API is running");
});

app.get('/api/chats', (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    // console.log(req.params.id);
    const singleChat = chats.find(c=>c_id === req.params.id);
    res.send(singleChat);
})

app.listen(5000, console.log("listening on port 5000"));