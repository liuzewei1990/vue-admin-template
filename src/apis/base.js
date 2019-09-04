/*
 * @Author: mikey.zhaopeng
 * @Date: 2018-12-18 13:45:41
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-18 15:18:26
 */

const getIp = () => {
      switch (process.env.VUE_APP_CURRENTMODE) {
            case "development":
                  // 开发环境使用了webpack跨域代理
                  return "";
            case "productionTest":

            case "production":
      }
};

export default {
      oaIp: getIp()
};
