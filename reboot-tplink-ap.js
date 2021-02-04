var adminurl = process.env.portal;
var admin = process.env.admin;
var password = process.env.password;

// --------------------------------------------
var md5 = require('md5-node');
var request = require('request');

v = {
    SYN: 0,
    ASYNC: 1,
    TDDP_INSTRUCT: 0,
    TDDP_WRITE: 1,
    TDDP_READ: 2,
    TDDP_UPLOAD: 3,
    TDDP_DOWNLOAD: 4,
    TDDP_RESET: 5,
    TDDP_REBOOT: 6,
    TDDP_AUTH: 7,
    TDDP_GETPEERMAC: 8,
    TDDP_CONFIG: 9,
    TDDP_CHGPWD: 10,
    TDDP_LOGOUT: 11,
    TDDP_CONFLICT: 12,
    TDDP_FACTINIT: 13,
    TDDP_VERSION: 14,
    EXTEND_INFO: 16
};

function securityEncode(e, t, i) {
    for (var n = "", a = 187, s = 187, d = e.length, l = t.length, o = Math.max(d, l), r = i.length, c = 0; c < o; c++)
        a = 187,
        s = 187,
        c >= d ? s = t.charCodeAt(c) : c >= l ? a = e.charCodeAt(c) : (a = e.charCodeAt(c),
        s = t.charCodeAt(c)),
        n += i.charAt((a ^ s) % r);
    return n
}

function orgAuthPwd(e) {
    return securityEncode(e, "RDpbLfCPsJZ7fiv", "yLwVl0zKqws7LgKPRQ84Mdt708T1qQ3Ha7xv3H7NyU84p21BriUWBU43odz3iP4rBL3cD02KZciXTysVXiV8ngg6vL48rPJyAUw0HurW20xqxv9aYb4M9wK1Ae0wlro510qXeU07kV57fQMc8L6aLgMLwygtc0F10a0Dg70TOoouyFhdysuRMO51yY5ZlOZZLEal1h0t9YQW0Ko7oBwmCAHoic4HYbUyVeU3sfQ1xtXcPcf1aT303wAQhv66qzW")
}

function splitResponse(e) {
    var t = /^(\d+)[\r\n]{1,2}([\d\D]*)$/.exec(e);
    return t ? {
        errorCode: parseInt(t[1]),
        data: t[2]
    } : {
        errorCode: 0,
        data: e
    }
}

function authDataDecode(e) {
    var t = e.split(/[\r\n]+/);
    return {
        code: parseInt(t[0]),
        errorTimes: parseInt(t[1]),
        pwd: t[2],
        dic: t[3]
    }
}

function sendCmd(cmdid, token, callback=function(){}){
    var url = adminurl + "/?code=" + cmdid + "&async=1&id=" + token;
    console.log(url);
    request.post({url: url}, callback);
}

var authhash = md5(admin + ";" + orgAuthPwd(password));

sendCmd(v.TDDP_INSTRUCT, "", function(error, response, body) {
    var rawAuthData = splitResponse(body);
    var authData = authDataDecode(rawAuthData.data);
    var token = securityEncode(authData.pwd, authhash, authData.dic);
    console.log("token: " + token);

    sendCmd(v.TDDP_AUTH, token, function(error, response, body){
        console.log(body);
        sendCmd(v.TDDP_REBOOT, token, function(error, response, body){
            console.log(body);
        });
    });
    
})