/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */
const Promise = require('promise');
const postForm = require('./fun/postForm');

function collectAsync(url ,encoding ,oFormData,oSet) {
    let promise = new Promise((resolve, reject) => {
        postForm(url, oFormData, oSet, encoding)
            .then(
                (oRes) => {
                    //collect the urls which we need
                    resolve(oRes);
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

