import { SubContainer } from "../../../../../Components"

export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                    padding: "32px 119px 32px" // 標題列的padding
                }
            }
        },
        laptopLOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                }
            }
        },
        laptopLContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                    padding: "8px 119px 680px", //680 是授權圖高度
                    minHeight: "calc( 100vh + 381px)"
                }
            }
        },
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                    padding: "32px 95px 32px" // 標題列的padding
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#F9F9F9",
                    padding: "0 95px 350px",
                    minHeight: "calc( 100vh + 84px )" //減掉footer高度
                }
            }
        },

        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0 0" // 標題列的padding
                }
            }
        },
        tabletOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        tabletContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "0 24px 204px 24px" //188 是授權圖高度
                }
            }
        },
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB"
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        basic: (style, props) => ({
            ...style,
            width: "236px",
            height: "40px",
            backgroundColor: "#FFF",
            margin: "0 24px 16px"
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
                margin: "0 0 0 8px",
                position: "relative",
                // left: "17%",                
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
            ...style.occupy(6),
            height: "auto",
            padding: "0 8px 26px"
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
            width: "141px",
            minHeight: "139px",
            background: "rgba(39, 39, 39, 1)",
            padding: "9px 13px",
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
            fontSize: "18px",
            letterSpacing: "0.3em",
            lineHeight: "21px",
            position: "absolute",
            top: "9px"
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
            fontSize: "24px",
            letterSpacing: "0.3em",
            lineHeight: "28px",
            top: "32px"
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
            fontSize: "18px",
            letterSpacing: "0.3em",
            lineHeight: "21px",
            position: "absolute",
            bottom: "9px"
        })
    },
    //#endregion

    //#region 成員介紹右方容器
    memberInsideRightContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(6),
            // textAlign: "center",
            width: "calc(100% - 141px - 20px)",
            margin: "0 0 0 20px",
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
            fontSize: "16px",
            letterSpacing: "0.3em",
            lineHeight: "26px",
            padding: "0 24px 8px"
            // position: "absolute",
            // bottom: "9px"
        })
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
        laptopL: {
            basic: (style, props) => ({
                ...style,
                color: "rgba(95, 93, 86, 1)",
                fontFamily: "Roboto",
                fontWeight: 700,
                fontSize: "18px",
                letterSpacing: "0.3em",
                lineHeight: "21px",
                width: "156px",
                padding: "0 15px 0 24px"
            }),
        }
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
            fontSize: "18px",
            letterSpacing: "0.3em",
            lineHeight: "21px",
            padding: "5px 2px 5px 5px",
            width: "calc(100% - 128px)",
            textAlign: "center"
            // position: "absolute",
            // bottom: "9px"
        }),
        laptopL: {
            basic: (style, props) => ({
                ...style,
                color: "rgba(95, 93, 86, 1)",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "18px",
                letterSpacing: "0.3em",
                lineHeight: "21px",
                padding: "5px 24px",
                width: "calc(100% - 157px)",
                textAlign: "center"
                // position: "absolute",
                // bottom: "9px"
            }),
        }
    },
    //#endregion
}