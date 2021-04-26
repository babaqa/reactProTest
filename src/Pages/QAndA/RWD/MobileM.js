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
                    NowTab={subTabMapping[props.NowTab]} // 當前頁面
                    QuestionA1={props.QuestionA1} // 文書相關檔案QA(表單申請下載)
                    QuestionA2={props.QuestionA2} // 文書相關檔案QA(文書常見問題)
                />
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
