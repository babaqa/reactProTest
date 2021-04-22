import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Slash } from '../../../Assets/img/MemberPage/Slash.svg'
import { useHistory } from 'react-router-dom';
import { ScrollBar } from '../../../Components/ScrollBar/ScrollBar';
import moment from 'moment';
import { AllBusRouteAomponent } from '../AllBusRouteAomponent/AllBusRouteAomponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { member: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const data = [
        {
            content: "總收文、分文",
        },
        {
            content: "辦理檔案檢調、公文稽催業務",
        },
        {
            content: "代理郵務管理業務",
        },
        {
            content: "現行檔案管理、點收、登錄、分類、編目、歸檔、上架",
        },
        {
            content: "回溯公文掃描建檔作業",
        },
        {
            content: "負責各項會議資料繕印裝訂",
        },
        {
            content: "其他臨時交辦事項",
        },
    ];

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
                // theme={laptopL.unitEditorContainer}
                >
                    <Container>

                        {/* 單一區塊外容器 */}
                        <SubContainer theme={laptopL.memberBlockOutContainer}>
                            <Container>
                                {/* 左半部容器 */}
                                <SubContainer theme={laptopL.memberInsideLeftContainer}>
                                    <Text theme={laptopL.jobTitleText}>
                                        組長
                                    </Text>
                                    <Text theme={laptopL.nameText}>
                                        陳汎瑩
                                    </Text>
                                    <Text theme={laptopL.telText}>
                                        分機:1241
                                    </Text>
                                </SubContainer>

                                {/* 右半部容器 */}
                                <SubContainer theme={laptopL.memberInsideRightContainer}>
                                    <Container style={{ minHeight: "396px", display: "inline-block" }}>
                                        <Text theme={laptopL.businessListTitleText}>
                                            業務項目
                                    </Text>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <>
                                                            <Text theme={laptopL.businessListText}>
                                                                {index + 1}.{item.content}
                                                            </Text>
                                                        </>

                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </Container>
                                    <Container theme={laptopL.businessListBottomContainer}>
                                        <Text theme={laptopL.positionAgentText}>
                                            職務代理人
                                        </Text>

                                        <Container theme={laptopL.lineContainer} />

                                        <Text theme={laptopL.positionAgentNameText}>
                                            劉立婉、楊情雅
                                        </Text>
                                    </Container>

                                </SubContainer>
                            </Container>
                        </SubContainer>

                        {/* 單一區塊外容器 */}
                        <SubContainer theme={laptopL.memberBlockOutContainer}>
                            <Container>
                                {/* 左半部容器 */}
                                <SubContainer theme={laptopL.memberInsideLeftContainer}>
                                    <Text theme={laptopL.jobTitleText}>
                                        組長
                                    </Text>
                                    <Text theme={laptopL.nameText}>
                                        陳汎瑩
                                    </Text>
                                    <Text theme={laptopL.telText}>
                                        分機:1241
                                    </Text>
                                </SubContainer>

                                {/* 右半部容器 */}
                                <SubContainer theme={laptopL.memberInsideRightContainer}>
                                    <Container style={{ minHeight: "396px", display: "inline-block" }}>
                                        <Text theme={laptopL.businessListTitleText}>
                                            業務項目
                                    </Text>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <>
                                                            <Text theme={laptopL.businessListText}>
                                                                {index + 1}.{item.content}
                                                            </Text>
                                                        </>

                                                    </React.Fragment>
                                                )

                                            })
                                        }
                                    </Container>
                                    <Container theme={laptopL.businessListBottomContainer}>
                                        <Text theme={laptopL.positionAgentText}>
                                            職務代理人
                                        </Text>

                                        <Container theme={laptopL.lineContainer} />

                                        <Text theme={laptopL.positionAgentNameText}>
                                            劉立婉、楊情雅
                                        </Text>
                                    </Container>

                                </SubContainer>
                            </Container>
                        </SubContainer>

                    </Container>
                </BasicContainer>
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`