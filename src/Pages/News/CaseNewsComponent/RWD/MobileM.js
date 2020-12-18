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

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { component: { caseNewsComponent: { rwd: { mobileM } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const statusMapping = (status, getTheme = false) => {
        switch (toString(status)) {
            case "1":
                return (getTheme ? mobileM.newsIdentityTag.caseNews : "長照");
            case "2":
                return (getTheme ? mobileM.newsIdentityTag.whiteNews : "共享車隊");
            case "3":
                return (getTheme ? mobileM.newsIdentityTag.busNews : "巴士");
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
                theme={mobileM.newsContainer}
            >
                {/* 公告容器 */}
                <Container theme={mobileM.newsCardContainer}>

                    {/* 公告內容容器 */}
                    <SubContainer theme={mobileM.newsCardContentContainer}>
                        {/* 公告內容文字 */}
                        <Text
                            theme={mobileM.newsCardContentText}
                            onClick={() => {
                                modalsService.titleModal.normal({
                                    //id: "top1",
                                    title: "公告",
                                    yes: true,
                                    yesText: "確認",
                                    no: false,
                                    noText: "取消",
                                    // autoClose: true,
                                    backgroundClose: false,
                                    noOnClick: (e) => {
                                    },
                                    yesOnClick: (e, close) => {
                                        close();
                                    },
                                    closeIconOnClick: (e) => {
                                    },
                                    content: (
                                        <Text theme={mobileM.newsCardContentModalText}>
                                            {props?.content ?? "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順..."}
                                        </Text>
                                    ),
                                    theme: mobileM.newsModal
                                })
                            }}
                        >
                            武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順...
                        </Text>
                    </SubContainer>


                    {/* 公告Tag容器 */}
                    <SubContainer theme={mobileM.newsCardTagContainer}>
                        {/* 公告Tag */}
                        <Tag
                            baseDefaultTheme={"DefaultTheme"}
                            theme={statusMapping(props?.tag ?? "1", true)}
                            text={statusMapping(props?.tag ?? "1")}
                        />
                    </SubContainer >

                    {/* 公告日期容器 */}
                    <SubContainer theme={mobileM.newsCardDateContainer}>
                        {/* 公告日期文字 */}
                        <Text theme={mobileM.newsCardDateText}>
                            {props?.date ?? "2020-12-31"}
                        </Text>
                    </SubContainer>

                </Container>

                {/* 公告容器 */}
                <Container theme={mobileM.newsCardContainer}>

                    {/* 公告內容容器 */}
                    <SubContainer theme={mobileM.newsCardContentContainer}>
                        {/* 公告內容文字 */}
                        <Text
                            theme={mobileM.newsCardContentText}
                            onClick={() => {
                                modalsService.titleModal.normal({
                                    //id: "top1",
                                    title: "公告",
                                    yes: true,
                                    yesText: "確認",
                                    no: false,
                                    noText: "取消",
                                    // autoClose: true,
                                    backgroundClose: false,
                                    noOnClick: (e) => {
                                    },
                                    yesOnClick: (e, close) => {
                                        close();
                                    },
                                    closeIconOnClick: (e) => {
                                    },
                                    content: (
                                        <Text theme={mobileM.newsCardContentModalText}>
                                            {props?.content ?? "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順..."}
                                        </Text>
                                    ),
                                    theme: mobileM.newsModal
                                })
                            }}
                        >
                            武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順...
                        </Text>
                    </SubContainer>


                    {/* 公告Tag容器 */}
                    <SubContainer theme={mobileM.newsCardTagContainer}>
                        {/* 公告Tag */}
                        <Tag
                            baseDefaultTheme={"DefaultTheme"}
                            theme={statusMapping(props?.tag ?? "3", true)}
                            text={statusMapping(props?.tag ?? "3")}
                        />
                    </SubContainer >

                    {/* 公告日期容器 */}
                    <SubContainer theme={mobileM.newsCardDateContainer}>
                        {/* 公告日期文字 */}
                        <Text theme={mobileM.newsCardDateText}>
                            {props?.date ?? "2020-12-31"}
                        </Text>
                    </SubContainer>

                </Container>

                {/* 公告容器 */}
                <Container theme={mobileM.newsCardContainer}>

                    {/* 公告內容容器 */}
                    <SubContainer theme={mobileM.newsCardContentContainer}>
                        {/* 公告內容文字 */}
                        <Text
                            theme={mobileM.newsCardContentText}
                            onClick={() => {
                                modalsService.titleModal.normal({
                                    //id: "top1",
                                    title: "公告",
                                    yes: true,
                                    yesText: "確認",
                                    no: false,
                                    noText: "取消",
                                    // autoClose: true,
                                    backgroundClose: false,
                                    noOnClick: (e) => {
                                    },
                                    yesOnClick: (e, close) => {
                                        close();
                                    },
                                    closeIconOnClick: (e) => {
                                    },
                                    content: (
                                        <Text theme={mobileM.newsCardContentModalText}>
                                            {props?.content ?? "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順..."}
                                        </Text>
                                    ),
                                    theme: mobileM.newsModal
                                })
                            }}
                        >
                            武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順...
                        </Text>
                    </SubContainer>


                    {/* 公告Tag容器 */}
                    <SubContainer theme={mobileM.newsCardTagContainer}>
                        {/* 公告Tag */}
                        <Tag
                            baseDefaultTheme={"DefaultTheme"}
                            theme={statusMapping(props?.tag ?? "2", true)}
                            text={statusMapping(props?.tag ?? "2")}
                        />
                    </SubContainer >

                    {/* 公告日期容器 */}
                    <SubContainer theme={mobileM.newsCardDateContainer}>
                        {/* 公告日期文字 */}
                        <Text theme={mobileM.newsCardDateText}>
                            {props?.date ?? "2020-12-31"}
                        </Text>
                    </SubContainer>

                </Container>

            </BasicContainer>

        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`