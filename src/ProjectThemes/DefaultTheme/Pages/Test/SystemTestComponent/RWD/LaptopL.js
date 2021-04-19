export default {
    //#region 簡易菜單區塊
    //#region 簡易菜單外容器
    simpleMenuContainer: {
        basic: (style) => ({
            ...style,
            width: "100%",
            minHeight: "795px",
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
            width: "100%",
            height: "auto",
        }),
        laptopL: {
            basic: (style) => ({
                ...style,
                width: "50%",
                height: "auto",
            }),
        }
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
            letterSpacing: "0.3em",
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
    //#endregion

    //#region 線上檔案展區塊
    //#region 線上檔案展容器
    onlineFileContainer: {
        basic: (style) => ({
            ...style,
            width: "100%",
            // minHeight: "795px",
            height: "701px",
            display: "inline-block",
            top: "63px",
            padding: "50px 0",
        }),
    },
    //#endregion
    //#region 線上檔案展標題
    onlineFileTitle: {
        basic: (style) => ({
            ...style,
            width: "100%",
            fontSize: "25px",
            fontFamily: "Roboto",
            fontWeight: 700,
            letterSpacing: "0.3em",
        }),
    },
    //#endregion
    //#endregion

    //#region 下載區塊
    //#region 下載外容器
    downloadsContainer: {
        basic: (style) => ({
            ...style,
            width: "100%",
            minHeight: "795px",
            height: "auto",
            display: "flex",
            top: "63px",
            padding: "50px 0",
            alignItems: "center",
        }),
    },
    //#endregion

    //#region 下載左方圖片容器
    downloadsIconContainer: {
        basic: (style) => ({
            ...style,
            width: "30%",
            height: "auto",
        }),
    },
    //#endregion

    //#region 下載右方Table容器
    downloadsTableContainer: {
        basic: (style) => ({
            ...style,
            width: "70%",
            height: "auto",
        }),
    },
    //#endregion

    //#region 下載右方資料容器
    downloadsDataContainer: {
        basic: (style) => ({
            ...style,
            width: "calc(100% - 50px)",
            height: "59px",
            display: "inline-flex",
            borderBottom: "4px solid rgba(196, 196, 196, 1)",
            margin: "0 25px 20px"
        }),
        laptopL: {
            basic: (style) => ({
                ...style,
                width: "calc(50% - 50px)",
                height: "59px",
                display: "inline-flex",
                borderBottom: "4px solid rgba(196, 196, 196, 1)",
                margin: "0 25px 20px"
            }),
        }
    },
    //#endregion

    //#region 下載右方資料文字
    downloadsDataText: {
        basic: (style) => ({
            ...style,
            width: "calc(100% - 104px)",
            lineHeight: "55px",
            display: "inline-block",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            letterSpacing: "0.2em",
        }),
    },
    //#endregion

    //#region 下載右方資料Icon容器
    downloadsDataIconContainer: {
        basic: (style) => ({
            ...style,
            width: "104px",
            height: "55px",
            display: "inline-flex",
            justifyContent: "flex-end",
            alignItems: "center"
        }),
    },
    //#endregion
    //#region 下載右方資料Icon
    downloadDataIcon: {
        // margin: "0 0 0 14px",
        // cursor: "pointer",
    },
    //#endregion
    //#endregion

    //#region 法規區塊
    //#region 法規外容器
    lawsContainer: {
        basic: (style) => ({
            ...style,
            width: "100%",
            // minHeight: "695px",
            height: "535px",
            display: "flex",
            top: "63px",
            padding: "50px 0",
            // alignItems: "flex-end",
            justifyContent: "center",
        }),
        laptopL: {
            basic: (style) => ({
                justifyContent: "flex-start",
            }),
        }
    },
    //#endregion

    //#region 法規左方容器
    lawsLeftContainer: {
        basic: (style) => ({
            ...style,
            width: "800px",
            height: "435px",
            // display: "flex",
            // alignItems: "flex-end"
        }),
    },
    //#endregion

    //#region 法規左方本校法規容器
    ourLawsContainer: {
        basic: (style, props) => ({
            ...style,
            width: "200px",
            height: "200px",
            background: "rgba(75, 75, 75, 1)",
            position: "absolute",
            bottom: props.width >= 1440 ? (props.isActive === "ourLaws" ? "235px" : "200px") : "200px",
            right: "200px",
            justifyContent: "center",
            cursor: props.width >= 1440 ? (props.isActive !== "ourLaws" && "pointer") : "pointer",
            // display: "flex",
            // alignItems: "flex-end"
        }),
        hover: () => ({
            bottom: "235px",
        })
    },
    //#endregion

    //#region 法規左方相關法規容器
    lawsSignContainer: {
        basic: (style, props) => ({
            ...style,
            width: "200px",
            height: "200px",
            background: "rgba(46, 46, 46, 1)",
            position: "absolute",
            bottom: props.width >= 1440 ? (props.isActive === "lawsSign" ? "235px" : "200px") : "200px",
            right: "0",
            justifyContent: "center",
            cursor: props.width >= 1440 ? (props.isActive !== "lawsSign" && "pointer") : "pointer",
            // display: "flex",
            // alignItems: "flex-end"
        }),
        hover: () => ({
            bottom: "235px",
        })
    },
    //#endregion

    //#region 法規左方相關法規文字
    lawsSignText: {
        basic: (style) => ({
            ...style,
            width: "100%",
            textAlign: "center",
            color: "rgba(255, 255, 255, 1)",
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "0.3em",
            // height: "435px",
        }),
    },
    //#endregion

    //#region 法規右方Table容器
    lawsRightContainer: {
        basic: (style) => ({
            ...style,
            width: "calc(100% - 800px)",
            height: "400px",
            background: "rgba(255, 255, 255, 1)",
            position: "absolute",
            right: "0",
            bottom: "50px",
            padding: "24px",
        }),
    },
    //#endregion

    //#region 法規右方Table大標題
    tableHeaderText: {
        basic: (style) => ({
            ...style,
            color: "rgba(173, 157, 114, 1)",
            fontSize: "20px",
            fontFamily: "Roboto",
            fontWeight: 700,
            letterSpacing: "0.3em",
        }),
    },
    //#endregion
    //#endregion
}