const http = require('http');

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie); // req 객체에서 쿠키 가져오기 
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });  // 응답 헤더에 쿠키 기록
  res.end('Hello Cookie');
})
  .listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
  });