import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { CaseNewsComponent } from '../CaseNewsComponent/CaseNewsComponent'
import { WhiteNewsComponent } from '../WhiteNewsComponent/WhiteNewsComponent'
import { BusNewsComponent } from '../BusNewsComponent/BusNewsComponent'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    //#region 分頁映射
    const tabMap = () => {
        // console.log(props.NewsType.map(item => { return item.label }))
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
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
                                                    onClick={() => {
                                                        if (props.NowTab !== item) {
                                                            props.setNowTab(item);
                                                            props.GetNewsTypeExecute(true, props.NewsType[index]?.value, globalContextService.get("SystemNewsComponentPage", "DateTimeRange"));
                                                        }
                                                    }}
                                                    isActive={props.NowTab === item}
                                                    theme={laptopL.titleBarCallCarTab}
                                                >
                                                    {item}
                                                </Text>
                                            </React.Fragment>
                                        )
                                    })

                                    // </BasicContainer>
                                }
                            </BasicContainer>
                        </BasicContainer>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                {/* {console.log(props.NewsType)} */}
                <SystemNewsComponent
                    AllNews={props.AllNews} // 類別下所有最新消息
                    NowTab={props.NewsType.filter((it) => (it.label === props.NowTab))?.[0]}
                    GetNewsTypeExecute={props.GetNewsTypeExecute}
                />
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`