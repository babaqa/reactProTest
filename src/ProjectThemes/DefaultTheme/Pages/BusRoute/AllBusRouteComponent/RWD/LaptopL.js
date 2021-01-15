export default {
    //#region 卡片外側容器
    outsideContainer: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            ...style.occupy(4),
            padding: "8px",
        }),
        laptop: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                ...style.occupy(3),
                padding: "8px",
            }),
        },
        laptopL: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                ...style.occupy(3),
                padding: "12px",
            }),
        }
    },
    //#endregion

    //#region 卡片容器
    cardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                // height: "440px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center"
            }
        },
        laptop: {
            basic: (style, props) => ({
                ...style,
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center"
            }),
        },
        laptopL: {
            basic: (style, props) => ({
                ...style,
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center"
            }),
        }
    },
    //#endregion


    //#region 上傳車輛圖片
    carImgUpload: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                // height: "100%",
                padding: 0
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
                padding: 0
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

    //#region 路線名稱
    routeName: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            marginTop: "24px",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "28px",
            textAlign: "center",
            color: "rgba(0,0,0,0.85)"
        }),
        laptopL: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
                marginTop: "36px",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "28px",
                textAlign: "center",
                color: "rgba(0,0,0,0.85)"
            })
        }
    },
    //#endregion

    //#region 查看時刻表及站點資訊
    checkTime: {
        basic: (style, props) => ({
            ...style,
            display: "inline-block",
            width: "160px",
            margin: "4px 0 12px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
            textAlign: "center",
            color: "#1890FF",
            cursor: "pointer"
        }),
        laptopL: {
            basic: (style, props) => ({
                ...style,
                display: "inline-block",
                width: "160px",
                margin: "8px 0 24px",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                textAlign: "center",
                color: "#1890FF",
                cursor: "pointer"
            }),
        }
    },
    //#endregion

    //#region 查看時刻表及站點資訊 圖標
    checkSvg: {
        position: "relative",
        top: "3px",
        right: "6px"
    },
    //#endregion
}