/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const download = require('./fun/download');

function collectAsync(url, onSuccess, encoding) {
    let promise;
    promise = download(url, encoding)
        .then(
            (res) => {
                // onSuccess: collect the urls which we need
                onSuccess(res);
            },
            (err) => {
                console.log("collector 下载失败 :\n" + err);
            }
         );
    return promise;
}


module.exports = collectAsync;

