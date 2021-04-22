import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/FilesPage/NoData.svg'
import { ReactComponent as RightArrow } from '../../../../Assets/img/FilesPage/RightArrow.svg'
import { ReactComponent as Download } from '../../../../Assets/img/FilesPage/Download.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, Upload, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { CardTable } from '../../../../ProjectComponent';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { files: { component: { rwd: { mobileM } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();

    let history = useHistory()

    let data = [
        { date: "2012.11.29", title: "機關檔案點收作業要點" },
        { date: "2017.08.16", title: "會計憑證應否適用檔案法及其如何辦理立案編目等作業乙案" },
        { date: "2017.07.31", title: "國家檔案內含政治受難者私人文書申請返還作業要點" },
        { date: "2017.07.13", title: "文書流程管理作業規範" },
        { date: "2017.07.13", title: "人事類檔案保存年限基準表" },
        { date: "2017.07.13", title: "「100年度教育部檔案管理作業成效訪視」簡報檔" },
        { date: "2017.07.13", title: "本組檔案活動相簿" },
        { date: "2017.07.13", title: "為遴選檔案管理人員參加第15屆機關績優檔案管理人員金質獎評獎乙案" },
        { date: "2017.07.13", title: "臺南市左鎮區 公所遷回原辦公處所，其地址變更及公文電子交換收發文等事項臺南市左鎮區 公所遷回原辦公處所，其地址變更及公文電子交換收發文等事項臺南市左鎮區 公所遷回原辦公處所，其地址變更及公文電子交換收發文等事項" },
        { date: "2017.07.13", title: "國家發展委員會檔案管理局函請就「大專校院類檔案保存年限基準表(草案)」專校院類檔案保存年限基準表(草案)」專校院類檔案保存年限基準表(草案)」專校院類檔案保存年限基準表(草案)」" },
        { date: "2017.07.13", title: "國家發展委員會檔案管理局函請就「大專校院類檔案保存年限基準表(草案)」案)」案)」案)」案)」" },

    ]

    let data1 = [
        { date: "2012.11.29", title: "123", content: "機關檔案點收作業要點" },
        { date: "2017.08.16", title: "321", content: "會計憑證應否適用檔案法及其如何辦理立案編目等作業乙案" },
        { date: "2017.07.31", title: "513", content: "國家檔案內含政治受難者私人文書申請返還作業要點" },
        { date: "2017.07.13", title: "823", content: "文書流程管理作業規範" },
        { date: "2017.07.13", title: "513", content: "人事類檔案保存年限基準表" },
        { date: "2017.07.13", title: "684", content: "「100年度教育部檔案管理作業成效訪視」簡報檔" },
        { date: "2017.07.13", title: "877", content: "本組檔案活動相簿" },
        { date: "2017.07.13", title: "315", content: "為遴選檔案管理人員參加第15屆機關績優檔案管理人員金質獎評獎乙案" },
        { date: "2017.07.13", title: "315", content: "臺南市左鎮區 公所遷回原辦公處所，其地址變更及公文電子交換收發文等事項臺南市左鎮區 公所遷回原辦公處所，其地址變更及公文電子交換收發文等事項臺南市左鎮區 公所遷回原辦公處所，其地址變更及公文電子交換收發文等事項" },
        { date: "2017.07.13", title: "684", content: "國家發展委員會檔案管理局函請就「大專校院類檔案保存年限基準表(草案)」專校院類檔案保存年限基準表(草案)」專校院類檔案保存年限基準表(草案)」專校院類檔案保存年限基準表(草案)」" },
        { date: "2017.07.13", title: "Hi~~~", content: "國家發展委員會檔案管理局函請就「大專校院類檔案保存年限基準表(草案)」案)」案)」案)」案)」" },

    ]

    return (
        <>
            {/* 非線上檔案展 */}
            { props.NowTab !== "OnlineArchiveExhibition"
                ?
                <>
                    {
                        data.length === 0
                            ?
                            <>
                                {/* 無資料表單區容器 */}
                                < BasicContainer
                                    baseDefaultTheme={"DefaultTheme"}
                                    height={Height}
                                    theme={mobileM.noDataContainer}
                                >
                                    <NoData />
                                </BasicContainer>
                            </>
                            :
                            <>
                                <CardTable
                                    dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                                    dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                        if (globalContextService.get("FilesPage", "orgId") !== globalContextService.get("FilesPage", "TableCheckedClearKey")) {
                                            globalContextService.remove("FilesPage", "CheckedRowKeys");
                                            globalContextService.remove("FilesPage", "CheckedRowsData");
                                        }
                                    }}
                                    checkbox={false}
                                    checked={globalContextService.get("FilesPage", "CheckedRowKeys") && globalContextService.get("FilesPage", "CheckedRowKeys")}
                                    checkedRowKeyName={"id"}
                                    checkboxOnChecked={
                                        (checkedRowKeys, checkedRows) => {
                                            // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                            globalContextService.set("FilesPage", "CheckedRowKeys", checkedRowKeys);
                                            globalContextService.set("FilesPage", "CheckedRowsData", checkedRows);
                                            //#region 必須要在勾選項"有異動"之後除˙存一個可判斷值，以保持"已異動勾選項"不被重置
                                            //#endregion
                                        }
                                    }
                                    setPerCheckBoxDisabled={(record) => {
                                        return {
                                            // ...record, // 對應CheckBox當列資料
                                            // disabled: record.name === 'Edrward 11',
                                        }
                                    }}
                                    //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                                    //scrollAreaHeight={"calc( 100% - 55px )"}
                                    columnsAttr={
                                        //#region 資料欄設定
                                        [
                                            {
                                                // title: '用戶列表',
                                                width: "100%",
                                                dataIndex: '',
                                                // sorter: (a, b) => a.carType.length - b.carType.length,
                                                // fixed: 'left',
                                                render: (rowData) => {

                                                    return (
                                                        <>
                                                            {/* 每一行資料容器 */}
                                                            <BasicContainer
                                                                theme={mobileM.lineContainer}
                                                            >
                                                                {/* 日期 文字 */}
                                                                <Text
                                                                    theme={mobileM.dateTimeText}
                                                                >
                                                                    {rowData.date}
                                                                </Text>

                                                                {/* 資料標題 文字 */}
                                                                <Text
                                                                    theme={mobileM.dataTitleText}
                                                                >
                                                                    {rowData.title}

                                                                    {/* 向右箭頭 圖標 */}
                                                                    <RightArrow style={mobileM.rightArrow} />
                                                                </Text>
                                                            </BasicContainer>
                                                        </>
                                                    )
                                                }
                                            },

                                        ]
                                        //#endregion
                                    }
                                    //sort
                                    showHeader={false}
                                    data={data}
                                    clickPage={(currentPage, pageSize) => {
                                    }}
                                />
                            </>
                    }
                </>
                :
                <>
                    {/* 線上檔案展 */}
                    {/* 輪播容器 */}
                    <Container
                        theme={mobileM.carouselContainer}
                    >
                        {`我是輪播 ~~~~~~~~`}
                    </Container>

                    {/* 年度 文字 */}
                    <Text
                        theme={mobileM.exhibitionYearText}
                    >

                        {`年度`}

                        {/* 年度 下拉式選單 */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={""}
                            bottomLabel={""}
                            //viewType
                            isSearchable
                            placeholder={""}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("MailServicePage", "TravelTime") ?? null}
                            onChange={(e, value, OnInitial) => {
                                globalContextService.set("MailServicePage", "TravelTime", value);
                            }}

                            options={[
                                { value: "2021", label: "2021" },
                                { value: "2022", label: "2022" }
                            ]}
                            // menuPosition={true}
                            theme={mobileM.exhibitionYearSelector}
                        />
                    </Text>

                    {
                        data1.map((item, index) => {
                            return (
                                <>
                                    {/* 展覽資料 容器 */}
                                    <BasicContainer
                                        theme={mobileM.exhibitionContentContainer}
                                        onClick={() => {
                                            props.setExhibitionDetail(item);
                                        }}
                                    >
                                        {/* 線上檔案展 圖片 */}
                                        <Upload
                                            viewType
                                            imageUrl={undefined}
                                            onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                                                globalContextService.set("MailServicePage", "CarPic", info?.file?.originFileObj)
                                            }}
                                            theme={mobileM.exhibitionImg}
                                        />

                                        {/* 順序編號 文字 */}
                                        <Text
                                            theme={mobileM.exhibitionIndexText}
                                        >
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}

                                            {/* 日期 文字 */}
                                            <Text
                                                theme={mobileM.exhibitionDateTimeText}
                                            >
                                                {item.date}
                                            </Text>
                                        </Text>

                                        {/* 檔案展 標題 */}
                                        <Text
                                            theme={mobileM.exhibitionTitle}
                                        >
                                            {item.title}
                                        </Text>

                                        {/* 檔案展內容 文字 */}
                                        <Text
                                            theme={mobileM.exhibitionContentText}
                                        >
                                            {item.content}
                                        </Text>
                                    </BasicContainer>
                                </>
                            )
                        })
                    }

                </>
            }

        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
