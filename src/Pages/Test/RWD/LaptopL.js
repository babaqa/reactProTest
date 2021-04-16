import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TextEditor, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { SystemTestComponent } from '../SystemTestComponent/SystemTestComponent'
import isUndefined from 'lodash/isUndefined';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { test: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();
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
            // outSideTopComponent={
            //     <>

            //     </>
            // }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                {/* {console.log(props.NewsType)} */}
                {/* {console.log(props.AllNews)} */}
                {/* 標題列 */}
                {/* <BasicContainer
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
                        </BasicContainer> */}

                <SystemTestComponent
                // AllNews={props.AllNews} // 類別下所有最新消息
                // NowTab={props.NewsType.filter((it) => (it.label === props.NowTab))?.[0]}
                // GetNewsTypeExecute={props.GetNewsTypeExecute}
                // CheckDetail={props.CheckDetail} // 詳細資料
                // setCheckDetail={props.setCheckDetail} // 設定詳細資料
                />

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`