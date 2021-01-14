import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as NoData } from '../../../../Assets/img/SystemNewsComponentPage/NoData.svg'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { component: { allBusRouteComponent: { rwd: { laptopL } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    return (
        <>
            {/* 卡片外側容器 */}
            <SubContainer
                theme={laptopL.outsideContainer}
            >
                {/* 卡片容器 */}
                <BasicContainer
                    theme={laptopL.cardContainer}
                >
                    <BasicContainer
                        theme={laptopL.mapImg}
                    >
                        123
                    </BasicContainer>

                </BasicContainer>
            </SubContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`