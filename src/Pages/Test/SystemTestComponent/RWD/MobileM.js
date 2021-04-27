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
import { ReactComponent as ArchiveExhibition } from '../../../../Assets/img/SystemTestComponentPage/ArchiveExhibitionMobileM.svg'
import { ReactComponent as DownloadMobileM } from '../../../../Assets/img/SystemTestComponentPage/DownloadMobileM.svg'
import { ReactComponent as Lawsand } from '../../../../Assets/img/SystemTestComponentPage/Lawsand.svg'
import isUndefined from 'lodash/isUndefined';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { fmt } from '../../../../Handlers/DateHandler';

const MobileMBase = (props) => {

    const { APIUrl, APIFileUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { test: { component: { systemTestComponent: { rwd: { mobileM } } } } } } = Theme;

    const [Width, Height] = useWindowSize();
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [isActive, setIsActive] = useState("ourLaws");
    let history = useHistory()

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
                theme={mobileM.tableOutsideContainer}
            >
                {/* 第一區塊容器 */}
                <Container theme={mobileM.simpleMenuContainer}>
                    <SubContainer theme={mobileM.simpleMenuLeftContainer}>

                        <Container style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {/* 臺藝檔案 */}
                            <Container
                                theme={mobileM.fileContainer}
                                onClick={() => {
                                    history.push("/Files?subTab=KnowNTUA")
                                }}
                            >
                                <File style={{
                                    position: "relative",
                                    // top: "-30px",
                                    width: "75%",
                                    height: "75%",
                                }} />
                                <Text theme={mobileM.simpleMenuText}>
                                    臺藝檔案
                            </Text>
                            </Container>

                            {/* 檔案應用 */}
                            <Container
                                theme={mobileM.fileUseContainer}
                                onClick={() => {
                                    history.push("/Application?subTab=RelatedRegulations")
                                }}
                            >
                                <FileUse style={{
                                    position: "relative",
                                    // top: "-30px",
                                    width: "75%",
                                    height: "75%",
                                }} />
                                <Text theme={mobileM.simpleMenuText}>
                                    檔案應用
                            </Text>
                            </Container>
                        </Container>
                        <Container style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            {/* 線上檔案展 */}
                            <Container
                                theme={mobileM.fileShowContainer}
                                onClick={() => {
                                    history.push("/Files?subTab=OnlineArchiveExhibition")
                                }}
                            >
                                <FileShow style={{
                                    position: "relative",
                                    // top: "-30px",
                                    width: "75%",
                                    height: "75%",
                                    left: "6px",
                                }} />
                                <Text theme={mobileM.simpleMenuText}>
                                    線上檔案展
                            </Text>
                            </Container>
                            {/* 申請下載 */}
                            <Container
                                theme={mobileM.downloadContainer}
                                onClick={() => {
                                    history.push("/QAndA?subTab=DownloadForm")
                                }}
                            >
                                <Download style={{
                                    position: "relative",
                                    // top: "-30px",
                                    width: "75%",
                                    height: "75%",
                                }} />
                                <Text theme={mobileM.simpleMenuText}>
                                    申請下載
                            </Text>
                            </Container>
                        </Container>
                    </SubContainer>
                </Container>


                {/* 第二區塊容器 */}
                <Container theme={mobileM.onlineFileContainer}>
                    <Text theme={mobileM.onlineFileTitle}>
                        <ArchiveExhibition style={{
                            width: "65%",
                            height: "65%",
                            maxWidth: "350px",
                        }} />
                    </Text>
                </Container>

                {/* 第三區塊下載檔案容器 */}
                <Container theme={mobileM.downloadsContainer}>
                    <Text theme={mobileM.onlineFileTitle}>
                        <DownloadMobileM style={{
                            width: "65%",
                            height: "65%",
                            maxWidth: "350px",
                        }} />
                    </Text>
                    {/* 右方資料容器 */}
                    <SubContainer theme={mobileM.downloadsTableContainer}>
                        {
                            props.QuestionA.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {index < 5 ?
                                            <Container theme={mobileM.downloadsDataContainer}>
                                                <Text theme={mobileM.downloadsDataText}>
                                                    {item.title}
                                                </Text>
                                                <Container theme={mobileM.downloadsDataIconContainer}>
                                                    {!isNil(checkFileType(item.filels, "pdf"))
                                                        &&
                                                        <a href={APIFileUrl + checkFileType(item.filels, "pdf")} download>
                                                            <Pdf style={mobileM.downloadDataIcon} />
                                                        </a>
                                                    }
                                                    {!isNil(checkFileType(item.filels, "doc"))
                                                        &&
                                                        <a href={APIFileUrl + checkFileType(item.filels, "doc")} download>
                                                            <Word style={mobileM.downloadDataIcon} />
                                                        </a>
                                                    }
                                                    {!isNil(checkFileType(item.filels, "odf"))
                                                        &&
                                                        <a href={APIFileUrl + checkFileType(item.filels, "odf")} download>
                                                            <Odf style={mobileM.downloadDataIcon} />
                                                        </a>
                                                    }
                                                </Container>
                                            </Container>
                                            :
                                            <>
                                            </>
                                        }
                                    </React.Fragment>
                                )
                            })
                        }
                    </SubContainer>
                    <Text
                        theme={mobileM.moreButton}
                        onClick={() => {
                            history.push("/QAndA?subTab=DownloadForm")
                        }}
                    >
                        More
                    </Text>
                </Container>

                {/* 第四區塊容器 */}
                <Container theme={mobileM.lawsContainer}>
                    <Text theme={mobileM.onlineFileTitle}>
                        <Lawsand style={{
                            width: "65%",
                            height: "65%",
                            maxWidth: "350px",
                        }} />
                    </Text>
                    <SubContainer theme={mobileM.lawsLeftContainer}>
                        <Container style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Container
                                theme={mobileM.ourLawsContainer}
                                isActive={isActive}
                                width={Width}
                                onClick={() => {
                                    history.push("/LawsAndRegulations?subTab=SchoolRegulations")
                                }}
                            >
                                <OurLaws style={{
                                    width: "75%",
                                    height: "75%",
                                    position: "relative",
                                    // top: "17px",
                                    right: "7px",
                                }} />
                                <Text theme={mobileM.lawsSignText}>
                                    本校法規
                            </Text>
                            </Container>
                            <Container
                                theme={mobileM.lawsSignContainer}
                                isActive={isActive}
                                width={Width}
                                onClick={() => {
                                    history.push("/LawsAndRegulations?subTab=FileRelatedRegulations")
                                }}
                            >
                                <SignOff style={{
                                    width: "75%",
                                    height: "75%",
                                    position: "relative",
                                    // top: "17px",
                                }} />
                                <Text theme={mobileM.lawsSignText}>
                                    相關法規
                            </Text>
                            </Container>
                        </Container>
                    </SubContainer>
                    <Text
                        theme={mobileM.moreButton}
                        onClick={() => {
                            history.push("/LawsAndRegulations?subTab=SchoolRegulations")
                        }}
                    >
                        More
                    </Text>

                </Container>
            </BasicContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`