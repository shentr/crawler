/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/19.
 */

const config = require('./../config.json');
const collect = require('../../common/collector');


let urls = config.urls,
    formData = config.formData,
    un = formData.username,
    drawsTotal = config.drawsTotal;

let collectUrl = urls.http + urls.hostname + urls.data,    ///必须加https://
    encoding = 'utf8';

let qUrls = [];                      //collect下载队列


(function collectRidUrls() {
    let link, json, data, i,
    oFormData = {
        draw: 0,            //页数
        start:0,            //开始条数 = (draw-1) * length
        length:20,          //每页条数
        un: un,
        OJId:'All',
        probNum:'',
        res:1,              //状态 1 accept
        language:'',
        onlyFollowee:false,
        orderBy:'run_id'
    };

    while(drawsTotal --){
        oFormData.draw ++;
        oFormData.start = (oFormData.draw - 1) * oFormData.length;
        collect(collectUrl, encoding, oFormData)
            .then((oRes) => {
                json = JSON.parse(oRes.res.text);
                data = json.data;
                for(i = 0;i < data.length; i++){
                    link = urls.http + urls.hostname + urls.solution + data[i].runId;
                    qUrls.push(link);
                }
            });
    }
})();

module.exports = qUrls;


