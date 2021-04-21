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
}