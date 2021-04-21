import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, TextContainer, Text } from '../../../';
import { iterateTheme } from '../../../../Handlers/ThemeHandler';
import { ReactComponent as LeftMenuCross } from '../../../../Assets/img/LeftMenuCross.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { ReactComponent as MobileMFooterLogo } from '../../../../Assets/img/MobileMFooterLogo.svg'
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "BasicButtonSecondaryTheme":
        //     return BasicButtonSecondaryTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "BasicButtonPrimaryTheme":
        //     return BasicButtonPrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 基礎按鈕
export const BackstageLeftSideMenuBarBase = (props) => {

    return (
        <>
            {/* 展開的情況 */}
            {!props.collapse && (
                <BasicContainer
                    {...props.containerEvent}
                    className={`${props.className} container`}
                    baseDefaultTheme={"BasicContainerDefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "container") }}
                >
                    {props.log
                        &&
                        <>
                            {/* Logo區 */}
                            < BasicContainer
                                {...props.logoAreaEvent}
                                className={`logoArea`}
                                baseDefaultTheme={"BasicContainerDefaultTheme"}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "logoArea") }}
                            >
                                {/* Logo圖與文字 */}
                                {props.logo}
                                {props.logoText}
                            </BasicContainer>
                        </>
                    }

                    {/* Menu切換Page區 */}
                    <ScrollBar
                        basedefaulttheme={"DefaultTheme"}
                        className={`menuAreaScrollBar`}
                        autoHide={true}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("DefaultTheme"), "menuAreaScrollBar") }}
                    >
                        <BasicContainer
                            {...props.logoAreaEvent}
                            className={`menuArea`}
                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("DefaultTheme"), "menuArea") }}
                        >
                            <LeftMenuCross style={{
                                position: "absolute",
                                top: "39px",
                                right: "29px"
                            }}
                                onClick={() => {
                                    props.setDrawerCollapse(true);
                                }}
                            />

                            {/* 在這裡遍歷MenuItem */}
                            {props.menuItem}

                            <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockContainer") }}>
                                <MobileMFooterLogo style={{
                                    position: "absolute",
                                    top: "-29px"
                                }} />
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockTitle") }}>
                                    {`ADDRESS`}
                                </Text>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockContent") }}>
                                    {`220307新北市板橋區大觀路1段59號`}
                                </Text>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockTitle") }}>
                                    {`TIME`}
                                </Text>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockContent") }}>
                                    {`Mon~Fri/08:00-12:00.13:30-15:30`}
                                </Text>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockTitle") }}>
                                    {`TEL`}
                                </Text>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockContent") }}>
                                    {`02-22722181`}
                                </Text>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockTitle") }}>
                                    {`FAX`}
                                </Text>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterLeftBlockContent") }}>
                                    {`02-29601822`}
                                </Text>
                            </Container>
                            <Container theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterBottomBlockContainer") }}>
                                <Text theme={{ ...iterateTheme({ ...props, }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mobileMFooterBottomBlockText") }}>
                                    {`本網站為國立臺灣藝術大學總務處版權所有，未經允許，不得以任何形式複製和採用`}
                                </Text>
                            </Container>

                        </BasicContainer>
                    </ScrollBar>
                </BasicContainer>)
            }
            {/* 收合的情況 */}
            {
                props.collapse && (
                    <BasicContainer
                        {...props.containerEvent}
                        className={`${props.className} collapseContainer`}
                        baseDefaultTheme={"BasicContainerDefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseContainer") }}
                    >
                        {/* Logo區 */}
                        <BasicContainer
                            {...props.logoAreaEvent}
                            className={`collapseLogoArea`}
                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseLogoArea") }}
                        >
                            {/* Logo圖 */}
                            {props.logo}
                        </BasicContainer>
                        {/* Menu切換Page區 */}
                        <ScrollBar
                            basedefaulttheme={"DefaultTheme"}
                            className={`collapseMenuAreaScrollBar`}
                            autoHide={true}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseMenuAreaScrollBar") }}
                        >
                            <BasicContainer
                                {...props.logoAreaEvent}
                                className={`collapseMenuArea`}
                                baseDefaultTheme={"BasicContainerDefaultTheme"}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme("BasicContainerDefaultTheme"), "collapseMenuArea") }}
                            >
                                {/* 在這裡遍歷MenuItem */}
                                {props.menuItem}
                            </BasicContainer>
                        </ScrollBar>
                    </BasicContainer>)
            }
        </>
    )
}

export const BackstageLeftSideMenuBar = styled(BackstageLeftSideMenuBarBase).attrs((props) => ({}))`

`
//#endregion