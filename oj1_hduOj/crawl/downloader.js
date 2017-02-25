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
    timeS = 30,                      //队列空闲等待时间(s)
    dir = '../data/hduOj/',
    code = {},
    rLanguage = /Language : (.+?)&/
    ;

let promiseTemp = [];
let urls = config.urls;

function listen(cookie) {
    let count = 0,
        i = 0,
        info,                                           //代码的信息
        html;
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
                        html = res.text;
                        //console.log(html);
                        let $ = cherrio.load(html, {decodeEntities: false});    ///不转义为实体
                        info = $('#usercode').prev().html();
                        code.language = info.toString().match(rLanguage)[1];
                        info = cherrio.load(info, {decodeEntities: false});
                        code.code = $('#usercode').html();
                        code.title = info('a').eq(0).html();
                        code.url = urls.hostname + urls.showproblem + '?pid=' + code.title.match(/.{4}/);
                        //console.log(code.language);
                        code.id ++;
                        code.path = dir + code.title + '_' + code.id + '.' + ((code.language === 'C++' || code.language ==='G++' || code.language ==='GCC' || code.language ==='C')  ? 'cpp' : (code.language === 'Java' ? 'java' : 'txt'));
                        code.code = '// ' + code.title + '\n' + '//' + code.url + '\n\n\n' + code.code;
                        toLocal(code.code ,code.path);
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
            console.log("HDU登陆已经完成，正在拼了命的收集题目...");
            dir = config.toLocalPath.length > 0 ? config.toLocalPath : dir;
            return listen(oRes.oSet.Cookie);
        });
}


module.exports = downloadListener;

