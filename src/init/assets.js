// 파일을 읽기 위한 파일 시스템 , Node.js 기본 라이브러리
import fs from 'fs';
// 파일의 경로를 알기 위한 path , Node.js 기본 라이브러리
import path from 'path';
// fileURLToPath , 현재 나의 경로를 찾기 위한 함수 , Node.js 기본 라이브러리
import { fileURLToPath } from 'url';

let gameAssets = {}; // 비동기 병렬 Promise 의 결과값을 넣어줄 전역 변수

// import.meta.url , 현재 파일의 절대 경로를 나타냅니다.
// 현재 모듈의 url 을 나타냅니다.
const __filename = fileURLToPath(import.meta.url);
// 파일의 절대 경로를 찾아서 절대 경로를 사용할려면
// 절대 경로로 파일 이름 빼고 디렉토리 경로만 찾아냅니다.
const __dirname = path.dirname(__filename);
// 파일의 위치만 찾아낸 거에서 또 경로를 뽑아냅니다.
// ../../ 이므로 상위 폴더로 2번 이동한 뒤 assets 폴더를 찾아서 들어갑니다.
// 즉, 최상위 경로 + assets 폴더
const basePath = path.join(__dirname, '../../assets');

/*
비동기 병렬
비동기 : 한 번에 같이 처리가 된다는 뜻
병렬 : 한 번에 같이 처리가 된다는 뜻
*/
// 파일 읽는 함수
// 비동기 병렬로 파일을 읽는다.
const readFileAsync = (filename) => {
  // Promise 객체를 사용해야하는 이유
  // 하나의 파일을 읽는 거를 기다려야 하기 때문
  // 어느 파일이 먼저 끝날지 알 수 없기 때문
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      // JSON.parse , data 를 다시 JSON 형태로 바꿔 준 다음에 resolve 를 통해서 반환해주면 됩니다.
      resolve(JSON.parse(data));
    });
  });
};
// 위 코드는 filename , 즉 파일 하나를 읽는 함수라서 파일 3개를 한번에 읽는 함수를 만들어줘야 합니다.
// Promise.all()
export const loadGameAssests = async () => {
  try {
    // Promise.all([]) 이 안에 배열은 Promise 객체 배열 입니다.
    // 여기에 사용할 함수들을 넣어주면 됩니다.
    const [stages, items, itemUnlocks] = await Promise.all([
      readFileAsync('stage.json'),
      readFileAsync('item.json'),
      readFileAsync('item_unlock.json'),
    ]);

    gameAssets = { stages, items, itemUnlocks };
    return gameAssets;
  } catch (err) {
    // 원래는 에러 핸들링을 해야한다.
    // 지금은 서버가 뻗어버리지만 않게 콘솔로 에러 메시지를 출력
    // throw 하면 loadGameAssests 함수가 호출되는 것보다 상위에 있는 함수에
    // loadGameAssests에 발생한 에러를 넘긴다는 뜻입니다.
    throw new Error('Failed to load game assets: ' + err.message);
  }
};

// 우리가 선언한 전역 변수를 호출하는 함수 선언
// 외부에서는 gameAssets에 직접적으로 접근하는 게 아니고
// 함수 하나를 통해서 따로 호출을 해서 사용을 합니다.
// 이유는 보안상 이유
export const getGameAssets = () => {
  return gameAssets;
};
