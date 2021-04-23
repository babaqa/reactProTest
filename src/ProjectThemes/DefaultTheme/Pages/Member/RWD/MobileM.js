export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                    padding: "0px 40px" // 標題列的padding
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                    height: `calc( ${props.height}px - 60px - 83px)`,
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                    padding: "0 40px 448px", //448 是授權圖高度
                    minHeight: `calc( ${props.height}px - 60px - 83px)`,
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
            height: "46px",
            whiteSpace: "nowrap"
        })
    },
    //#endregion

    //#region 標題容器
    titleContainer: {
        basic: (style, props) => ({
            ...style,
            height: "83px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            letterSpacing: "0.3em",
            // padding: "0 40px"
        })
    },
    //#endregion

    //#region 回上一頁icon
    goBackIcon: {
        color: "rgba(173, 157, 114, 1)",
    },
    //#endregion

    //#region 標題文字
    titleText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(173, 157, 114, 1)",
            fontFamiy: "Roboto",
            fontSize: "20px",
            fontWeight: 700,
            borderBottom: "2px solid rgba(173, 157, 114, 1)"
        })
    },
    //#endregion

    //#region 首頁文字
    homePageText: {
        basic: (style, props) => ({
            ...style,
            // display: "inline-block",
            // position: "absolute",
            // right: 0,
            // width: "100%",
            // textAlign: "right",
            fontWeight: 400,
            fontSize: "18px",
            color: "#4B4B4B"
        }),
    },
    //#endregion

    //#region 當前頁面文字
    nowPageText: {
        basic: (style, props) => ({
            ...style,
            // display: "inline-block",
            fontWeight: 400,
            fontSize: "18px",
            color: "#B0B0B0",
            // top: "10px"
        }),
    },
    //#endregion

    //#region 子標題列
    baseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                // width: "100%",
                border: 0,
                margin: 0,
                position: "relative",
                left: "17%"
            })
        },
        titleText: {
            basic: (style, props) => ({
                ...style,
                // width: "40px",
                color: "#AD9D72",
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: "37.5px",
                borderBottom: "2px solid #AD9D72",
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: 0,
            })
        }
    },
    //#endregion

    //#region 單位介紹外容器
    unitEditorContainer: {
        basic: (style, props) => ({
            ...style,
            textAlign: "center",
        })
    },
    //#endregion

    //#region 成員介紹單一區塊外容器
    memberBlockOutContainer: {
        basic: (style, props) => ({
            ...style,
            ...style.occupy(12),
            height: "auto",
            padding: "0 0 26px"
            // background: "wheat"
            // textAlign: "center",
        })
    },
    //#endregion
    //#region 成員介紹左方容器
    memberInsideLeftContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(6),
            // textAlign: "center",
            width: "100%",
            minHeight: "64px",
            background: "rgba(39, 39, 39, 1)",
            // padding: "9px 13px",
            display: "inline-block",
            padding: "0 14px"
        })
    },
    //#endregion

    //#region 職稱文字
    jobTitleText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(176, 176, 176, 1)",
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "14px",
            letterSpacing: "0.3em",
            lineHeight: "16px",
            position: "absolute",
            top: "9px",
            width: "100%",
            display: "inline-block",
        })
    },
    //#endregion

    //#region 姓名文字
    nameText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(173, 157, 114, 1)",
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "0.3em",
            lineHeight: "23px",
            top: "32px",
            width: "60%",
            display: "inline-block",
        })
    },
    //#endregion
    //#region 分機文字
    telText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(176, 176, 176, 1)",
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "14px",
            letterSpacing: "0.3em",
            lineHeight: "16px",
            position: "absolute",
            bottom: "9px",
            width: "40%",
            display: "inline-block",
            right: "14px",
            textAlign: "right"
        })
    },
    //#endregion

    //#region 成員介紹右方容器
    memberInsideRightContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(6),
            // textAlign: "center",
            width: "calc(100%)",
            // margin: "0 0 0 20px",
            background: "rgba(95, 93, 86, 1)",
            minHeight: "472px",
            // padding: "10px 16px 0"
        })
    },
    //#endregion

    //#region 業務項目標題文字
    businessListTitleText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(255, 255, 255, 1)",
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "0.3em",
            lineHeight: "21px",
            padding: "10px 16px 12px",
            width: "100%"
            // position: "absolute",
            // bottom: "9px"
        })
    },
    //#endregion

    //#region 業務項目文字
    businessListText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(255, 255, 255, 1)",
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "14px",
            letterSpacing: "0.3em",
            lineHeight: "25px",
            padding: "0 24px 8px"
            // position: "absolute",
            // bottom: "9px"
        })
    },
    //#endregion

    //#region 業務項目編輯器 BusinessListEditor
    businessListEditor: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 24px 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTextEditor: {
            basic: (style, props) => ({
                ...style,
                color: "rgba(255, 255, 255, 1)",
            })
        },
        textEditor: {
            basic: (style, props) => ({
                ...style,
                height: "500px",
            })
        },
    },
    //#endregion

    //#region 成員介紹業務項目底部容器
    businessListBottomContainer: {
        basic: (style, props) => ({
            ...style,
            // textAlign: "center",
            width: "100%",
            // margin: "0 0 0 20px",
            background: "rgba(196, 196, 196, 1)",
            minHeight: "76px",
            height: "auto",
            // position: "absolute",
            // bottom: "0",
            // left: "0",
            alignItems: "center",
        })
    },
    //#endregion

    //#region 職務代理人文字
    positionAgentText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(95, 93, 86, 1)",
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "0.3em",
            lineHeight: "21px",
            width: "127px",
            padding: "0 2px 0 8px"
        }),
    },
    //#endregion

    //#region 線容器
    lineContainer: {
        basic: (style, props) => ({
            ...style,
            width: "1px",
            background: "rgba(95, 93, 86, 1)",
            height: "39px"
        })
    },
    //#endregion

    //#region 職務代理人姓名文字
    positionAgentNameText: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(95, 93, 86, 1)",
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "16px",
            letterSpacing: "0.3em",
            lineHeight: "18px",
            padding: "5px 2px 5px 5px",
            width: "calc(100% - 128px)",
            textAlign: "center"
            // position: "absolute",
            // bottom: "9px"
        }),
    },
    //#endregion

}