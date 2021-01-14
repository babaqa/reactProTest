import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { useHistory } from 'react-router-dom';

import { AddCaseFastCallCar } from '../AddCaseFastCallCar/AddCaseFastCallCar'
import { AddBusFastCallCar } from '../AddBusFastCallCar/AddBusFastCallCar'
import { AddWhiteFastCallCar } from '../AddWhiteFastCallCar/AddWhiteFastCallCar'

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { fastCallCar: { rwd: { mobileM } } } } = Theme;

    let history = useHistory()

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "長照": <AddCaseFastCallCar />,
                        "共享車隊": <AddWhiteFastCallCar />,
                        "巴士": <AddBusFastCallCar />
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
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >
                            {/* 預約訂車按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.preOrderButton}
                                onClick={() => {
                                    history.push('/CallCar')
                                }}
                            >
                                預約訂車
                            </NativeLineButton>

                            {/* 快速叫車按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.fastOrderButton}
                                onClick={() => {
                                }}
                            >
                                快速叫車-新增常用路線
                            </NativeLineButton>

                        </BasicContainer>

                        {/* 分頁 */}
                        <BasicContainer
                            theme={mobileM.whiteContainer}
                        >
                            <BasicContainer
                                theme={mobileM.tabsContainer}
                            >
                                {tabMap().map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Text
                                                onClick={() => { props.setNowTab(item) }}
                                                isActive={props.nowTab === item}
                                                theme={mobileM.titleBarFastCallCarTab}
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

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
