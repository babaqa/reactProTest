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

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { rwd: { mobileM } } } } = Theme;
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
            case "tabArray":
            default:
                return ["全部路線", "長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >
                            {/* 日期區間容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 日期區間 DateTimeRange  */}
                                <RangeDateTimePicker
                                    // topLabel={<></>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("NewsPage", "DateTimeRange") ?
                                            [moment(globalContextService.get("NewsPage", "DateTimeRange")[0]), moment(globalContextService.get("NewsPage", "DateTimeRange")[1])]
                                            :
                                            [moment('2015-06-06', "YYYY-MM-DD"), moment('2018-06-06', "YYYY-MM-DD")]
                                        )
                                    }
                                    onChange={(value, momentObj) => {
                                        if (value !== globalContextService.get("NewsPage", "DateTimeRange")) {
                                            globalContextService.set("NewsPage", "DateTimeRange", value);
                                            // setForceUpdate(f => !f)
                                        }
                                    }}
                                    theme={mobileM.dateTimeRange}
                                />
                            </SubContainer>


                            {tabMap().map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Text
                                            onClick={() => { props.setNowTab(item) }}
                                            isActive={props.nowTab === item}
                                            theme={mobileM.titleBarCallCarTab}
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
                {/* 切換使用的組件 */}
                {tabMap("tabUseComponent")?.[props.nowTab]}

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`