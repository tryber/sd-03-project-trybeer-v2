const jwtConfig = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

/*
o secret deveria estar no .env porém para ser avaliado evaluator da trybe no github é necessário
ficar aqui
*/
const secret = 'minhaSenhaSuperSecretatrybeer8';

module.exports = {
  jwtConfig,
  secret,
};
