/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/2/20.
 */

/*function qUrls() {
    let qUrls = [1,3,5];
    return (get, setFn) => {
        if(setFn && typeof(setFn) === 'function')
            qUrls = setFn(qUrls);
        if(get === true){
            return qUrls;
        }
    }
}*/
let qUrls = new Array();

module.exports = qUrls;