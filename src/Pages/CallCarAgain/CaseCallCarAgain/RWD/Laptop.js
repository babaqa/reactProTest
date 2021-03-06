import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle, mapGoogleControll, MapGoogleInput } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/CaseCallCarAgainPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/CaseCallCarAgainPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/CaseCallCarAgainPage/StartToEnd.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/CaseCallCarAgainPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/CaseCallCarAgainPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/CaseCallCarAgainPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { posRemarksSelectOption } from '../../../../Mappings/Mappings';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCarAgain: { caseCallCarAgain: { rwd: { laptop } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    //#region 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
        let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

        let validMsg = "";
        if (valid(globalContextService.get("CaseCallCarAgainPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]
        }

        if (validMsg === "") {
            // 如果起迄點、搭車日期、搭車時間有值、陪同人數 皆已有有值
            props.GetCaseOrderAmtExecute({
                CaseUserId: props.CaseUserId,
                FromAddr: globalContextService.get("CaseCallCarAgainPage", "StartPos"),
                // FromAddrId:, // 不用丟
                ToAddr: globalContextService.get("CaseCallCarAgainPage", "EndPos"),
                FamilyWith: globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value,
                // ToAddrId:, // 不用丟
                ReservationDate: globalContextService.get("CaseCallCarAgainPage", "TravelDate") + " " + globalContextService.get("CaseCallCarAgainPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
            })
        }

    }, [])
    //#endregion

    //#region 新增下個地點、立即預約 送出前欄位檢核
    const formValid = useCallback(() => {
        //#region 表單驗證
        let validMsg = "";

        if (valid(globalContextService.get("CaseCallCarAgainPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "Orderer")?.value ?? "", ["^.{1,}$"], ["請選擇訂車人身分"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "Orderer")?.value ?? "", ["^.{1,}$"], ["請選擇訂車人身分"])[1]
        }
        // 其實 應該要連實際經緯度標記坐標一起檢核，目前尚未防堵 選擇自動完成選項後，又改動輸入框地址內容，然後送出的情況  
        // PS.可以分成 目前輸入框內容 與 onSelect的值，onChange時清掉onSelect的值，然後送出時一律檢核onSelect的值
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇起點備註"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇起點備註"])[1]
        }
        else if (
            (globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.label === "其他")
            &&
            valid(globalContextService.get("CaseCallCarAgainPage", "OtherStartPosRemarks") ?? "", ["^.{1,}$"], ["請輸入起點備註 - 其他"])[1]
        ) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "OtherStartPosRemarks") ?? "", ["^.{1,}$"], ["請輸入起點備註 - 其他"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇迄點備註"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇迄點備註"])[1]
        }
        else if (
            (globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.label === "其他")
            &&
            valid(globalContextService.get("CaseCallCarAgainPage", "OtherEndPosRemarks") ?? "", ["^.{1,}$"], ["請輸入迄點備註 - 其他"])[1]
        ) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "OtherEndPosRemarks") ?? "", ["^.{1,}$"], ["請輸入迄點備註 - 其他"])[1]
        }
        // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
        //     validMsg = "請重新輸入起訖地址"
        // }
        else if (
            (globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") === 1)
            &&
            valid(globalContextService.get("CaseCallCarAgainPage", "ReturnEnableDate") ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]
        ) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "ReturnEnableDate") ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]
        }
        else if (
            (globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") === 1)
            &&
            !moment(globalContextService.get("CaseCallCarAgainPage", "ReturnEnableDate"), "HH:mm").isAfter(moment(globalContextService.get("CaseCallCarAgainPage", "TravelTime"), "HH:mm"))
        ) {  // !(去程時間 > 回程時間)
            validMsg = "回程乘車時間不可早於或等於去程時間"
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarAgainPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarAgainPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]
        }
        //#endregion

        return validMsg;

    }, [])
    //#endregion

    return (
        <>
            {/* 叫車頁面外層容器 */}
            <Container
                theme={laptop.callCarOutContainer}
            >
                <SubContainer
                    theme={laptop.mapContainer}
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

                        theme={laptop.map}
                    />

                </SubContainer>

                {/* 本日行程一覽容器 */}
                <BasicContainer
                    open={props.TodayToDoOpen}
                    theme={laptop.todayToDoCotainer}
                >
                    {/* 本日行程一覽標題 */}
                    <Text
                        theme={laptop.todayToDoTitle}
                        onClick={(e) => { props.setTodayToDoOpen(t => !t) }}
                    >
                        本日行程一覽

                            <UpCircle style={laptop.todayToDoTitleIcon} />
                    </Text>

                    {/* 起迄點容器 */}
                    <BasicContainer
                        theme={laptop.startToEndContainer}
                    >
                        <StartToEnd
                            style={laptop.startToEndSvg}
                        />

                        {/* 起點 */}
                        <Text
                            theme={laptop.todayToDoStart}
                        >
                            <Start style={laptop.todayToDoStartSvg} />
                                (起點)
                            </Text>

                        {/* 起點地址 */}
                        <Text
                            theme={laptop.todayToDoStartAddr}
                        >
                            {globalContextService.get("CaseCallCarAgainPage", "StartPos")}
                        </Text>


                        {/* 迄點 */}
                        <Text
                            theme={laptop.todayToDoEnd}
                        >
                            <End style={laptop.todayToDoEndSvg} />
                                (迄點)
                            </Text>

                        {/* 迄點地址 */}
                        <Text
                            theme={laptop.todayToDoEndAddr}
                        >
                            {globalContextService.get("CaseCallCarAgainPage", "EndPos")}
                        </Text>
                    </BasicContainer>


                    {/* Table 容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        open={props.TodayToDoOpen}
                        theme={laptop.tableContainer}
                    >
                        <OldTable
                            pagination={false}
                            checkbox={false}
                            // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("CaseCallCarAgainPage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("CaseCallCarAgainPage", "CheckedRowsData", checkedRows);
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
                                        title: '行程',
                                        width: "60px",
                                        dataIndex: 'type',
                                        sorter: (a, b) => a.carNo.length - b.carNo.length,
                                        fixed: 'left',
                                        render: (rowData) => {
                                            return <>
                                                <Text theme={laptop.type}>
                                                    {rowData}
                                                </Text>
                                            </>
                                        },
                                    },
                                    {
                                        title: '預估距離',
                                        width: "100px",
                                        dataIndex: 'distance',
                                        // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            return !isNil(rowData) ? `${(rowData / 1000)?.toFixed(2)}公里` : ""
                                        }
                                    },
                                    {
                                        title: '預估時間',
                                        width: "100px",
                                        dataIndex: 'duration',
                                        // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            return !isNil(rowData) ? `${(rowData / 60)?.toFixed(0)}分鐘` : ""
                                        }
                                    },
                                    {
                                        title: '車資總額',
                                        width: "100px",
                                        dataIndex: 'totalAmt',
                                        // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            return !isNil(rowData) ? `$${rowData}` : ""
                                        }
                                    },
                                    {
                                        title: '政府補助',
                                        width: "100px",
                                        dataIndex: 'subsidyAmt',
                                        // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            return !isNil(rowData) ? `$${rowData}` : ""
                                        }
                                    },
                                    {
                                        title: '自負額',
                                        width: "100px",
                                        dataIndex: 'selfPayAmt',
                                        // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            return !isNil(rowData) ? `$${rowData}` : ""
                                        }
                                    },
                                    {
                                        title: '陪同總額',
                                        width: "100px",
                                        dataIndex: 'withAmt',
                                        // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            return !isNil(rowData) ? `$${rowData}` : ""
                                        }
                                    },
                                    {
                                        title: '個案負擔',
                                        width: "100px",
                                        // dataIndex: 'seatNum',
                                        // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                        fixed: 'right',
                                        render: (rowData) => {
                                            return !isNil(rowData?.withAmt) ? `$${rowData?.withAmt + rowData?.selfPayAmt}` : ""
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
                            // data={[
                            //     { id: "1", type: "去程" },
                            //     { id: "2", type: "回程" },
                            // ]}
                            // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                            data={props.CaseOrderAmt}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />
                    </BasicContainer>

                </BasicContainer>


                {/* 叫車表單區域容器 */}
                <SubContainer
                    theme={laptop.formContainer}
                >
                    {/* 叫車表單標題列 */}
                    <BasicContainer
                        theme={laptop.callCarFormTitleContainer}
                    >

                        {/* 個案名字 */}
                        <Text
                            theme={laptop.callCarFormCaseName}
                        >
                            {props?.UserName}
                        </Text>
                        {/* 可用補助餘額查詢按鈕 */}
                        <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={laptop.balanceInquiryButton}
                            onClick={() => {
                                //#region 打開可用補助餘額查詢 Modal
                                modalsService.titleModal.normal({
                                    //id: "top1",
                                    title: `${props.UserName?.split(" ")?.[0]} 的補助餘額`,
                                    yes: true,
                                    yesText: "確認",
                                    no: false,
                                    noText: "取消",
                                    // autoClose: true,
                                    backgroundClose: false,
                                    noOnClick: (e) => {
                                    },
                                    yesOnClick: (e, close) => {
                                        close();
                                    },
                                    closeIconOnClick: (e) => {
                                    },
                                    content: (
                                        <Container>
                                            <BasicContainer theme={laptop.balanceInquiryMTodalTextContainer}>
                                                <Text
                                                    theme={laptop.balanceInquiryMTodalText}
                                                >
                                                    總額度
                                                </Text>
                                                <Text
                                                    theme={laptop.balanceInquiryMTodalText}
                                                >
                                                    ${`${props?.CaseDiscount?.totalAmt ?? 0}`}
                                                </Text>
                                            </BasicContainer>
                                            <BasicContainer theme={laptop.balanceInquiryMTodalTextContainer}>
                                                <Text
                                                    theme={laptop.balanceInquiryMTodalText}
                                                >
                                                    使用額度
                                            </Text>
                                                <Text
                                                    theme={laptop.balanceInquiryMTodalText}
                                                >
                                                    ${`${props?.CaseDiscount?.discountAmt ?? 0}`}
                                                </Text>
                                            </BasicContainer>
                                            <BasicContainer theme={laptop.balanceInquiryMTodalTextContainer}>
                                                <Text
                                                    theme={laptop.balanceInquiryMTodalText}
                                                >
                                                    剩餘額度
                                            </Text>
                                                <Text
                                                    theme={laptop.balanceInquiryMTodalText}
                                                >
                                                    ${`${props?.CaseDiscount?.lastDiscountAmt ?? 0}`}
                                                </Text>
                                            </BasicContainer>
                                        </Container>
                                    ),
                                    theme: laptop.editModal
                                })
                                //#endregion

                            }}
                        >
                            <Search
                                style={laptop.balanceInquiryButtonIcon}
                            />
                                可用補助餘額查詢
                            </NativeLineButton>
                    </BasicContainer>

                    {/* 叫車表單容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.callCarFormContainer}
                    >
                        <FormRow>

                            {/* 乘車日期 TravelDate */}
                            <DateTimePicker
                                topLabel={<>乘車日期</>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("CaseCallCarAgainPage", "TravelDate")) ?
                                        moment(globalContextService.get("CaseCallCarAgainPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    if (value !== globalContextService.get("CaseCallCarAgainPage", "TravelDate")) {
                                        globalContextService.set("CaseCallCarAgainPage", "TravelDate", value);
                                        getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
                                        setForceUpdate(f => !f)
                                    }
                                }}
                                theme={laptop.travelDate}
                            />

                            {/*  乘車日期檢核 */}
                            {
                                !isNil(globalContextService.get("CaseCallCarAgainPage", "TravelDate"))
                                &&
                                <>
                                    {/* 乘車時間 TravelTime */}
                                    <DateTimePicker
                                        topLabel={<>乘車時間</>}
                                        // type={"time"} time、date、week、month、quarter、year
                                        type={"time"}
                                        format={"HH:mm"}
                                        bascDefaultTheme={"DefaultTheme"}
                                        // viewType
                                        isSearchable
                                        placeholder={""}
                                        value={
                                            (globalContextService.get("CaseCallCarAgainPage", "TravelTime")) ?
                                                moment(globalContextService.get("CaseCallCarAgainPage", "TravelTime"), "HH:mm")
                                                :
                                                null
                                        }
                                        onChange={(value, momentObj) => {
                                            if (value !== globalContextService.get("CaseCallCarAgainPage", "TravelTime")) {
                                                globalContextService.set("CaseCallCarAgainPage", "TravelTime", value);
                                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
                                                setForceUpdate(f => !f)
                                            }
                                        }}
                                        theme={laptop.travelTime}
                                    />
                                </>
                            }

                            {/* 訂車人身分 Orderer */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>訂車人身分</>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇訂車人身分"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CaseCallCarAgainPage", "Orderer") ?? null}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarAgainPage", "Orderer", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇訂車人身分", isDisabled: true },
                                    { value: '本人', label: "本人" },
                                    { value: '家屬', label: "家屬" },
                                    { value: 'A單位', label: "A單位" },
                                    { value: 'B單位', label: "B單位" },
                                    // ...Counties
                                ]}
                                // menuPosition={true}
                                theme={laptop.orderer}
                            />

                            {/* 優先搭乘車行排序 */}
                            <BUnitSort
                                topLabel={<>優先搭乘車行排序 <Text theme={laptop.bUnitSortNote}>(請依序點擊完成排序)</Text></>}
                                bUnit={props?.CaseUsers?.bUnitForCaseUser}
                                // bUnit={[
                                //     { id: "0", name: "0XXXX車行" },
                                //     { id: "1", name: "1XXXX車行" },
                                //     { id: "2", name: "2XXXX車行" },
                                //     { id: "3", name: "3XXXX車行" },
                                // ]}
                                value={globalContextService.get("CaseCallCarAgainPage", `BUnitSort`)}
                                onChange={(e, value, onInitial) => {
                                    console.log(value)
                                    globalContextService.set("CaseCallCarAgainPage", `BUnitSort`, value);
                                }}
                                theme={laptop.bUnitSort}
                            />

                            {/* 起點 StartPos*/}
                            <MapGoogleInput
                                placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}
                                placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                // viewType
                                // disable
                                topLabel={"起點"}
                                baseDefaultTheme={"DefaultTheme"}
                                value={globalContextService.get("CaseCallCarAgainPage", "StartPos") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarAgainPage", "StartPos", value);
                                }}
                                onSelect={(e, option, onInitial, posInfo) => {
                                    if (mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                        let endMarker = mapGoogleControll.getMarkers("test1")?.[1]?.position // 迄點經緯度
                                        mapGoogleControll.deletePolylineRoute("test1"); // 移除路線  
                                        mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // 更新選中起點
                                        mapGoogleControll.addMarkerWithIndex("test1", endMarker, 1) // 更新選中起點
                                    }

                                    mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // 更新選中起點
                                    mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // 移動中心點

                                    globalContextService.set("CaseCallCarAgainPage", "StartPos", option.label);

                                    getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料

                                    setForceUpdate(f => !f)
                                }}

                                theme={laptop.startPos}
                            />

                            {/* 起點備註 StartPosRemarks */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>起點備註</>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇備註"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks") ?? null}
                                onChange={(e, value, onInitial) => {
                                    if (value?.label === '其他') {
                                        if (value?.label !== globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.label) {
                                            setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                        }
                                    }
                                    else if (globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.label === '其他') {
                                        setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                    }
                                    globalContextService.set("CaseCallCarAgainPage", "StartPosRemarks", value);

                                }}

                                options={[
                                    { value: 'hint', label: "請選擇備註", isDisabled: true },
                                    ...posRemarksSelectOption
                                    // ...Counties
                                ]}
                                // menuPosition={true}
                                theme={laptop.startPosRemarks}
                            />

                            {/*  起點備註檢核 */}
                            {
                                globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.label === "其他"
                                &&
                                <>
                                    {/* 起點備註 - 其他 OtherStartPosRemarks */}
                                    <TextInput
                                        topLabel={<>起點備註 - 其他</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"請輸入起點備註 - 其他"}
                                        value={globalContextService.get("CaseCallCarAgainPage", "OtherStartPosRemarks") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("CaseCallCarAgainPage", "OtherStartPosRemarks", value);
                                        }}
                                        theme={laptop.otherStartPosRemarks}
                                    />
                                </>
                            }

                            <BasicContainer theme={laptop.convertButtonContainer}>
                                <NativeLineButton theme={laptop.convertButton}
                                    onClick={() => {
                                        let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
                                        let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

                                        let validMsg = "";
                                        if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                            validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                        }
                                        else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                            validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                        }

                                        if (validMsg !== "") {
                                            modalsService.infoModal.error({
                                                id: "top1", //注意 這裡要加上固定id
                                                iconRightText: validMsg,
                                                yes: true,
                                                yesText: "確認",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }
                                        else {
                                            // 如果起迄點都已經輸入
                                            let startAddr = globalContextService.get("CaseCallCarAgainPage", "StartPos");
                                            let endAddr = globalContextService.get("CaseCallCarAgainPage", "EndPos");

                                            globalContextService.set("CaseCallCarAgainPage", "EndPos", startAddr);
                                            globalContextService.set("CaseCallCarAgainPage", "StartPos", endAddr);

                                            let startMarker = mapGoogleControll.getMarkers("test1")?.[0]?.position  // 起點經緯度
                                            let endMarker = mapGoogleControll.getMarkers("test1")?.[1]?.position // 迄點經緯度

                                            // mapGoogleControll.deleteRoute("test1"); // 移除路線 由前端Call Google畫路線的方法
                                            mapGoogleControll.deletePolylineRoute("test1"); // 移除路線 透過後端回傳 加密路徑字串 (decodePath) 並透過 polyline 畫路線的方法      

                                            mapGoogleControll.addMarker("test1", endMarker); // 替換起迄點
                                            mapGoogleControll.addMarker("test1", startMarker); // 替換起迄點
                                        }
                                        setForceUpdate(f => !f)
                                    }}
                                >
                                    <Convert style={laptop.convertContainerIcon} />
                                                起訖點互換
                        </NativeLineButton>
                            </BasicContainer>

                            {/* 迄點 EndPos*/}
                            <MapGoogleInput
                                placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}
                                placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                // viewType
                                // disable
                                topLabel={
                                    <>
                                        迄點
                                            <Text theme={laptop.convertContainer}
                                            onClick={() => {
                                                let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
                                                let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

                                                let validMsg = "";
                                                if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                                    validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                                }
                                                else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
                                                    validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
                                                }

                                                if (validMsg !== "") {
                                                    modalsService.infoModal.error({
                                                        id: "top1", //注意 這裡要加上固定id
                                                        iconRightText: validMsg,
                                                        yes: true,
                                                        yesText: "確認",
                                                        // no: true,
                                                        // autoClose: true,
                                                        backgroundClose: false,
                                                        yesOnClick: (e, close) => {
                                                            close();
                                                        }
                                                    })
                                                }
                                                else {
                                                    // 如果起迄點都已經輸入

                                                    //#region 由前端Call Google畫路線的方法
                                                    // mapGoogleControll.addRoute("test1",
                                                    //     {
                                                    //         // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                    //         origin: mapGoogleControll.getMarkers("test1")[0].position,
                                                    //         destination: mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                    //         waypoints: [
                                                    //             // {
                                                    //             //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // 或是地址
                                                    //             //     stopover: true,
                                                    //             // },
                                                    //         ]
                                                    //     }
                                                    // )
                                                    //#endregion

                                                    //#region 透過後端回傳 加密路徑字串 (decodePath) 並透過 polyline 畫路線的方法

                                                    props.GetPolylineRouteExecute(
                                                        {
                                                            fromAddr: globalContextService.get("CaseCallCarAgainPage", "StartPos"),
                                                            toAddr: globalContextService.get("CaseCallCarAgainPage", "EndPos"),
                                                            mapId: "test1",
                                                            routeAttr: {
                                                                // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                                origin: mapGoogleControll.getMarkers("test1")[0].position,
                                                                destination: mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                                waypoints: [
                                                                    // {
                                                                    //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // 或是地址
                                                                    //     stopover: true,
                                                                    // },
                                                                ]
                                                            }
                                                        }
                                                    )
                                                    //#endregion

                                                    // setForceUpdate(f => !f)
                                                }
                                            }}
                                        >
                                            路線預覽
                                            </Text>
                                    </>
                                }
                                baseDefaultTheme={"DefaultTheme"}
                                value={globalContextService.get("CaseCallCarAgainPage", "EndPos") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarAgainPage", "EndPos", value);
                                }}
                                onSelect={(e, option, onInitial, posInfo) => {
                                    if (mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                        let startMarker = mapGoogleControll.getMarkers("test1")?.[0]?.position // 起點經緯度
                                        mapGoogleControll.deletePolylineRoute("test1"); // 移除路線  
                                        mapGoogleControll.addMarkerWithIndex("test1", startMarker, 0) // 更新選中起點
                                    }

                                    //#region 如果沒有先打起點
                                    if (!mapGoogleControll.getMarkers("test1")?.[0]) {
                                        mapGoogleControll.addMarkerWithIndex("test1", {}, 0) // 更新 一個卡位給 起點
                                    }
                                    //#endregion
                                    mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 1) // 更新選中起點
                                    mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // 移動中心點

                                    globalContextService.set("CaseCallCarAgainPage", "EndPos", option.label);

                                    getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料

                                    setForceUpdate(f => !f)
                                }}

                                theme={laptop.endPos}
                            />

                            {/* 迄點備註 EndPosRemarks */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>迄點備註</>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇備註"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks") ?? null}
                                onChange={(e, value, onInitial) => {
                                    if (value?.label === '其他') {
                                        if (value?.label !== globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.label) {
                                            setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                        }
                                    }
                                    else if (globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.label === '其他') {
                                        setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                    }
                                    globalContextService.set("CaseCallCarAgainPage", "EndPosRemarks", value);

                                }}

                                options={[
                                    { value: 'hint', label: "請選擇備註", isDisabled: true },
                                    ...posRemarksSelectOption
                                    // ...Counties
                                ]}
                                // menuPosition={true}
                                theme={laptop.endPosRemarks}
                            />

                            {/*  迄點備註註檢核 */}
                            {
                                globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.label === "其他"
                                    ?
                                    <>
                                        {/* 迄點備註 - 其他 OtherEndPosRemarks */}
                                        <TextInput
                                            topLabel={<>迄點備註 - 其他</>}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={"請輸入迄點備註"}
                                            value={globalContextService.get("CaseCallCarAgainPage", "OtherEndPosRemarks") ?? null}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("CaseCallCarAgainPage", "OtherEndPosRemarks", value);
                                            }}
                                            theme={laptop.otherEndPosRemarks}
                                        />
                                    </>
                                    :
                                    // 維持排版佔位
                                    <SubContainer theme={laptop.returnEnableDateOccupy} />
                            }

                            {/* 預約回程檢核 */}
                            {
                                !isNil(globalContextService.get("CaseCallCarAgainPage", "TravelTime"))
                                &&
                                <>
                                    {/* 我要預約回程(回居住地址) ScheduleReturnReview */}
                                    <Radio
                                        // viewType
                                        // disable
                                        topLabel={"我要預約回程(回居住地址)"}
                                        value={globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") ?? 0}
                                        onChange={(e, value, onInitial) => {
                                            if (value === 1) {
                                                if (value !== globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview")) {
                                                    setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
                                                }
                                            }
                                            else if (globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") === 1) {
                                                setForceUpdate(f => !f); // 剛選擇 預約回程 是，重新渲染
                                            }
                                            globalContextService.set("CaseCallCarAgainPage", "ScheduleReturnReview", value);
                                        }}
                                        theme={laptop.scheduleReturnReview}
                                    >
                                        {/* 我要預約回程(回居住地址) ScheduleReturnReview  選項 */}
                                        <RadioItem value={1} >是</RadioItem>
                                        <RadioItem value={0} >否</RadioItem>
                                    </Radio>

                                    {
                                        globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") === 1
                                            ?
                                            <>
                                                {/* 回程乘車時間 ReturnEnableDate */}
                                                <DateTimePicker
                                                    topLabel={<>回程乘車時間</>}
                                                    // type={"time"} time、date、week、month、quarter、year
                                                    type={"time"}
                                                    format={"HH:mm"}
                                                    bascDefaultTheme={"DefaultTheme"}
                                                    // viewType
                                                    isSearchable
                                                    placeholder={""}
                                                    value={
                                                        (globalContextService.get("CaseCallCarAgainPage", "ReturnEnableDate")) ?
                                                            moment(globalContextService.get("CaseCallCarAgainPage", "ReturnEnableDate"), "HH:mm")
                                                            :
                                                            null
                                                    }
                                                    onChange={(value, momentObj) => {
                                                        globalContextService.set("CaseCallCarAgainPage", `ReturnEnableDate`, value);
                                                    }}
                                                    theme={laptop.returnTravelTime}
                                                />
                                            </>
                                            :
                                            // 維持排版佔位
                                            <SubContainer theme={laptop.returnEnableDateOccupy} />
                                    }
                                </>
                            }

                            {/* 願意共乘 RideTogetherReview */}
                            <Radio
                                // viewType
                                // disable
                                topLabel={"願意共乘"}
                                value={globalContextService.get("CaseCallCarAgainPage", "RideTogetherReview") ?? 1}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("CaseCallCarAgainPage", "RideTogetherReview", value);
                                    // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                                }}
                                theme={laptop.rideTogetherReview}
                            >
                                {/* 願意共乘 RideTogetherReview  選項 */}
                                <RadioItem value={1} >是</RadioItem>
                                <RadioItem value={0} >否</RadioItem>
                            </Radio>

                            {/* 車種 CarType */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>車種</>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇車種類型"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CaseCallCarAgainPage", "CarType") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value?.label)
                                    // console.log(globalContextService.get("CaseCallCarAgainPage", "CarType"))
                                    if (!isEqual(value, globalContextService.get("CaseCallCarAgainPage", "CarType"))) {
                                        globalContextService.remove("CaseCallCarAgainPage", "Wheelchair")
                                        globalContextService.set("CaseCallCarAgainPage", "CarType", value);
                                        setForceUpdate(f => !f); // 剛選擇 車種 時，重新渲染
                                    }
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇車種類型", isDisabled: true },
                                    ...props?.CarType
                                    // ...Counties
                                ]}
                                // menuPosition={true}
                                theme={laptop.carType}
                            />

                            {/* 輪椅 Wheelchair */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>輪椅</>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇輪椅"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CaseCallCarAgainPage", "Wheelchair") ?? null}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarAgainPage", "Wheelchair", value);
                                    // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))
                                }}
                                options={
                                    [
                                        { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                        ...(
                                            (
                                                globalContextService.get("CaseCallCarAgainPage", "CarType")?.label === "一般車"
                                                    ?
                                                    [
                                                        { value: '無', label: "無" },
                                                        { value: '普通輪椅(可收折)', label: "普通輪椅(可收折)" },
                                                    ]
                                                    :
                                                    (
                                                        globalContextService.get("CaseCallCarAgainPage", "CarType")?.label === "福祉車"
                                                            ?
                                                            [
                                                                { value: '無', label: "無" },
                                                                { value: '普通輪椅(可收折)', label: "普通輪椅(可收折)" },
                                                                { value: '高背輪椅', label: "高背輪椅" },
                                                                { value: '電動輪椅', label: "電動輪椅" },
                                                                { value: '電動高背輪椅', label: "電動高背輪椅" },
                                                            ]
                                                            :
                                                            []
                                                    )
                                            )
                                        )
                                    ]
                                }
                                // menuPosition={true}
                                theme={laptop.wheelchair}
                            />

                            {/* 陪同人數 AccompanyCounts */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>陪同人數</>}
                                bottomLabel={<><Text theme={laptop.accompanyCountsRequired}>第一人免費、第二人自費加價50元、第三人(含)及以上每位自費加價200元</Text></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇陪同人數"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts") ?? null}
                                onChange={(e, value, onInitial) => {

                                    if ((!isEqual(value?.value, globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value))) {
                                        globalContextService.set("CaseCallCarAgainPage", "AccompanyCounts", value);
                                        getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
                                    }
                                }
                                }

                                options={[
                                    { value: 'hint', label: "請選擇陪同人數", isDisabled: true },
                                    { value: 0, label: "0人" },
                                    { value: 1, label: "1人" },
                                    { value: 2, label: "2人" },
                                    { value: 3, label: "3人" },
                                    { value: 4, label: "4人" },
                                    { value: 5, label: "5人" },
                                    { value: 6, label: "6人" },
                                    { value: 7, label: "7人" },
                                ]}
                                // menuPosition={true}
                                theme={laptop.accompanyCounts}
                            />

                            {/* 簡訊號碼 SmsNumber */}
                            <TextInput

                                topLabel={<>簡訊號碼</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"請輸入接收簡訊號碼"}
                                value={globalContextService.get("CaseCallCarAgainPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CaseCallCarAgainPage", "SmsNumber", value);
                                }}
                                theme={laptop.smsNumber}
                            />

                        </FormRow>
                    </FormContainer>

                    {/* 叫車表單下方按鈕列 */}
                    <BasicContainer
                        theme={laptop.callCarFormBottomContainer}
                    >
                        {/* 回列表按鈕 */}
                        <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={laptop.returnButton}
                            onClick={() => {
                                history.push("/Case");
                                props.controllGCS("return")

                            }}
                        >
                            回列表
                                </NativeLineButton>

                        {/* 新增下個地點檢核 */}
                        {
                            globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") !== 1
                            &&
                            <>
                                {/* 新增下個地點按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.addNextLocation}
                                    onClick={() => {
                                        let validMsg = formValid();
                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            modalsService.infoModal.error({
                                                id: "top1", //注意 這裡要加上固定id
                                                iconRightText: validMsg,
                                                yes: true,
                                                yesText: "確認",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }
                                        else {
                                            props.AddOrderOfCaseUsersExecute({
                                                // id: "", // 訂單id，新增無須上送
                                                userId: props.UserId, // 用戶id
                                                caseUserId: props.CaseUserId, // 長照身份id
                                                orgId: "", // 送空字串
                                                reserveDate: globalContextService.get("CaseCallCarAgainPage", "TravelDate") + " " + globalContextService.get("CaseCallCarAgainPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45",
                                                transOrgs: globalContextService.get("CaseCallCarAgainPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                                createdIdentity: globalContextService.get("CaseCallCarAgainPage", "Orderer")?.value, // 訂車人身分
                                                fromAddr: globalContextService.get("CaseCallCarAgainPage", "StartPos"), // 起點
                                                fromAddrRemark: (
                                                    globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.label === "其他" ?
                                                        globalContextService.get("CaseCallCarAgainPage", "OtherStartPosRemarks")
                                                        :
                                                        globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.value
                                                ), // 起點備註 (含備註 - 其他)
                                                toAddr: globalContextService.get("CaseCallCarAgainPage", "EndPos"), // 迄點
                                                toAddrRemark: (
                                                    globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.label === "其他" ?
                                                        globalContextService.get("CaseCallCarAgainPage", "OtherEndPosRemarks")
                                                        :
                                                        globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.value
                                                ), // 迄點備註 (含備註 - 其他)
                                                remark: "", // 無此欄位
                                                isBack: globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                                canShared: globalContextService.get("CaseCallCarAgainPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                                carCategoryId: globalContextService.get("CaseCallCarAgainPage", "CarType")?.value, // 車種id
                                                carCategoryName: globalContextService.get("CaseCallCarAgainPage", "CarType")?.label, // 車種名稱
                                                wheelchairType: globalContextService.get("CaseCallCarAgainPage", "Wheelchair")?.value, // 輪椅
                                                familyWith: globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value, // 陪同人數
                                                noticePhone: globalContextService.get("CaseCallCarAgainPage", "SmsNumber"), // 簡訊號碼
                                                haveNextOrderFlag: true, // 新增下個地點 按鈕發送
                                            })
                                        }
                                    }}
                                >
                                    新增下個地點
                                </NativeLineButton>
                            </>
                        }

                        {/* 立即預約按鈕 */}
                        <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={laptop.reservationNow}
                            onClick={() => {
                                let validMsg = formValid();
                                //#region 表單驗證後動作
                                if (validMsg !== "") {
                                    modalsService.infoModal.error({
                                        id: "top1", //注意 這裡要加上固定id
                                        iconRightText: validMsg,
                                        yes: true,
                                        yesText: "確認",
                                        // no: true,
                                        // autoClose: true,
                                        backgroundClose: false,
                                        yesOnClick: (e, close) => {
                                            close();
                                        }
                                    })
                                }
                                else {
                                    // 去程
                                    props.AddOrderOfCaseUsersExecute({
                                        // id: "", // 訂單id，新增無須上送
                                        userId: props.UserId, // 用戶id
                                        caseUserId: props.CaseUserId, // 長照身份id
                                        orgId: "", // 送空字串
                                        reserveDate: globalContextService.get("CaseCallCarAgainPage", "TravelDate") + " " + globalContextService.get("CaseCallCarAgainPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45",
                                        transOrgs: globalContextService.get("CaseCallCarAgainPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                        createdIdentity: globalContextService.get("CaseCallCarAgainPage", "Orderer")?.value, // 訂車人身分
                                        fromAddr: globalContextService.get("CaseCallCarAgainPage", "StartPos"), // 起點
                                        fromAddrRemark: (
                                            globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.label === "其他" ?
                                                globalContextService.get("CaseCallCarAgainPage", "OtherStartPosRemarks")
                                                :
                                                globalContextService.get("CaseCallCarAgainPage", "StartPosRemarks")?.value
                                        ), // 起點備註 (含備註 - 其他)
                                        toAddr: globalContextService.get("CaseCallCarAgainPage", "EndPos"), // 迄點
                                        toAddrRemark: (
                                            globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.label === "其他" ?
                                                globalContextService.get("CaseCallCarAgainPage", "OtherEndPosRemarks")
                                                :
                                                globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.value
                                        ), // 迄點備註 (含備註 - 其他)
                                        remark: "", // 無此欄位
                                        isBack: globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                        canShared: globalContextService.get("CaseCallCarAgainPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                        carCategoryId: globalContextService.get("CaseCallCarAgainPage", "CarType")?.value, // 車種id
                                        carCategoryName: globalContextService.get("CaseCallCarAgainPage", "CarType")?.label, // 車種名稱
                                        wheelchairType: globalContextService.get("CaseCallCarAgainPage", "Wheelchair")?.value, // 輪椅
                                        familyWith: globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value, // 陪同人數
                                        noticePhone: globalContextService.get("CaseCallCarAgainPage", "SmsNumber"), // 簡訊號碼
                                        haveNextOrderFlag: false, // 立即預約 按鈕發送
                                        isBackOrder: false, // 立即預約 按鈕發送 (去程)
                                    })

                                    //回程
                                    props.AddOrderOfCaseUsersExecute({
                                        // id: "", // 訂單id，新增無須上送
                                        userId: props.UserId, // 用戶id
                                        caseUserId: props.CaseUserId, // 長照身份id
                                        orgId: "", // 送空字串
                                        reserveDate: globalContextService.get("CaseCallCarAgainPage", "TravelDate") + " " + globalContextService.get("CaseCallCarAgainPage", "ReturnEnableDate"), // 預約日期+預約回程時間	如: "2020-11-25 17:45",
                                        transOrgs: globalContextService.get("CaseCallCarAgainPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                        createdIdentity: globalContextService.get("CaseCallCarAgainPage", "Orderer")?.value, // 訂車人身分
                                        fromAddr: globalContextService.get("CaseCallCarAgainPage", "EndPos"), // 起點
                                        fromAddrRemark: (
                                            globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.label === "其他" ?
                                                globalContextService.get("CaseCallCarAgainPage", "OtherEndPosRemarks")
                                                :
                                                globalContextService.get("CaseCallCarAgainPage", "EndPosRemarks")?.value
                                        ), // 起點備註 (含備註 - 其他)
                                        toAddr: `${props?.CaseUsers?.county}${props?.CaseUsers?.district}${props?.CaseUsers?.addr}`,
                                        toAddrRemark: "住家",
                                        remark: "", // 無此欄位
                                        isBack: globalContextService.get("CaseCallCarAgainPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                        canShared: globalContextService.get("CaseCallCarAgainPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                        carCategoryId: globalContextService.get("CaseCallCarAgainPage", "CarType")?.value, // 車種id
                                        carCategoryName: globalContextService.get("CaseCallCarAgainPage", "CarType")?.label, // 車種名稱
                                        wheelchairType: globalContextService.get("CaseCallCarAgainPage", "Wheelchair")?.value, // 輪椅
                                        familyWith: globalContextService.get("CaseCallCarAgainPage", "AccompanyCounts")?.value, // 陪同人數
                                        noticePhone: globalContextService.get("CaseCallCarAgainPage", "SmsNumber"), // 簡訊號碼
                                        haveNextOrderFlag: false, // 立即預約 按鈕發送
                                        isBackOrder: true, // 立即預約 按鈕發送 (回程)
                                    })
                                }
                            }}
                        >
                            立即預約
                                </NativeLineButton>
                    </BasicContainer>
f
                </SubContainer>
            </Container>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`