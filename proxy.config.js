const proxy = [
  {
    context: '/api',
    target: 'https://cnme-dev.nees.com.br',
    changeOrigin: true
  },
  {
    context: '/v1',
    target: 'https://api.postmon.com.br',
    changeOrigin: true
  }
];
module.exports = proxy;


