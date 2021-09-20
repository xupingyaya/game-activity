/**
 * 插件注册管理
 * @author wendongliang
 * @time 2018-12-27
 */
import logDirective from "./log"
import { sendLog } from "./utils"

const install = function(Vue, opts = {}) {
    if (install.installed) return;

    if(!Vue.prototype.$isServer) {
        Vue.prototype.$sendLog = sendLog
    }
    Vue.use(logDirective)
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    install
};
