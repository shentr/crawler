/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

'use strict';

const req=require('superagent');
const Promise = require('promise');
const download = require('./fun/download');

/*
* @return: promise
* @parameter:(hostname, regExrCookie, encoding = 'utf8')
* 用promise控制流程，异步获取cookie[PHPSESSID]
* */
function getCookieAsync(hostname, regExrCookie, encoding = 'utf8') {
    let promise = new Promise((resolve, reject) => {
        download(hostname,encoding)
            .then((res) => {
                let cookie = res.headers['set-cookie']
                    .join(',')                      ///arr.join(sep)把数组转换成一个字符串并用sep分隔
                    .match(regExrCookie)[1];

                if(!cookie){
                    reject('cookie 获取失败');
                }
                resolve(cookie);
            },
                (err) => {
                    let errMsg = 'hostname 下载失败 :\n' + err;
                    reject(errMsg);
                    console.log(errMsg);
                }
            );
    });
    return promise;
}

module.exports.getCookieAsync = getCookieAsync;
