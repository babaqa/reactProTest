import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { CardTable, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import { ReactComponent as NoData } from '../../../Assets/img/MailServicePage/NoData.svg'
import { ReactComponent as Point } from '../../../Assets/img/MailServicePage/Point.svg'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { subTabMapping } from '../../../Mappings/Mappings';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { mailService: { rwd: { laptopL } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false)
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    //#region 分頁映射
    const tabMap = () => {
        return ["郵務查詢"]

    }
    //#endregion

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
    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 首頁文字 */}
                        <Text
                            theme={laptopL.homePageText}
                        >
                            {`首頁　／　`}

                            {/* 當前頁面文字 */}
                            <Text
                                theme={laptopL.nowPageText}
                            >
                                {"郵務查詢"}
                            </Text>
                        </Text>

                        {/* 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"郵務查詢"}
                            theme={laptopL.baseSubTitleBar}
                        >
                        </MainPageSubTitleBar>
                    </>
                }
            >
                {/* 左側tab 容器 */}
                <BasicContainer
                    theme={laptopL.tabsContainer}
                >
                    {tabMap().map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Text
                                    // onClick={() => {
                                    //     // props.setNowTab(Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]) 
                                    //     history.push(`/Application?subTab=${Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]}`);
                                    //     setUpdateComponent(u => !u);
                                    // }}
                                    theme={laptopL.titleBarContactTab}
                                >
                                    <Point
                                        style={laptopL.pointSvg}
                                    />
                                    {item}
                                </Text>
                            </React.Fragment>
                        )
                    })}
                </BasicContainer>

                {/* 右側資料 容器 */}
                <BasicContainer
                    theme={laptopL.listContainer}
                >
                    {data.length === 0
                        ?
                        <>
                            {/* 無資料表單區容器 */}
                            < BasicContainer
                                baseDefaultTheme={"DefaultTheme"}
                                height={Height}
                                theme={laptopL.noDataContainer}
                            >
                                <NoData />
                            </BasicContainer>
                        </>
                        :
                        <>
                            <CardTable
                                dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                                dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                    if (globalContextService.get("MailServicePage", "orgId") !== globalContextService.get("MailServicePage", "TableCheckedClearKey")) {
                                        globalContextService.remove("MailServicePage", "CheckedRowKeys");
                                        globalContextService.remove("MailServicePage", "CheckedRowsData");
                                    }
                                }}
                                checkbox={false}
                                checked={globalContextService.get("MailServicePage", "CheckedRowKeys") && globalContextService.get("MailServicePage", "CheckedRowKeys")}
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("MailServicePage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("MailServicePage", "CheckedRowsData", checkedRows);
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
                                                            theme={laptopL.lineContainer}
                                                        >
                                                            {/* 日期 文字 */}
                                                            <Text
                                                                theme={laptopL.dateTimeText}
                                                            >
                                                                {rowData.date}
                                                            </Text>

                                                            {/* 資料標題 文字 */}
                                                            <Text
                                                                theme={laptopL.dataTitleText}
                                                            >
                                                                {rowData.title}
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
                </BasicContainer>
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`