// helper 란?
// 어떤 특정한 기능을 하는 건 아니지만 꼭 필요한 우리에게 도움을 주는 함수

import { setStage } from '../models/stage.model.js';
import { addUser, removeUser, getUser } from '../models/user.model.js';
import { getStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

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

  const { stages } = getGameAssets();
  // stages 배열에서 0번째 = 첫번째 스테이지
  setStage(uuid, stages.data[0].id);
  // 스테이지에 잘 들어갔다 확인
  console.log('Stages: ', getStage(uuid));

  // socket.emit 은 본인에게 보내는 거예요.
  // 유저가 접속했을 때, 유저의 uuid 정보를 보내준다 (response).
  socket.emit('connection', { uuid });
};
