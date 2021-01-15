export default {
    //#region 標題 容器
    titleBar: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: "#595959",
        }),
    },
    //#endregion

    //#region 路線名稱 標題
    routeNameTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "44px",
            textAlign: "center",
        }),
    },
    //#endregion

    //#region 操作 標題
    operatingTitle: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "44px",
            textAlign: "center",
        }),
    },
    //#endregion

    //#region 內文 容器
    dataContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "100%",
            backgroundColor: props?.index % 2 === 0 ? "#fff" : "#F5F5F5",
        }),
    },
    //#endregion

    //#region 路線名稱 內文
    routeNameText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            color: "rgba(0,0,0,0.85)",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "44px",
            textAlign: "center",
        }),
    },
    //#endregion

    //#region 操作 內文
    operatingText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            color: "#1890FF",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "44px",
            textAlign: "center",
        }),
    },
    //#endregion

    //#region 查看時刻表及站點資訊 圖標
    checkSvg: {
        position: "relative",
        top: "3px",
        right: "6px"
    },
    //#endregion
}