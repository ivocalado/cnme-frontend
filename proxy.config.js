const proxy = [
  {
    context: '/api',
    target: 'http://cnme-dev.nees.com.br:8080',
    changeOrigin: true
  }
];
module.exports = proxy;


