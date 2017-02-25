/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/21.
 */

const fs = require('fs');
const he = require('he');

function saveToLocal(code, localPath, errMsg, mustSave = true) {
    code = he.decode(code);                     // 实体转义
    fs.writeFile(localPath, code, (err) => {
        if (err){
            let cnt = 0;
            if(mustSave && cnt <10 ){
                saveToLocal(code, localPath, errMsg ,mustSave);
                cnt ++;
                if(cnt >= 10) console.log((errMsg ? errMsg : "文件保存错误: \n") + err)
            }
            else
                console.log( (errMsg ? errMsg : "文件保存错误: \n") + err);
        }
        else
            console.log("File Saved to" + localPath +"   SUCCESS! ^v^");
    }) ;
}

module.exports = saveToLocal;