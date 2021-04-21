import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, QA } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { ReactComponent as Point } from '../../../Assets/img/QAndA/Point.svg'

import { Component } from '../Component/Component'
import { subTabMapping } from '../../../Mappings/Mappings';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { qAndA: { rwd: { laptopL } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    //#region 分頁映射
    const tabMap = () => {
        return ["表單申請下載", "文書常見問題"]

    }


    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 首頁文字 */}
                        <Text
                            theme={laptopL.homePageText}
                        >
                            {`首頁　／　`}

                            {/* 當前頁面文字 */}
                            <Text
                                theme={laptopL.nowPageText}
                            >
                                {subTabMapping[props.NowTab]}
                            </Text>
                        </Text>

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
                                        history.push(`/QAndA?subTab=${Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]}`);
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

                    <Component />
                </BasicContainer>
            </MainPageContainer>

        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`