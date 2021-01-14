import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { AllBusRouteAomponent } from '../AllBusRouteAomponent/AllBusRouteAomponent'
import { CaseNewsComponent } from '../CaseNewsComponent/CaseNewsComponent'
import { WhiteNewsComponent } from '../WhiteNewsComponent/WhiteNewsComponent'
import { BusNewsComponent } from '../BusNewsComponent/BusNewsComponent'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "全部路線": <AllBusRouteAomponent />,
                        "長照": <CaseNewsComponent />,
                        "共享車隊": <WhiteNewsComponent />,
                        "巴士": <BusNewsComponent />
                    }
                );

            default:
                return ["全部路線", "長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 分頁 */}
                        <BasicContainer
                            theme={laptopL.whiteContainer}
                        >
                            <BasicContainer
                                theme={laptopL.tabsContainer}
                            >
                                {tabMap().map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Text
                                                onClick={() => { props.setNowTab(item) }}
                                                isActive={props.nowTab === item}
                                                theme={laptopL.titleBarBusRouteCallCarTab}
                                            >
                                                {item}
                                            </Text>
                                        </React.Fragment>
                                    )
                                })}
                            </BasicContainer>
                        </BasicContainer>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {tabMap("tabUseComponent")?.[props.nowTab]}

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`