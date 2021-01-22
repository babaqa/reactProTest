import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../../Store/Store'
import styled from 'styled-components';
import { MainPageContainer, QA } from '../../../../ProjectComponent';
import { BasicContainer, Text } from '../../../../Components';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { qAndA: { rwd: { mobileM } } } } = Theme;
    const [, Height] = useWindowSize();

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                vh={Height}
                outSideTopComponent={
                    <>
                        <Text
                            theme={mobileM.titleText}
                        >
                            常見問題
                        </Text>
                    </>
                }
            >
                {/* 常見問題容器 */}
                <BasicContainer
                    theme={mobileM.qAContainer}
                    vh={Height}
                >


                    <Text
                        theme={mobileM.noMoreData}
                    >
                        沒有更多問題
                    </Text>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
