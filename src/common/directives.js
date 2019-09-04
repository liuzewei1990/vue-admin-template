
let directive = {};
directive.install = function (Vue, options) {

    Vue.directive('to-focus', {
        inserted: function (el, options, vNode) {
            // 聚焦元素
            let input = el.querySelector("input");
            input.focus();
        }
    })

    // 修饰elementUI 的input输入框默认自带margin-bottom的值
    Vue.directive('mar-b', {
        inserted: function (el, options, vNode) {
            el.style.marginBottom=`${options.value}px`;
        }
    })

}
export default directive;