import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as Download } from '../../../../Assets/img/FilesPage/Download.svg'
import { ReactComponent as Connect } from '../../../../Assets/img/FilesPage/Connect.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, Upload, globalContextService, TextEditor, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { CardTable } from '../../../../ProjectComponent';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { files: { detailComponent: { rwd: { mobileM } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();

    let history = useHistory()


    return (
        <>

            {/* 線上檔案展 詳細資料 外側容器 */}
            <BasicContainer
                theme={mobileM.detailOutContainer}
            >
                {/* 線上檔案展 詳細資料 圖片 */}
                <Upload
                    viewType
                    imageUrl={undefined}
                    onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                        globalContextService.set("MailServicePage", "CarPic", info?.file?.originFileObj)
                    }}
                    theme={mobileM.exhibitionDetailImg}
                />

                {/* 線上檔案展 詳細資料 標題 */}
                <Text
                    theme={mobileM.detailTitle}
                >
                    {props.ExhibitionDetail?.title ?? "123"}
                </Text>

                {/* 線上檔案展 詳細資料 日期 */}
                <Text
                    theme={mobileM.detailDateTimeText}
                >
                    {`日期：${props.ExhibitionDetail?.date}`}
                </Text>

                {/* 下載 容器 */}
                <Container
                    theme={mobileM.downloadContainer}
                >
                    {/* 下載 按鈕 */}
                    <Text
                        theme={mobileM.downloadButton}
                        onClick={() => {

                        }}
                    >
                        {`檔案下載`}

                        {/* 下載 圖標 */}
                        <Download style={mobileM.downloadSvg} />
                    </Text>
                </Container>


                {/* 詳細資料 內文 */}
                <TextEditor
                    viewType
                    value={props.ExhibitionDetail.content}

                    // onChange={(e, value, onInitial) => {
                    //     console.log(value)
                    //     globalContextService.set("NewsAddPage", "NewsEditor", value)
                    // }}
                    // placeholder={'請輸入最新消息內容...'}
                    theme={mobileM.textEditor}
                />

                {/* 相關影音圖 文字 */}
                <Text
                    theme={mobileM.relatedImgText}
                >
                    {`相關影音圖`}

                </Text>

                {/* 線上檔案展 相關影音圖 圖片 */}
                <Upload
                    viewType
                    imageUrl={undefined}
                    onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                        globalContextService.set("MailServicePage", "CarPic", info?.file?.originFileObj)
                    }}
                    theme={mobileM.relatedImg}
                />
            </BasicContainer>

        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
