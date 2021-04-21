export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: "32px 119px 32px" // 標題列的padding
                }
            }
        },
        laptopLOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                }
            }
        },
        laptopLContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: "8px 119px 659px", //635 是授權圖高度
                    minHeight: "calc( 100vh + 396px)"
                }
            }
        },
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: "32px 119px 32px" // 標題列的padding
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: "8px 119px 353px", //337 是授權圖高度
                    minHeight: "calc( 100vh + 99px)"
                }
            }
        },
        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: "32px 24px" // 標題列的padding
                }
            }
        },
        tabletOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF"
                }
            }
        },
        tabletContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: "8px 24px 212px", //188 是授權圖高度
                    minHeight: `calc( ${props.height}px - 164px)`
                }
            }
        },
    },
    //#endregion

    //#region 標題列
    titleBar: {
        titleText: {
            basic: (style, props) => ({
                ...style,
                width: "120px",
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "210px"
            })
        }
    },
    //#endregion

    //#region 首頁文字
    homePageText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            // position: "absolute",
            // right: 0,
            width: "100%",
            textAlign: "right",
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
            display: "inline-block",
            fontWeight: 400,
            fontSize: "18px",
            color: "#B0B0B0"
        }),
    },
    //#endregion

    //#region 子標題列
    baseSubTitleBar: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "66%",
                border: 0,
                margin: 0,
                position: "relative",
                left: "25%"
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

    //#region 分頁容器
    tabsContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(4),
            display: "inline-block",
            width: "25%",
            // height: "56px",
            backgroundColor: "#transparent",
            verticalAlign: "top"
        }),
    },
    //#endregion
    //#region 分頁容器
    listContainer: {
        basic: (style, props) => ({
            ...style,
            // ...style.occupy(8),
            width: "66%",
            display: "inline-block",
        }),
    },
    //#endregion
    //#region 標題列 聯繫客服分頁
    titleBarContactTab: {
        basic: (style, props) => ({
            ...style,
            display: "block",
            margin: 0,
            padding: "0 48px 0 24px",
            lineHeight: "32px",
            height: "100%",
            fontWeight: 700,
            fontSize: "18px",
            cursor: "pointer",
            width: "160px",
            color: "rgba(0, 0, 0, 0.85)",
            backgroundColor: "transparent",
            float: "right",
            clear: "both"
        }),
    },
    //#endregion

    //#region 分頁 圖示
    pointSvg: {
        position: "absolute",
        left: 0,
        top: "12px"
    },
    //#endregion
}