
import http from "./http";
import { oaIp, proxyIp } from "./base";


// export const onlineQuickPay = (params) => http.postJson(oaIp, "/converge/online/quick/pay", params);
export const onlineQuickPay = (params) => http.postJson(proxyIp, "", params, { x_real_ip: `${oaIp}/converge/online/quick/pay` });

export const login = (params) => http.post(oaIp, "/login", params);

