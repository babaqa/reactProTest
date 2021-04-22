export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
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
                    minHeight: `calc( ${props.height}px + 280px)`,
                }
            }
        },
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

    //#region 無資料表單區容器
    noDataContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // padding: "24px 12px",
                margin: 0,
                background: "transparent",
                // boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.15)",
                height: `calc( ${props.height}px - 273px)`,
                width: "100%",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        }
    },
    //#endregion

    //#region 每一行資料容器
    lineContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            // height: "65px",
            display: "inline-block",
            margin: "0 0 12px",
            borderBottom: "1px solid #C4C4C4",
        }),
    },
    //#endregion

    //#region 日期 文字
    dateTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "16px",
            color: "#B0B0B0",
            margin: "0 0 8px",
            width: "100%"
        }),
    },
    //#endregion

    //#region 資料標題 文字
    dataTitleText: {
        basic: (style, props) => ({
            ...style,
            // display: "inline-block",
            display: "-webkit-box",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#5F5D56",
            width: "100%",
            // whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            padding: "0 24px 6px 0",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical"
        }),
    },
    //#endregion

    //#region 向右箭頭 圖標
    rightArrow: {
        position: "absolute",
        right: "10px",
        top: "7px"
    },
    //#endregion

    //#endregion
}
