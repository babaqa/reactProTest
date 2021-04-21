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
                        value={
                            (
                                props.News?.contents ?
                                    props.News?.contents
                                    :
                                    `文書組原置於總務處下，其職掌可概分為「文書處理」、「檔案管理」及「郵件處理」等三類，因部份業務與秘書室密切相關，103年8月1日組織再造將其移至秘書室下。
                                    　　本組負責全校公文之總收、分、發、與繕打、校對、用印、郵寄以及公文稽催、檔案管理和全校各單位教職員生郵件之分發處理等事務。故舉凡文書處理之公文流程簡化、逾期歸檔之稽催以及檔案管理之資訊化、標準化、公開化，等提昇文書處理效率，便捷檔案檢調應用服務等有關事宜，均為本組積極努力精進之目標，由於同仁的努力和學校之支持，績效具體呈現，本校95年榮獲第四屆機關檔案金檔獎。
                                    　　為落實數位化校園，本校公文管理系統具檔案線上調閱(影像瀏覽)功能，已建檔掃瞄完成之檔案，均具備全文檢索功能，方便同仁線上申請調閱檔案影像。`
                            )
                        }
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