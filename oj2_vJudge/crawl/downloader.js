/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/18.
 */

const qUrls = require('./collector');
const login = require('./login');
const config = require('../config');
const download = require('../../common/fun/download');
const toLocal = require('../../common/toLoal');
const getOjUrl = require('../../common/getOjUrl');


let
    encoding = 'utf8',
    timeS = 30,                      //队列空闲等待时间(s)
    dir = '../data/vJudge/',
    code = {}
    ;

let promiseTemp = [];
let urls = config.urls;

function listen(cookie) {
    let count = 0,
        i = 0,
        info,                                           //代码的信息
        data;
        code.id = 0;
        let interval = setInterval(() => {
            count++ ;
            while(qUrls && qUrls.length > 0){
                count = 0;
                let url = qUrls.pop();
                //console.log(url);
                let set = {
                    'Cookie': cookie
                };
                promiseTemp[i] = download(url, encoding ,set)
                    .then((res) => {
                        data = JSON.parse(res.text);
                        //console.log(data);
                        code.code = data.code;
                        code.languageCanonical = data.languageCanonical.toLowerCase();
                        code.oj = data.oj;
                        code.probNum = data.probNum;
                        code.title = code.oj + code.probNum;
                        code.url =getOjUrl(code.oj, code.probNum);
                        //console.log(code.languageCanonical);
                        code.id ++;
                        code.path = dir + code.title + '_' + code.id + '.' +  code.languageCanonical;
                        code.code = '// ' + code.title + '\n' + '//' + code.url + '\n\n\n' + code.code;
                        toLocal(code.code ,code.path);
                    });
                i++;
            }
            if(count > timeS) {
                clearInterval(interval);
                console.log('VJudge所选代码已经下载到' + dir);
            }
        },1000);
}

function downloadListener() {
    login()
        .then((oRes) => {
            console.log("VJudge登陆等初始化已经完成，正在拼了命的下载中...");
            dir = config.toLocalPath.length > 0 ? config.toLocalPath : dir;
            return listen(oRes.oSet.Cookie);
        });
}

module.exports = downloadListener;

