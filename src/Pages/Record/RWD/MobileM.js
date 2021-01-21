import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, RangeDateTimePicker, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';


const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { rwd: { mobileM } } } } = Theme;
    const [Width, Height] = useWindowSize();
    const [OrderStatus, setOrderStatus] = useState(globalContextService.get("RecordPage", "OrderTime") ?? "2")


    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >
                            {/* 訂單按鈕容器 */}
                            <SubContainer style={{ padding: "8px 16px" }}>
                                {/* 過去訂單按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={mobileM.preOrderButton}
                                    orderStatus={OrderStatus}
                                    onClick={() => {
                                        setOrderStatus("1")
                                        globalContextService.set("RecordPage", "OrderTime", "1")
                                        globalContextService.set("BusRecordComponentPage", "OrderTime", { value: "1", label: "過去" })
                                        globalContextService.set("CaseRecordComponentPage", "OrderTime", { value: "1", label: "過去" })
                                        globalContextService.set("FleetRecordComponentPage", "OrderTime", { value: "1", label: "過去" })
                                    }}
                                >
                                    過去訂單
                            </NativeLineButton>

                                {/* 未來訂單按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={mobileM.futureOrderButton}
                                    orderStatus={OrderStatus}
                                    onClick={() => {
                                        setOrderStatus("2")
                                        globalContextService.set("RecordPage", "OrderTime", "2")
                                        globalContextService.set("BusRecordComponentPage", "OrderTime", { value: "2", label: "未來" })
                                        globalContextService.set("CaseRecordComponentPage", "OrderTime", { value: "2", label: "未來" })
                                        globalContextService.set("FleetRecordComponentPage", "OrderTime", { value: "2", label: "未來" })
                                    }}
                                >
                                    未來訂單
                            </NativeLineButton>
                            </SubContainer>

                            {/* 日期區間容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/*  查詢日期區間 DateTimeRange  */}
                                {/* <RangeDateTimePicker
                                    topLabel={<></>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("RecordPage", "DateTimeRange") ?
                                            [moment(globalContextService.get("RecordPage", "DateTimeRange")[0]), moment(globalContextService.get("RecordPage", "DateTimeRange")[1])]
                                            :
                                            [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                        )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("RecordPage", "DateTimeRange", value);
                                    }}
                                    theme={mobileM.dateTimeRange}
                                /> */}
                            </SubContainer>

                        </BasicContainer>

                    </>
                }
            >
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
