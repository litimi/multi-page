import request from "./request";

// 系统登陆
const loginSystem = (params) => {
    return request({
        url: "/nlg/webUserLogin",
        method: "post",
        data: params
    })
}

const getCode = (params) => {
    return request({
        url: "/nlg/mobSendAli",
        method: "post",
        data: params
    })
}

// 获取直播数据详情
const getH5Onlinelive = (params) => {
    return request({
        url: "/h5get/getH5Onlinelive",
        method: "post",
        data: params
    })
}

// 获取服务器时间用于倒计时
const getServerDate = () => {
    return request({
        url: "/mst/getServerDate",
        method: "get",
    })
}

// 获取微信签名
const getWenxinInfo = (params) => {
    return request({
        url: "/h5get/getWenxinInfo",
        method: "post",
        data: params
    })
}

export {
    loginSystem, getCode, getH5Onlinelive, getServerDate, getWenxinInfo
}
