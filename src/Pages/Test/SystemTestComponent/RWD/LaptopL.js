import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, TextEditor, RangeDateTimePicker, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as TextRight } from '../../../../Assets/img/SystemTestComponentPage/TextRight.svg'
import { ReactComponent as File } from '../../../../Assets/img/SystemTestComponentPage/File.svg'
import { ReactComponent as FileUse } from '../../../../Assets/img/SystemTestComponentPage/FileUse.svg'
import { ReactComponent as FileShow } from '../../../../Assets/img/SystemTestComponentPage/FileShow.svg'
import { ReactComponent as Download } from '../../../../Assets/img/SystemTestComponentPage/Download.svg'
import isUndefined from 'lodash/isUndefined';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { test: { component: { systemTestComponent: { rwd: { laptopL } } } } } } = Theme;

    const [Width, Height] = useWindowSize();
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    let history = useHistory()
    return (
        <>

            {/* Table 外側容器 */}
            <BasicContainer
                bascDefaultTheme={"DefaultTheme"}
                height={Height}
                theme={laptopL.tableOutsideContainer}
            >
                <Container theme={laptopL.simpleMenuContainer}>
                    <SubContainer theme={laptopL.simpleMenuLeftContainer}>

                        <Container style={{ width: "100%" }}>
                            {/* 臺藝檔案 */}
                            <Container theme={laptopL.fileContainer}>
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF" }}>More</Text>
                                </Container>
                                <File style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%"
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    臺藝檔案
                            </Text>
                            </Container>

                            {/* 檔案應用 */}
                            <Container theme={laptopL.fileUseContainer}>
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF" }}>More</Text>
                                </Container>
                                <FileUse style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%"
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    檔案應用
                            </Text>
                            </Container>
                        </Container>
                        <Container style={{ width: "100%" }}>
                            {/* 線上檔案展 */}
                            <Container theme={laptopL.fileShowContainer}>
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF" }}>More</Text>
                                </Container>
                                <FileShow style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%"
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    線上檔案展
                            </Text>
                            </Container>
                            {/* 申請下載 */}
                            <Container theme={laptopL.downloadContainer}>
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF" }}>More</Text>
                                </Container>
                                <Download style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%"
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    申請下載
                            </Text>
                            </Container>
                        </Container>
                    </SubContainer>
                    <SubContainer theme={laptopL.simpleMenuRightContainer}>
                        <TextRight style={{
                            width: "100%"
                        }} />
                    </SubContainer>
                </Container>
            </BasicContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`