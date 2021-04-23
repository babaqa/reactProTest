import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, RangeDateTimePicker, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { ReactComponent as Point } from '../../../Assets/img/LawsAndRegulationsPage/Point.svg'
import { ReactComponent as Slash } from '../../../Assets/img/LawsAndRegulationsPage/Slash.svg'

import { Component } from '../Component/Component'
import { subTabMapping } from '../../../Mappings/Mappings';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { lawsAndRegulations: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();

    //#region 分頁映射
    const tabMap = () => {
        return ["本校法規", "文書檔案相關法規"]

    }

    //#endregion
    return (
        <>

            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 首頁文字 */}
                        <Container style={{ justifyContent: "flex-end", padding: "0 50px", alignItems: "center" }}>
                            <Text
                                theme={laptopL.homePageText}
                            // onClick={() => {
                            //     history.push("/")
                            // }}
                            >
                                {"首頁"}

                                {/* 當前頁面文字 */}
                            </Text>
                            <Slash style={{ margin: "0 20px" }} />
                            <Text
                                theme={laptopL.nowPageText}
                            >
                                {subTabMapping[props.NowTab]}
                            </Text>
                        </Container>

                        {/* 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={subTabMapping[props.NowTab]}
                            theme={laptopL.baseSubTitleBar}
                        >
                        </MainPageSubTitleBar>
                    </>
                }
            >

                <BasicContainer
                    theme={laptopL.tabsContainer}
                >
                    {tabMap().map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Text
                                    onClick={() => {
                                        // props.setNowTab(Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]) 
                                        history.push(`/LawsAndRegulations?subTab=${Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]}`);
                                    }}
                                    theme={laptopL.titleBarContactTab}
                                >
                                    {
                                        subTabMapping[props.NowTab] === item
                                        &&
                                        <Point
                                            style={laptopL.pointSvg}
                                        />
                                    }
                                    {item}
                                </Text>
                            </React.Fragment>
                        )
                    })}
                </BasicContainer>

                <BasicContainer
                    theme={laptopL.listContainer}
                >
                    {/* 切換使用的組件 */}
                    {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}

                    <Component
                        NowTab={subTabMapping[props.NowTab]}
                        LawsType1={props.LawsType1}
                        LawsType2={props.LawsType2}
                        GetFileAppExecute={props.GetFileAppExecute}
                    />
                </BasicContainer>
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`