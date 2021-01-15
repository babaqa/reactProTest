import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input, CardTable } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ReactComponent as Check } from '../../../../Assets/img/BusRoutePage/Check.svg'
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, NativeLineButton } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as NoData } from '../../../../Assets/img/SystemNewsComponentPage/NoData.svg'

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { component: { allBusRouteComponent: { rwd: { mobileM } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件



    let history = useHistory()

    return (
        <>
            {/* 標題  容器*/}
            <BasicContainer
                theme={mobileM.titleBar}
            >

                {/* 路線名稱 標題 */}
                <Text
                    theme={mobileM.routeNameTitle}
                >
                    路線名稱
                </Text>

                {/* 操作 標題 */}
                <Text
                    theme={mobileM.operatingTitle}
                >
                    操作
                </Text>
            </BasicContainer>
            {
                (props?.data ?? []).map((item, index) => {
                    return (
                        <>
                            {/* 內文 容器 */}
                            <BasicContainer
                                theme={mobileM.dataContainer}
                                index={index}
                            >

                                {/* 路線名稱 內文 */}
                                <Text
                                    theme={mobileM.routeNameText}
                                >
                                    {item}
                                </Text>

                                {/* 操作 內文 */}
                                <Text
                                    theme={mobileM.operatingText}
                                    onClick={() => {
                                        console.log("hi")
                                    }}
                                >
                                    <Check style={mobileM.checkSvg} />
                                    查看時刻表及站點資訊
                                </Text>
                            </BasicContainer>
                        </>
                    )
                })
            }
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`