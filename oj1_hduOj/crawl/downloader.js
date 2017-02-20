/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/18.
 */

const collect = require('./collector');
const login = require('./login');
const download = require('../../common/downloader');

let qUrls = collect();
console.log(qUrls);


/*function downloadAsync() {
    let qUrl = [];
    qUrl.push('acm.hdu.edu.cn/status.php?user=shentr&pid=1000&status=5');
    login()
        .then((cookie) => {
            let url = qUrl.pop();
            return download(url,(res, resolve) => {
                console.log(res.text);
                resolve(cookie);
            },'gbk');
        });
}

downloadAsync();*/

//module.exports = downloadAsync;

