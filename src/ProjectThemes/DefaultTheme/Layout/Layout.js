export default {
    //#region 大於1024的畫面 (laptop)
    laptopBackstageLeftSideMenuBarLogo: (Collapse) => ({
        margin: `0 0.5rem 0 ${Collapse ? "1rem" : "1.5rem"}`,
        height: "4rem"
    }),
    laptopBackstageLeftSideMenuBarLogoText: {
        basic: (style) => ({
            ...style,
            fontSize: "1.125rem",
            fontWeight: 500,//"bold",
            top: "-1.55rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default"
        })
    },
    laptopBackstageTopMenuBar: (Collapse) => ({
        container: {
            basic: (style) => ({
                ...style,
                width: `calc( 100%${Collapse ? " - 4rem" : " - 15rem"} )`
            })
        }
    }),
    laptopBasicButton: {
        container: {
            basic: (style) => ({ ...style, height: "auto", width: "auto", backgroundColor: "transparent", lineHeight: "normal", padding: "0.25rem 0.25rem 0", margin: "0rem 0.75rem 0 1.5rem", }),
            hover: (style => ({ backgroundColor: "rgba(0, 0, 0, 0.1)" }))
        }
    },
    laptopBasicButtonIcon: {
        color: "#fff"
    },
    laptopPageText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            fontWeight: 400,//"bold",
            top: "-0.46rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default",
        })
    },

    //#region 選擇可訪問組織 DropDown 容器
    laptopUseOrgDropDownContainer: {
        basic: (style, props) => ({
            ...style,
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            position: "relative",
            width: "300px",
            height: `${props.height * 32 + 16}px`,
            maxHeight: "300px",
            left: 0,
            top: 0,
            backgroundColor: "#ffffff",
            zIndex: 1,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
            //#endregion
        })
    },
    //#endregion

    //#region 選擇可訪問組織 ScrollBar 
    laptopUseOrgScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    //#endregion

    laptopUserNameText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            margin: "0 1.5rem 0 0",
            fontWeight: 500,//"bold",
            top: "-0.1rem",
            display: "inline-block",
            color: "#fff",
            cursor: "pointer",
        })
    },
    //#region DropDown 項目容器
    laptopDropDownItemContainer: {
        basic: (style, props) => ({
            ...style,
            width: "100%",
            padding: "8px 0px",
            background: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
        })
    },
    //#endregion
    //#region DropDown 子項目
    laptopDropDownSubItemContainer: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(0, 0, 0, 0.65)",
            padding: "8px 24px",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "16px",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "#e6f7ff"
        }),
    },
    //#endregion
    laptopBackstagePageTabBar: (Collapse) => ({
        cantainer: {
            basic: (style, props) => ({
                ...style,
                width: `calc( 100%${Collapse ? " - 4rem" : " - 15rem"} )`,
            })
        }
    }),
    //#endregion
    //#region 小於等於1024的畫面 (basic)
    basicBasicButton: {
        container: {
            basic: (style) => ({
                ...style,
                height: "auto",
                width: "auto",
                backgroundColor: "transparent",
                lineHeight: "normal",
                padding: "0.25rem 0.25rem 0",
                margin: "0rem 0.75rem 0 1.5rem",
            }),
            hover: (style => ({
                backgroundColor: "rgba(0, 0, 0, 0.1)"
            }))
        }
    },
    basicBasicButtonIcon: {
        color: "#fff"
    },
    basicPageText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            fontWeight: 400,//"bold",
            top: "-0.46rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default",
        })
    },
    basicUserNameText: {
        basic: (style) => ({
            ...style,
            fontSize: "0.875rem",
            margin: "0 1.5rem 0 0",
            fontWeight: 500,//"bold",
            top: "-0.1rem",
            display: "inline-block",
            color: "#fff",
            cursor: "pointer",
        })
    },

    //#region 選擇可訪問組織 DropDown 容器
    basicUseOrgDropDownContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            outline: 0,
            userSelect: "none",
            //#endregion
            //#region 覆寫樣式
            position: "relative",
            width: "300px",
            height: `${props.height * 32 + 16}px`,
            maxHeight: "300px",
            left: 0,
            top: 0,
            backgroundColor: "#ffffff",
            zIndex: 1,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
            //#endregion
        })
    },
    //#endregion

    //#region 選擇可訪問組織 ScrollBar 
    basicUseOrgScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    //#endregion

    //#region DropDown 項目容器
    dropDownItemContainer: {
        basic: (style, props) => ({
            ...style,
            padding: "8px 0px",
            background: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
        })
    },
    //#endregion
    //#region DropDown 子項目
    dropDownSubItemContainer: {
        basic: (style, props) => ({
            ...style,
            color: "rgba(0, 0, 0, 0.65)",
            padding: "8px 24px",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "16px",
            cursor: "pointer",
            userSelect: "none"
        }),
        hover: (style, props) => ({
            ...style,
            backgroundColor: "#e6f7ff"
        }),
    },
    //#endregion
    basicLogoArea: {
        basic: (style) => ({
            ...style,
            height: "4rem",
            backgroundColor: "#1890ff",
        })
    },
    basicLogo: {
        margin: `0 0.5rem 0 0.5rem`,
        height: "100%",
        width: "2rem"
    },
    basicLogiText: {
        basic: (style) => ({
            ...style,
            fontSize: "1rem",
            fontWeight: 500,//"bold",
            top: "-1.55rem",
            display: "inline-block",
            color: "#fff",
            cursor: "default",
        })
    },
    menuAreaScrollBar: {
        basic: {
            width: "100%",
            maxWidth: "15rem",
            height: "calc( 100% - 4rem )",
            maxHeight: "calc( 100% - 4rem )",
            borderRight: "1px solid #f0f0f0",
            boxSizing: "border-box",
        }
    },
    menuArea: {
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
            left: 0,
            top: 0,
            backgroundColor: "#ffffff",
            padding: "24px 0 0 0"
            //#endregion
        }
    },
    basicBackstagePageTabBar: (Collapse) => ({
        container: {
            basic: (style, props) => ({
                ...style,
                width: "100%",
            })
        }
    }),
    //#endregion

}