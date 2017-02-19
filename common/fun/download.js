/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const Promise = require('promise');
const charset = require('superagent-charset');
const req = charset(require('superagent'));

/*用promise控制流程，异步获取cookie*/
function download(url, onSuccess, errMsg, encoding) {
    let promise = new Promise((resolve,reject) => {
        req
            .get(url)                       ///模拟浏览器发送get请求
            .charset(encoding)
            .end((err, res) => {            ///获得 response 后回调
                if(err){
                    reject(err);
                    console.log(errMsg + " :\n" + err);
                    return;
                }
                onSuccess(res, resolve);
            });
    });
    return promise;
}

module.exports =exports =download;