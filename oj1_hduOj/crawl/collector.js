/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const cheerio = require('cheerio');
const querystring = require('querystring');
const config = require('./../config.json');
const collect = require('../../common/collector');

let urls = config.urls,
    formData = config.formData,
    qsUser = querystring.stringify({
        user: formData.username
    });

let collectUrl = urls.hostname + urls.userStatus + "?" +qsUser,
    encoding = 'gbk';

let qUrls = new Array();                        //collect下载队列

function collectAsync() {
    let promise, html, links;
    promise = collect(collectUrl, (res, resolve) => {
        html = res.text;
        let $ = cheerio.load(html);
        //links = $('table p a');
        //console.log(links.text())
    }, encoding);
    return promise;
}

collectAsync()
module.exports = collectAsync;