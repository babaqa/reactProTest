import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/FastCallCarPage/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/FastCallCarPage/Edit.svg'
import { useHistory } from 'react-router-dom';

import { CaseCallCarAgain } from '../CaseCallCarAgain/CaseCallCarAgain'
import { BusCallCarAgain } from '../BusCallCarAgain/BusCallCarAgain'
import { WhiteCallCarAgain } from '../WhiteCallCarAgain/WhiteCallCarAgain'

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { rwd: { tablet } } } } = Theme;
    let history = useHistory()

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "長照": <CaseCallCarAgain
                            BasicInf={props.BasicInf}
                            CaseInf={props.CaseInf}
                            Quota={props.Quota}
                            BUnits={props.BUnits}
                            CarType={props.CarType}
                        />,
                        "共享車隊": <WhiteCallCarAgain />,
                        "巴士": <BusCallCarAgain />
                    }
                );
            case "tabArray":
            default:
                return ["長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={tablet.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"預約訂車"}
                            theme={tablet.titleBar}
                            // onSubmit={(e)=>console.log(e)}
                            centerContent={
                                <>
                                    <BasicContainer>
                                        {tabMap().map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Text
                                                        onClick={() => { props.setNowTab(item) }}
                                                        isActive={props.nowTab === item}
                                                        theme={tablet.titleBarCallCarTab}
                                                    >
                                                        {item}
                                                    </Text>
                                                </React.Fragment>
                                            )
                                        })}
                                    </BasicContainer>
                                </>
                            }
                        >
                            {/* 按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {tabMap("tabUseComponent")?.[props.nowTab]}

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`