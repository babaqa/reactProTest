import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../Store/Store'
import { BasicContainer, ScrollBar } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as LaptopLCopyright } from '../../Assets/img/LaptopLCopyright.svg'
import { ReactComponent as LaptopCopyright } from '../../Assets/img/LaptopCopyright.svg'
import { ReactComponent as TabletCopyright } from '../../Assets/img/TabletCopyright.svg'
import { ReactComponent as MobileMCopyright } from '../../Assets/img/MobileMCopyright.svg'

//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
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
                                {props.children}
                                <LaptopLCopyright style={{
                                    width: "100%",
                                    position: "absolute",
                                    left: "0px",
                                    bottom: "0px"
                                }} />
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
                        theme={{ ...iterateTheme({ ...props, collapse: Collapse, outSideTopComponentHeight: OutSideTopComponentHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "tabletOutContainer") }}
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
                        theme={{ ...iterateTheme({ ...props, outSideTopComponentHeight: OutSideTopComponentHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "basicOutContainer") }}
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
                                <MobileMCopyright style={{
                                    width: "100%",
                                    position: "absolute",
                                    left: "0px",
                                    bottom: "0px"
                                }} />
                            </BasicContainer>
                        </ScrollBar>
                    </BasicContainer>
                </>
            }
        </>
    )
})