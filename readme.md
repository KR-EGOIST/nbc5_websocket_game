# 웹소켓 게임 만들기

### 내일배움 캠프 5기 Node.js 게임서버트랙

---

- 게임 장르

  - 사이드뷰, 점핑 액션 게임

- 게임 컨텐츠

  - 스테이지 진행

    - 시간에 따른 점수 획득
      - 기본적으로 오른쪽을 이동하면서 장애물을 피하는 게임
      - 오래 버틸수록 높은 점수 획득 (시간에 따른)
    - 스테이지에 따라서 더 높은 점수 획득
      - 0점 , 1스테이지
      - 1000점, 2스테이지
      - 위와 같이 점수로 나뉘어서 스테이지 구분
      - 스테이지가 올라갈수록 시간당 높은 점수 획득 가능

  - 아이템 획득

    - 아이템 종류에 따라 다른 점수 획득
      - 이동 중 아이템 무작위 생성
    - 스테이지에 따라 생성되는 아이템 구분
      - 1스테이지에는 1번 아이템만, 2스테이지에는 2번 아이템까지 나오는 것
      - 높은 스테이지의 아이템에서는 더 높은 점수 획득 가능