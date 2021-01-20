import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, RangeDateTimePicker, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

import { AllRecordComponent } from '../AllRecordComponent/AllRecordComponent'
import { CaseRecordComponent } from '../CaseRecordComponent/CaseRecordComponent'
import { BusRecordComponent } from '../BusRecordComponent/BusRecordComponent'
import { FleetRecordComponent } from '../FleetRecordComponent/FleetRecordComponent'


const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        // "全部": <AllRecordComponent />,
                        "長照": <CaseRecordComponent />,
                        "共享車隊": <FleetRecordComponent />,
                        "巴士": <BusRecordComponent />
                    }
                );

            default:
                return ["長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={laptopL.whiteContainer}
                        >
                            <BasicContainer
                                theme={laptopL.tabsContainer}
                            >
                                {
                                    // <BasicContainer>

                                    tabMap().map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Text
                                                    onClick={() => { props.setNowTab(item) }}
                                                    isActive={props.nowTab === item}
                                                    theme={laptopL.titleBarRecordTab}
                                                >
                                                    {item}
                                                </Text>
                                            </React.Fragment>
                                        )
                                    })

                                    // </BasicContainer>
                                }
                                {/* 日期區間容器 */}
                                {/* <SubContainer baseDefaultTheme={"DefaultTheme"}> */}
                                {/* 日期區間 DateTimeRange  */}
                                {/* <RangeDateTimePicker
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
                                                // console.log("change")
                                                // setForceUpdate(f => !f)
                                            }
                                        }}
                                        theme={laptopL.dateTimeRange}
                                    /> */}
                                {/* </SubContainer> */}
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