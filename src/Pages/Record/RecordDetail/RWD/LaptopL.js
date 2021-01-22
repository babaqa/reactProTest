import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, QA } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { ReactComponent as Plus } from '../../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { qAndA: { rwd: { laptopL } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
            // outSideTopComponent={
            //     <>
            //         {/* 標題列 */}
            //         <MainPageTitleBar
            //             bascDefaultTheme={"DefaultTheme"}
            //             titleText={"常見問題"}
            //             theme={laptopL.titleBar}
            //         // onSubmit={(e)=>console.log(e)}
            //         >
            //         </MainPageTitleBar>
            //     </>
            // }
            >
                {/* 常見問題容器 */}
                <BasicContainer
                    height={Height}
                    theme={laptopL.qAContainer}
                >


                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`