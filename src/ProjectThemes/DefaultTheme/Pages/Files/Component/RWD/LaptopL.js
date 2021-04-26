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
                height: `calc( ${props.height}px - 452px)`,
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
            height: "72px",
            display: "flex",
            padding: "8px",
            borderBottom: "2px solid #C4C4C4",
        }),
    },
    //#endregion

    //#region 日期 文字
    dateTimeText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "16px",
            color: "#B0B0B0",
            padding: "18px 12px"
        }),
    },
    //#endregion

    //#region 資料標題 文字
    dataTitleText: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            fontWeight: 400,
            fontSize: "16px",
            color: "#5F5D56",
            padding: "18px 12px",
            width: "calc( 100% - 104px )",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
        }),
    },
    //#endregion


    //#region 線上檔案展
    //#region 列表
    //#region 輪播容器
    carouselContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "455px",
            backgroundColor: "#C4C4C4"
        }),
    },
    //#endregion

    //#region 展覽資料 外側容器
    exhibitionOutContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            margin: "104px 0 0"
        }),
    },
    //#endregion

    //#region 年度 文字
    exhibitionYearText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            color: "#AD9D72",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "21px",
            fontFanily: "Roboto",
            margin: "0 0 34px",
            textAlign: "right"
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
    exhibitionContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            flexDirection: props.reverse ? "row-reverse" : "row",
            width: "100%",
            height: "324px",
            margin: "0 0 78px"

        }),
    },
    //#endregion

    //#region 詳細資料 圖片
    exhibitionImg: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "50%",
                // height: "324px",
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
                width: "50%",
                // height: "324px",
                display: "inline-block",
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
                display: "inline-flex",
                flexDirection: "column",
                justifyContent: "center"
            })
        },
        viewTypeFileInput: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                height: "auto",
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

    //#region 展覽資料 內側容器
    exhibitionInsideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "50%",
            height: "324px",
            verticalAlign: "top",
            margin: props.reverse ? "0 10% 0 0" : "0 0 0 10%"
        }),
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
            fontSize: "28px",
            lineHeight: "32px",
            color: "#AD9D72",
            margin: "0 0 20px"
        }),
    },
    //#endregion

    //#region 日期 文字
    exhibitionDateTimeText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "21px",
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
            fontSize: "22px",
            lineHeight: "26px",
            color: "#5F5D56",
            margin: "0 0 26px"
        }),
    },
    //#endregion

    //#region 檔案展內容 文字
    exhibitionContentText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "223px",
            fontWeight: 500,
            fontSize: "22px",
            lineHeight: "33px",
            color: "#5F5D56",
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 7
        }),
    },
    //#endregion

    //#endregion

    //#endregion
    //#endregion
}
