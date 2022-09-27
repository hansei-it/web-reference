const express = require("express");
const path = require('path');

const app = express();
app.listen(7070, () => {
  console.log(7070, "번 포트에서 대기 중");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/pub/index.html"));
});