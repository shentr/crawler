/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/18.
 */

let http = require('http');
 let querystring=require('querystring');
 let config = require('../oj1_hduOj/config.json');

 var
 urls = config.urls,
 user = config.formData.username,
 qsUser = querystring.stringify({
 user: user
 }),
 path = urls.userStatus + "?" + qsUser;



 var options = {
 hostname: urls.hostname,
 port: urls.hostnamePort,
 path: path,
 method: 'GET',
 gzip: true,
 headers: {

 }
 };

 var req = http.request(options, (res) => {
 console.log(`STATUS: ${res.statusCode}`);
 console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
 res.setEncoding('utf8');
 res.on('data', (chunk) => {
 console.log(`BODY: ${chunk}`);
 });
 res.on('end', () => {
 console.log('No more data in response.');
 });
 });

 req.on('error', (e) => {
 console.log(`problem with request: ${e.message}`);
 });

 req.end();          ///使用 http.request() 必须调用 req.end() 来表明请求已经结束，即使没有数据被写入请求主体。

