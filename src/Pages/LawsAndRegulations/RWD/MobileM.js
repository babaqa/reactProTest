import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, RangeDateTimePicker, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as GoBack } from '../../../Assets/img/LawsAndRegulationsPage/GoBack.svg'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { Component } from '../Component/Component'
import { subTabMapping } from '../../../Mappings/Mappings';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { lawsAndRegulations: { rwd: { mobileM } } } } = Theme;
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
                                    props.controllGCS("return")
                                }}
                            />

                            <Text theme={mobileM.titleText}>{subTabMapping[props.NowTab]}</Text>
                        </Container>

                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                <Component
                    NowTab={subTabMapping[props.NowTab]}
                    LawsType1={props.LawsType1}
                    LawsType2={props.LawsType2}
                    GetFileAppExecute={props.GetFileAppExecute}
                />
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
