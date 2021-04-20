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
        }
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
            padding: "162px 0 0 0"
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

}