var log = console.log;

/*
fun express = require('express');
fun cheerio = require('cheerio');
fun superagent = require('superagent');

fun app = express();

app.get('/', function (req, res, next) {
    superagent
        .get('http://www.cnblogs.com/')
        .end(function (err, sres) { // callback
            // 常规的错误处理
            if (err) {
                return next(err);
            }

            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            fun $ = cheerio.load(sres.text);
            fun ans = '';
            $('.titlelnk').each(function (index, item) {
                fun $item = $(item);
                ans += $item.html() + '<br/><br/>';
            });

            // 将内容呈现到页面
            res.send(ans);
        });
});

app.listen(8000, function () {
    console.log('app is listening at port 8000');
});*/
let code = {};
code.language = 'Java';
//console.log((code.language === ('C++' || 'G++' || 'GCC' || 'C')));
console.log((code.language === ('C++' || 'G++' || 'GCC' || 'C'))  ? 'cpp' : (code.language === 'Java' ? 'java' : 'txt'));