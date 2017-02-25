/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/25.
 */

function getOjUrl(oj, pid) {
    oj = oj.toLowerCase();
    let mapUrl = {
        'hdu': 'http://acm.hdu.edu.cn/showproblem.php?pid=',
        'poj':'http://poj.org/problem?id=',
        'zoj' : 'http://acm.zju.edu.cn/onlinejudge/showProblem.do?problemCode=',
        'ural' : 'http://acm.timus.ru/problem.aspx?space='+ pid/1000 + '&num=',
        'gmy' : 'http://codeforces.com/gym/',
        'codeforces' : 'http://codeforces.com/problemset/problem/',
        'acdream' : 'http://acdream.info/problem?pid=',
        'uva' : 'https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=',
        'spoj' : 'http://www.spoj.com/problems/',
        'lightoj' : 'http://lightoj.com/login_main.php?url=volume_showproblem.php?problem=',
        'uvalive' : 'https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=',
        'uestc' : 'http://acm.uestc.edu.cn/#/problem/show/',
        'fzu' : 'http://acm.fzu.edu.cn/problem.php?pid=',
    };

    return mapUrl[oj] + pid;
}

module.exports = getOjUrl;