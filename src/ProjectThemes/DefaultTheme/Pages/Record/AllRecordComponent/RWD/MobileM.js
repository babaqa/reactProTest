export default {
    //#region 卡片資料外層容器
    cardOutContainer: {
        basic: (style, props) => {
            return {
                ...style,
                ...style.occupy(12),
                display: "inline-block",
                padding: "4px 0",
                height: "auto",
            }
        }
    },
    //#endregion

    //#region 卡片資料表單區容器
    cardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                display: "inline-block",
                padding: "8px 16px",
                background: "#fff",
                boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: "154px",
                width: "100%",
            }
        }
    },
    //#endregion

    //#region 公司 容器
    companyContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                display: "inline-block",
                boxShadow: "inset 0 -1px #D9D9D9",
            }
        }
    },
    //#endregion

    //#region 公司名稱
    companyName: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0, 0, 0, 0.65)",
            margin: "0 0 5px 0"
        })
    },
    //#endregion

    //#region 公司電話
    companyPhone: {
        basic: (style, props) => ({
            ...style,
            position: "relative",
            height: "31px",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.85)",
            padding: "0 0 0 54px"
        })
    },
    //#endregion
    //#region 公司電話 左方圖標
    phoneSvg: {
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0
    },
    //#endregion

    //#region 車趟服務時間 容器
    carServiceTimeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                display: "inline-block",
                boxShadow: "inset 0 -1px #D9D9D9",
                // margin: "16px 0 0",
                padding: "8px 0",
                height: "56px"
            }
        }
    },
    //#endregion
    //#region 車趟服務時間 標題
    carServiceTimeTitle: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            margin: "0 0 4px"
        })
    },
    //#endregion

    //#region 車趟服務時間 星期 
    carServiceWeekText: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            margin: "0 8px 4px"
        })
    },
    //#endregion

    //#region 車趟服務時間 時段 
    carServiceTimeText: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
        })
    },
    //#endregion
    //#region 車趟服務時間 提醒 
    carServiceTimeTip: {
        basic: (style, props) => ({
            ...style,
            height: "18px",
            fontSize: "12px",
            lineHeight: "18px",
            color: "#FA541C",
            width: "100%",
            background: "#FFF2E8",
            borderRadius: "4px"
        })
    },
    //#endregion

    //#region 客服服務時間 容器
    customerServiceTimeContainer: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                // display: "inline-block",
                // margin: "16px 0 0",
                padding: "8px 0 0 0",
                height: "34px"
            }
        }
    },
    //#endregion
    //#region 客服服務時間
    customerServiceTime: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            margin: "0 0 4px"
        })
    },
    //#endregion
    //#region 客服服務時間 星期 
    customerServiceWeekText: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
            margin: "0 8px 4px"
        })
    },
    //#endregion

    //#region 客服服務時間 時段 
    customerServiceTimeText: {
        basic: (style, props) => ({
            ...style,
            height: "22px",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "22px",
            color: "rgba(0,0,0,0.65)",
        })
    },
    //#endregion

    //#region 客服服務時間 提醒 
    customerServiceTimeTip: {
        basic: (style, props) => ({
            ...style,
            height: "66px",
            fontSize: "14px",
            lineHeight: "22px",
            color: "#FF7A45",
        })
    },
    //#endregion
    //#endregion

    //#region 沒有更多車行 提醒 
    noDataTip: {
        basic: (style, props) => ({
            ...style,
            fontSize: "14px",
            lineHeight: "22px",
            color: "#1890FF",
            margin: "12px 0 0",
            width: "100%",
            textAlign: "center"
        })
    },
    //#endregion

    //#endregion
}
