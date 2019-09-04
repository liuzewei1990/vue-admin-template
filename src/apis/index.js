
import http from "./http";
import base from "./base";

console.log(base)

// export const onlineQuickPay = (params) => http.postJson(oaIp, "/converge/online/quick/pay", params);
// export const onlineQuickPay = (params) => http.postJson(proxyIp, "", params, { x_real_ip: `${oaIp}/converge/online/quick/pay` });

export const login = (params) => http.post(base.oaIp, "/login", params);
export const getMenu = (params) => http.get(base.oaIp, "/index/data", params);

/* 菜单管理 */
export const getMenuTrees = (params) => http.get(base.oaIp, "/menu/tree", params);
export const dropMenuTree = (params) => http.post(base.oaIp, "/menu/drag", params);
export const patchAddMenuTree = (params) => http.post(base.oaIp, "/menu", params);
export const patchEditMenuTree = (params) => http.patch(base.oaIp, "/menu", params);
export const deleteMenuTree = (menuCode = "") => http.delete(base.oaIp, "/menu/delete/" + menuCode);
export const getMenuFunctionPage = (params) => http.get(base.oaIp, "/menu/function/page", params);
export const postAddMenuFunction = (params) => http.post(base.oaIp, "/menu/function", params);
export const patchEditMenuFunction = (params) => http.patch(base.oaIp, "/menu/function", params);
export const deleteMenuFunction = (functionCode = "") => http.delete(base.oaIp, "/menu/function/delete/" + functionCode);

/* 用户管理 */
export const getUserManages = (params) => http.get(base.oaIp, "/user/page", params);
export const postAddUser = (params) => http.post(base.oaIp, "/user", params);
export const patchEditUser = (params) => http.patch(base.oaIp, "/user", params);
export const getRolesTree = (params) => http.get(base.oaIp, "/user/role/tree", params);
export const patchConfigRole = (params) => http.patch(base.oaIp, "/user/role", params);
export const deleteUserManage = (username = "") => http.delete(base.oaIp, "/user/delete/" + username);

/* 角色管理 */
export const getRoleManages = (params) => http.get(base.oaIp, "/role/page", params);
export const postAddRole = (params) => http.post(base.oaIp, "/role", params);
export const patchEditRole = (params) => http.patch(base.oaIp, "/role", params);
export const deleteRole = (roleCode = "") => http.delete(base.oaIp, "/role/delete/" + roleCode);
export const getRolesTreeConfig = (params) => http.get(base.oaIp, "/role/privilege/tree", params);
export const patchRolesTreeSave = (params) => http.patch(base.oaIp, "/role/privilege", params);