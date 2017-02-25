/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/16.
 */
'use strict';

const config = require('./../config.json');
const getCookie = require('../../common/login').getCookieAsync;
const postForm =require('../../common/fun/postForm');


let
    urls = config.urls,
    formData = config.formData;

let hostname = urls.hostname,
    loginUrl = urls.http + urls.hostname + urls.login,
    rJsessionId = /(JSESSIONID=.+?);/,            //regex for hdu cookie[phpsessid];
    encoding = 'utf8';


/*
* @return 登陆后的promise对象
* promise 传递oRes = {
 res: res,
 oSet: oSet
 }
* */
function loginAsync() {
    console.log("VJudge登陆中,请稍后...");
    let promise;
    promise = getCookie(hostname, rJsessionId ,encoding)
     .then((cookie) => {
            let set = {
                'Cookie': cookie
            };
            return postForm(loginUrl, formData, set, encoding);
        }
     );
    return promise;
}

module.exports = loginAsync;
