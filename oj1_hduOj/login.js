/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/16.
 */
'use strict';

let req=require('superagent');
let config = require('./config.json');

var cookie,
    urls = config.urls,
    baseHeaders = config.baseHeaders,
    formData = config.formData,
    rPhpsessid = /(PHPSESSID=.+?);/;

var hostname = urls.hostname,
    login = urls.hostname + urls.login;

req.get(hostname)               ///模拟浏览器发送get请求
    .end((err, res) => {              ///获得 response 后回调
        //console.log(res.headers['set-cookie']);
        cookie = res.headers['set-cookie']
            .join(',')                      ///arr.join(sep)把数组转换成一个字符串并用sep分隔
            .match(rPhpsessid)[1];
        //console.log(cookie);

        req.post(login)                    ///post提交Form信息
            .set(baseHeaders)
            .set('Cookie',cookie)
            .type('form')
            .send(formData)
            .redirects(0)                           ///禁止重定向，本来要重定向到主页
            .end((err, res) => {            ///登陆完成，可以后续工作了
                console.log(res.headers);
                }
            );
    });








