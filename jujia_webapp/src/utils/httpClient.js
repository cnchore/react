import request from 'superagent';
import jsonp from 'superagent-jsonp';
import Cookies from "js-cookie";
import getUserAgent from './GetUserAgent';

//const LOCAL_SERVER = 'http://192.168.1.60:8099';/*http://test.jujia.ctauto.cn/api/ */
//const LOCAL_SERVER = 'http://192.168.1.199:8080';/*http://test.jujia.ctauto.cn/api/ */
const LOCAL_SERVER = 'http://test.jujia.ctauto.cn';
//const LOCAL_SERVER = 'http://jujia.ctauto.cn';
const DEV_SERVER = 'http://119.29.19.250:3000/';
const PRO_SERVER = 'http://119.29.55.113:3000/';

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}
const HttpClient = {

    get: (path, query) => new Promise((resolve, reject) => {
        var req = request
            .get(getUrl(path))
            //.accept('application/jsonp')
            .accept('application/json')
            //.use(jsonp)
           // .auth('tobi', 'learnboost')
            .query(query)
            .withCredentials()
            .end((err, res) => {
                if(res.unauthorized && Cookies.get("openid")){
                    // set the otherid cookie expires then we can login agion
                    let browser = getUserAgent();
                    if (browser.isiOS) {
                        Cookies.set("reload",true);
                    }

                    window.location = LOCAL_SERVER +  "/api/bas/user/loginforwx?openid="+Cookies.get("openid")+"&curl=" + window.encodeURIComponent(window.location.href);
                    return;
                }
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    }),

    put: (path, query, payload) => new Promise((resolve, reject) => {
        request
            .put(getUrl(path))
            .query(query)
            .send(payload)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    }),

    post: (path, query, payload) => new Promise((resolve, reject) => {
        request
            .post(getUrl(path))
            //.accept('application/json')
            .withCredentials()
            .query(query)
            .send(payload)
            .withCredentials()
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    }),

    delete: (path, query) => new Promise((resolve, reject) => {
        request
            .del(getUrl(path))
            .query(query)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    })

};

export default HttpClient;
