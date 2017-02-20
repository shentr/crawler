/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const cheerio = require('cheerio');
const querystring = require('querystring');
const config = require('./../config.json');
const collect = require('../../common/collector');
const Promise = require('promise');
//const qUrls = require('./qUrls');

let urls = config.urls,
    formData = config.formData,
    username = formData.username,
    qsUser = querystring.encode({
        user: username
    });

let collectUrl = urls.hostname + urls.userStatus + "?" +qsUser,
    encoding = 'gbk';

let qUrls = new Array(),                       //collect下载队列
    promise,
    promiseTemp = new Array(),
    aPLength;

 function collectAsync() {
     let html, link, pid, queryString, sP , aP,
    promise = collect(collectUrl, (res) => {
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
            //console.log(link);
            promiseTemp[i] = collect(link, (res) => {
                let rid,
                    start = 4,
                    offset = 0,     //选第几个
                    length;          //全部个数

                html = res.text;
                //console.log(html)
                let $ = cheerio.load(html);
                length = $('table').children('tr').length - 11;
                length = length > 0 ? length : 1;
                for(let j = 0; j < length; j++){
                    rid = $('table').children('tr').eq( start + j ).children('td').eq(0).html();
                    queryString = querystring.encode({
                        rid: rid
                    });
                    link = urls.hostname + urls.viewcode + "?" + queryString;
                    qUrls.push(link);
                    //console.log(link);
                }
            }, encoding);
        }
    }, encoding);
    return promise;
};

 function getQUrls() {
     promise = collectAsync().then(() => {
         let aPromiseTemp = new Array();
         for(i = 0;i <aPLength; i++){
             aPromiseTemp.push(promiseTemp[i]);
         }
          Promise.all(aPromiseTemp)
             .then(() => {
                 //console.log(qUrls);
                 //return qUrls;
             });
     });
     return promise;
 }

//collectAsync();
console.log(getQUrls())

module.exports = getQUrls;





/*
|collectAsync
|
---------
        |promise
        |
        ---------   promiseTemp1
        |       |
        |-------|-----|   promiseTemp2
        |-------|-----|----|  promiseTemp3
        |       |     |    |  ...
                |     |    |
                      |    |
*/
