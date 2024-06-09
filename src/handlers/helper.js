// helper 란?
// 어떤 특정한 기능을 하는 건 아니지만 꼭 필요한 우리에게 도움을 주는 함수

import { setStage } from '../models/stage.model.js';
import { addUser, removeUser, getUser } from '../models/user.model.js';
import { getStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';
import { CLIENT_VERSION } from '../constants.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log(`User disconnected: ${socket.id}`);
  // 현재 접속중인 유저의 수 출력
  console.log('Current users: ', getUser());
};

// 기획 리마인드
// 스테이지에 따라서 더 높은 점수 획득
// 1스테이지, 0점 -> 1점씩
// 2스테이지, 1000점 -> 2점씩

export const handleConnection = (socket, uuid) => {
  console.log(`New user connected: ${uuid} with socket ID ${socket.id}`);
  // 현재 접속중인 유저의 수 출력
  console.log('Current users: ', getUser());

  // socket.emit 은 본인에게 보내는 거예요.
  // 유저가 접속했을 때, 유저의 uuid 정보를 보내준다 (response).
  socket.emit('connection', { uuid });
};

// 핸들러를 맵핑하는 객체를 생성했으니 사용을 할 곳이 있어야합니다.
// 유저의 모든 메세지를 받아 적절한 핸들러로 보내주는 이벤트 핸들러를 만들어봅시다.
// 여기서 data 는 payload 가 됩니다.
export const handlerEvent = (io, socket, data) => {
  // 서버에 저장된 클라이언트 배열에서 메세지로 받은 clientVersion을 확인합니다.
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    // 만약 일치하는 버전이 없다면 response 이벤트로 fail 결과를 전송합니다.
    socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
    return;
  }

  // 메세지로 오는 handlerId에 따라 handlerMappings 객체에서 적절한 핸들러를 찾습니다.
  const handler = handlerMappings[data.handlerId];
  // 적절한 핸들러가 없다면 실패처리합니다.
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  // 적절한 핸들러에 userID 와 payload를 전달하고 결과를 받습니다.
  const response = handler(data.userId, data.payload);

  // 만약 결과에 broadcast (모든 유저에게 전달)이 있다면 broadcast 합니다.
  if (response.broadcast) {
    // broadcast 해야 될 정보라면 io.emit 을 사용한다.
    io.emit('response', 'broadcast');
    return;
  }

  // 해당 유저에게 적절한 response를 전달합니다.
  socket.emit('response', response);
};
