export default {
    //#region MainPageContainer 背景色調節
    mainPageContainer: {
        basicOutsideOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#FFFFFF",
                    padding: 0
                }
            }
        },
        basicOutContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    height: "calc( 100vh - 197px)",
                }
            }
        },
        basicContentContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    backgroundColor: "#E5E4DB",
                    padding: "4px 0 236px",
                    minHeight: "calc( 100vh - 197px)"
                }
            }
        },
    },
    //#endregion

    //#region 查詢日期區間 DateTimeRange
    dateTimeRange: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                // padding: "0 12px",
                display: "inline-block",
                // ...style.occupy(3),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                padding: "8px 16px",
                width: "100%"
                // ...style.occupy(3),
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        dateTimePickerContainer: {
            basic: (style, props) => {
                return {
                    ...style,
                    width: "100%",
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        dateTimePickerSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "28px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                // height: "24px"
                // minHeight: "24px",
                // height: "auto"
                height: "0px"
            })
        }
    },
    //#endregion

    //#region 標題列 聯繫客服分頁
    titleBarRecordTab: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            margin: "0 16px",
            lineHeight: "46px",
            height: "46px",
            fontSize: "14px",
            cursor: "pointer",
            color: (props.isActive ? "#1890FF" : "rgba(0, 0, 0, 0.65)"),
            borderBottom: (props.isActive ? "solid 2px #1890FF" : "unset"),
            width: "calc( 25% - 32px )",
            textAlign: "center"
        }),
    },
    //#endregion

}