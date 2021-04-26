import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as Download } from '../../../../Assets/img/FilesPage/Download.svg'
import { ReactComponent as Connect } from '../../../../Assets/img/FilesPage/Connect.svg'
import { ReactComponent as GoBack } from '../../../../Assets/img/FilesPage/GoBackLaptopL.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, Upload, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable, OldList, TextEditor } from '../../../../Components';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { files: { detailComponent: { rwd: { laptopL } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    let history = useHistory()


    return (
        <>
            {/* 線上檔案展 詳細資料 上側容器 */}
            <BasicContainer
                theme={laptopL.detailTopContainer}
            >
                {/* 線上檔案展 詳細資料 圖片 */}
                <Upload
                    viewType
                    imageUrl={"https://pingtungdev.1966.org.tw/WebContents/20210423/2021042317152385780093.jpg"}
                    onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                        globalContextService.set("MailServicePage", "CarPic", info?.file?.originFileObj)
                    }}
                    theme={laptopL.exhibitionDetailImg}
                />

                <SubContainer
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            ...style.occupy(6),
                            // height: "370px",
                            paddingLeft: "10%"
                        })
                    }}

                >
                    {/* 線上檔案展 詳細資料 標題 */}
                    <Text
                        theme={laptopL.detailTitle}
                    >
                        {props.ExhibitionDetail?.title}
                    </Text>


                    {/* 下載 容器 */}
                    <Container
                        theme={laptopL.downloadContainer}
                    >

                        {/* 線上檔案展 詳細資料 日期 */}
                        <Text
                            theme={laptopL.detailDateTimeText}
                        >
                            {`日期：${props.ExhibitionDetail?.date}`}
                        </Text>

                        <Container
                            theme={{
                                basic: (style, props) => ({
                                    ...style,
                                    height: "calc( 100% - 56px )",
                                    alignContent: "flex-end"
                                })
                            }}

                        >
                            {
                                [1, 2, 3].map(() => {
                                    return (
                                        <>
                                            {/* 下載 按鈕 */}
                                            <Text
                                                width={Width}
                                                theme={laptopL.downloadButton}
                                                onClick={() => {

                                                }}
                                            >
                                                {`檔案下載`}

                                                {/* 下載 圖標 */}
                                                <Download style={laptopL.downloadSvg} />
                                            </Text>
                                        </>
                                    )
                                })
                            }


                            {/* 連結 按鈕 */}
                            <Text
                                theme={laptopL.connectButton}
                                onClick={() => {

                                }}
                            >
                                {`連結`}

                                {/* 連結 圖標 */}
                                <Connect style={laptopL.connectSvg} />
                            </Text>

                        </Container>
                    </Container>
                </SubContainer>
            </BasicContainer>

            {/* 詳細資料 內文 */}
            <TextEditor
                viewType
                value={props.ExhibitionDetail.content}

                // onChange={(e, value, onInitial) => {
                //     console.log(value)
                //     globalContextService.set("NewsAddPage", "NewsEditor", value)
                // }}
                // placeholder={'請輸入最新消息內容...'}
                theme={laptopL.textEditor}
            />

            {/* 回上一頁 容器 */}
            <Container
                theme={laptopL.goBackContainer}
            >

                {/* 回上一頁 按鈕 */}
                <NativeLineButton
                    baseDefaultTheme={"DefaultTheme"}
                    disable={false}
                    type="button" // 防止提交
                    theme={laptopL.goBackButton}
                    onClick={() => {
                        props.setExhibitionDetail(undefined);
                    }}
                >
                    <GoBack style={laptopL.goBackSvg} />
                    {`back`}
                </NativeLineButton>

            </Container>


            {/* 相關影音圖 文字 */}
            <Text
                theme={laptopL.relatedImgText}
            >
                {`相關影音圖`}

            </Text>

            <Container>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        return (
                            <>
                                {/* 線上檔案展 相關影音圖 圖片 */}
                                <Upload
                                    viewType
                                    isMiddle={(index + 1) % 3 === 2}
                                    imageUrl={"https://pingtungdev.1966.org.tw/WebContents/20210423/2021042317152385780093.jpg"}
                                    onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                                        globalContextService.set("MailServicePage", "CarPic", info?.file?.originFileObj)
                                    }}
                                    theme={laptopL.relatedImg}
                                />
                            </>
                        )
                    })
                }
            </Container>

        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`