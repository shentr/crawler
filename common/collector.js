/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */
const Promise = require('promise');
const download = require('./fun/download');

function collectAsync(url, encoding) {
    let promise = new Promise((resolve, reject) => {
        download(url, encoding)
            .then(
                (res) => {
                    //collect the urls which we need
                    resolve(res);
                },
                (err) => {
                    let errMsg = "collector 下载失败 :\n" + err;
                    reject(errMsg);
                    console.log(errMsg);
                }
            );
    });
    return promise;
}


module.exports = collectAsync;

