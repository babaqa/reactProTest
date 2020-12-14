export default {
    //#region 大於1024的畫面 (laptop)
    //#region 外部傳入頂部組件容器 (laptop)
    laptopOutsideOutContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
                backgroundColor: "transparent",
                backgroundImage: "none",
                backgroundPosition: "0% 0%",
                backgroundRepeat: "repeat",
                backgroundSize: "auto auto",
                cursor: "auto",
                whiteSpace: "normal",
                textAlign: 'initial',
                fontSize: "medium",
                color: '#000',
                //#endregion
                //#region 覆寫樣式
                width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                top: "114px",
                left: props.collapse ? "4rem" : "15rem",
                height: "auto",
                userSelect: "none",
                padding: props?.outSideTopComponent ? "24px" : "0px"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (laptop)
    laptopOutContainer: {
        basic: (style, props) => {
            // console.log(style, props)
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
                backgroundColor: "transparent",
                backgroundImage: "none",
                backgroundPosition: "0% 0%",
                backgroundRepeat: "repeat",
                backgroundSize: "auto auto",
                cursor: "auto",
                whiteSpace: "normal",
                textAlign: 'initial',
                fontSize: "medium",
                color: '#000',
                //#endregion
                //#region 覆寫樣式
                width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                top: "114px",
                left: props.collapse ? "4rem" : "15rem",
                height: `calc( 100vh - 114px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (laptop)
    laptopScrollBar: {
        basic: {
            maxHeight: "100%",
            maxWidth: "100%",
            height: "100%",
            width: "100%"
        },
        scrollbarTrackX: {
            height: "8px",
            display: "block"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            //right:"8px", // nested
            width: "8px",
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },
    //#endregion
    //#region 容器內 ScrollBar 下容器 (laptop)
    laptopContentContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            padding: "0px 24px 24px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion

    //#region 小於等於1024的畫面 (basic)
    //#region 外部傳入頂部組件容器 (basic)
    basicOutsideOutContainer: {
        basic: (style, props) => {
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
                backgroundColor: "transparent",
                backgroundImage: "none",
                backgroundPosition: "0% 0%",
                backgroundRepeat: "repeat",
                backgroundSize: "auto auto",
                cursor: "auto",
                whiteSpace: "normal",
                textAlign: 'initial',
                fontSize: "medium",
                color: '#000',
                //#endregion
                //#region 覆寫樣式
                //margin: `0 0.5rem 0 ${Collapse ? "1rem" : "1.5rem"}`,
                width: "100%",
                top: "114px",
                padding: props?.outSideTopComponent ? "24px" : "0px",
                userSelect: "none",
                height: "auto",
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (basic)
    basicOutContainer: {
        basic: (style, props) => {
            return {
                //#region 基本設置
                boxSizing: "border-box",
                position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
                // width: "auto",
                minWidth: '0',//修復滾動條 x 方向
                // height: "auto",
                lineHeight: "normal",
                backgroundColor: "transparent",
                backgroundImage: "none",
                backgroundPosition: "0% 0%",
                backgroundRepeat: "repeat",
                backgroundSize: "auto auto",
                cursor: "auto",
                whiteSpace: "normal",
                textAlign: 'initial',
                fontSize: "medium",
                color: '#000',
                //#endregion
                //#region 覆寫樣式
                //margin: `0 0.5rem 0 ${Collapse ? "1rem" : "1.5rem"}`,
                width: "100%",
                top: "114px",
                height: `calc( 100vh - 114px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (basic)
    basicScrollBar: {
        basic: {
            maxHeight: "100%",
            maxWidth: "100%",
            height: "100%",
            width: "100%"
        },
        scrollbarTrackX: {
            height: "8px",
            display: "block"
        },
        scrollbarThumbX: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear"
        },
        scrollbarTrackY: {
            //right:"8px", // nested
            width: "8px",
            display: "block"
        },
        scrollbarThumbY: {
            backgroundImage: "linear-gradient(90deg, rgba(144, 147, 153, 0.3) 100%, rgba(144, 147, 153, 0.3) 100%)",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },
    //#endregion
    //#region 容器內 ScrollBar 下容器 (basic)
    basicContentContainer: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            padding: "0px 24px 24px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion
}