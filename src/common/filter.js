import { formatDateStr } from "@src/common/utils";
let filters = new Object();
filters.install = function (Vue, options) {
    Vue.filter('formatDateStr', function (value) {
        return formatDateStr(value);
    })
}
export default filters;