// helper 란?
// 어떤 특정한 기능을 하는 건 아니지만 꼭 필요한 우리에게 도움을 주는 함수

import { removeUser } from '../models/user.model.js';

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log(`User disconnected: ${socket.id}`);
  console.log('Current users: ', getUser());
};
