import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Slash } from '../../../Assets/img/UnitPage/Slash.svg'
import { ReactComponent as GoBack } from '../../../Assets/img/UnitPage/GoBack.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { unit: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
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

                            <Text theme={mobileM.titleText}>{props.NowTab}</Text>
                        </Container>
                    </>
                }
            >


                <BasicContainer
                    theme={mobileM.unitEditorContainer}
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
                        theme={mobileM.unitEditor}
                    />
                </BasicContainer>
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`