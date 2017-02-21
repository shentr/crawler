/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const Promise = require('promise');
const charset = require('superagent-charset');
const req = charset(require('superagent'));

/*
* @return: promise
* @parameter:  (url, encoding = 'utf8', oSet ={})
* */
function downloadAsync(url, encoding = 'utf8', oSet ={}) {
    let promise = new Promise((resolve,reject) => {
        req
            .get(url)                       ///模拟浏览器发送get请求
            .charset(encoding)
            .set(oSet)
            .end((err, res) => {            ///获得 response 后回调
                if(err){
                    reject(err);
                }
                resolve(res);
            });
    });
    return promise;
}

module.exports =exports =downloadAsync;
