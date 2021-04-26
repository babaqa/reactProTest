export default {
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
            padding: "0 24px 3px 0",
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

    //#region 線上檔案展
    //#region 列表
    //#region 輪播容器
    carouselContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "160px",
            backgroundColor: "#C4C4C4"
        }),
    },
    //#endregion

    //#region 年度 文字
    exhibitionYearText: {
        basic: (style, props) => ({
            ...style,
            color: "#AD9D72",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "21px",
            fontFanily: "Roboto",
            margin: "24px 0"
        }),
    },
    //#endregion

    //#region 年度 下拉式選單
    exhibitionYearSelector: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                width: "160px"
                // ...style.occupy(4),
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 12px",
                display: "inline-block",
                // ...style.occupy(4),
                width: "160px"
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
                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                }
            }
        },
        dateTimePickerSubContainer: {
            basic: (style, props) => ({
                ...style,
                height: "25px",
            })
        },
        bottomLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
                // minHeight: "24px",
                // height: "auto"
            })
        }
    },
    //#endregion

    //#region 展覽資料 容器
    exhibitionContentContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            margin: "0 0 30px"
        }),
    },
    //#endregion

    //#region 展覽資料 圖片
    exhibitionImg: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "100%",
                padding: 0,
                flexGrow: 1
            })
        },
        topLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "100%",
                padding: 0,
                flexGrow: 1
            })
        },
        viewTypeTextInputContainer: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "100%",
                minHeight: "100%",
            })
        },
        viewTypeFileInput: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "auto",
                minHeight: "100%",
                padding: 0,
            })
        },
        viewTypeTopLabel: {
            basic: (style, props) => ({
                ...style,
                height: "0px"
            })
        },
    },
    //#endregion

    //#region 順序編號 文字
    exhibitionIndexText: {
        basic: (style, props) => ({
            ...style,
            display: "flex",
            alignItems: "center",
            width: "100%",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "32px",
            color: "#AD9D72",
            padding: "9px 0"
        }),
    },
    //#endregion

    //#region 日期 文字
    exhibitionDateTimeText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "18px",
            color: "#B0B0B0",
            margin: "0 0 0 16px"
        }),
    },
    //#endregion

    //#region 檔案展 標題
    exhibitionTitle: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "21px",
            color: "#5F5D56",
            margin: "0 0 10px"
        }),
    },
    //#endregion

    //#region 檔案展內容 文字
    exhibitionContentText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "21px",
            color: "#5F5D56",
        }),
    },
    //#endregion

    //#endregion

    //#endregion
}
