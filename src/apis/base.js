
export const oaIp = (() => {
    switch (process.env.NODE_ENV) {
        case "development":
            return "http://192.168.1.128:8099/tm";
        case "productionTest":
            return location.protocol + "//tm.yeepiao.com/";
        case "production":
            return location.protocol + "//m.yeepiao.com/";
    }
})()

