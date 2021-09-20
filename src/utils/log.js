/**
 *  点击日志指令
 * @author  yinshikai
 * @create     2018-4-8
 */

import { on, sendLog } from "./utils";

export default {
    install(Vue) {
        if (Vue.prototype.$isServer) return;
        Vue.directive("log", this.log);
        Vue.directive("pvlog", this.pvlog);
    },

    log: {
        bind(el, binding) {
            on(el, "click", () => {
                sendLog(binding.value);
            });
        }
    },

    pvlog: {
        bind(el, binding) {
            sendLog(binding.value, "pvlog");
        }
    }
};
