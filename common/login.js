/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

'use strict';

const req=require('superagent');
const Promise = require('promise');
const download = require('./fun/download');


/*用promise控制流程，异步获取cookie*/
function getCookieAsync(hostname, regExrCookie) {
    let promise, cookie;
    promise = download(hostname, (res, resolve) => {
            cookie = res.headers['set-cookie']
                .join(',')                      ///arr.join(sep)把数组转换成一个字符串并用sep分隔
                .match(regExrCookie)[1];
            resolve(cookie);
            console.log(cookie)
        },
        'Cookie 获取失败'
    );
    return promise;
}

/* 填些username,password等form */
function postFormAsync(url, formData, baseHeaders, cookie) {
    let promise = new Promise((resolve,reject) => {
        req.post(url)                    ///post提交Form信息
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
                resolve(cookie);
                //console.log(res.text);
                console.log(cookie)

            });
    });
    return promise;
}


module.exports.getCookieAsync = getCookieAsync;
module.exports.postFormAsync = postFormAsync;
