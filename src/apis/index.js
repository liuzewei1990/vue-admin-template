
import http from "./http";
import base from "./base";
// import orgCodeHandle from "./orgcode";
// console.log(orgCodeHandle);

/**
 * 获取验证码
 * @param {路径手机号} phone
 * @param {验证码类型} params.type  regist | login
 */
// 用户登录
const getCustomerZf = () => { return (params) => { return http.get(base.oaIpZf, "/customerAdmin/customerInfo", params) } }
const LoginZf = () => { return (params) => { return http.post(base.oaIpZf, "/customerAdmin/login", params) } }
const resetPwdZf = () => { return (params) => { return http.post(base.oaIpZf, "/customerAdmin/resetPwd", params) } }
const getHomeNoticeZf = () => { return (params) => { return http.get(base.oaIpZf, "/customerAdmin/notice", params) } }
const getHomenoticedetailZf = () => { return (params) => { return http.get(base.oaIpZf, "/customerAdmin/noticedetail", params) } }
const Login = () => { return (params) => { return http.post(base.oaIp, "/login", params) } }
const Logout = () => { return (params) => { return http.get(base.oaIp, "/logout", params) } }

// 菜单列表
const MenuGet = () => { return (params) => { return http.get(base.oaIp, "/index/data", params) } }

// 用户信息
const UserGet = () => { return (params) => { return http.get(base.oaIp, "/user/privilege", params) } }
const changeBillOpenCheck = () => { return (params) => { return http.get(base.oaIp, "/changeBill/productEdit", params) } }
// 管理密码修改
const PasswordUpdate = () => { return (params) => { return http.patch(base.oaIp, "/user/update/password", params) } }

// 合伙人管理初始化数据
const getAgentManages = () => { return (params) => { return http.get(base.oaIp, "/agent/page", params) } }
const postAddAgentManage = () => { return (params) => { return http.post(base.oaIp, "/agent/add", params) } }
const postEditAgentManage = () => { return (params) => { return http.post(base.oaIp, "/agent/update", params) } }
const getBankList = () => { return (params) => { return http.get(base.oaIp, "/brankbank/list", params) } }
const postDeleteAgent = () => { return (params) => { return http.post(base.oaIp, "/agent/delete", params) } }
//编辑权限限制
const postEditChange = () => { return (params) => { return http.post(base.oaIp, "/agent/queryAgentInfoByAgentNo", params) } }

/**
**快速开票分润start
 */
const getBillprofits = () => { return (params) => { return http.get(base.oaIp, "/billprofit/page", params) } }
const getBillprofitSum = () => { return (params) => { return http.get(base.oaIp, "/billprofit/sum", params) } }
// end -------------------------------------------------

/**
**聚合支付分润start
 */
const getpayProfits = () => { return (params) => { return http.get(base.oaIp, "/payProfit/page", params) } }
// end -------------------------------------------------


/**
**开票统计start
 */
const getBillcountagents = () => { return (params) => { return http.get(base.oaIp, "/billcountagent/page", params) } }
const getBillcountSum = () => { return (params) => { return http.get(base.oaIp, "/billcountagent/sum", params) } }
// end -------------------------------------------------

/**
**开票记录start
 */
const getBillrecords = () => { return (params) => { return http.get(base.oaIp, "/billrecord/page", params) } }
const postEditBillrecord = () => { return (params) => { return http.post(base.oaIp, "/billrecord/update", params) } }
// end -------------------------------------------------

/**
**日开票详情start
 */
const getBillcountdays = () => { return (params) => { return http.get(base.oaIp, "/billcountday/page", params) } }
const getExportBillcountdays = (search) => { return (params) => { return http.get(base.oaIp, "/billcountday/export?" + search, params) } }
// end -------------------------------------------------

/**
**达标详情start
 */
const getBillcountcustomers = () => { return (params) => { return http.get(base.oaIp, "/billcountcustomer/page", params) } }
// end -------------------------------------------------

/**
**产品模版start
 */
const getProducts = () => { return (params) => { return http.get(base.oaIp, "/product/page", params) } }
const postAddProduct = () => { return (params) => { return http.post(base.oaIp, "/product/add", params) } }
const postEditProduct = () => { return (params) => { return http.post(base.oaIp, "/product/update", params) } }
const postToggleProduct = () => { return (params) => { return http.post(base.oaIp, "/product/updateStatus", params) } }
// end -------------------------------------------------

/**
**合伙人管理start
 */
const getAgents = () => { return (params) => { return http.get(base.oaIp, "/agent/page", params) } }
// end -------------------------------------------------

/**
**合伙人转移start
 */
const getPartnerTransfer = () => { return (params) => { return http.get(base.oaIp, "/agent/transfer", params) } }
const getTransferBranchoffice = () => { return (params) => { return http.get(base.oaIp, "/agent/transferBranchoffice", params) } }
// end -------------------------------------------------

/**
**产品配置start
 */
const getProductConfigurePage = () => { return (params) => { return http.get(base.oaIp, "/userproduct/queryAgentTemplate", params) } }
// end -------------------------------------------------

/**
**商品管理start
 */
const getCustomerGoods = () => { return (params) => { return http.get(base.oaIp, "/customerGoods/page", params) } }
const postAddCustomerGood = () => { return (params) => { return http.post(base.oaIp, "/customerGoods/add", params) } }
const postEditCustomerGood = () => { return (params) => { return http.post(base.oaIp, "/customerGoods/update", params) } }
const postDeleteCustomerGood = (path) => { return (params) => { return http.post(base.oaIp, "/customerGoods/delete/" + path, params) } }
const postDefaultCustomerGood = (path) => { return (params) => { return http.post(base.oaIp, "/customerGoods/configDefault/" + path, params) } }
const postCancelDefaultCustomerGood = (path) => { return (params) => { return http.post(base.oaIp, "/customerGoods/cancelDefault/" + path, params) } }
const getsmartgoodscodeCustomerGood = () => { return (params) => { return http.get(base.oaIp, "/invoice/query/smartgoodscode", params) } }

// end -------------------------------------------------
/**
**商户产品start
*/
const getCustomerProducts = () => { return (params) => { return http.get(base.oaIp, "/userproduct/customerProductPage", params) } }
const getCheckCustomerProduct = () => { return (params) => { return http.get(base.oaIp, "/customer/query/checkCustomerProduct", params) } }
const getQueryCustomerProduct = () => { return (params) => { return http.get(base.oaIp, "/customer/queryCustomer", params) } }
const postHandleCustomerProduct = () => { return (params) => { return http.post(base.oaIp, "/userproduct/update/userProductSingle", params) } }
const getQueryCustomerElectronic = () => { return (params) => { return http.get(base.oaIp, "/customer/queryCustomerElectronic", params) } }
const getUserProductStatus = () => { return (params) => { return http.post(base.oaIp, "/userProductStatus/update", params) } }
// end -------------------------------------------------
/**
**商户管理 start
 */
const getCustomers = () => { return (params) => { return http.get(base.oaIp, "/customer/page", params) } }
// 新增
const postAddCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/add", params) } }
// 编辑
const postEditCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/update", params) } }
// 转移
const transferCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/transfer", params) } }
// 完善
const perfectCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/complete", params) } }
const postCloseCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/updateByStatus", params) } }
// end -------------------------------------------------

/**
**开票配置start
 */
const getCustomerConfigs = () => { return (params) => { return http.get(base.oaIp, "/customerConfig/page", params) } }
const postAddCustomerConfigs = () => { return (params) => { return http.post(base.oaIp, "/customerConfig/add", params) } }
const postEditCustomerConfigs = () => { return (params) => { return http.post(base.oaIp, "/customerConfig/update", params) } }
// end -------------------------------------------------

/**
**授权码审核start
 */
const getArantNumExamines = () => { return (params) => { return http.get(base.oaIp, "/qrReciept/secondpage", params) } }
const putAdoptArantNumExamine = (path) => { return (params) => { return http.put(base.oaIp, "/qrReciept/aduit/" + path, params) } }
const putRefuseArantNumExamine = (path) => { return (params) => { return http.put(base.oaIp, "/qrReciept/reject/" + path, params) } }
// end -------------------------------------------------

/**
**授权码管理start
 */
const getArantNumManages = () => { return (params) => { return http.get(base.oaIp, "/qrcode/page", params) } }
const postMakeEmpower = () => { return (params) => { return http.post(base.oaIp, "/qrcodebatch/add", params) } }
const postScanMakeMateriel = () => { return (params) => { return http.post(base.oaIp, "/qrcodebatch/addScanCodeGunBatch", params) } }
const postMakeMateriel = () => { return (params) => { return http.post(base.oaIp, "/qrcode/addMaterielBatch", params) } }
const postEditEmpower = () => { return (params) => { return http.post(base.oaIp, "/qrcode/update", params) } }
const postBindEmpower = () => { return (params) => { return http.post(base.oaIp, "/qrcode/bind", params) } }
const postUnBindEmpower = () => { return (params) => { return http.post(base.oaIp, "/qrcode/unbind", params) } }
const postBindChildEmpower = () => { return (params) => { return http.post(base.oaIp, "/qrcode/bindChildQrcode", params) } }
const postMakeTorageEmpower = () => { return (params) => { return http.post(base.oaIp, "/qrcodebatch/addDeviceBatch", params) } }
// end -------------------------------------------------

/**
**授权码转移start
 */
const getArantNumTransfers = () => { return (params) => { return http.get(base.oaIp, "/qrcodemigrate/page", params) } }
const postMigrateNumTransfer = () => { return (params) => { return http.post(base.oaIp, "/qrcodemigrate/migrate", params) } }
// const getMigrateNumTransfer = () => { return (params) => { return http.get(base.oaIp, "/qrcodemigrate/migrate", params) } }
// end -------------------------------------------------

/**
**授权码采购start
 */
const getArantNumBuybacks = () => { return (params) => { return http.get(base.oaIp, "/qrReciept/page", params) } }
const postPurchaseArantNum = () => { return (params) => { return http.post(base.oaIp, "/qrReciept", params) } }
const patchPurchaseArantNum = () => { return (params) => { return http.patch(base.oaIp, "/qrReciept", params) } }
// end -------------------------------------------------

/**
**用户管理start
 */
const getUserManages = () => { return (params) => { return http.get(base.oaIp, "/user/page", params) } }
const postAddUser = () => { return (params) => { return http.post(base.oaIp, "/user", params) } }
const patchEditUser = () => { return (params) => { return http.patch(base.oaIp, "/user", params) } }
const getRolesTree = () => { return (params) => { return http.get(base.oaIp, "/user/role/tree", params) } }
const patchConfigRole = () => { return (params) => { return http.patch(base.oaIp, "/user/role", params) } }
const deleteUserManage = () => { return (params) => { return http.delete(base.oaIp, "/user/delete", params) } }
// end -------------------------------------------------

/**
**菜单管理start
 */
const getMenuTrees = () => { return (params) => { return http.get(base.oaIp, "/menu/tree", params) } }
const getMenuTreePage = () => { return (params) => { return http.get(base.oaIp, "/menu/function/page", params) } }
const patchAddMenuTree = () => { return (params) => { return http.post(base.oaIp, "/menu", params) } }
const patchEditMenuTree = () => { return (params) => { return http.patch(base.oaIp, "/menu", params) } }
const deleteMenuTree = () => { return (params) => { return http.delete(base.oaIp, "/menu/delete", params) } }
const postAddMenuFunction = () => { return (params) => { return http.post(base.oaIp, "/menu/function", params) } }
const patchEditMenuFunction = () => { return (params) => { return http.patch(base.oaIp, "/menu/function", params) } }
const deleteMenuFunction = () => { return (params) => { return http.delete(base.oaIp, "/menu/function/delete", params) } }

// end -------------------------------------------------

/**
**角色管理start
 */
const getRoleManages = () => { return (params) => { return http.get(base.oaIp, "/role/page", params) } }
const postAddRole = () => { return (params) => { return http.post(base.oaIp, "/role", params) } }
const patchEditRole = () => { return (params) => { return http.patch(base.oaIp, "/role", params) } }
const deleteRole = () => { return (params) => { return http.delete(base.oaIp, "/role/delete", params) } }
const getRolesTreeConfig = () => { return (params) => { return http.get(base.oaIp, "/role/privilege/tree", params) } }
const patchRolesTreeSave = () => { return (params) => { return http.patch(base.oaIp, "/role/privilege", params) } }
// end -------------------------------------------------

/**
 **消息记录Start
 */
const getMessages = () => { return (params) => { return http.get(base.oaIp, "/message/page", params) } }
// end -------------------------------------------------

/**
 **商户版本管理Start
 */
// end -------------------------------------------------
const postCustomerVersion = () => { return (params) => { return http.post(base.oaIp, "/customerpluginversion/add", params) } }
const patchCustomerVersion = () => { return (params) => { return http.post(base.oaIp, "/customerpluginversion/updateVersion", params) } }
const getCustomerVersions = () => { return (params) => { return http.get(base.oaIp, "/customerpluginversion/page", params) } }

/**
**版本管理Start
 */
const patchVersion = () => { return (params) => { return http.post(base.oaIp, "/versionCommand/update", params) } }
const getVersion = () => { return (params) => { return http.get(base.oaIp, "/versionCommand/query", params) } }
const getVersions = () => { return (params) => { return http.get(base.oaIp, "/versionCommand/page", params) } }
const getOldVersions = () => { return (params) => { return http.get(base.oaIp, "/versionCommand/queryOldClientVersions", params) } }
const setUsingVersion = () => { return (params) => { return http.post(base.oaIp, "/versionCommand/startUsing", params) } }
// end -------------------------------------------------

/**
**埋点图表Start
 */
const postBurialPointCharts = () => { return (params) => { return http.post(base.oaIp, "/operatorlog/chart", params) } }
// end -------------------------------------------------
/**
**开票图表Start
 */
const getBillrecordCharts = () => { return (params) => { return http.post(base.oaIp, "/billrecord/chart", params) } }
// end -------------------------------------------------

/**
**埋点管理Start
 */
const getBurialPointManages = () => { return (params) => { return http.get(base.oaIp, "/operatorlog/page", params) } }
const getNewBurialPointManages = () => { return (params) => { return http.get(base.oaIp, "/operatorlogNew/page", params) } }
const getBurialPointTotal = () => { return (params) => { return http.post(base.oaIp, "/operatorlog/total", params) } }
const getNewBurialPointTotal = () => { return (params) => { return http.post(base.oaIp, "/operatorlogNew/total", params) } }
// end -------------------------------------------------

/**
**结算管理Start
 */
const getSettles = () => { return (params) => { return http.get(base.oaIp, "/agentSettle/agentPage", params) } }
const postUpdateSettles = () => { return (params) => { return http.post(base.oaIp, "/agentSettle/updateSettle", params) } }
const getAgentSettleSum = () => { return (params) => { return http.get(base.oaIp, "/agentSettle/sum", params) } }
// end -------------------------------------------------


/**
**资质补充
 */
const postEnterpriseSupplys = () => { return (params) => { return http.post(base.oaIp, "/enterprisesupply/page", params) } }
const postAddEnterpriseSupply = () => { return (params) => { return http.post(base.oaIp, "/enterprisesupply/add", params) } }
// end -------------------------------------------------

/**
**我的产品Start
 */
const getCustomerOpenProducts = () => { return (params) => { return http.get(base.oaIp, "/userProductStatus/page", params) } }
const postCustomerOpenProductSearch = () => { return (params) => { return http.post(base.oaIp, "/userproduct/query/cost", params) } }
const getCustomerEchoProduct = () => { return (params) => { return http.get(base.oaIp, "/customer/queryCustomerConverge", params) } }
const completeSettleInfo = () => { return (params) => { return http.post(base.oaIp, "/customer/completeSettleInfo", params) } }
const completeConvergeProduct = () => { return (params) => { return http.post(base.oaIp, "/customer/completeConvergeProduct", params) } }
const completeBussinessImg = () => { return (params) => { return http.post(base.oaIp, "/customer/completeBussinessImg", params) } }
const upload = () => { return (params) => { return http.post(base.oaIp, "/bussinessImg/upload", params) } }
const checkCustomerProduct = () => { return (params) => { return http.post(base.oaIp, "/customer/query/checkCustomerProduct", params) } }
// end -------------------------------------------------

// bankCustomer
const getbankCustomers = () => { return (params) => { return http.get(base.oaIp, "/bankCustomer/page", params) } }

/**
**交易管理-订单查询
 */

// const getPayOrders = () => { return (params) => { return http.get(base.oaIp, "/payOrder/operator/page", params) } }
const getPayOrders = () => { return (params) => { return http.get(base.oaIp, "/payOrder/page?", params) } }
const getSumPayOrders = () => { return (params) => { return http.get(base.oaIp, "/payOrder/sum", params) } }
/**
 **商户版本管理Start
 */
const getChangeBills = () => { return (params) => { return http.get(base.oaIp, "/changeBill/page", params) } }
const postUpdateBill = () => { return (params) => { return http.post(base.oaIp, "/changeBill/update", params) } }
const getOneChangeBill = () => { return (params) => { return http.get(base.oaIp, "/changeBill/queryConvergeNowData", params) } }
// end -------------------------------------------------


// 邮箱配置start
const getEmailconfigs = () => { return (params) => { return http.get(base.oaIp, "/emailconfig/page", params) } }
const postAddEmailconfig = () => { return (params) => { return http.post(base.oaIp, "/emailconfig/add", params) } }
const postEditEmailconfig = () => { return (params) => { return http.post(base.oaIp, "/emailconfig/update", params) } }

//支付结算单据
const getCustomerSettles = () => { return (params) => { return http.get(base.oaIp, "/customerSettle/page", params) } }
const postStatusCustomerSettle = () => { return (params) => { return http.post(base.oaIp, "/customerSettle/queryCustomerNo", params) } }

// 邮箱配置end
export {
    LoginZf,
    resetPwdZf,
    getCustomerZf,
    getHomeNoticeZf,
    getHomenoticedetailZf,
    Login,
    Logout,
    MenuGet,
    UserGet,
    PasswordUpdate,
    // orgCodeHandle,
    // 合伙人管理
    getAgentManages,
    postAddAgentManage,
    postEditAgentManage,
    getBankList,
    postDeleteAgent,
    postEditChange,
    // 快速开票分润
    getBillprofits,
    getBillprofitSum,
    //聚合支付分润
    getpayProfits,
    //开票统计
    getBillcountagents,
    getBillcountSum,
    // 开票记录
    getBillrecords,
    postEditBillrecord,
    // 日开票详情
    getBillcountdays,
    getExportBillcountdays,
    //达标详情
    getBillcountcustomers,
    // 产品管理
    getProducts,
    postAddProduct,
    postEditProduct,
    postToggleProduct,
    getUserProductStatus,
    // 商品管理
    getCustomerGoods,
    postAddCustomerGood,
    postEditCustomerGood,
    postDeleteCustomerGood,
    postDefaultCustomerGood,
    postCancelDefaultCustomerGood,
    getsmartgoodscodeCustomerGood,
    getSumPayOrders,
    // 商户产品
    getCustomerProducts,
    getCheckCustomerProduct,
    getQueryCustomerProduct,
    perfectCustomer,
    postHandleCustomerProduct,
    getQueryCustomerElectronic,
    // 商户管理
    getCustomers,
    postAddCustomer,
    postEditCustomer,
    postCloseCustomer,
    postUploadFile,
    transferCustomer,
    // 开票配置
    getCustomerConfigs,
    postAddCustomerConfigs,
    postEditCustomerConfigs,

    // 用户管理
    getUserManages,
    postAddUser,
    patchEditUser,
    getRolesTree,
    patchConfigRole,
    deleteUserManage,
    // 授权码管理
    getArantNumManages,
    postMakeEmpower,
    postScanMakeMateriel,
    postMakeMateriel,
    postEditEmpower,
    postBindEmpower,
    postUnBindEmpower,
    postBindChildEmpower,
    postMakeTorageEmpower,
    // 授权码采购
    getArantNumBuybacks,
    postPurchaseArantNum,
    patchPurchaseArantNum,
    // 授权码审核
    getArantNumExamines,
    putAdoptArantNumExamine,
    putRefuseArantNumExamine,
    // 授权码转移
    getArantNumTransfers,
    postMigrateNumTransfer,
    // 菜单管理
    getMenuTrees,
    getMenuTreePage,
    patchEditMenuTree,
    postAddMenuFunction,
    patchEditMenuFunction,
    deleteMenuFunction,
    // 角色管理
    getRoleManages,
    postAddRole,
    patchEditRole,
    deleteRole,
    getRolesTreeConfig,
    patchRolesTreeSave,
    patchAddMenuTree,
    deleteMenuTree,
    // 消息管理
    getMessages,
    // 商户版本
    postCustomerVersion,
    patchCustomerVersion,
    getCustomerVersions,
    // 版本控制
    postVersion,
    patchVersion,
    getVersion,
    getVersions,
    getOldVersions,
    setUsingVersion,
    // 统计管理
    getBurialPointManages,
    getBurialPointTotal,
    getNewBurialPointManages,
    getNewBurialPointTotal,
    // 合伙人转移
    getPartnerTransfer,
    getTransferBranchoffice,
    // 埋点图表
    postBurialPointCharts,
    // 开票图表
    getBillrecordCharts,
    // 快开结算单据
    getSettles,
    postUpdateSettles,
    //代理商快开结算单据
    getAgentSettle,
    getAgentSettleSum,
    // 统计
    getSettle,
    getSettleSum,
    postUpdateSettle,
    //资质管理
    postEnterpriseSupplys,
    postAddEnterpriseSupply,
    //我的产品
    getCustomerOpenProducts,
    postCustomerOpenProductSearch,
    getCustomerEchoProduct,
    completeSettleInfo,
    completeConvergeProduct,
    completeBussinessImg,
    checkCustomerProduct,
    upload,
    //交易订单查询
    getPayOrders,
    getbankCustomers,
    changeBillOpenCheck,
    getChangeBills,
    postUpdateBill,
    getOneChangeBill,
    getEmailconfigs,
    postAddEmailconfig,
    postEditEmailconfig,
    getCustomerSettles,
    postStatusCustomerSettle
};

