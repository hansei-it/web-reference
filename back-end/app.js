const express = require("express");
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 7070);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), "번 포트에서 대기 중");
});

// '/'로 접속하면 pub 디렉토리를 정적파일 위치로 지정
app.use('/', express.static(path.join(__dirname, 'pub')));
