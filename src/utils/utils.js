const isServer = typeof window == "undefined";
/**
 * 正则匹配手机号验证是否正确
 */
function phoneNoReg(phone) {
    phone = phone.toString().replace(/\s*/g, "");
    let reg = /(^1[0-9]\d{9}$)/;
    if (reg.test(phone) === false) {
        return false;
    } else {
        return true;
    }
}
/**
 * 正则用户输入是中文
 */
function userNameReg(name) {
    name = name.toString().replace(/\s*/g, "");
    let reg = /^[\u0391-\uFFE5]{2,}$/;
    if (reg.test(name) === false) {
        return false;
    } else {
        return true;
    }
}

/**
 * 设置标题
 * @param {*} title
 */
function setPageTitle(title) {
    document.title = title;
    // own.back()
}
/**
 *
 * ua 检测
 * @returns
 */
function detect() {
    if (isServer) return;

    let { userAgent, platform } = window.navigator;
    var ua = userAgent;
    var os = {},
        browser = {},
        android = ua.match(/(Android);?[\s/]+([\d.]+)?/),
        osx = !!ua.match(/\(Macintosh; Intel /),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s/]([\d.]+)/),
        win = /Win\d{2}|Windows/.test(platform),
        wp = ua.match(/Windows Phone ([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
        playbook = ua.match(/PlayBook/),
        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        firefox = ua.match(/Firefox\/([\d.]+)/),
        ie =
            ua.match(/MSIE\s([\d.]+)/) ||
            ua.match(/Trident\/[\d](?=[^?]+).*rv:([0-9.].)/),
        webview =
            !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
        safari =
            webview ||
            ua.match(
                /Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/
            );

    if (android) (os.android = true), (os.version = android[2]);
    if (iphone && !ipod) {
        os.ios = os.iphone = true;
        os.version = iphone[2].replace(/_/g, ".");
    }
    if (ipad)
        (os.ios = os.ipad = true), (os.version = ipad[2].replace(/_/g, "."));
    if (ipod) {
        os.ios = os.ipod = true;
        os.version = ipod[3] ? ipod[3].replace(/_/g, ".") : null;
    }
    if (wp) (os.wp = true), (os.version = wp[1]);
    if (webos) (os.webos = true), (os.version = webos[2]);
    if (touchpad) os.touchpad = true;
    if (blackberry) (os.blackberry = true), (os.version = blackberry[2]);
    if (bb10) (os.bb10 = true), (os.version = bb10[2]);
    if (rimtabletos) (os.rimtabletos = true), (os.version = rimtabletos[2]);
    if (playbook) browser.playbook = true;
    if (kindle) (os.kindle = true), (os.version = kindle[1]);
    if (silk) (browser.silk = true), (browser.version = silk[1]);
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    if (chrome) (browser.chrome = true), (browser.version = chrome[1]);
    if (firefox) (browser.firefox = true), (browser.version = firefox[1]);
    if (ie) (browser.ie = true), (browser.version = ie[1]);
    if (safari && (osx || os.ios || win)) {
        browser.safari = true;
        if (!os.ios) browser.version = safari[1];
    }
    if (webview) browser.webview = true;

    os.tablet = !!(
        ipad ||
        playbook ||
        (android && !ua.match(/Mobile/)) ||
        (firefox && ua.match(/Tablet/)) ||
        (ie && !ua.match(/Phone/) && ua.match(/Touch/))
    );
    os.phone = !!(
        !os.tablet &&
        !os.ipod &&
        (android ||
            iphone ||
            webos ||
            blackberry ||
            bb10 ||
            (chrome && ua.match(/Android/)) ||
            (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
            (firefox && ua.match(/Mobile/)) ||
            (ie && ua.match(/Touch/)))
    );

    browser.special = {
        safari: /Safari/gi.test(navigator.appVersion),
        qq: /MQQBrowser|CriOS/.test(ua),
        baidu: /baidubrowser/.test(ua),
        uc: /UCBrowser/.test(ua)
    };

    browser.weChat = /micromessenger/i.test(ua);

    return {
        os,
        browser
    };
}
/**
 * 发送日志
 * @param {any} query
 * @param {string} [type="qianclick"]
 */
function sendLog(query, type = "qianclick") {
    let { os } = detect();

    let hostMap = {
        qianclick: "//click.qianqian.com/v.gif",
        pvlog: "//music.taihe.com/cms/mobile.gif"
    };

    let params = function(query) {
        let rs = [];
        for (let pro in query) {
            rs.push(
                encodeURIComponent(pro) + "=" + encodeURIComponent(query[pro])
            );
        }
        return rs.join("&");
    };

    let da = +new Date() + parseInt(Math.random() * 1000);
    let img = (window["img_" + da] = new Image());
    //let img_p = window["img_p_" + da] = new Image();

    query = Object.assign(
        {
            pid: 304,
            type: "click",
            ref: "web",
            // os_v: os.version,
            v: "1.0.0",
            r: da,
            page: "home",
            page_url: location.href,
            url: location.href,
            page_refer: document.referrer || "",
            referurl: document.referrer || "",
            channel: queryObj().fr || "",
            UA: navigator.userAgent
        },
        query
    );

    img.onload = img.onerror = img.onabort = function() {
        img.onload = img.onerror = img.onabort = null;
        window["img_" + da] = null;
    };
    img.src = hostMap[type] + "?" + params(query);

    const _hmt = _hmt || [];
    if (
        type == "qianclick" &&
        _hmt &&
        typeof query.page != "undefined" &&
        typeof query.pos != "undefined" &&
        typeof query.sub != "undefined"
    ) {
        _hmt && _hmt.push(["_trackEvent", query.page, query.pos, query.sub]);
    }
}

function callNative(data, cb) {
    var body, end, iframe, reset, start, t, url;

    url = "bdapi://hybrid?info=" + JSON.stringify(data);

    iframe = document.createElement("iframe");
    body = document.body;
    t = null;
    start = "";
    end = "";
    reset = function(e, isOpened) {
        window.removeEventListener("pagehide", reset, true);
        window.removeEventListener("pageshow", reset, true);
        if (isOpened === void 0) {
            clearTimeout(t);
        }
        if (typeof cb === "function") {
            if (isOpened || isOpened === void 0) {
                cb(true);
            } else {
                cb(false);
            }
        }

        if (iframe) {
            iframe.onload = null;
            body.removeChild(iframe);
            return (iframe = null);
        }
    };
    window.addEventListener("pagehide", reset, true);
    window.addEventListener("pageshow", reset, true);
    start = +new Date();
    t = setTimeout(function() {
        return (t = setTimeout(function() {
            end = +new Date();
            if (end - start > 3000) {
                return reset(null, false);
            } else {
                return reset(null, true);
            }
        }, 2900));
    }, 100);
    iframe.style.display = "none";
    iframe.onload = reset;
    iframe.src = url;
    body.appendChild(iframe);
    return true;
}
// 时间戳
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M = (date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}
function isApp() {
    var ver = getUrlParam("ver");
    var from = getUrlParam("from");
    var fr = getUrlParam("fr");
    from = from || fr;
    if (from != null && typeof from != "undefined") {
        var source = from.toLocaleLowerCase();
        if (source == "ios" || source == "android") {
            return true;
        }
    }
    return false;
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return unescape(r[2]);
    }
    return null; //返回参数值
}
/**
 *
 * @returns
 */
function queryObj() {
    let qo = {};
    let arr = location.search.replace(/^\?/, "").split("&");
    for (let _i = 0, _len = arr.length; _i < _len; _i++) {
        let im = arr[_i];
        let kv = im.split("=");
        qo[kv[0]] = kv[1] || "";
    }
    return qo;
}
const on = (function() {
    if (!isServer && document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent("on" + event, handler);
            }
        };
    }
})();

export {
    // 手机号正则校验
    phoneNoReg,
    // 用户的姓名输入的是中文
    userNameReg,
    // 设置标题
    setPageTitle,
    // sendlog
    sendLog,
    // on绑定事件
    on,
    // 时间戳
    timestampToTime,
    // callNative native的回掉
    callNative
};
