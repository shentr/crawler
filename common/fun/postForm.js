/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/21.
 */

const Promise = require('promise');
const req=require('superagent');
const charset = require('superagent-charset');
charset(req);


/*
 * @return: promise   oRes{ res oSet}
 * @parameter:(url, oFormData, oSet)
 * post提交Form信息
 * */
function postFormAsync(url, oFormData = {}, oSet = {}, encoding = 'uft8') {
    let promise = new Promise((resolve,reject) => {
        req.post(url)
            .charset(encoding)
            .set(oSet)
            .type('form')
            .send(oFormData)
            //.redirects(0)                           ///禁止重定向
            .end((err, res) => {
                if(err){
                    let errMsg = "post失败: \n"+err;
                    reject(errMsg);
                    console.log(errMsg);
                }
                let oRes = {
                    res: res,
                    oSet: oSet
                };
                resolve(oRes);

            });
    });
    return promise;
}

module.exports = postFormAsync;