const proxy = [
  {
    context: '/api',
    target: 'https://cnme-dev.nees.com.br',
    changeOrigin: true
  }
];
module.exports = proxy;


