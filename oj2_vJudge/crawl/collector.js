/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const Promise = require('promise');
const cheerio = require('cheerio');
const querystring = require('querystring');
const config = require('./../config.json');
const collect = require('../../common/collector');


let urls = config.urls,
    formData = config.formData,
    username = formData.username,
    qsUser = querystring.encode({
        user: username
    });

let collectUrl = urls.hostname + urls.userStatus + "?" +qsUser,
    encoding = 'gbk';

let qPids = [],                        //题号pid队列
    qUrls = [];                      //collect下载队列


function collectPidUrls() {
     let html, link, pid, queryString, sP , aP, aPLength,
         promise = new Promise((resolve, reject) => {
             collect(collectUrl,  encoding)
                 .then((res) => {
                     html = res.text;
                     let $ = cheerio.load(html);
                     sP = $('table table p').eq(2).text();
                     aP = sP.split(';');
                     aPLength = aP.length - 1;
                     for(let i = 0; i < aPLength; i++){
                         pid = aP[i].slice(2,6);
                         queryString = querystring.encode({
                             user: username,
                             pid: pid,
                             status: 5
                         });                                      //status=5 means Accept
                         link = urls.hostname + urls.status + '?' + queryString;
                         qPids.push(link);
                     }
                     resolve(qPids);
                 });
         });
    return promise;
}


(function collectRidUrls() {
    let pid, link, queryString, rid, html,
        start = 4,
        offset = 0,     //pidUrl中选第几个rid
        length;          //pidUrl中rid个数

    collectPidUrls()
        .then((qPids) => {
            for(pid = 0; pid < qPids.length; pid++){
                collect(qPids[pid], encoding)
                    .then((res) => {
                        html = res.text;
                        let $ = cheerio.load(html);
                        length = $('table').children('tr').length - 11;
                        length = length >= 0 ? length : 1;
                        for (let i = 0; i < length; i++) {
                            rid = $('table').children('tr').eq(start + i).children('td').eq(0).html();
                            queryString = querystring.encode({
                                rid: rid
                            });
                            link = urls.hostname + urls.viewcode + "?" + queryString;
                            qUrls.push(link);
                        }
                    });
            }
        });
})();


module.exports = qUrls;


