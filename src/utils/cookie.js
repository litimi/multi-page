import JsCookie from "js-cookie";

// 存储
const setCookies = (key, value) => {
    if (!key) {
        return false
    }
    JsCookie.set(key, value);
}


// 获取
const getCookies = (key) => {
    if (key) {
        if (!key.trim().length) {
            return false
        } else {
            return  JsCookie.get(key);
        }
    } else {
        return  JsCookie.get();
    }
}

export { setCookies, getCookies }
