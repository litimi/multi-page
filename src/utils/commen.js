// import wx from "weixin-js-sdk";
const dev_en = false;
const baseapi= dev_en ? "https://www.tongpumed.com/prod-api" : "https://tpuat.tongpumed.com/prod-api";
const baseUrl= dev_en ? "https://tprsc.tongpumed.com/tpapprsc/" : "https://uatrsc.tongpumed.com/tpapprsc/";

const imageUrl = `${baseUrl}library/image/`

// let wxInfo = {
//     debug: false,
//     appId: 'wxbe7d64543f1b93f7',
//     timestamp: '',
//     nonceStr: '',
//     signature: '',
//     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage',
//         'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
//     ],
// }

const getUrlParams = () => {
    const url = window.location.href
    let urlStr = url && url.split('?')[1]
    const urlSearchParams = new URLSearchParams(urlStr)
    const result = Object.fromEntries(urlSearchParams.entries())
    return result
}

const isIosPlatement = () => {
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if (isiOS) {
        return "ios"
    }
    if (isAndroid) {
        return "android"
    }
}

const platement = () => {
    if ((window.webkit && window.webkit.messageHandlers.goLiving) || window.android) {
        return false
    } else {
        return true
    }
}


export {
    getUrlParams, isIosPlatement, imageUrl, platement, baseapi, baseUrl
}
