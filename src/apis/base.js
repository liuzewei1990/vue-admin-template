
export const oaIp = (() => {
    switch (process.env.VUE_APP_CURRENTMODE) {
        case "development":
            return "http://gate.qtopay.cn";
        case "productionTest":
            return "http://gate.qtopay.cn";
            return "http://118.190.149.38:8088";
        case "production":
            return "http://gate.qtopay.cn";
    }
})()


export const proxyIp = "http://118.190.113.193:8888/http/proxy";
