export default {
    //#region 詳細資料

    //#region 線上檔案展 詳細資料 上側容器
    detailTopContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-flex",
            width: "100%",
            padding: "0 0 57px",
            borderBottom: "1px solid #AD9D72"
        }),
    },
    //#endregion

    //#region 詳細資料 圖片
    exhibitionDetailImg: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "50%",
                // height: "370px",
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
                // height: "370px",
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

    //#region 線上檔案展 詳細資料 標題
    detailTitle: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "28px",
            borderLeft: "5px solid #AD9D72",
            margin: "0 0 40px",
            padding: " 0 0 0 24px"
        }),
    },
    //#endregion

    //#region 線上檔案展 詳細資料 日期
    detailDateTimeText: {
        basic: (style, props) => ({
            ...style,
            // position: "absolute",
            margin: "0 0 40px",
            width: "100%",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "16px",
        }),
    },
    //#endregion

    //#region 下載 容器
    downloadContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "calc( 100% - 68px )",
            padding: "0 0 0 21px",
            borderLeft: "1px solid #AD9D72",
            alignContent: "baseline"
            // alignContent: "flex-end"
            // margin: "0 0 14px"
        }),
    },
    //#endregion

    //#region 下載 按鈕
    downloadButton: {
        basic: (style, props) => ({
            ...style,
            width: props.width < 1440 ? "100%" : "50%",
            height: "50px",
            backgroundColor: "#606060",
            borderRadius: "44px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "50px",
            padding: "0 24px",
            color: "#FFFFFF",
            margin: "8px 0 0"
        }),
    },
    //#endregion

    //#region 下載 圖標
    downloadSvg: {
        position: "absolute",
        right: "24px",
        top: "12px"
    },
    //#endregion

    //#region 連結 按鈕
    connectButton: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            height: "50px",
            backgroundColor: "#606060",
            borderRadius: "44px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "50px",
            padding: "0 24px",
            color: "#FFFFFF",
            margin: "8px 0 0"
        }),
    },
    //#endregion

    //#region 連結 圖標
    connectSvg: {
        position: "absolute",
        right: "24px",
        top: "12px"
    },
    //#endregion

    //#region 詳細資料 內文
    textEditor: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "45px 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        viewTypeTextEditorContainer: {
            basic: (style, props) => ({
                ...style,
                height: "auto"
            })
        },
        viewTypeTextEditor: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
                wordBreak: "break-all"
            })
        },
        container: {
            basic: (style, props) => ({
                ...style,
                padding: "0 0 24px 0",
                display: "inline-block",
                ...style.occupy(12),
            })
        },
        textEditor: {
            basic: (style, props) => ({
                ...style,
                height: "auto",
            })
        },
    },
    //#endregion

    //#region 回上一頁 容器
    goBackContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            justifyContent: "center"
        }),
    },
    //#endregion

    //#region 回上一頁 按鈕
    goBackButton: {
        basic: (style) => ({
            ...style,
            width: "176px",
            height: "50px",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px",
            padding: "0",
            color: "#272727",
            backgroundColor: "#AD9D72",
            borderColor: "#AD9D72",
            // borderRadius: "2px",
            margin: 0
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "rgba(173, 157, 114, 0.85)"
        }),
        focus: (style, props) => ({})
    },
    //#endregion

    //#region 回上一頁 圖標
    goBackSvg: {
        position: "relative",
        top: "4px"
    },
    //#endregion

    //#region 相關影音圖
    relatedImgText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 700,
            fontSize: "32px",
            lineHeight: "28px",
            color: "#AD9D72",
            margin: "50px 0"
        }),
    },
    //#endregion

    //#region 相關影音圖 圖片
    relatedImg: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: props.isMiddle ? "34%" : "33%",
                height: "230px",
                padding: props.isMiddle ? "0 12px" : 0,
                margin: "20px 0 0"
                // flexGrow: 1
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
                width: props.isMiddle ? "34%" : "33%",
                height: "230px",
                padding: props.isMiddle ? "0 12px" : 0,
                margin: "20px 0 0"
                // flexGrow: 1
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
                height: "100%",
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

    //#endregion

    //#endregion
}
