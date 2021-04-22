import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Slash } from '../../../Assets/img/MemberPage/Slash.svg'
import { ReactComponent as GoBack } from '../../../Assets/img/MemberPage/GoBack.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { AllBusRouteAomponent } from '../AllBusRouteAomponent/AllBusRouteAomponent'
import { ScrollBar } from '../../../Components/ScrollBar/ScrollBar';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { member: { rwd: { mobileM } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()
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
                // theme={mobileM.unitEditorContainer}
                >
                    <Container>

                        {/* 單一區塊外容器 */}
                        <SubContainer theme={mobileM.memberBlockOutContainer}>
                            <Container>

                                {/* 右半部容器 */}
                                <SubContainer theme={mobileM.memberInsideRightContainer}>
                                    {/* 左半部容器 */}
                                    <Container theme={mobileM.memberInsideLeftContainer}>
                                        <Text theme={mobileM.jobTitleText}>
                                            組長
                                    </Text>
                                        <Text theme={mobileM.nameText}>
                                            陳汎瑩
                                    </Text>
                                        <Text theme={mobileM.telText}>
                                            分機:1241
                                    </Text>
                                    </Container>

                                    <Container style={{ minHeight: "396px", display: "inline-block" }}>
                                        <Text theme={mobileM.businessListTitleText}>
                                            業務項目
                                    </Text>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <>
                                                            <Text theme={mobileM.businessListText}>
                                                                {index + 1}.{item.content}
                                                            </Text>
                                                        </>

                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </Container>
                                    <Container theme={mobileM.businessListBottomContainer}>
                                        <Text theme={mobileM.positionAgentText}>
                                            職務代理人
                                        </Text>

                                        <Container theme={mobileM.lineContainer} />

                                        <Text theme={mobileM.positionAgentNameText}>
                                            劉立婉、楊情雅
                                        </Text>
                                    </Container>

                                </SubContainer>
                            </Container>
                        </SubContainer>

                        {/* 單一區塊外容器 */}
                        <SubContainer theme={mobileM.memberBlockOutContainer}>
                            <Container>
                                {/* 左半部容器 */}
                                <SubContainer theme={mobileM.memberInsideLeftContainer}>
                                    <Text theme={mobileM.jobTitleText}>
                                        組長
                                    </Text>
                                    <Text theme={mobileM.nameText}>
                                        陳汎瑩
                                    </Text>
                                    <Text theme={mobileM.telText}>
                                        分機:1241
                                    </Text>
                                </SubContainer>

                                {/* 右半部容器 */}
                                <SubContainer theme={mobileM.memberInsideRightContainer}>
                                    <Container style={{ minHeight: "396px", display: "inline-block" }}>
                                        <Text theme={mobileM.businessListTitleText}>
                                            業務項目
                                    </Text>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <>
                                                            <Text theme={mobileM.businessListText}>
                                                                {index + 1}.{item.content}
                                                            </Text>
                                                        </>

                                                    </React.Fragment>
                                                )

                                            })
                                        }
                                    </Container>
                                    <Container theme={mobileM.businessListBottomContainer}>
                                        <Text theme={mobileM.positionAgentText}>
                                            職務代理人
                                        </Text>

                                        <Container theme={mobileM.lineContainer} />

                                        <Text theme={mobileM.positionAgentNameText}>
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

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`