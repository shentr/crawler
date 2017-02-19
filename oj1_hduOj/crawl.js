/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const login = require('./crawl/login');
const collect = require('./crawl/collector');
const download = require('./crawl/downloader');

login()
    .collect()
    .download();
