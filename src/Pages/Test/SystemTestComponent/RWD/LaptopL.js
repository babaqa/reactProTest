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
import { ReactComponent as Leftdownlods } from '../../../../Assets/img/SystemTestComponentPage/Leftdownlods.svg'
import { ReactComponent as Word } from '../../../../Assets/img/SystemTestComponentPage/Word.svg'
import { ReactComponent as Pdf } from '../../../../Assets/img/SystemTestComponentPage/Pdf.svg'
import { ReactComponent as Odf } from '../../../../Assets/img/SystemTestComponentPage/Odf.svg'
import { ReactComponent as LawsLeftIcon } from '../../../../Assets/img/SystemTestComponentPage/LawsLeftIcon.svg'
import { ReactComponent as SignOff } from '../../../../Assets/img/SystemTestComponentPage/SignOff.svg'
import { ReactComponent as OurLaws } from '../../../../Assets/img/SystemTestComponentPage/OurLaws.svg'
import { ReactComponent as ArchiveExhibition } from '../../../../Assets/img/SystemTestComponentPage/ArchiveExhibition.svg'
import { ReactComponent as Square } from '../../../../Assets/img/SystemTestComponentPage/Square.svg'
import isUndefined from 'lodash/isUndefined';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { fmt } from '../../../../Handlers/DateHandler';
import { Tooltip } from '@material-ui/core';

const LaptopLBase = (props) => {

    const { APIUrl, APIFileUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { test: { component: { systemTestComponent: { rwd: { laptopL } } } } } } = Theme;

    const [Width, Height] = useWindowSize();
    const [ForceUpdate, setForceUpdate] = useState(false); // ?????????????????????
    const [isActive, setIsActive] = useState("ourLaws");
    let history = useHistory()

    const textMapping = {
        "ourLaws": "????????????",
        "lawsSign": "????????????",
    }

    const checkFileType = (fileStr, type) => {
        const fileList = fileStr?.split(",");
        const checkType = (element) => element.includes(type);
        return fileList[fileList.findIndex(checkType, type)];
    }

    return (
        <>

            <BasicContainer
                bascDefaultTheme={"DefaultTheme"}
                height={Height}
                theme={laptopL.tableOutsideContainer}
            >
                {/* ?????????????????? */}
                <Container theme={laptopL.simpleMenuContainer}>
                    <SubContainer theme={laptopL.simpleMenuLeftContainer}>

                        <Container style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {/* ???????????? */}
                            <Container
                                theme={laptopL.fileContainer}
                                onClick={() => {
                                    history.push("/Files?subTab=KnowNTUA")
                                }}
                            >
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF", letterSpacing: "3px" }}>More</Text>
                                </Container>
                                <File style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%"
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    ????????????
                            </Text>
                            </Container>

                            {/* ???????????? */}
                            <Container
                                theme={laptopL.fileUseContainer}
                                onClick={() => {
                                    history.push("/Application?subTab=RelatedRegulations")
                                }}
                            >
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF", letterSpacing: "3px" }}>More</Text>
                                </Container>
                                <FileUse style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%"
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    ????????????
                            </Text>
                            </Container>
                        </Container>
                        <Container style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {/* ??????????????? */}
                            <Container
                                theme={laptopL.fileShowContainer}
                                onClick={() => {
                                    history.push("/Files?subTab=OnlineArchiveExhibition")
                                }}
                            >
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF", letterSpacing: "3px" }}>More</Text>
                                </Container>
                                <FileShow style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%",
                                    left: "12px",
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    ???????????????
                            </Text>
                            </Container>
                            {/* ???????????? */}
                            <Container
                                theme={laptopL.downloadContainer}
                                onClick={() => {
                                    history.push("/QAndA?subTab=DownloadForm")
                                }}
                            >
                                <Container theme={laptopL.moreTextContainer}>
                                    <Text style={{ color: "#FFFFFF", letterSpacing: "3px" }}>More</Text>
                                </Container>
                                <Download style={{
                                    position: "relative",
                                    top: "-30px",
                                    width: "100%"
                                }} />
                                <Text theme={laptopL.simpleMenuText}>
                                    ????????????
                            </Text>
                            </Container>
                        </Container>
                    </SubContainer>
                    {Width >= 1440 &&
                        <SubContainer theme={laptopL.simpleMenuRightContainer}>
                            <TextRight style={{
                                width: "100%"
                            }} />
                        </SubContainer>
                    }
                </Container>


                {/* ?????????????????? */}
                <Container theme={laptopL.onlineFileContainer}>
                    <ArchiveExhibition style={{
                        width: "60%",
                        maxWidth: "750px"
                    }} />
                    <Text theme={laptopL.onlineFileTitle}>???????????????</Text>
                </Container>

                {/* ?????????????????????????????? */}
                <Container theme={laptopL.downloadsContainer}>
                    <SubContainer theme={laptopL.downloadsIconContainer}>
                        {/* ??????Icon */}
                        <Leftdownlods style={{
                            width: "100%"
                        }} />
                    </SubContainer>

                    {/* ?????????????????? */}
                    <SubContainer theme={laptopL.downloadsTableContainer}>
                        {
                            props.QuestionA.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {Width >= 1440 ?
                                            <>
                                                {index < 10 ?
                                                    <Container theme={laptopL.downloadsDataContainer}>
                                                        <Tooltip placement="top-start" title={item.title}>
                                                            <Text theme={laptopL.downloadsDataText}>
                                                                {item.title}
                                                            </Text>
                                                        </Tooltip>
                                                        <Container theme={laptopL.downloadsDataIconContainer}>
                                                            {!isNil(checkFileType(item.filels, "pdf"))
                                                                &&
                                                                <a href={APIFileUrl + checkFileType(item.filels, "pdf")} download>
                                                                    <Pdf style={laptopL.downloadDataIcon} />
                                                                </a>
                                                            }
                                                            {!isNil(checkFileType(item.filels, "doc"))
                                                                &&
                                                                <a href={APIFileUrl + checkFileType(item.filels, "doc")} download>
                                                                    <Word style={laptopL.downloadDataIcon} />
                                                                </a>
                                                            }
                                                            {!isNil(checkFileType(item.filels, "odf"))
                                                                &&
                                                                <a href={APIFileUrl + checkFileType(item.filels, "odf")} download>
                                                                    <Odf style={laptopL.downloadDataIcon} />
                                                                </a>
                                                            }
                                                        </Container>
                                                    </Container>
                                                    :
                                                    <>
                                                    </>
                                                }
                                            </>
                                            :
                                            <>
                                                {index < 5 ?
                                                    <Container theme={laptopL.downloadsDataContainer}>
                                                        <Tooltip placement="top-start" title={item.title}>
                                                            <Text theme={laptopL.downloadsDataText}>
                                                                {item.title}
                                                            </Text>
                                                        </Tooltip>
                                                        <Container theme={laptopL.downloadsDataIconContainer}>
                                                            <a href="/Test" download>
                                                                <Pdf style={laptopL.downloadDataIcon} />
                                                            </a>
                                                            <a href="/Test" download>
                                                                <Word style={laptopL.downloadDataIcon} />
                                                            </a>
                                                            <a href="/Test" download>
                                                                <Odf style={laptopL.downloadDataIcon} />
                                                            </a>
                                                        </Container>
                                                    </Container>
                                                    :
                                                    <>
                                                    </>
                                                }
                                            </>
                                        }
                                    </React.Fragment>
                                )
                            })
                        }

                    </SubContainer>
                </Container>

                {/* ?????????????????? */}
                <Container theme={laptopL.lawsContainer}>
                    <SubContainer theme={laptopL.lawsLeftContainer}>
                        <Container
                            theme={laptopL.ourLawsContainer}
                            isActive={isActive}
                            width={Width}
                            onClick={() => {
                                Width >= 1440 ?
                                    (
                                        isActive !== "ourLaws" && setIsActive("ourLaws")
                                    )
                                    :
                                    history.push("/LawsAndRegulations?subTab=SchoolRegulations")
                            }}
                        >
                            <OurLaws style={{
                                position: "relative",
                                top: "17px",
                                right: "7px",
                            }} />
                            <Text theme={laptopL.lawsSignText}>
                                ????????????
                            </Text>
                        </Container>
                        <Container
                            theme={laptopL.lawsSignContainer}
                            isActive={isActive}
                            width={Width}
                            onClick={() => {
                                Width >= 1440 ?
                                    (
                                        isActive !== "lawsSign" && setIsActive("lawsSign")
                                    )
                                    :
                                    history.push("/LawsAndRegulations?subTab=FileRelatedRegulations")
                            }}
                        >
                            <SignOff style={{
                                position: "relative",
                                top: "17px",
                            }} />
                            <Text theme={laptopL.lawsSignText}>
                                ????????????
                            </Text>
                        </Container>
                        <LawsLeftIcon style={{
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                        }} />
                    </SubContainer>

                    {Width >= 1440 &&
                        <SubContainer theme={laptopL.lawsRightContainer}>
                            <Container theme={laptopL.lawsListContainer}>
                                <Text theme={laptopL.tableHeaderText}>
                                    {textMapping[isActive]}
                                </Text>
                                {

                                    (isActive === "ourLaws" ? props.LawsType1 : props.LawsType2)?.map((item, index) => {
                                        return (

                                            // ???????????????
                                            (index < 5) &&
                                            <React.Fragment key={index}>

                                                <a href={item.url}>
                                                    <Text
                                                        theme={laptopL.lawsListText}
                                                    >
                                                        <Square style={{
                                                            position: "relative",
                                                            margin: "0 14px 0 0"
                                                        }} />
                                                        {item.title}
                                                    </Text>
                                                </a>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </Container>
                            <Text
                                theme={laptopL.lawsListMoreText}
                                onClick={() => {
                                    isActive === "ourLaws" ?
                                        history.push("/LawsAndRegulations?subTab=SchoolRegulations")
                                        :
                                        history.push("/LawsAndRegulations?subTab=FileRelatedRegulations")
                                }}
                            >
                                More
                            </Text>
                        </SubContainer>
                    }

                </Container>
            </BasicContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`