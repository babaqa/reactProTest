import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MapGoogle, QA } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { ReactComponent as CaseLaptopL } from '../../../../Assets/img/RecordDetailPage/CaseLaptopL.svg'
import { ReactComponent as FleetLaptopL } from '../../../../Assets/img/RecordDetailPage/FleetLaptopL.svg'
import { ReactComponent as BusLaptopL } from '../../../../Assets/img/RecordDetailPage/BusLaptopL.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordPage/Share.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { toString, isNil } from 'lodash';
import { getParseItemLocalStorage } from '../../../../Handlers';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { detail: { rwd: { laptopL } } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    //#region 取消狀態分類
    const cancelStatus = (status) => {
        switch (toString(status)) {
            case "SYS_ORDERCANCEL_REMARK_ADMIN":
                return "單位取消";
            case "SYS_ORDERCANCEL_REMARK_CLIENT":
                return "個案取消";
            case "SYS_ORDERCANCEL_REMARK_DRIVER":
                return "空趟";
            case "SYS_ORDERCANCEL_REMARK_CLIENT_NOTARRIVED":
                return "司機未到";
            case "SYS_ORDERCANCEL_REMARK_CLIENT_NOORG":
                return "無派車";
            default:
                return "已取消";
        }
    }
    //#endregion

    //#region 狀態分類
    const statusMapping = (status, getTheme = false, cancelReamrk = "") => {
        switch (toString(status)) {
            case "1":
                return (getTheme ? laptopL.statusTag.newOrder : "新訂單");
            case "2":
                return (getTheme ? laptopL.statusTag.assignedOrder : "已排班");
            case "3":
                return (getTheme ? laptopL.statusTag.arrivalOrder : "抵達搭車地點");
            case "4":
                return (getTheme ? laptopL.statusTag.customUpOrder : "客上");
            case "5":
                return (getTheme ? laptopL.statusTag.finishedOrder : "已完成");
            case "9":
                return (getTheme ? laptopL.statusTag.unitCancleOrder : cancelStatus(cancelReamrk));
            default:
                return (getTheme ? {} : "無此狀態");
        }
    }
    //#endregion

    return (
        <>
            <MainPageContainer
                height={Height}
                theme={laptopL.mainPageContainer}
            // outSideTopComponent={
            //     <>
            //         {/* 標題列 */}
            //         <MainPageTitleBar
            //             bascDefaultTheme={"DefaultTheme"}
            //             titleText={"常見問題"}
            //             theme={laptopL.titleBar}
            //         // onSubmit={(e)=>console.log(e)}
            //         >
            //         </MainPageTitleBar>
            //     </>
            // }
            >
                {/* 乘車紀錄容器 */}
                <BasicContainer
                    height={Height}
                    theme={laptopL.detailContainer}
                >
                    {/* 乘車紀錄標題容器 */}
                    <SubContainer
                        theme={laptopL.titleContainer}
                    >
                        {/* 案件類型圖標 */}
                        <CaseLaptopL style={laptopL.caseSvg} />

                        <Container>
                            {/* 訂單編號 標題 */}
                            <Text
                                theme={laptopL.orderNoTitle}
                            >
                                訂單編號

                                {/* 訂單編號 內文 */}
                                <Text
                                    theme={laptopL.orderNoText}
                                >
                                    {props?.orderNo ?? "TS16063797554258"}
                                </Text>
                            </Text>

                            {/* 預約搭乘時間 標題 */}
                            <Text
                                theme={laptopL.reserveDateTitle}
                            >
                                預約搭乘時間

                                {/* 預約搭乘時間 內文 */}
                                <Text
                                    theme={laptopL.reserveDateText}
                                >
                                    {props?.reserveDate ?? "2020-11-29 21:30"}
                                </Text>

                            </Text>

                        </Container>

                        {/* 乘車紀錄標題 右方容器 */}
                        <SubContainer
                            theme={laptopL.rightTitleContainer}
                        >
                            {/* 已共乘  ShareText*/}
                            < Text
                                theme={laptopL.shareText}
                            >
                                <Share
                                    style={laptopL.shareSvg}
                                />
                                    已共乘
                            </Text>

                            {/* 狀態標籤 */}
                            <Tag
                                baseDefaultTheme={"DefaultTheme"}
                                theme={statusMapping(props.status ?? 9, true)}
                                text={statusMapping(props.status ?? 9, false, props.cancelReamrk)}
                            />
                        </SubContainer>

                    </SubContainer>

                    <Container>
                        {/* 案件明細容器 */}
                        <SubContainer
                            theme={laptopL.caseDetailContainer}
                        >
                            {/* 姓名行容器 */}
                            <Container
                                theme={laptopL.insideContainer}
                            >
                                {/* 使用者名稱 UserName*/}
                                <Text
                                    theme={laptopL.userName}
                                >
                                    {props?.userName ?? getParseItemLocalStorage("UserName")}
                                </Text>

                                {/* 案號 標題*/}
                                < Text
                                    theme={laptopL.caseNumberTitle}
                                >
                                    案號

                                {/* 案號 內文*/}
                                    <Text
                                        theme={laptopL.caseNumberText}
                                    >
                                        {props?.caseNumber ?? "1081213001"}
                                    </Text>
                                </Text>

                                {/* 可否共乘 標題 */}
                                <Text
                                    theme={laptopL.canShareTitle}
                                >
                                    可否共乘
                                    {/* 可否共乘 內文 */}
                                    <Text
                                        theme={laptopL.canShareText}
                                    >
                                        {props?.canShared ? "願意共乘" : "不願共乘"}
                                    </Text>
                                </Text>

                                {/* 人數 標題 */}
                                <Text
                                    theme={laptopL.numberOfPeopleTitle}
                                >
                                    人數

                                    {/* 人數 內文 */}
                                    <Text
                                        theme={laptopL.numberOfPeopleText}
                                    >
                                        {props.nowTab === "長照" ? props?.familyWith : props?.passengerNum ?? 0}人
                                    </Text>
                                </Text>

                            </Container>

                            {/* 司機 標題 */}
                            <Text
                                theme={laptopL.driverTitle}
                            >
                                司機

                                {/* 司機 內文 */}
                                <Text
                                    theme={laptopL.driverText}
                                >
                                    {props?.driverInfoName ?? "王小明明"}
                                </Text>
                            </Text>

                            {/* 車牌 標題 */}
                            <Text
                                theme={laptopL.licensePlateTitle}
                            >
                                車牌

                                {/* 車牌 內文 */}
                                <Text
                                    theme={laptopL.licensePlateText}
                                >
                                    {props?.carNo ?? "MMM-0000"}
                                </Text>
                            </Text>

                            {/* 服務單位 標題 */}
                            <Text
                                theme={laptopL.serviceUnitTitle}
                            >
                                服務單位

                            {/* 服務單位 內文 */}
                                <Tooltip placement="top" title={props?.orgName ?? "測試交通單位1測試交通單位1測試交通單位位"}>

                                    <Text
                                        theme={laptopL.serviceUnitText}
                                    >
                                        {props?.orgName ?? "測試交通單位1測試交通單位1測試交通單位位"}
                                    </Text>
                                </Tooltip>
                            </Text>


                        </SubContainer>

                        {/* 按鈕容器 */}
                        <SubContainer
                            theme={laptopL.buttonContainer}
                        >
                            <Container>
                                {/* 司機未到按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.noExecuteButton}
                                    onClick={() => {
                                        //#region 打開司機未執行警示 Modal
                                        modalsService.infoModal.warn({
                                            iconRightText: "確定司機未到?",
                                            yes: true,
                                            yesText: "確認",
                                            no: true,
                                            noText: "取消",
                                            // autoClose: true,
                                            backgroundClose: false,
                                            yesOnClick: (e, close) => { close(); },
                                            noOnClick: (e, close) => { },
                                        })
                                        // endregion
                                    }}
                                >
                                    司機未到
                                </NativeLineButton>

                                {/* 再次預約按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.againButton}
                                    onClick={() => {
                                        // history.push("/Order/WhiteOrder");
                                        // props.controllGCS("return")
                                    }}
                                >
                                    再次預約
                                </NativeLineButton>

                                {/* 填寫問卷按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.questionnaireButton}
                                    onClick={() => {
                                        // history.push("/Order/WhiteOrder");
                                        // props.controllGCS("return")
                                    }}
                                >
                                    填寫問卷
                                </NativeLineButton>

                            </Container>

                            <Container>
                                {/* 車資總額 標題 */}
                                <Text
                                    theme={laptopL.totalFareTitle}
                                >
                                    車資總額

                                {/* 車資總額 內文 */}
                                    <Text
                                        theme={laptopL.totalFareText}
                                    >
                                        ${props?.totalAmt ?? 0}
                                    </Text>
                                </Text>

                                {/* 政府補助 標題 */}
                                <Text
                                    theme={laptopL.govSubsidyTitle}
                                >
                                    政府補助

                                {/* 政府補助 內文 */}
                                    <Text
                                        theme={laptopL.govSubsidyText}
                                    >
                                        ${props?.govSubsidy ?? 0}
                                    </Text>
                                </Text>

                                {/* 陪同金額 標題 */}
                                <Text
                                    theme={laptopL.accompanyingAmountTitle}
                                >
                                    陪同金額

                                {/* 陪同金額 內文 */}
                                    <Text
                                        theme={laptopL.accompanyingAmountText}
                                    >
                                        ${props?.withAmt ?? 0}
                                    </Text>
                                </Text>

                                {/* 個案負擔 標題 */}
                                <Text
                                    theme={laptopL.caseBurdenTitle}
                                >
                                    {props.nowTab === "長照"
                                        ?
                                        "個案負擔"
                                        :
                                        "用戶負擔"
                                    }

                                    {/* 個案負擔 內文 */}
                                    <Text
                                        theme={laptopL.caseBurdenText}
                                    >
                                        ${props?.caseBurden ?? 1245451510}
                                    </Text>
                                </Text>

                            </Container>

                        </SubContainer>

                    </Container>

                    {/* 行程一覽容器 */}
                    <SubContainer
                        theme={laptopL.strokeContainer}
                    >
                        {/* 行程一覽 */}
                        <Text
                            theme={laptopL.stroke}
                        >
                            行程一覽
                       </Text>

                        {/* 預估距離 標題 */}
                        <Text
                            theme={laptopL.distanceTitle}
                        >
                            預估距離

                                {/* 預估距離 內文 */}
                            <Text
                                theme={laptopL.distanceText}
                            >
                                {props?.carNo ?? "100km"}
                            </Text>
                        </Text>

                        {/* 預估時間 標題 */}
                        <Text
                            theme={laptopL.timingTitle}
                        >
                            預估時間

                                {/* 預估時間 內文 */}
                            <Text
                                theme={laptopL.timingText}
                            >
                                {props?.carNo ?? "18分鐘"}
                            </Text>
                        </Text>


                    </SubContainer>

                    <Container>
                        {/* 起訖點容器 */}
                        <SubContainer
                            theme={laptopL.startToEndContainer}
                        >
                            <Container>
                                {/* 起點 標題 */}
                                <Text
                                    theme={laptopL.startPointTitle}
                                >
                                    起 ({props.fromAddr ?? "住家"})
                            </Text>

                                {/* 起點 內文 */}
                                <Text
                                    theme={laptopL.startPointText}
                                >
                                    {props.nowTab === "巴士" ? props?.fromStationName : props?.fromAddr ?? "台灣新北市板橋區中山路一段161號"}
                                </Text>

                            </Container>

                            {/* 起點 備註 */}
                            <Text
                                theme={laptopL.startPointnote}
                            >
                                備註：{props.nowTab === "巴士" ? props?.fromStationName : props?.fromAddr ?? "在立德路和延和路交叉口,靠近延和路這邊。"}
                            </Text>

                            <Container>
                                {/* 迄點 標題 */}
                                <Text
                                    theme={laptopL.endPointTitle}
                                >

                                    迄 ({props.fromAddr ?? "復健診所"})
                            </Text>

                                {/* 迄點 內文 */}
                                <Text
                                    theme={laptopL.endPointText}
                                >
                                    {props.nowTab === "巴士" ? props?.toStationName : props?.toAddr ?? "台灣新北市板橋區中山路一段161號"}
                                </Text>
                            </Container>

                            {/* 迄點 備註 */}
                            <Text
                                theme={laptopL.endPointnote}
                            >
                                備註：{props.nowTab === "巴士" ? props?.fromStationName : props?.fromAddr ?? "在立德路和延和路交叉口,靠近延和路這邊。"}
                            </Text>

                        </SubContainer>

                        {/* 行程表格容器 */}
                        <SubContainer
                            theme={laptopL.strokeTableContainer}
                        >
                            <OldTable
                                pagination={false}
                                checkbox={false}
                                // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("CaseCallCarComponentPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("CaseCallCarComponentPage", "CheckedRowsData", checkedRows);
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
                                            title: '總額',
                                            width: "20%",
                                            dataIndex: 'totalAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '補助',
                                            width: "20%",
                                            dataIndex: 'subsidyAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '自負',
                                            width: "20%",
                                            dataIndex: 'selfPayAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '陪同',
                                            width: "20%",
                                            dataIndex: 'withAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '個案負擔',
                                            width: "20%",
                                            // dataIndex: 'seatNum',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            fixed: 'right',
                                            render: (rowData) => {
                                                return (

                                                    <Text
                                                        theme={laptopL.redText}
                                                    >
                                                        {!isNil(rowData?.withAmt) ? `$${rowData?.withAmt + rowData?.selfPayAmt}` : ""}
                                                    </Text>

                                                )
                                            }
                                        },
                                        {
                                            title: '',
                                            width: "0px",
                                            dataIndex: 'rightOccupy',
                                            fixed: 'right',
                                            sorter: false
                                        },
                                    ]
                                    //#endregion
                                }
                                //sort
                                //showHeader={false}
                                data={[
                                    { id: "1", totalAmt: "1000" },
                                ]}
                                // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                // data={props.CaseOrderAmt}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </SubContainer>
                    </Container>

                    {/* 地圖容器 */}
                    <SubContainer
                        theme={laptopL.mapContainer}
                    >
                        <MapGoogle
                            mapId={"test1"}
                            mapAttr={{
                                //   maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
                                center: { lat: 25.012930, lng: 121.474708 }, // 初始中心座標，格式為 [lng, lat]  // 25.012930, 121.474708
                                zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
                                //   minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
                                //   maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
                                //   pitch: 0, // 攝影機仰角, 可省略, [0-60] // default 50
                                //   bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
                                //   attributionControl: false,
                            }}

                            theme={laptopL.map}
                        />
                    </SubContainer>

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`