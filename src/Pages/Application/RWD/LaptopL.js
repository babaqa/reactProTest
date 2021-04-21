import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Point } from '../../../Assets/img/ContactPage/Point.svg'

import { Component } from '../Component/Component'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { subTabMapping } from '../../../Mappings/Mappings';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { application: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();
    const [UpdateComponent, setUpdateComponent] = useState(false);

    //#region 分頁映射
    const tabMap = () => {
        return ["相關法令規章", "檔案應用申請", "加值應用"]

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
                                        history.push(`/Application?subTab=${Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]}`);
                                        setUpdateComponent(u => !u);
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