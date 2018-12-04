export default {
    logo: {
        title: "中付支付"
    },
    login: {
        title: "中付支付退款系统",
        form_username: "请输入机构编号",
        form_pass: "请输入机构密钥",
        footer: "CHINA PAYMENT TECHNOLOGY CO., LTD"
    },
    home: {
        title: "欢迎使用中付支付退款系统",
        introduce: ["中付支付退款系统目前只支持全额退款", "退款至银行卡，具体到账时间以银行为准"]
    },
    refund: {
        description: "提示：退款成功后，请妥善保管退款订单号，便于退款订单查询时使用。",
        formCustomerNo: "商户编号",
        formCustomerTip: "请输入商户编号",
        formOrderNo: "订单号",
        formOrderTip: "请输入订单号",
        submit: "发起退款",
        tableOrderNo: "退款订单号",
        tableResult: "退款结果"
    },
    refundQuery: {
        formCustomerNo: "商户编号",
        formCustomerNoTip: "请输入商户编号",
        formOrderNo: "退款订单号",
        formOrderTip: "请输入退款订单号",
        submit: "查询",
        tableOrderNo: "退款订单号",
        tableStatus: "退款状态",
        tableMoney: "退款金额",
        tableTime: "退款时间",
        refundStatus: {
            INIT: "下单",
            PROCESSING: "处理中",
            CHANGE: "转入代发",
            FAIL: "失败",
            SUCCESS: "成功",
        }
    },
    nav: {
        exitText: "退出",
        noticeText: "通知",
        noNoticeText: "暂无通知",
    },
    menu: [
        {
            "menuCode": "order",
            "menuName": "退款管理",
            "child": [
                {
                    "menuCode": "refund",
                    "menuName": "交易退款"
                },
                {
                    "menuCode": "refundQuery",
                    "menuName": "退款查询"
                }
            ]
        }
    ],
    tags: {
        home: "首页",
        refund: "交易退款",
        refundQuery: "退款查询",
    }
}