/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/16.
 */
'use strict';

const config = require('./../config.json');
const login = require('../../common/login');


let
    urls = config.urls,
    baseHeaders = config.baseHeaders,
    formData = config.formData;

let hostname = urls.hostname,
    loginUrl = urls.hostname + urls.login,
    rPhpsessid = /(PHPSESSID=.+?);/;                //regex for hdu cookie[phpsessid];


/*
* @return 登陆后的promise对象
* */
function loginAsync() {
    let promise;
    promise = login.getCookieAsync(hostname, rPhpsessid)
        .then((cookie) => {
            return login.postFormAsync(loginUrl, formData, baseHeaders, cookie);
        });
    return promise;
}


module.exports = loginAsync;
