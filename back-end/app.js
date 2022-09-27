const express = require("express");

const app = express();
app.listen(7070, () => {
  console.log(7070, "번 포트에서 대기 중");
});

app.get("/", (req, res) => {
  res.send('첫 Express 서버 실행');
});