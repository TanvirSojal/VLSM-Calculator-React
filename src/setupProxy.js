const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/allocation',
    createProxyMiddleware({
      target: 'https://vlsm-calculator.herokuapp.com/api/v1/vlsm-calculator',
      changeOrigin: true,
    })
  );
};