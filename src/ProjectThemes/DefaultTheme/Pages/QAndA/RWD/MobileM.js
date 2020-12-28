export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: 0,
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    height: "calc( 100vh - 152px)",
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "4px 0 236px",
                    minHeight: "100%"
                }
            }
        },
    },
    //#endregion

    //#region 標題文字
    titleText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "48px",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "48px",
            textAlign: "center"
        })
    },
    //#endregion

    //#region 常見問題容器
    qAContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "0 0px 24px",
            minHeight: "calc( 100vh - 152px )"
        })
    }
    //#endregion
}