const users = []; // 유저 정보를 저장할 전역 변수

// 유저 추가, 유저가 연결을 할 경우
export const addUser = (user) => {
  users.push(user);
};

// 유저 삭제 , 유저가 연결을 해제할 경우
// uuid 말고 현재 연결된 상태에서 데이터 통신을 하기 위해서 발급된 ID 이기 때문에 socketId 를 사용
export const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// 유저 조회
export const getUsers = () => {
  return users;
};
