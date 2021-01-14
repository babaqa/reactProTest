export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        laptopLOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0" // 標題列的padding
                }
            }
        },
        laptopLOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        laptopLContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "12px 12px 200px",
                    minHeight: "calc( 100vh - 184px )"
                }
            }
        },
        laptopOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0" // 標題列的padding
                }
            }
        },
        laptopOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        laptopContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "12px 8px 200px", //188 是授權圖高度
                    minHeight: "calc( 100vh - 164px )"
                }
            }
        },

        tabletOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "12px 0 0" // 標題列的padding
                }
            }
        },
        tabletOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8"
                }
            }
        },
        tabletContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#DBE4E8",
                    padding: "12px 8px 200px", //188 是授權圖高度
                    minHeight: "calc( 100vh - 164px )"
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
                width: "120px"
            })
        },
        rightContainer: {
            basic: (style, props) => ({
                ...style,
                width: "250px"
            })
        }
    },
    //#endregion

    //#region 分頁底色
    whiteContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "72px",
            backgroundColor: "#FFFFFF"
        }),
    },
    //#endregion

    //#region 分頁容器
    tabsContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "56px",
            backgroundColor: "#6A7987"
        }),
    },
    //#endregion

    //#region 標題列 路線分頁
    titleBarBusRouteCallCarTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-grid",
            margin: (props.isActive ? 0 : "0 1px 0 0"),
            lineHeight: "32px",
            height: (props.isActive ? "56px" : "100%"),
            fontSize: "14px",
            cursor: "pointer",
            width: "160px",
            color: (props.isActive ? "rgba(0, 0, 0, 0.85)" : "#FFFFFF"),
            boxShadow: (props.isActive ? "inset 0px 8px 0px #1890FF" : ""),
            // borderTop: (props.isActive ? "solid 8px #1890FF" : "unset"),
            backgroundColor: (props.isActive ? "#FFFFFF" : "#9DADBE"),
            textAlign: "center",
            alignItems: "center"
        }),
    },
    //#endregion

}