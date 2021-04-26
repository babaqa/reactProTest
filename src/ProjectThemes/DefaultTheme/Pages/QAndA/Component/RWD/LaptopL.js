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
            padding: "18px 12px",
            width:"100px"
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
            width: "calc( 100% - 100px - 104px)",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
        }),
    },
    //#endregion

    //#region 下載右方資料Icon容器
    downloadsDataIconContainer: {
        basic: (style) => ({
            ...style,
            width: "104px",
            height: "56px",
            display: "inline-flex",
            justifyContent: "flex-end",
            alignItems: "center"
        }),
    },
    //#endregion
    //#region 下載右方資料Icon
    downloadDataIcon: {
        // margin: "0 0 0 14px",
        // cursor: "pointer",
    },
    //#endregion

    //#endregion
}
