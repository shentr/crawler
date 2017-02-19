/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/16.
 */
'use strict';

const req=require('superagent');
const Promise = require('promise');
const config = require('./config.json');
const download = require('./download');


let
    urls = config.urls,
    baseHeaders = config.baseHeaders,
    formData = config.formData,
    rPhpsessid = /(PHPSESSID=.+?);/;

let hostname = urls.hostname,
    login = urls.hostname + urls.login;

/*用promise控制流程，异步获取cookie*/
function getCookieAsync() {
    let cookie;
    download(hostname, (res, resolve) => {
        cookie = res.headers['set-cookie']
            .join(',')                      ///arr.join(sep)把数组转换成一个字符串并用sep分隔
            .match(rPhpsessid)[1];
        resolve(cookie);
        console.log(cookie)
    },
        'Cookie 获取失败'
    );
}
getCookieAsync();
/* 填些username,password等form */
function postUserForm(cookie) {
    let promise = new Promise((resolve,reject) => {
        req.post(login)                    ///post提交Form信息
            .set(baseHeaders)
            .set('Cookie',cookie)
            //.type('form')
            .send(formData)
            //.redirects(0)                           ///禁止重定向
            .end((err, res) => {                      ///登陆完成，可以后续工作了
                if(err){
                    reject(err);
                    console.log("post失败: \n"+err);
                    return ;
                }
                //console.log(res.text);
                //console.log(cookie)
                resolve(cookie);
            });
    });
    return promise;
}

/*return 填完form后的promise对象*/
function loginAsync() {
    getCookieAsync()
        .then((cookie) => {
            return postUserForm(cookie);
        });
}


module.exports = loginAsync;
