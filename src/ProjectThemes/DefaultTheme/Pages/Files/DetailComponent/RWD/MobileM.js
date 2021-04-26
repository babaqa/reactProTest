export default {
    //#region 詳細資料

    //#region 線上檔案展 詳細資料 外側容器
    detailOutContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "0 30px"
        }),
    },
    //#endregion

    //#region 詳細資料 圖片
    exhibitionDetailImg: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "178px",
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
                // height: "178px",
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

    //#region 線上檔案展 詳細資料 標題
    detailTitle: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "28px",
            borderLeft: "5px solid #AD9D72",
            margin: "12px 0",
            padding: " 0 0 0 24px"
        }),
    },
    //#endregion

    //#region 線上檔案展 詳細資料 日期
    detailDateTimeText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "16px",
            textAlign: "right"
        }),
    },
    //#endregion

    //#region 下載 容器
    downloadContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "21px 0",
            borderBottom: "1px solid #AD9D72",
            // margin: "0 0 14px"
        }),
    },
    //#endregion

    //#region 下載 按鈕
    downloadButton: {
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
            color: "#FFFFFF"
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

    //#region 詳細資料 內文
    textEditor: {
        viewTypeContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "14px 0",
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

    //#region 相關影音圖
    relatedImgText: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "28px",
            color: "#AD9D72",
            margin: "0 0 6px"
        }),
    },
    //#endregion

    //#region 相關影音圖 圖片
    relatedImg: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "190px",
                padding: "6px 0",
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
                // height: "190px",
                padding: "6px 0",
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
