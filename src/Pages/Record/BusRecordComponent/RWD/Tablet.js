import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/RecordPage/NoData.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordPage/Share.svg'
import { ReactComponent as Start } from '../../../../Assets/img/RecordPage/Start.svg'
import { ReactComponent as End } from '../../../../Assets/img/RecordPage/End.svg'
import { ReactComponent as Bus } from '../../../../Assets/img/RecordPage/BusTablet.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, RangeDateTimePicker, Tag, Tooltip, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { CardTable } from '../../../../ProjectComponent'
import moment from 'moment';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { busRecordComponent: { rwd: { tablet } } } } } = Theme;
    const [Width, Height] = useWindowSize();

    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    return (
        <>
            {/* 查詢日期區間容器 */}
            <BasicContainer theme={tablet.dateTimeRangeContainer}>
                {/* 過去-未來訂單 */}
                <NewSelector
                    bascDefaultTheme={"DefaultTheme"}
                    topLabel={""}
                    bottomLabel={""}
                    //viewType
                    isSearchable
                    placeholder={""}
                    // isMulti
                    // hideSelectedOptions={false}
                    value={globalContextService.get("BusRecordComponentPage", "OrderTime") ?? globalContextService.get("RecordPage", "OrderTime") ?? { value: '2', label: "未來" }}
                    onChange={(e, value, onInitial) => {
                        if (value !== globalContextService.get("BusRecordComponentPage", "OrderTime")) {
                            globalContextService.set("BusRecordComponentPage", "OrderTime", value);
                            globalContextService.set("RecordPage", "OrderTime", value.value);
                            setForceUpdate(f => !f)
                        }
                    }}
                    options={
                        [
                            { value: '1', label: "過去" },
                            { value: '2', label: "未來" },
                        ]
                    }
                    // menuPosition={true}
                    theme={tablet.orderTime}
                />

                {/*  查詢日期區間 DateTimeRange  */}
                <RangeDateTimePicker
                    topLabel={<></>}
                    // type={"time"} time、date、week、month、quarter、year
                    type={"date"}
                    format={"YYYY-MM-DD"}
                    bascDefaultTheme={"DefaultTheme"}
                    // viewType
                    isSearchable
                    placeholder={""}
                    value={
                        (globalContextService.get("BusRecordComponentPage", "DateTimeRange") ?
                            [moment(globalContextService.get("BusRecordComponentPage", "DateTimeRange")[0]), moment(globalContextService.get("RecordPage", "DateTimeRange")[1])]
                            :
                            [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                        )
                    }
                    onChange={(value, momentObj) => {
                        globalContextService.set("BusRecordComponentPage", "DateTimeRange", value);
                    }}
                    theme={tablet.dateTimeRange}
                />
            </BasicContainer>

            {props.data.filter(i => i.case === "巴士").length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        height={Height}
                        theme={tablet.noDataContainer}
                    >
                        <NoData style={tablet.noDataSvg} />
                    </BasicContainer>
                </>
                :
                <>
                    <Container>
                        <CardTable
                            dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                            dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                if (globalContextService.get("RocordPage", "orgId") !== globalContextService.get("RocordPage", "TableCheckedClearKey")) {
                                    globalContextService.remove("RocordPage", "CheckedRowKeys");
                                    globalContextService.remove("RocordPage", "CheckedRowsData");
                                }
                            }}
                            checkbox={false}
                            checked={globalContextService.get("RocordPage", "CheckedRowKeys") && globalContextService.get("RocordPage", "CheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("RocordPage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("RocordPage", "CheckedRowsData", checkedRows);
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
                                                    {/* 卡片資料表單區容器 */}
                                                    < BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={tablet.cardContainer}
                                                    >
                                                        <Container>

                                                            {/* 第一區塊 容器 */}
                                                            <SubContainer
                                                                theme={tablet.firstAreaContainer}
                                                            >
                                                                <Bus style={tablet.caseSvg} />

                                                                {/* 使用者名稱 UserName*/}
                                                                <Text
                                                                    theme={tablet.userName}
                                                                >
                                                                    {rowData?.userName}

                                                                    {rowData?.case === "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 案號 標題*/}
                                                                            < Text
                                                                                theme={tablet.caseNumberTitle}
                                                                            >
                                                                                案號
                                                                 {/* 案號 內文*/}
                                                                                <Text
                                                                                    theme={tablet.caseNumberText}
                                                                                >
                                                                                    {rowData?.caseNumber}
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }
                                                                </Text>

                                                            </SubContainer>

                                                            <Tag
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                theme={tablet.cancelTag}
                                                                text={"服務單位取消"}
                                                            />

                                                            {rowData?.case !== "巴士"
                                                                &&
                                                                <>
                                                                    {/* 已共乘  ShareText*/}
                                                                    < Text
                                                                        theme={tablet.shareText}
                                                                    >
                                                                        <Share
                                                                            style={tablet.shareSvg}
                                                                        />
                                                            已共乘
                                                                </Text>
                                                                </>
                                                            }

                                                            {/* 右方外側容器 */}
                                                            <SubContainer
                                                                theme={tablet.rightOutContainer}
                                                            >
                                                                <Container>
                                                                    {/* 第二區塊 容器 */}
                                                                    <SubContainer
                                                                        theme={tablet.secondAreaContainer}
                                                                    >
                                                                        {/* 訂單編號 標題 */}
                                                                        <Text
                                                                            theme={tablet.orderNumberTitle}
                                                                        >
                                                                            訂單編號

                                                                        {/* 訂單編號 內文 */}
                                                                            <Text
                                                                                theme={tablet.orderNumberText}
                                                                            >
                                                                                {rowData?.orderNumber}
                                                                            </Text>
                                                                        </Text>

                                                                        {/* 預約搭乘時間 標題 */}
                                                                        <Text
                                                                            theme={tablet.bookRideTitle}
                                                                        >
                                                                            預約搭乘時間

                                                                        {/* 預約搭乘時間 內文 */}
                                                                            <Text
                                                                                theme={tablet.bookRideText}
                                                                            >
                                                                                {rowData?.bookRide}
                                                                            </Text>
                                                                        </Text>



                                                                        {/* 服務單位 標題 */}
                                                                        <Text
                                                                            theme={tablet.serviceUnitTitle}
                                                                        >
                                                                            服務單位

                                                                        {/* 服務單位 內文 */}
                                                                            <Tooltip placement="top" title={rowData?.serviceUnit}>

                                                                                <Text
                                                                                    theme={tablet.serviceUnitText}
                                                                                >
                                                                                    {rowData?.serviceUnit}
                                                                                </Text>
                                                                            </Tooltip>

                                                                        </Text>

                                                                        {/* 司機 標題 */}
                                                                        <Text
                                                                            theme={tablet.driverTitle}
                                                                        >
                                                                            司機

                                                                        {/* 司機 內文 */}
                                                                            <Text
                                                                                theme={tablet.driverText}
                                                                            >
                                                                                {rowData?.driver}
                                                                            </Text>
                                                                        </Text>

                                                                        {/* 車牌 標題 */}
                                                                        <Text
                                                                            theme={tablet.licensePlateTitle}
                                                                        >
                                                                            車牌

                                                                        {/* 車牌 內文 */}
                                                                            <Text
                                                                                theme={tablet.licensePlateText}
                                                                            >
                                                                                {rowData?.licensePlate}
                                                                            </Text>
                                                                        </Text>

                                                                        {rowData?.case === "長照"
                                                                            &&
                                                                            <Container>
                                                                                {/* 車資總額 標題 */}
                                                                                <Text
                                                                                    theme={tablet.totalFareTitle}
                                                                                >
                                                                                    車資總額

                                                                                {/* 車資總額 內文 */}
                                                                                    <Text
                                                                                        theme={tablet.totalFareText}
                                                                                    >
                                                                                        {"$" + rowData?.totalFareText}
                                                                                    </Text>
                                                                                </Text>

                                                                                {/* 政府補助 標題 */}
                                                                                <Text
                                                                                    theme={tablet.govSubsidyTitle}
                                                                                >
                                                                                    政府補助

                                                                                {/* 政府補助 內文 */}
                                                                                    <Text
                                                                                        theme={tablet.govSubsidyText}
                                                                                    >
                                                                                        {"$" + rowData?.govSubsidy}
                                                                                    </Text>
                                                                                </Text>

                                                                                {/* 陪同金額 標題 */}
                                                                                <Text
                                                                                    theme={tablet.accompanyingAmountTitle}
                                                                                >
                                                                                    陪同金額

                                                                                {/* 陪同金額 內文 */}
                                                                                    <Text
                                                                                        theme={tablet.accompanyingAmountText}
                                                                                    >
                                                                                        {"$" + rowData?.accompanyingAmount}
                                                                                    </Text>
                                                                                </Text>

                                                                            </Container>
                                                                        }

                                                                        <Container>

                                                                            {rowData?.case !== "巴士"
                                                                                &&
                                                                                <>
                                                                                    {/* 是否共乘 標題 */}
                                                                                    <Text
                                                                                        theme={tablet.canShareTitle}
                                                                                    >
                                                                                        是否共乘

                                                                                    {/* 是否共乘 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.canShareText}
                                                                                        >
                                                                                            {rowData?.canShare}
                                                                                        </Text>
                                                                                    </Text>
                                                                                </>
                                                                            }

                                                                            {/* 人數 標題 */}
                                                                            <Text
                                                                                theme={tablet.numberOfPeopleTitle}
                                                                            >
                                                                                人數

                                                                            {/* 人數 內文 */}
                                                                                <Text
                                                                                    theme={tablet.numberOfPeopleText}
                                                                                >
                                                                                    {rowData?.numberOfPeople + "人"}
                                                                                </Text>
                                                                            </Text>

                                                                            {rowData?.case === "巴士"
                                                                                &&
                                                                                <>
                                                                                    {/* 車資總額 標題 */}
                                                                                    < Text
                                                                                        theme={tablet.totalFareTitle}
                                                                                    >
                                                                                        車資總額

                                                                                    {/* 車資總額 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.totalFareText}
                                                                                        >
                                                                                            {"$" + rowData?.totalFareText}
                                                                                        </Text>
                                                                                    </Text>
                                                                                </>
                                                                            }

                                                                        </Container>


                                                                    </SubContainer>


                                                                    {/* 第三區塊 容器 */}
                                                                    <SubContainer
                                                                        theme={tablet.thirdAreaContainer}
                                                                    >

                                                                        {/* 起點 標題 */}
                                                                        <Text
                                                                            theme={tablet.startPointTitle}
                                                                        >

                                                                            <Start style={tablet.startPointSvg} />
                                                                    起點
                                                                    </Text>

                                                                        {/* 起點 內文 */}
                                                                        <Text
                                                                            theme={tablet.startPointText}
                                                                        >
                                                                            {rowData?.startPoint}
                                                                        </Text>

                                                                        {/* 迄點 標題 */}
                                                                        <Text
                                                                            theme={tablet.endPointTitle}
                                                                        >

                                                                            <End style={tablet.endPointSvg} />
                                                                    迄點
                                                                    </Text>

                                                                        {/* 迄點 內文 */}
                                                                        <Text
                                                                            theme={tablet.endPointText}
                                                                        >
                                                                            {rowData?.endPoint}
                                                                        </Text>

                                                                        {rowData?.case === "長照"
                                                                            &&
                                                                            <>

                                                                                {/* 個案負擔 容器*/}
                                                                                <Container
                                                                                    theme={tablet.caseBurdenContainer}
                                                                                >

                                                                                    {/* 個案負擔 標題 */}
                                                                                    <Text
                                                                                        theme={tablet.caseBurdenTitle}
                                                                                    >
                                                                                        個案負擔

                                                                                    {/* 個案負擔 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.caseBurdenText}
                                                                                        >
                                                                                            {"$" + rowData?.caseBurden}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    <Container
                                                                                        theme={tablet.rightButtonContainer}
                                                                                    >
                                                                                        {/* 司機未執行按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.noExecuteButton}
                                                                                            onClick={() => {
                                                                                                //#region 打開司機未執行警示 Modal
                                                                                                modalsService.infoModal.warn({
                                                                                                    iconRightText: "確定司機未執行?",
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
                                                                                            司機未執行
                                                                                    </NativeLineButton>

                                                                                        {rowData?.case !== "巴士"
                                                                                            &&
                                                                                            <>
                                                                                                {/* 再叫一次按鈕 */}
                                                                                                <NativeLineButton
                                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                                    disable={false}
                                                                                                    type="button" // 防止提交
                                                                                                    theme={tablet.againButton}
                                                                                                    onClick={() => {
                                                                                                        // history.push("/Order/WhiteOrder");
                                                                                                        // props.controllGCS("return")
                                                                                                    }}
                                                                                                >
                                                                                                    再叫一次
                                                                                            </NativeLineButton>
                                                                                            </>
                                                                                        }

                                                                                        {/* 乘車明細按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.rideDetailsButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            乘車明細
                                                                                    </NativeLineButton>

                                                                                        {/* 填寫問卷按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.questionnaireButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            填寫問卷
                                                                                    </NativeLineButton>




                                                                                    </Container>
                                                                                </Container>


                                                                            </>
                                                                        }

                                                                        {rowData?.case !== "長照"
                                                                            &&
                                                                            <Container>

                                                                                {/* 乘客 標題 */}
                                                                                <Text
                                                                                    theme={tablet.passengerTitle}
                                                                                >
                                                                                    乘客


                                                                    </Text>

                                                                                {/* 乘客 內文 容器*/}
                                                                                <Text
                                                                                    theme={tablet.passengerContainer}
                                                                                >
                                                                                    <Container>
                                                                                        {
                                                                                            (rowData?.passenger ?? []).map((passenger, index) => {
                                                                                                return (
                                                                                                    <React.Fragment key={index}>
                                                                                                        {/* 乘客 內文 */}
                                                                                                        <Text
                                                                                                            theme={tablet.passengerText}
                                                                                                        >
                                                                                                            {passenger}

                                                                                                        </Text>
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </Container>
                                                                                </Text>

                                                                            </Container>
                                                                        }


                                                                    </SubContainer>

                                                                </Container>

                                                                <Container>
                                                                    {rowData?.case !== "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 第四區塊 容器 */}
                                                                            <SubContainer
                                                                                theme={tablet.forthAreaContainer}
                                                                            >


                                                                                <Container>
                                                                                    {/* 用戶負擔 標題 */}
                                                                                    <Text
                                                                                        theme={tablet.userBurdenTitle}
                                                                                    >
                                                                                        用戶負擔

                                                                                    {/* 用戶負擔 內文 */}
                                                                                        <Text
                                                                                            theme={tablet.userBurdenText}
                                                                                        >
                                                                                            {"$" + rowData?.caseBurden}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    {/* 下方按鈕容器 */}
                                                                                    <Container
                                                                                        theme={tablet.bottomButtonContainer}
                                                                                    >
                                                                                        {/* 司機未執行按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.noExecuteButton}
                                                                                            onClick={() => {
                                                                                                //#region 打開司機未執行警示 Modal
                                                                                                modalsService.infoModal.warn({
                                                                                                    iconRightText: "確定司機未執行?",
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
                                                                                            司機未執行
                                                                                    </NativeLineButton>

                                                                                        {rowData?.case !== "巴士"
                                                                                            &&
                                                                                            <>
                                                                                                {/* 再叫一次按鈕 */}
                                                                                                <NativeLineButton
                                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                                    disable={false}
                                                                                                    type="button" // 防止提交
                                                                                                    theme={tablet.againButton}
                                                                                                    onClick={() => {
                                                                                                        // history.push("/Order/WhiteOrder");
                                                                                                        // props.controllGCS("return")
                                                                                                    }}
                                                                                                >
                                                                                                    再叫一次
                                                                                    </NativeLineButton>
                                                                                            </>
                                                                                        }

                                                                                        {/* 乘車明細按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.rideDetailsButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            乘車明細
                                                                                    </NativeLineButton>

                                                                                        {/* 填寫問卷按鈕 */}
                                                                                        <NativeLineButton
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            disable={false}
                                                                                            type="button" // 防止提交
                                                                                            theme={tablet.questionnaireButton}
                                                                                            onClick={() => {
                                                                                                // history.push("/Order/WhiteOrder");
                                                                                                // props.controllGCS("return")
                                                                                            }}
                                                                                        >
                                                                                            填寫問卷
                                                                                    </NativeLineButton>
                                                                                    </Container>
                                                                                </Container>
                                                                            </SubContainer>

                                                                        </>
                                                                    }
                                                                </Container>

                                                            </SubContainer>
                                                        </Container>
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
                            data={
                                (globalContextService.get("BusRecordComponentPage", "OrderTime")?.value === '1') ?
                                    props.data
                                        .filter(d => d.case === "巴士" &&
                                            moment(d.bookRide).isAfter(moment().subtract(1, 'months').startOf('month')) &&
                                            moment(d.bookRide).isBefore(moment())
                                        )
                                    :
                                    (globalContextService.get("BusRecordComponentPage", "OrderTime")?.value === '2') ?
                                        props.data
                                            .filter(d => d.case === "巴士" &&
                                                moment(d.bookRide).isAfter(moment()) &&
                                                moment(d.bookRide).isBefore(moment().add(1, 'months').endOf('month'))
                                            )
                                        :
                                        props.data.filter(i => i.case === "巴士")
                            }
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </Container>
                </>
            }
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`