const express = require("express");
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 7070);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), "번 포트에서 대기 중");
});

//모든 접속의 필요 정보 출력
app.use('*', (req,res,next)=>{
    console.log('++++++++++++++++++++++++++++++++++');
    console.log('=========== req.body =============');
    console.log(req.body)
    console.log('=========== req.query =============');
    console.log(req.query)
    console.log('=========== req.params =============');
    console.log(req.params)
    console.log('=========== process.env.RUN_TYPE =============');
    console.log(process.env.RUN_TYPE)
    next();
})
app.use(morgan('dev'));//dev,combined,common,short,tiny등
// '/'로 접속하면 pub 디렉토리를 정적파일 위치로 지정
app.use('/', express.static(path.join(__dirname, 'pub')));

app.use((req,res)=>{
    res.status(400).send('클라이언트의 요청이 잘 못 되었습니다.');
})
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('서버가 처리할 수 없는 예외 발생');
  });
