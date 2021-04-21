export default {
    //#region 展開Menu
    container: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            position: "fixed",
            width: "100%",
            height: "calc( 100% - 60px )",
            left: 0,
            bottom: 0,
            backgroundColor: "#2E2E2E",
            //boxShadow: "inset -1px 0px 0px #f0f0f0"
            //#endregion
        }
    },
    logoArea: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            width: "15rem",
            height: "4rem",
            left: 0,
            top: 0,
            backgroundColor: "#1890ff",
            borderRight: "1px solid #ffffff"
            //boxShadow: "inset -1px 0px 0px #ffffff"
            //#endregion
        }
    },
    menuAreaScrollBar: {
        basic: {
            width: "100%",
            height: "100%",
            // borderRight: "1px solid #f0f0f0",
            // boxSizing: "border-box",
        },
        content: (style, props) => ({
            // height: `calc( ${props.height}px - 60px )`
            height: "100%"
        }),
    },
    menuArea: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            height: "100%",
            //height: "100rem",//"fit-content",//"calc( 100% - 4rem )",
            backgroundColor: "transparent",
            padding: "162px 0 576px 0"
            //#endregion
        }
    },
    //#endregion

    //#region 收合Menu
    collapseContainer: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            position: "fixed",
            width: "0px",
            height: "100%",
            right: 0,
            top: 0,
            backgroundColor: "#ffffff",
            zIndex: 2
            //boxShadow: "inset -1px 0px 0px #f0f0f0"
            //#endregion
        }
    },
    collapseLogoArea: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            width: "0px",
            height: "0px",
            right: 0,
            top: 0,
            backgroundColor: "#1890ff",
            borderRight: "1px solid #ffffff"
            //boxShadow: "inset -1px 0px 0px #ffffff"
            //#endregion
        }
    },
    collapseMenuAreaScrollBar: {
        basic: {
            width: "4rem",
            maxWidth: "4rem",
            height: "calc( 100% - 4rem )",
            maxHeight: "calc( 100% - 4rem )",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    collapseMenuArea: {
        basic: {
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",
            color: "#d25959",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            //height: "100rem",//"fit-content",//"calc( 100% - 4rem )",
            right: 0,
            top: 0,
            backgroundColor: "#ffffff",
            padding: "24px 0 0 0"
            //#endregion
        }
    },
    //#endregion

    //#region Footer左上區塊容器
    mobileMFooterLeftBlockContainer: {
        basic: (style, props) => ({
            position: "absolute",
            bottom: "-363px",
            background: "rgba(173, 157, 114, 1)",
            width: "100%",
            height: "334px",
            left: "0",
            zIndex: 98,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "74px 54px 19px"
        })
    },
    //#endregion

    //#region Footer左上區塊標題
    mobileMFooterLeftBlockTitle: {
        basic: (style, props) => ({
            width: "100%",
            fontFamily: "Roboto",
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: "26px",
            color: "rgba(255, 255, 255, 1)",
            position: "relative",
            // top: "105px",
            /* left          : "80px", */
            letterSpacing: "15px",
            margin: "0 0 3px",
            borderBottom: "1px solid #ffffff",
        })
    },
    //#endregion

    //#region Footer左上區塊內文
    mobileMFooterLeftBlockContent: {
        basic: (style, props) => ({
            width: "100%",
            position: "relative",
            /* left          : "80px", */
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "16px",
            color: "##606060",
            // top: "105px",
            letterSpacing: "5px",
            margin: "0 0 15px",
        })
    },
    //#endregion


    //#region Footer下方區塊容器
    mobileMFooterBottomBlockContainer: {
        basic: (style, props) => ({
            position: "absolute",
            bottom: "-423px",
            background: "rgba(75, 75, 75, 1)",
            width: "100%",
            height: "60px",
            left: "0",
            zIndex: 97,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        })
    },
    //#endregion

    //#region Footer下方區塊文字
    mobileMFooterBottomBlockText: {
        basic: (style, props) => ({
            color: "rgba(255, 255, 255, 1)",
            width: "75%",
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18px",
        })
    },
    //#endregion 

}