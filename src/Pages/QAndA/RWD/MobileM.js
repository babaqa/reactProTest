import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import styled from 'styled-components';
import { MainPageContainer, QA } from '../../../ProjectComponent';
import { BasicContainer, Container, Text } from '../../../Components';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { Component } from '../Component/Component'
import { ReactComponent as GoBack } from '../../../Assets/img/QAndA/GoBack.svg'
import { subTabMapping } from '../../../Mappings/Mappings';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { qAndA: { rwd: { mobileM } } } } = Theme;
    const [, Height] = useWindowSize();
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
