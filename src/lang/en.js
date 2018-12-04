export default {
    logo: {
        title: "CHINA PAYMENT"
    },
    login: {
        title: "Refund management platform",
        form_username: "Please input organization ID",
        form_pass: "Please input organization key",
        footer: "CHINA PAYMENT TECHNOLOGY CO., LTD"
    },
    home: {
        title: "Welcome to china payment of refund management platform",
        introduce: ["At present, we only support full refund", "refund to bank card, and specific arrival time is based on bank."]
    },
    refund: {
        description: "tip: After the refund is successful, please keep the refund order number properly so as to facilitate the use of the refund request.",
        formCustomerNo: "Customer number",
        formCustomerTip: "Please input customer number",
        formOrderNo: "Transaction order number",
        formOrderTip: "Please input transaction order number",
        submit: "Request",
        tableOrderNo: "Refund order number",
        tableResult: "Refund result"
    },
    refundQuery: {
        formCustomerNo: "Customer number",
        formCustomerNoTip: "Please input customer number",
        formOrderNo: "Refund order number",
        formOrderTip: "Please input refund order number",
        submit: "Query",
        tableOrderNo: "Refund order number",
        tableStatus: "Refund status",
        tableMoney: "Refund amount",
        tableTime: "Refund time",
        refundStatus: {
            INIT: "Init",
            PROCESSING: "Processing",
            CHANGE: "Change",
            FAIL: "Fail",
            SUCCESS: "Success",
        }
    },
    nav: {
        exitText: "Exit",
        noticeText: "Notice",
        noNoticeText: "No notice",
    },
    menu: [
        {
            "menuCode": "order",
            "menuName": "Refund manage",
            "child": [
                {
                    "menuCode": "refund",
                    "menuName": "Refund request"
                },
                {
                    "menuCode": "refundQuery",
                    "menuName": "Refund query"
                }
            ]
        }
    ],
    tags: {
        home: "home",
        refund: "Refund request",
        refundQuery: "Refund query",
    }
}