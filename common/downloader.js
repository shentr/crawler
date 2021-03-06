/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const download = require('./fun/download');

function downloadAsync(url, onSuccess, encoding) {
    let promise;
    promise = download(url, (res, resolve) => {
            //collect the urls which we need
            onSuccess(res, resolve);
        },
        "downloader 下载失败", encoding
    );
    return promise;
}


module.exports = downloadAsync;