import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { ReactComponent as GoBack } from '../../../Assets/img/UnitPage/GoBack.svg'
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
// import { ReactComponent as Search } from '../../../Assets/img/CasePage/Search.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

import { Component } from '../Component/Component'
import { subTabMapping } from '../../../Mappings/Mappings';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { application: { rwd: { mobileM } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        <Container theme={mobileM.titleContainer}>
                            <GoBack
                                style={mobileM.goBackIcon}
                                onClick={() => {
                                    history.goBack();
                                }}
                            />

                            <Text theme={mobileM.titleText}>{subTabMapping[props.NowTab]}</Text>
                        </Container>

                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                <Component />
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
