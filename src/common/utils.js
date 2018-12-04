

import md5 from "js-md5";

export const randomDateNow = function (frontLen) {
    frontLen = frontLen || 0;
    return 9 + Math.random().toString().substr(3, frontLen) + Date.now();
}

export const getSignData = function (params, singKey) {
    let signData = "";
    if (params && Object.prototype.toString.call(params) === "[object Object]") {
        try {
            //如果参数的值为空不参与签名
            let newParmas = {};
            for (let key in params) {
                if (params[key] !== undefined && params[key] !== "" && params[key] !== null)
                    newParmas[key] = params[key];
            }
            // console.info("参与签名的对象-------", newParmas);

            //对象的KEY排序 [a,b,c] => a=1&b=2&c=1
            let newKeys = Object.keys(newParmas).sort();
            let newParmas2 = {};
            let strUrl = "";
            for (let i = 0; i < newKeys.length; i++) {
                newParmas2[newKeys[i]] = newParmas[newKeys[i]];
                strUrl += `${newKeys[i]}=${newParmas[newKeys[i]]}&`;
            }
            // console.info("排序后的对象-------", newParmas2);

            //拼接key
            singKey ? (strUrl += `key=${singKey}`) : (strUrl = strUrl.substring(strUrl.length - 1, 0));
            console.info("排序后的strUrl-------", strUrl);

            //MD5
            signData = md5(strUrl).toUpperCase();
            // console.log("return signData:", signData)

        } catch (err) {
            console.log(err);
        }
    };

    return signData;
}

/**
 * 检测是微信还是支付宝环境
 */
export const isWeixinOrAlipay = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    //判断是不是微信
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return "WeiXIN";
    }
    //判断是不是支付宝
    if (ua.match(/AlipayClient/i) == 'alipayclient') {
        return "Alipay";
    }
    return false;
}

/**
 * 20180417161121 转 2018-04-17 16:11:21
 * @param {string} dateTimeStr 20180417161121
 */
export const formatDateStr = function (dateTimeStr) {
    dateTimeStr += "";
    return dateTimeStr.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3 $4:$5:$6");
}

/**
 * 
 * 时间格式化，示例：formatDate(date, 'yyyy-MM-dd hh:mm');
 * @param {时间} date 
 * @param {格式化} fmt 
 */
export const formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
    function padLeftZero(str) {
        return ('00' + str).substr(str.length);
    }
}