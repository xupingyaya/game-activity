/**
 * 缓存存储相关操作
 */

let keyMap = {}
let skeyMap = {}
try {
    var localStorage = window.localStorage
    var sessionStorage = window.sessionStorage
} catch (e) {
    alert("请关闭隐身模式，不能阻止cookie哦~")
}
/**
 * 判断是否是Object
 * @param obj
 * @returns {boolean}
 */
let isPlainObject = function (obj) {
    return Object.prototype.toString.apply(obj) === "[object Object]" ||
    Object.prototype.toString.apply(obj) === "[object Array]"
}

/**
 * localStorage
 */
let lstorage = {
    /**
     * 存储数据
     * @param key
     * @param value
     */
    set (key, value) {
        var val = isPlainObject(value) ? JSON.stringify(value) : value
        keyMap[key] = val
        localStorage.setItem(key, val)
    },
    /**
     * 解析数据
     * @param key
     * @returns {*}
     */
    get (key) {
        var val = localStorage.getItem(key)
        try {
            return JSON.parse(val)
        } catch (e) {
            return val
        }
    },
    /**
     * 移除数据
     * @param key
     */
    remove (key) {
        delete keyMap[key]
        localStorage.removeItem(key)
    }
}

/**
 * sessionStorage
 */
let sstorage = {
    /**
     * 存储数据
     * @param key
     * @param value
     */
    set (key, value) {
        var val = isPlainObject(value) ? JSON.stringify(value) : value
        skeyMap[key] = val
        sessionStorage.setItem(key, val)
    },
    /**
     * 解析数据
     * @param key
     * @returns {*}
     */
    get (key) {
        var val = sessionStorage.getItem(key)
        try {
            return JSON.parse(val)
        } catch (e) {
            return val
        }
    },
    /**
     * 移除数据
     * @param key
     */
    remove (key) {
        delete skeyMap[key]
        sessionStorage.removeItem(key)
    }
}

export {
    lstorage,
    sstorage
}
