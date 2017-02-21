/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/18.
 */

const cherrio = require('cheerio');
const qUrls = require('./collector');
const login = require('./login');
const config = require('../config');
const download = require('../../common/fun/download');
const toLocal = require('../../common/toLoal');


let
    encoding = 'gbk',
    timeS = 15,                      //队列空闲等待时间(s)
    dir;

let promiseTemp = [];

function listen(cookie) {
    let count = 0,
        i = 0,
        html;
        let interval = setInterval(() => {
            count++ ;
            while(qUrls && qUrls.length > 0){
                count = 0;
                let url = qUrls.pop();
                console.log(url);
                let set = {
                    'Cookie': cookie
                };
                promiseTemp[i] = download(url, encoding ,set)
                    .then((res) => {
                        html = res.text;
                        let $ = cherrio.load(html);
                        //$('pre');
                        let code = $('#usercode').html();
                        toLocal(code);
                    });
                i++;
            }
            if(count > timeS) {
                clearInterval(interval);
                console.log('HDU 所选代码已经下载到' + dir);
            }
        },1000);
}

function downloadListener() {
    login()
        .then((oRes) => {
            //console.log(oRes.oSet.Cookie);
            return listen(oRes.oSet.Cookie);
        });
}

downloadListener();

//module.exports = downloadAsync;

