// [도서]  SNS 앱 예제로 배우는 프로그레시브 웹 앱-이근혁 저-비제이퍼블릭(BJ퍼블릭)-2020년 07월
// json-db는 간단하게 잘 만들어진 위 책 코드를 사용한 것입니다. 책도 넘 좋음!
const { SimpleDatabase } = require('../db_server/db');

SimpleDatabase.load(['user', 'post']);
SimpleDatabase.setConfig({ autoCommit: true });

const simpleQuery = require('../db_server/simpleQuery');
(function () {
    const id = +new Date();
    const dateString = getDatestamp();
    const author = 'user'+id;
    const title = 'title'+id;
    const content = 'content'+id;
    const image = 'image-'+id+'.png';
    try {
        //원소 추가
        const post = SimpleDatabase.insert('post', {
        data: {
            id,
            author,
            title,
            date: dateString,
            content,
            image,
            favorite: []
        }
        });
        if (post) {
            console.log('insert post: ', post);
        } else {
            console.log('insert post error');
        }
        //원소 모두 출력
        const posts = simpleQuery.getPost(author);
        console.log('posts: ', posts);

         //원소 제거
        // const deletedPost = SimpleDatabase.delete("post", {
        //   where: {
        //     id,
        //     author,
        //   },
        // });
        // if (deletedPost) {
        //     console.log('delete post: ', deletedPost);
        // } else {
        //     console.log('delete post error');
        // }

        // 좋아요 추가/삭제
        // const updatedPost = simpleQuery.updateFavorite(user, {
        //     id,
        //     state,
        // });

        // 해당 유저의 구독 정보 저장
        // const inserted = SimpleDatabase.upsert("user", {
        //     where: {
        //     id: user,
        //     },
        //     data: {
        //     subscription,
        //     },
        // });

    } catch (err) {
        console.error(err.message);
    }
})();

// 유틸리티 함수
// 날짜 년-월-일 
function getDatestamp(){
  const d = new Date();
  const year = d.getFullYear();
  const month = paddingNumber(d.getMonth() + 1, 2);
  const date = paddingNumber(d.getDate(), 2);
  return `${year}-${month}-${date}`;
};
// 00 두 자리 날짜
function paddingNumber(number, length){
  const sNumber = number.toString();
  if (sNumber.length >= length) {
    return sNumber;
  } else {
    let padding = "";
    for (let i = 0; i < length - sNumber.length; i++) {
      padding += "0";
    }
    return padding + sNumber;
  }
};
function getUser(header){
    return decodeURI(header['x-paper-user']);
  };
function readFile(filePath){
    return new Promise((resolve, reject) => {
        //const target = path.join(process.env.PAPER_DIR, filePath);
        const target = path.join(__dirname, filePath);
        fs.readFile(target, 'utf-8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
        });
    });
};