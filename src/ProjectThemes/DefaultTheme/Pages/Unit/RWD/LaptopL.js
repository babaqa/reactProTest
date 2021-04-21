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

    //#region 單位介紹編輯器 UnitEditor
    unitEditor: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 0 0",
                display: "inline-block",
                ...style.occupy(8),
                // minHeight: "500px"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 24px 0",
                display: "inline-block",
                ...style.occupy(8),
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
}