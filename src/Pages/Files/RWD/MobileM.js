import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MainPageSubTitleBar, TimeCounterButton } from '../../../ProjectComponent';
import { Container, BasicContainer, BasicButton, TreeSelector, Tooltip, DateTimePicker, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as GoBack } from '../../../Assets/img/FilesPage/GoBack.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { subTabMapping } from '../../../Mappings/Mappings';

import { Component } from '../Component/Component'

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { files: { rwd: { mobileM } } } } = Theme;
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
                <Component
                    NowTab={props.NowTab}
                    ExhibitionDetail={props.ExhibitionDetail}
                    setExhibitionDetail={props.setExhibitionDetail}
                />
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
