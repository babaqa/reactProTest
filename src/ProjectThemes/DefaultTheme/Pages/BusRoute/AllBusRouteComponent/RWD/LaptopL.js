export default {
    //#region 卡片外側容器
    outsideContainer: {
        basic: (style, props) => {
            return {
                ...style,
                ...style.occupy(3),
                padding: "12px",
            }
        }
    },
    //#endregion

    //#region 卡片容器
    cardContainer: {
        basic: (style, props) => {
            return {
                ...style,
                height: "440px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "12px"
            }
        }
    },
    //#endregion

    //#region 圖片容器
    mapImg: {
        basic: (style, props) => {
            return {
                ...style,
                width: "100%",
                paddingTop: "100%",
                boxShadow: " inset 0px 0px 1px #F0F0F0",
                color: "#000000"
            }
        }
    },
    //#endregion
}