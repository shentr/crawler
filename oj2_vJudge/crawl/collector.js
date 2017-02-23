/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const Promise = require('promise');
const cheerio = require('cheerio');
const config = require('./../config.json');
const collect = require('../../common/collector');


let urls = config.urls,
    formData = config.formData,
    un = formData.username;

let collectUrl = urls.hostname + urls.status,
    encoding = 'utf8';

let qUrls = [];                      //collect下载队列


(function collectRidUrls() {
    let link, html,
        promise = new Promise((resolve, reject) => {
            formData = {
                start: 0,
                length: 20,
                un: un,
                OJId: 'All',
                res: 1,
                onlyFollowee: false,
                orderBy: 'run_id'
            };
            collect(collectUrl, encoding, formData)
                .then((oRes) => {
                    html = oRes.res.text;
                    console.log(collectUrl)
                    let $ = cheerio.load(html);
                });
        });
})();

module.exports = qUrls;


