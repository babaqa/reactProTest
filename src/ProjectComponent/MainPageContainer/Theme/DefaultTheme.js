export default {
    //#region 大於1440的畫面 (laptopL)
    //#region 外部傳入頂部組件容器 (laptopL)
    laptopLOutsideOutContainer: {
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "95px",
                // left: props.collapse ? "4rem" : "15rem",
                height: "auto",
                userSelect: "none",
                padding: props?.outSideTopComponent ? "24px" : "0px"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (laptopL)
    laptopLOutContainer: {
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "95px",
                // left: props.collapse ? "4rem" : "15rem",
                // height: `calc( 100vh - 95px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                height: `calc( 100vh - 117px )`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (laptopL)
    laptopLScrollBar: {
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
            background: "white",
            opacity: 0.3,
            transition: "opacity 0s linear",
            right: "0px",
            left: "0px"
        }
    },
    //#endregion

    //#region 右方黏著容器
    laptopLRightStickyContainer: {
        basic: (style, props) => ({
            position: "fixed",
            right: 0,
            top: "95px",
            width: "95px",
            height: "100%",
            background: "rgba(75, 75, 75, 1)",
            display: "flex",
            justifyContent: "center",
            zIndex: 99,
        })
    },
    //#endregion

    //#region 右方上黏著線容器
    laptopLRightStickyTopLineContainer: {
        basic: (style, props) => ({
            position: "fixed",
            bottom: "calc(0% + 638px)",
            width: "55px",
            height: "1px",
            background: "rgba(165, 164, 162, 1)",
        })
    },
    //#endregion

    //#region 右方黏著容器左方文字
    laptopLRightStickyLeftText: {
        basic: (style, props) => ({
            position: "fixed",
            bottom: "calc(0% + 278px)",
            width: "20px",
            height: "auto",
            color: "rgba(165, 164, 162, 1)",
            lineHeight: "34px",
            fontSize: "20px",
            right: "55px",
        })
    },
    //#endregion

    //#region 右方黏著容器右方文字
    laptopLRightStickyRightText: {
        basic: (style, props) => ({
            position: "fixed",
            bottom: "calc(0% + 278px)",
            width: "20px",
            height: "auto",
            color: "rgba(165, 164, 162, 1)",
            lineHeight: "34px",
            fontSize: "20px",
            right: "20px",
        })
    },
    //#endregion

    //#region 右方下黏著線容器
    laptopLRightStickyBottomLineContainer: {
        basic: (style, props) => ({
            position: "fixed",
            // top: "645px",
            bottom: "calc(0% + 258px)",
            width: "55px",
            height: "1px",
            background: "rgba(165, 164, 162, 1)",
        })
    },
    //#endregion

    //#region 右方回到頁頂容器
    laptopLRightStickygoTopContainer: {
        basic: (style, props) => ({
            display: "flex",
            position: "fixed",
            height: "258px",
            width: "95px",
            // top: "678px",
            bottom: "0%",
            textAlign: "center",
            justifyContent: "center"
        }),
        hover: {
            background: "grey",
            cursor: "pointer",
        }
    },
    //#endregion

    //#region 容器內 ScrollBar 下容器 (laptopL)
    laptopLContentContainer: {
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
            padding: "0px 24px 188px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region Footer左上區塊容器
    laptopLFooterLeftBlockContainer: {
        basic: (style, props) => ({
            position: "absolute",
            bottom: "71px",
            background: "rgba(173, 157, 114, 1)",
            width: "calc(100% - 362px)",
            height: "506px",
            left: "0",
            zIndex: 98,
            justifyContent: "center",
            display: "flex",
            alignItems: "center"
        })
    },
    //#endregion

    //#region Footer左上區塊左方容器
    laptopLFooterLeftBlockFirstContentContainer: {
        basic: (style, props) => ({
            width: "60%",
            // margin: "193px 0 0 0",
            padding: "0 50px",
            height: "auto",
        })
    },
    //#endregion
    //#region Footer左上區塊右方容器
    laptopLFooterLeftBlockSecondContentContainer: {
        basic: (style, props) => ({
            width: "40%",
            // margin: "193px 0 0 0",
            padding: "0 50px",
            height: "auto",
        })
    },
    //#endregion

    //#region Footer線容器
    laptopLFooterLineContainer: {
        basic: (style, props) => ({
            width: "100%",
            background: "rgba(255, 255, 255, 1)",
            height: "2px",
            bottom: "16px",
            margin: 0,
            position: "relative",
        })
    },
    //#endregion

    //#region Footer左上區塊標題
    laptopLFooterLeftBlockTitle: {
        basic: (style, props) => ({
            width: "100%",
            fontFamily: "Roboto",
            fontSize: "62px",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 1)",
            position: "relative",
            /* left          : "80px", */
            letterSpacing: "15px",
            margin: "50px 0 0 0"
        })
    },
    //#endregion

    //#region Footer左上區塊內文
    laptopLFooterLeftBlockContent: {
        basic: (style, props) => ({
            width: "100%",
            position: "relative",
            /* left          : "80px", */
            fontFamily: "Roboto",
            fontSize: "22px",
            fontWeight: 400,
            letterSpacing: "5px",
        })
    },
    //#endregion


    //#region Footer下方區塊容器
    laptopLFooterBottomBlockContainer: {
        basic: (style, props) => ({
            position: "absolute",
            bottom: "0",
            background: "rgba(75, 75, 75, 1)",
            width: "100%",
            height: "208px",
            left: "0",
            zIndex: 97,
        })
    },
    //#endregion

    //#region Footer下方區塊文字
    laptopLFooterBottomBlockText: {
        basic: (style, props) => ({
            color: "rgba(255, 255, 255, 1)",
            width: "100%",
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "18px",
            position: "absolute",
            bottom: "24px",
            textAlign: "center",
        })
    },
    //#endregion
    //#region COPYRIGHT
    laptopLCopyRight: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FF7A45",
            position: "absolute",
            bottom: "18px",
            left: "14%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 單位資訊 
    laptopLUnitInfo: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "28px",
            position: "absolute",
            bottom: "44px",
            left: "43%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion

    //#region 大於等於1024 與 小於1440的畫面 (laptop)
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "95px",
                // left: props.collapse ? "4rem" : "15rem",
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "95px",
                // left: props.collapse ? "4rem" : "15rem",
                height: `calc( 100vh - 95px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
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

    //#region 右方黏著容器
    laptopRightStickyContainer: {
        basic: (style, props) => ({
            position: "fixed",
            right: 0,
            top: "95px",
            width: "95px",
            height: "100%",
            background: "rgba(75, 75, 75, 1)",
            display: "flex",
            justifyContent: "center",
            zIndex: 99,
        })
    },
    //#endregion

    //#region 右方上黏著線容器
    laptopRightStickyTopLineContainer: {
        basic: (style, props) => ({
            position: "fixed",
            bottom: "calc(0% + 638px)",
            width: "55px",
            height: "1px",
            background: "rgba(165, 164, 162, 1)",
        })
    },
    //#endregion

    //#region 右方黏著容器左方文字
    laptopRightStickyLeftText: {
        basic: (style, props) => ({
            position: "fixed",
            bottom: "calc(0% + 278px)",
            width: "20px",
            height: "auto",
            color: "rgba(165, 164, 162, 1)",
            lineHeight: "34px",
            fontSize: "20px",
            right: "55px",
        })
    },
    //#endregion

    //#region 右方黏著容器右方文字
    laptopRightStickyRightText: {
        basic: (style, props) => ({
            position: "fixed",
            bottom: "calc(0% + 278px)",
            width: "20px",
            height: "auto",
            color: "rgba(165, 164, 162, 1)",
            lineHeight: "34px",
            fontSize: "20px",
            right: "20px",
        })
    },
    //#endregion

    //#region 右方下黏著線容器
    laptopRightStickyBottomLineContainer: {
        basic: (style, props) => ({
            position: "fixed",
            // top: "645px",
            bottom: "calc(0% + 258px)",
            width: "55px",
            height: "1px",
            background: "rgba(165, 164, 162, 1)",
        })
    },
    //#endregion

    //#region 右方回到頁頂容器
    laptopRightStickygoTopContainer: {
        basic: (style, props) => ({
            display: "flex",
            position: "fixed",
            height: "258px",
            width: "95px",
            // top: "678px",
            bottom: "0%",
            textAlign: "center",
            justifyContent: "center"
        }),
        hover: {
            background: "grey",
            cursor: "pointer",
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
            padding: "0px 24px 188px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion

    //#region Footer左上區塊容器
    laptopFooterLeftBlockContainer: {
        basic: (style, props) => ({
            position: "absolute",
            bottom: "38px",
            background: "rgba(173, 157, 114, 1)",
            width: "calc(100% - 193px)",
            height: "270px",
            left: "0",
            zIndex: 98,
            justifyContent: "center",
            display: "flex",
            alignItems: "center"
        })
    },
    //#endregion

    //#region Footer左上區塊左方容器
    laptopFooterLeftBlockFirstContentContainer: {
        basic: (style, props) => ({
            width: "60%",
            // margin: "193px 0 0 0",
            padding: "0 30px 0 90px",
            height: "270px",
        })
    },
    //#endregion
    //#region Footer左上區塊右方容器
    laptopFooterLeftBlockSecondContentContainer: {
        basic: (style, props) => ({
            width: "40%",
            // margin: "193px 0 0 0",
            padding: "0 90px 0 30px",
            height: "270px",
        })
    },
    //#endregion

    //#region Footer左上區塊標題
    laptopFooterLeftBlockTitle: {
        basic: (style, props) => ({
            width: "100%",
            fontFamily: "Roboto",
            fontSize: "31px",
            fontWeight: 700,
            lineHeight: "36px",
            color: "rgba(255, 255, 255, 1)",
            position: "relative",
            top: "105px",
            /* left          : "80px", */
            letterSpacing: "15px",
            margin: "8px 0 0 0",
            borderBottom: "1px solid #ffffff",
        })
    },
    //#endregion

    //#region Footer左上區塊內文
    laptopFooterLeftBlockContent: {
        basic: (style, props) => ({
            width: "100%",
            position: "relative",
            /* left          : "80px", */
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "16px",
            color: "##606060",
            top: "105px",
            letterSpacing: "5px",
            margin: "6px 0 0 0",
        })
    },
    //#endregion


    //#region Footer下方區塊容器
    laptopFooterBottomBlockContainer: {
        basic: (style, props) => ({
            position: "absolute",
            bottom: "0",
            background: "rgba(75, 75, 75, 1)",
            width: "100%",
            height: "111px",
            left: "0",
            zIndex: 97,
        })
    },
    //#endregion

    //#region Footer下方區塊文字
    laptopFooterBottomBlockText: {
        basic: (style, props) => ({
            color: "rgba(255, 255, 255, 1)",
            width: "100%",
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "14px",
            position: "absolute",
            lineHeight: "16px",
            bottom: "11px",
            textAlign: "center",
        })
    },
    //#endregion //#endregion

    //#region 大於等於768 與 小於1024的畫面 (tablet)
    //#region 外部傳入頂部組件容器 (tablet)
    tabletOutsideOutContainer: {
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "60px",
                // left: props.collapse ? "4rem" : "15rem",
                height: "auto",
                userSelect: "none",
                padding: props?.outSideTopComponent ? "24px" : "0px"
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器 (tablet)
    tabletOutContainer: {
        basic: (style, props) => {
            // console.log(style, props.height)
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
                // width: `calc( 100% - ${props.collapse ? "4rem" : "15rem"})`,
                width: "100%",
                top: "60px",
                // left: props.collapse ? "4rem" : "15rem",
                height: `calc( ${props.height}px - 80px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
                //#endregion
            }
        }
    },
    //#endregion
    //#region 容器內滾動條 (tablet)
    tabletScrollBar: {
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
    //#region 容器內 ScrollBar 下容器 (tablet)
    tabletContentContainer: {
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
            padding: "0px 24px 188px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region COPYRIGHT
    tabletCopyRight: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FF7A45",
            position: "absolute",
            bottom: "14px",
            left: "14%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#region 單位資訊 
    tabletUnitInfo: {
        basic: (style, props) => ({
            //#region BasicContainer 原生樣式
            boxSizing: "border-box",
            // position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            // backgroundColor: "#ffffff",
            // backgroundImage: "none",
            // backgroundPosition: "0% 0%",
            // backgroundRepeat: "repeat",
            // backgroundSize: "auto auto",
            // cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'normal',
            // fontSize: "medium",
            // color: '#000',
            //#endregion 
            //#region 覆寫樣式
            cursor: "default",
            userSelect: "none",
            height: "auto",
            //#endregion
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "28px",
            position: "absolute",
            bottom: "64px",
            left: "14%"
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion

    //#region 小於768的畫面 (basic)
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
                top: "60px",
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
            // console.log(style, props.height)
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
                top: "60px",
                height: `calc( ${props.height}px - 56px ${props?.outSideTopComponentHeight && `- ${props?.outSideTopComponentHeight}px `})`,
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
            padding: "0px 24px 204px"
            //#endregion
        }),
        hover: {
            //backgroundColor: "#d9d9d9"
        }
    },
    //#endregion
    //#endregion
}