/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/21.
 */

const fs = require('fs');

function saveToLocal(code, localPath, errMsg) {
    fs.writeFile(localPath, code, (err) => {
        if (err)
            console.log( (errMsg ? errMsg : "文件保存错误: \n") + err);
        console.log("File Saved to" + localPath);
    }) ;
}

module.exports = saveToLocal;