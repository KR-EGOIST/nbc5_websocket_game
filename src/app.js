import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import initSocket from './init/socket.js';

dotenv.config();

const app = express();
const server = createServer(app);

const PORT = process.env.PORT;

app.use(express.json());

// bodyParser 라는 친구 , url 인코딩 해주는 함수
// 라이브러리 쓸 때는 true이고 아니면 false 이다.
// payload 를 자동으로 파싱 해준다는 의미이다.
app.use(express.urlencoded({ extended: false }));

// 서버를 매개변수로 함수 호출
initSocket(server);

app.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
