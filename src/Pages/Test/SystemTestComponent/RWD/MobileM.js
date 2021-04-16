import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input, CardTable } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, TextEditor, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, NativeLineButton } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as NoData } from '../../../../Assets/img/SystemNewsComponentPage/NoData.svg'
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { component: { systemNewsComponent: { rwd: { mobileM } } } } } } = Theme;

    const [Width, Height] = useWindowSize();
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const statusMapping = (status, getTheme = false) => {
        switch (toString(status)) {
            case "長照":
                return (getTheme ? mobileM.newsIdentityTag.caseNews : "長照");
            case "共享車隊":
                return (getTheme ? mobileM.newsIdentityTag.whiteNews : "共享車隊");
            case "巴士":
                return (getTheme ? mobileM.newsIdentityTag.busNews : "巴士");
            case "系統公告":
                return (getTheme ? mobileM.newsIdentityTag.systemNews : "系統公告");
            default:
                return (getTheme ? mobileM.newsIdentityTag.unknownNews : "無此身份");
        }
    }

    let history = useHistory()

    return (
        <>
            {/* 公告外層 容器 */}
            <BasicContainer
                bascDefaultTheme={"DefaultTheme"}
                height={Height}
                theme={mobileM.newsContainer}
            >
                
            </BasicContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`