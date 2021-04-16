import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../Store/Store'
import { BasicContainer, Container, ScrollBar, SubContainer, Text } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as LaptopLCopyright } from '../../Assets/img/LaptopLCopyright.svg'
import { ReactComponent as LaptopCopyright } from '../../Assets/img/LaptopCopyright.svg'
import { ReactComponent as TabletCopyright } from '../../Assets/img/TabletCopyright.svg'
import { ReactComponent as Seal } from '../../Assets/img/Seal.svg'
import { ReactComponent as FooterLogo } from '../../Assets/img/FooterLogo.svg'
import { ReactComponent as GoTop } from '../../Assets/img/GoTop.svg'
// import { ReactComponent as MobileMCopyright } from '../../Assets/img/MobileMCopyright.svg'

//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { background } from '@storybook/theming';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

export const MainPageContainer = React.forwardRef((props, ref) => {

    const { Collapse } = useContext(Context);
    const [Width, Height] = useWindowSize();
    const OutsideOutContainerRef = useRef();
    const [OutSideTopComponentHeight, setOutSideTopComponentHeight] = useState(0)
    const { scrollBarRef } = ref ?? {};
    //const { ref1, ref2 } = ref;

    useEffect(() => {
        setOutSideTopComponentHeight(OutsideOutContainerRef?.current?.clientHeight)
    })

    useEffect(() => {
        window.onscroll = function () {
            // 當瀏覽器捲軸往下捲150px
            if (Width >= 1300) {
                const px = 150;
                if (document.documentElement.scrollTop > px) {
                    console.log("111")
                    // document.getElementsByClassName("navitem__mail_text")[0].style.display = "none";
                    // document.getElementsByClassName("navitem_mail")[0].style.minWidth = "95px";
                    // document.getElementsByTagName("nav")[0].style.width = "971px";
                } else {
                    console.log("222")
                    // document.getElementsByClassName("navitem__mail_text")[0].style.display = "block";
                    // document.getElementsByClassName("navitem_mail")[0].style.minWidth = "182px";
                    // document.getElementsByTagName("nav")[0].style.width = "1058px";
                }
            }
        };
    }, [Width])

    // 回到頂部
    const goTopFunc = () => {
        console.log("goTop")
        window.scrollTo(0, 0);
    }
    return (
        <>
            {/* 大於1440的畫面 (laptop)*/}
            {Width >= 1440 &&
                <>
                    {/* 外部傳入頂部組件容器 (laptopL) */}
                    <BasicContainer
                        ref={OutsideOutContainerRef}
                        {...props.laptopLOutsideOutContainerEvent}
                        className={`laptopLOutsideOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponent: props?.outSideTopComponent }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLOutsideOutContainer") }}
                    >
                        {props.outSideTopComponent}
                    </BasicContainer>

                    {/* 容器 (laptopL) */}
                    <BasicContainer
                        {...props.laptopLOutContainerEvent}
                        className={`laptopLOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponentHeight: OutSideTopComponentHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLOutContainer") }}
                    >
                        {/* 容器內滾動條 (laptopL)*/}
                        <ScrollBar
                            ref={scrollBarRef}
                            autoHide={props.autoHide}
                            className={`laptopLScrollBar`}
                            basedefaulttheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLScrollBar") }}
                        >
                            {/* 容器內 ScrollBar 下容器 (laptopL)*/}
                            <BasicContainer
                                {...props.laptopLContentContainerEvent}
                                className={`laptopLContentContainer`}
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLContentContainer") }} //吃theme
                            >
                                <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLRightStickyContainer") }}>
                                    <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLRightStickyTopLineContainer") }}></Container>
                                    <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLRightStickyLeftText") }}>
                                        藝術文史豐富檔案資產
                                        </Text>
                                    <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLRightStickyRightText") }}>
                                        檔案道盡臺藝古今風華
                                        </Text>
                                    <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLRightStickyBottomLineContainer") }}></Container>
                                    <Container
                                        theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLRightStickygoTopContainer") }}
                                        onClick={() => {
                                            goTopFunc()
                                        }}
                                    >
                                        <GoTop style={{
                                            position: "relative",
                                            top: "126px"

                                        }} />
                                    </Container>
                                </Container>
                                {props.children}

                                <Seal style={{
                                    width: "121px",
                                    position: "absolute",
                                    right: "95px",
                                    bottom: "230px",
                                    filter: "contrast(0.7)",
                                }} />


                                <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockContainer") }}>
                                    <FooterLogo style={{
                                        position: "absolute",
                                        top: "-57px"
                                    }} />
                                    <SubContainer theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockFirstContentContainer") }}                                    >
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockTitle") }}>
                                            ADDRESS
                                        </Text>
                                        <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLineContainer") }}></Container>
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockContent") }}>
                                            220307新北市板橋區大觀路1段59號
                                        </Text>
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockTitle") }}>
                                            TIME
                                        </Text>
                                        <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLineContainer") }}></Container>
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockContent") }}>
                                            Mon~Fri/08:00-12:00.13:30-15:30
                                        </Text>
                                    </SubContainer>
                                    <SubContainer theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockSecondContentContainer") }}>
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockTitle") }}>
                                            TEL
                                        </Text>
                                        <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLineContainer") }}></Container>
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockContent") }}>
                                            02-22722181
                                        </Text>
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockTitle") }}>
                                            FAX
                                        </Text>
                                        <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLineContainer") }}></Container>
                                        <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterLeftBlockContent") }}>
                                            02-29601822
                                        </Text>
                                    </SubContainer>
                                </Container>
                                <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterBottomBlockContainer") }}>
                                    <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopLFooterBottomBlockText") }}>
                                        本網站為國立臺灣藝術大學總務處版權所有，未經允許，不得以任何形式複製和採用
                                    </Text>
                                </Container>
                            </BasicContainer>
                        </ScrollBar>
                    </BasicContainer>
                </>
            }

            {/* 大於1024 與 小於1440的畫面 (laptop)*/}
            {(Width >= 1024 && Width < 1440) &&
                <>
                    {/* 外部傳入頂部組件容器 (laptop) */}
                    <BasicContainer
                        ref={OutsideOutContainerRef}
                        {...props.laptopOutsideOutContainerEvent}
                        className={`laptopOutsideOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponent: props?.outSideTopComponent }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopOutsideOutContainer") }}
                    >
                        {props.outSideTopComponent}
                    </BasicContainer>

                    {/* 容器 (laptop) */}
                    <BasicContainer
                        {...props.laptopOutContainerEvent}
                        className={`laptopOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponentHeight: OutSideTopComponentHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopOutContainer") }}
                    >
                        {/* 容器內滾動條 (laptop)*/}
                        <ScrollBar
                            ref={scrollBarRef}
                            autoHide={props.autoHide}
                            className={`laptopScrollBar`}
                            basedefaulttheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopScrollBar") }}
                        >
                            {/* 容器內 ScrollBar 下容器 (laptop)*/}
                            <BasicContainer
                                {...props.laptopContentContainerEvent}
                                className={`laptopContentContainer`}
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopContentContainer") }} //吃theme
                            >
                                {props.children}
                                <LaptopCopyright style={{
                                    width: "100%",
                                    position: "absolute",
                                    left: "0px",
                                    bottom: "0px"
                                }} />

                                {/* COPYRIGHT (laptop) */}
                                <Text
                                    theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopCopyRight") }}
                                >
                                    COPYRIGHT © 屏東客戶端
                                </Text>

                                {/* 單位資訊 (laptop) */}
                                <Text
                                    theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "laptopUnitInfo") }}
                                >
                                    屏東縣政府 版權所有 辦公時間：週一至週五 08:00~12:00 13:30~17:30
                                    <br />
                                    總機電話：(08)732-0415 地址：900219屏東縣屏東市自由路527號
                                    <br />
                                    1999便民服務專線(付費專線)服務時間每日08:00~22:00
                                    <br />
                                    縣境內直撥1999，外縣市請撥(08)732-0415
                                </Text>

                            </BasicContainer>
                        </ScrollBar>
                    </BasicContainer>
                </>
            }

            {/* 大於768 與 小於1024的畫面 (Tablet)*/}
            {(Width >= 768 && Width < 1024) &&
                <>
                    {/* 外部傳入頂部組件容器 (tablet) */}
                    <BasicContainer
                        ref={OutsideOutContainerRef}
                        {...props.tabletOutsideOutContainerEvent}
                        className={`tabletOutsideOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponent: props?.outSideTopComponent }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabletOutsideOutContainer") }}
                    >
                        {props.outSideTopComponent}
                    </BasicContainer>

                    {/* 容器 (tablet) */}
                    <BasicContainer
                        {...props.tabletOutContainerEvent}
                        className={`tabletOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponentHeight: OutSideTopComponentHeight, height: Height }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabletOutContainer") }}
                    >
                        {/* 容器內滾動條 (tablet)*/}
                        <ScrollBar
                            ref={scrollBarRef}
                            autoHide={props.autoHide}
                            className={`tabletScrollBar`}
                            basedefaulttheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabletScrollBar") }}
                        >
                            {/* 容器內 ScrollBar 下容器 (tablet)*/}
                            <BasicContainer
                                {...props.tabletContentContainerEvent}
                                className={`tabletContentContainer`}
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabletContentContainer") }} //吃theme
                            >
                                {props.children}
                                <TabletCopyright style={{
                                    width: "100%",
                                    position: "absolute",
                                    left: "0px",
                                    bottom: "0px"
                                }} />

                                {/* COPYRIGHT (laptop) */}
                                <Text
                                    theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabletCopyRight") }}
                                >
                                    COPYRIGHT © 屏東客戶端
                                </Text>

                                {/* 單位資訊 (laptop) */}
                                <Text
                                    theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabletUnitInfo") }}
                                >
                                    屏東縣政府 版權所有 辦公時間：週一至週五 08:00~12:00 13:30~17:30
                                    <br />
                                    總機電話：(08)732-0415 地址：900219屏東縣屏東市自由路527號
                                    <br />
                                    1999便民服務專線(付費專線)服務時間每日08:00~22:00
                                    <br />
                                    縣境內直撥1999，外縣市請撥(08)732-0415
                                </Text>

                            </BasicContainer>
                        </ScrollBar>
                    </BasicContainer>
                </>
            }

            {/* 小於等於768的畫面 (basic) */}
            { Width < 768 &&
                <>
                    {/* 外部傳入頂部組件容器 (laptop) */}
                    <BasicContainer
                        ref={OutsideOutContainerRef}
                        {...props.basicOutsideOutContainerEvent}
                        className={`basicOutsideOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponent: props?.outSideTopComponent }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "basicOutsideOutContainer") }}
                    >
                        {props.outSideTopComponent}
                    </BasicContainer>
                    <BasicContainer
                        {...props.basicOutContainerEvent}
                        className={`basicOutContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme({ ...props, outSideTopComponentHeight: OutSideTopComponentHeight, height: Height }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "basicOutContainer") }}
                    >
                        {/* 容器內滾動條 (basic)*/}
                        <ScrollBar
                            ref={scrollBarRef}
                            autoHide={props.autoHide}
                            className={`basicScrollBar`}
                            basedefaulttheme={"DefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "basicScrollBar") }}
                        >
                            {/* 容器內 ScrollBar 下容器 (basic)*/}
                            <BasicContainer
                                {...props.basicContentContainerEvent}
                                className={`basicContentContainer`}
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "basicContentContainer") }} //吃theme
                            >
                                {props.children}
                                {/* <MobileMCopyright style={{
                                    width: "100%",
                                    position: "absolute",
                                    left: "0px",
                                    bottom: "0px"
                                }} /> */}
                            </BasicContainer>
                        </ScrollBar>
                    </BasicContainer>
                </>
            }
        </>
    )
})