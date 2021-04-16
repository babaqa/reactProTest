export default {
    //#region 簡易菜單容器
    simpleMenuContainer: {
        basic: (style) => ({
            ...style,
            width: "100%",
            minHeight: "695px",
            height: "auto",
            display: "flex",
            top: "63px",
            padding: "50px 0",
        }),
    },
    //#endregion

    //#region 簡易菜單左方容器
    simpleMenuLeftContainer: {
        basic: (style) => ({
            ...style,
            width: "50%",
            height: "auto",
        }),
    },
    //#endregion

    //#region 簡易菜單左方臺藝檔案容器
    fileContainer: {
        basic: (style) => ({
            ...style,
            width: "270px",
            height: "270px",
            background: "rgba(75, 75, 75, 1)",
            // margin: "63px 27px 0 0",
            top: "63px",
            display: "inline-flex",
            justifyContent: "center",
        }),
    },
    //#endregion

    //#region 簡易菜單左方檔案應用容器
    fileUseContainer: {
        basic: (style) => ({
            ...style,
            width: "270px",
            height: "270px",
            left: "27px",
            background: "rgba(75, 75, 75, 1)",
            // margin: "63px 27px 0 0",
            display: "inline-flex",
            justifyContent: "center",
        }),
    },
    //#endregion

    //#region 簡易菜單左方線上檔案展容器
    fileShowContainer: {
        basic: (style) => ({
            ...style,
            width: "270px",
            height: "270px",
            top: "133px",
            background: "rgba(75, 75, 75, 1)",
            // margin: "63px 27px 0 0",
            display: "inline-flex",
            justifyContent: "center",
        }),
    },
    //#endregion

    //#region 簡易菜單左方申請下載容器
    downloadContainer: {
        basic: (style) => ({
            ...style,
            width: "270px",
            height: "270px",
            left: "27px",
            top: "70px",
            background: "rgba(75, 75, 75, 1)",
            display: "inline-flex",
            justifyContent: "center",
        }),
    },
    //#endregion

    //#region More文字容器
    moreTextContainer: {
        basic: (style) => ({
            ...style,
            width: "130px",
            height: "45px",
            borderRadius: "29px",
            background: "rgba(173, 157, 114, 1)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "-22px",
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: "20px",
            color: "rgba(255, 255, 255, 1)",
        }),
    },
    //#endregion

    //#region 說明文字
    simpleMenuText: {
        basic: (style) => ({
            ...style,
            position: "relative",
            top: "-40px",
            width: "100%",
            textAlign: "center",
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: "20px",
            color: "rgba(255, 255, 255, 1)",
        }),
    },
    //#endregion

    //#region 簡易菜單右方容器
    simpleMenuRightContainer: {
        basic: (style) => ({
            ...style,
            width: "50%",
            height: "695px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px"
        }),
    },
    //#endregion
}