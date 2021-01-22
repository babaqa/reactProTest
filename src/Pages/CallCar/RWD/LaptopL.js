import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import { isEqual } from 'lodash';
import { CaseCallCarComponent } from '../CaseCallCarComponent/CaseCallCarComponent'
import { BusCallCarComponent } from '../BusCallCarComponent/BusCallCarComponent'
import { WhiteCallCarComponent } from '../WhiteCallCarComponent/WhiteCallCarComponent'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { rwd: { laptopL } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false)
    let history = useHistory()
    let tab = []
    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "長照": <CaseCallCarComponent
                            BasicInf={props.BasicInf}
                            CaseInf={props.CaseInf}
                            Quota={props.Quota}
                            BUnits={props.BUnits}
                            CarType={props.CarType}
                        />,
                        "共享車隊": <WhiteCallCarComponent />,
                        "巴士": <BusCallCarComponent />
                    }
                );

            default:
                // if (!isEqual(props.CaseInf, {})) {
                //     tab.push("長照")
                // }
                // if (!isEqual(props.WhiteInf, {})) {
                //     tab.push("共享車隊")
                // }
                // if (!isEqual(props.BusInf, {})) {
                //     tab.push("巴士")
                // }
                // return tab
                return ["長照", "共享車隊", "巴士"]
        }

    }
    //#endregion

    // useEffect(() => {
    //     console.log("123")
    //     props.setNowTab(tab[0])
    // }, [])


    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={laptopL.titleBar}
                        >
                            <Text
                                theme={laptopL.titleText}
                            >
                                預約訂車
                            </Text>
                        </BasicContainer>

                        {/* 分頁 */}
                        <BasicContainer
                            theme={laptopL.whiteContainer}
                        >
                            <BasicContainer
                                theme={laptopL.tabsContainer}
                            >
                                {tabMap().map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Text
                                                onClick={() => { props.setNowTab(item) }}
                                                isActive={props.nowTab === item}
                                                theme={laptopL.titleBarCallCarTab}
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

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`