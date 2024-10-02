const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      //target: 'http://localhost:8080',	// # 서버 URL or localhost:설정한포트번호
      target: 'https://port-0-appointment2-m1gego797556415b.sel4.cloudtype.app',
      changeOrigin: true,
      pathFilter: '/api',
    })
  );
};