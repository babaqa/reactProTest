export default {
    //#region Table區域
    //#region Table容器
    tableContainer: {
        basic: (style, props) => ({
            ...style,
            height: "calc( 100vh - 211px - 48px)",
            width: "100%",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "16px"
        })
    },
    //#endregion

    //#region 公告 身份 Tag 區域
    newsIdentityTag: {
        //#region Tag樣式
        //#region 長照
        caseNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#EF6C00",
                    backgroundColor: "#FFF3E0",
                    borderColor: "#FF9800"
                }),
                hover: {}
            }
        },
        //#endregion
        //#region 共享車隊
        whiteNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#558B2F",
                    backgroundColor: "#E8F5E9",
                    borderColor: "#4CAF50"

                }),
                hover: {}
            }
        },
        //#endregion
        //#region 巴士
        busNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#00838F",
                    backgroundColor: "#E0F7FA",
                    borderColor: "#00838F"

                }),
                hover: {}
            }
        },
        //#endregion  
        //#region 無此身份
        unknownNews: {
            container: {
                basic: (style, props) => ({
                    ...style,
                    margin: "0 0 0 0",
                    // top: "3px",
                    padding: "0px 7px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    // color: "#2F54EB",
                    // backgroundColor: "#F0F5FF",
                    // borderColor: "#ADC6FF"

                }),
                hover: {}
            }
        },
        //#endregion      
    },

    //#region Modal 樣式
    newsModal: {
        container: {
            basic: (style, props) => ({
                ...style,
                width: "696px"
            }),
            tablet: (style, props) => ({
            }),
        },
        contentContainer: {
            basic: (style, props) => ({
                ...style,
                padding: "24px",
                zIndex: 100
            }),
        }
    },
    //#endregion
}