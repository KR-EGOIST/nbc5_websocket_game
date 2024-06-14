import redisClient from '../init/redis.js';

const redisCli = redisClient.v4;

const HIGH_SCORE_KEY = 'high_scores';

// 최고 점수 추가
export const addHighScore = async (uuid, score) => {
  await redisCli.ZADD(HIGH_SCORE_KEY, score, JSON.stringify(uuid));
};

// 최고 점수 조회
export const getHighScores = async (limit = 10) => {
  const scores = await redisCli.ZRANGE(HIGH_SCORE_KEY, 0, limit - 1, 'WITHSCORES');
  return scores
    .map((value, index, array) => {
      if (index % 2 === 0) {
        return { user: JSON.parse(value), score: parseInt(array[index + 1], 10) };
      }
      return null;
    })
    .filter((item) => item !== null);
};
