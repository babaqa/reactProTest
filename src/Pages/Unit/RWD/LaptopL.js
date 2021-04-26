import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TextEditor, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Slash } from '../../../Assets/img/UnitPage/Slash.svg'
import { ReactComponent as Edit } from '../../../Assets/img/FastCallCarPage/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import isUndefined from 'lodash/isUndefined';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { unit: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 首頁文字 */}
                        <Container style={{ justifyContent: "flex-end", padding: "0 50px", alignItems: "center" }}>
                            <Text
                                theme={laptopL.homePageText}
                            // onClick={() => {
                            //     history.push("/")
                            // }}
                            >
                                {"首頁"}

                                {/* 當前頁面文字 */}
                            </Text>
                            <Slash style={{ margin: "0 20px" }} />
                            <Text
                                theme={laptopL.nowPageText}
                            >
                                {props.NowTab}
                            </Text>
                        </Container>

                        {/* 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={props.NowTab}
                            theme={laptopL.baseSubTitleBar}
                        >
                        </MainPageSubTitleBar>
                    </>}
            >


                <BasicContainer
                    theme={laptopL.unitEditorContainer}
                >
                    {/* 單位介紹編輯器 UnitEditor */}
                    <TextEditor
                        viewType
                        value={props.Unit?.contents}
                        // value={"<p>sdfgf<strong>dg</strong></p>"}
                        onChange={(e, value, onInitial) => {
                            // console.log(value)
                            globalContextService.set("UnitPage", "UnitEditor", value)
                        }}
                        // placeholder={'請輸入最新消息內容...'}
                        theme={laptopL.unitEditor}
                    />
                </BasicContainer>
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`