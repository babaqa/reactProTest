import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle } from '../../../../ProjectComponent';
import { ReactComponent as End2 } from '../../../../Assets/img/BusCallCarAgainPage/End2.svg'
import { ReactComponent as Start2 } from '../../../../Assets/img/BusCallCarAgainPage/Start2.svg'
import { ReactComponent as Vector } from '../../../../Assets/img/BusCallCarAgainPage/Vector.svg'
import { ReactComponent as Minus } from '../../../../Assets/img/BusCallCarAgainPage/Minus.svg'
import { ReactComponent as People } from '../../../../Assets/img/BusCallCarAgainPage/People.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, NewSelector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { getParseItemLocalStorage, valid } from '../../../../Handlers';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCarAgain: { busCallCarAgain: { rwd: { laptop } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            console.log(location, action, "路由變化")
            // globalContextService.remove("BusCallCarPage", "firstUseAPIgetClient");
            // globalContextService.remove("BusCallCarPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion
    return (
        <>
            {/* 叫車頁面外層容器 */}
            <Container
                theme={laptop.callCarOutContainer}
            >
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
                            {props?.CaseName}
                        </Text>

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
                                    (globalContextService.get("BusCallCarAgainPage", "TravelDate")) ?
                                        moment(globalContextService.get("BusCallCarAgainPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    if (value !== globalContextService.get("BusCallCarAgainPage", "TravelDate")) {
                                        console.log("乘車日期")
                                        globalContextService.set("BusCallCarAgainPage", "TravelDate", value);
                                        globalContextService.remove("BusCallCarAgainPage", "Route")
                                        globalContextService.remove("BusCallCarAgainPage", "StartPos")
                                        globalContextService.remove("BusCallCarAgainPage", "EndPos")
                                        setForceUpdate(f => !f)
                                    }
                                }}
                                theme={laptop.travelDate}
                            />

                            {/*  乘車日期檢核 */}
                            {
                                // !isNil(globalContextService.get("BusCallCarAgainPage", "TravelDate"))
                                // &&
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
                                            (globalContextService.get("BusCallCarAgainPage", "TravelTime")) ?
                                                moment(globalContextService.get("BusCallCarAgainPage", "TravelTime"), "HH:mm")
                                                :
                                                null
                                        }
                                        onChange={(value, momentObj) => {
                                            globalContextService.set("BusCallCarAgainPage", "TravelTime", value);
                                        }}
                                        theme={laptop.travelTime}
                                    />
                                </>
                            }

                            {/* 行程標題列 */}
                            <BasicContainer
                                theme={laptop.strokeFormTitleContainer}
                            >

                                {/* 行程 */}
                                <Text
                                    theme={laptop.strokeText}
                                >
                                    行程
                                    <Minus
                                        style={laptop.strokeMinusSvg}
                                    // onClick={(e) => {
                                    //     props.setTodayToDoOpen(t => !t)
                                    // }}
                                    />
                                </Text>

                            </BasicContainer>

                            {/* 行程內容容器 */}
                            <Container
                                theme={laptop.strokeFormContainer}
                                open={props.TodayToDoOpen}
                            >
                                {/* 車行 CarDealership */}
                                {/* <TextInput
                                viewType
                                topLabel={<>車行</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                // placeholder={""}
                                value={globalContextService.get("BusCallCarAgainPage", "CarDealership") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusCallCarAgainPage", "CarDealership", value);
                                }}
                                theme={laptop.carDealership}
                            /> */}

                                {/* 路線容器 */}
                                <Container
                                    theme={laptop.routeContainer}
                                >
                                    {/* 路線 Route*/}
                                    <NewSelector
                                        placeholder={"請選擇路線"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("BusCallCarAgainPage", "TravelDate"))}
                                        topLabel={"路線"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("BusCallCarAgainPage", "Route") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            if (value !== globalContextService.get("BusCallCarAgainPage", "Route")) {
                                                console.log("路線")
                                                globalContextService.set("BusCallCarAgainPage", "Route", value);
                                                globalContextService.remove("BusCallCarAgainPage", "StartPos")
                                                globalContextService.remove("BusCallCarAgainPage", "EndPos")
                                                props.getStationOnRoute(value?.id)
                                                setForceUpdate(f => !f)
                                            }
                                        }}
                                        options={[
                                            ...props.AllRoute?.filter((item) => (item?.workWeek?.split(",").includes(moment(globalContextService.get("BusCallCarAgainPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss").isoWeekday()?.toString())))
                                            // { value: '0', label: "請選擇路線", isDisabled: true },
                                            // { value: '1', label: '路線A' },
                                            // { value: '2', label: '路線B' },
                                        ]}

                                        theme={laptop.route}
                                    />
                                </Container>
                                <Container
                                    theme={laptop.routeContainer}
                                ></Container>
                                {/* 起點容器 */}
                                <Container
                                    theme={laptop.startPosContainer}
                                >
                                    {/* 起點 */}
                                    <Text
                                        theme={laptop.todayToDoStart}
                                    >
                                        <Start2 style={laptop.todayToDoStartSvg} />
                                        起點
                                    </Text>

                                    {/* 起點地址 */}
                                    <Text
                                        theme={laptop.todayToDoStartAddr}
                                    >
                                        {globalContextService.get("BusCallCarAgainPage", "StartPos")?.label}
                                    </Text>

                                    {/* 起點站牌 StartPos*/}
                                    <NewSelector
                                        placeholder={"請選擇起點"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("BusCallCarAgainPage", "Route"))}
                                        topLabel={"起點站牌"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("BusCallCarAgainPage", "StartPos") ?? []}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarAgainPage", "StartPos", value);
                                            setForceUpdate(f => !f)
                                        }}
                                        options={[
                                            ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                                return props.AllStation.filter(s => s.id === item)[0]
                                            })
                                            // { value: '0', label: "請選擇起點", isDisabled: true },
                                            // { value: '1', label: 'A站' },
                                            // { value: '2', label: 'B站' },
                                        ]}
                                        theme={laptop.startPos}
                                    />
                                </Container>
                                {/* 迄點容器 */}
                                <Container
                                    theme={laptop.endPosContainer}
                                >
                                    {/* 迄點 */}
                                    <Text
                                        theme={laptop.todayToDoEnd}
                                    >
                                        <End2 style={laptop.todayToDoEndSvg} />
                                        迄點
                                    </Text>

                                    {/* 迄點地址 */}
                                    <Text
                                        theme={laptop.todayToDoEndAddr}
                                    >
                                        {globalContextService.get("BusCallCarAgainPage", "EndPos")?.label}
                                    </Text>

                                    <NativeLineButton theme={laptop.convertButton}
                                        onClick={() => {
                                            let validMsg = "";
                                            if (valid(globalContextService.get("BusCallCarAgainPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                validMsg = valid(globalContextService.get("BusCallCarAgainPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
                                            }
                                            else if (valid(globalContextService.get("BusCallCarAgainPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                validMsg = valid(globalContextService.get("BusCallCarAgainPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
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

                                                let startAddr = globalContextService.get("BusCallCarAgainPage", "StartPos");
                                                let endAddr = globalContextService.get("BusCallCarAgainPage", "EndPos");
                                                globalContextService.set("BusCallCarAgainPage", "EndPos", { value: startAddr?.value, label: startAddr?.label });
                                                globalContextService.set("BusCallCarAgainPage", "StartPos", { value: endAddr?.value, label: endAddr?.label });
                                            }
                                            setForceUpdate(f => !f)
                                        }}
                                    >
                                        <Vector style={laptop.convertContainerIcon} />
                                                起訖點互換
                                    </NativeLineButton>

                                    {/* 迄點站牌 EndPos*/}
                                    <NewSelector
                                        placeholder={"請選擇訖點"}
                                        isSearchable
                                        // viewType
                                        disabled={isNil(globalContextService.get("BusCallCarAgainPage", "Route"))}
                                        topLabel={"迄點站牌"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("BusCallCarAgainPage", "EndPos") ?? []}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarAgainPage", "EndPos", value);
                                            setForceUpdate(f => !f)
                                        }}
                                        options={[
                                            ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                                return props.AllStation.filter(s => s.id === item)[0]
                                            })
                                        ]}

                                        theme={laptop.endPos}
                                    />
                                </Container>

                                {/* 搭車人數及簡訊容器 */}
                                <Container
                                    theme={laptop.numberContainer}
                                >
                                    {/* 簡訊號碼 SmsNumber */}
                                    <Text theme={laptop.formSubTitleText}>接收簡訊號碼</Text>
                                    <TextInput
                                        // topLabel={<>接收簡訊號碼</>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"請輸入手機號碼"}
                                        value={globalContextService.get("BusCallCarAgainPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarAgainPage", "SmsNumber", value);
                                        }}
                                        theme={laptop.smsNumber}
                                    />

                                    {/* 搭車人數 AccTotalCounts */}
                                    <Text theme={laptop.formSubTitleText}>搭車人數</Text>
                                    <NewSelector
                                        baseDefaultTheme={"DefaultTheme"}
                                        // topLabel={"搭車人數"}
                                        //viewType
                                        isSearchable
                                        placeholder={""}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("BusCallCarAgainPage", "AccTotalCounts") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("BusCallCarAgainPage", "AccTotalCounts", value);
                                        }}

                                        options={[
                                            { value: 1, label: "1人" },
                                            { value: 2, label: "2人" },
                                            { value: 3, label: "3人" },
                                            { value: 4, label: "4人" },
                                            { value: 5, label: "5人" },
                                            { value: 6, label: "6人" },
                                            { value: 7, label: "7人" },
                                            { value: 8, label: "8人" },
                                        ]}
                                        // menuPosition={true}
                                        theme={laptop.accTotalCounts}
                                    />

                                </Container>

                                {/* Table 容器 */}
                                <Container
                                    bascDefaultTheme={"DefaultTheme"}
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
                                                globalContextService.set("BusCallCarAgainPage", "CheckedRowKeys", checkedRowKeys);
                                                globalContextService.set("BusCallCarAgainPage", "CheckedRowsData", checkedRows);
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
                                                    width: "70px",
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
                                                    width: "110px",
                                                    dataIndex: 'estDistance',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                },
                                                {
                                                    title: '預估時間',
                                                    width: "110px",
                                                    dataIndex: 'estTime',
                                                    // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                                    // fixed: 'left',
                                                },
                                                {
                                                    title: '車資總額',
                                                    width: "110px",
                                                    dataIndex: 'totalAmount',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
                                                },
                                                {
                                                    title: '陪同總額',
                                                    width: "110px",
                                                    dataIndex: 'compAmount',
                                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                                    // fixed: 'left',
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
                                            { id: "1", type: "去程" },
                                        ]}
                                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                        // data={props.AllCars.data}
                                        clickPage={(currentPage, pageSize) => {
                                        }}
                                    />
                                </Container>
                            </Container>
                            {/* 叫車表單下方按鈕列 */}
                            <BasicContainer
                                theme={laptop.callCarFormBottomContainer}
                            >
                                {/* 回列表按鈕 */}
                                {/* <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={laptop.returnButton}
                            onClick={() => {
                                props.controllGCS("return");
                                history.push("/Case")
                            }}
                        >
                            回列表
                                </NativeLineButton> */}

                                {/* 立即預約按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.reservationNow}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        console.log(["props ======= " + props])
                                        if (valid(globalContextService.get("BusCallCarAgainPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarAgainPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarAgainPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarAgainPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarAgainPage", "AccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarAgainPage", "AccTotalCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarAgainPage", "Route")?.value ?? "", ["^.{1,}$"], ["請選擇路線"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarAgainPage", "Route")?.value ?? "", ["^.{1,}$"], ["請選擇路線"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarAgainPage", "StartPos")?.value ?? "", ["^.{1,}$"], ["請選擇起點"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarAgainPage", "StartPos")?.value ?? "", ["^.{1,}$"], ["請選擇起點"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarAgainPage", "EndPos")?.value ?? "", ["^.{1,}$"], ["請選擇訖點"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarAgainPage", "EndPos")?.value ?? "", ["^.{1,}$"], ["請選擇訖點"])[1]
                                        }
                                        else if (valid(globalContextService.get("BusCallCarAgainPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]) {
                                            validMsg = valid(globalContextService.get("BusCallCarAgainPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]
                                        }

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("CaseAddPage"))
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
                                            // console.log("busUserId : " + props.UserId);
                                            // console.log("date : " + globalContextService.get("BusCallCarAgainPage", "TravelDate"));
                                            // console.log("fromStationId : " + globalContextService.get("BusCallCarAgainPage", "StartPos").value);
                                            // console.log("fromStationName : " + globalContextService.get("BusCallCarAgainPage", "StartPos").label);
                                            // console.log("passengerNum : " + globalContextService.get("BusCallCarAgainPage", "AccTotalCounts").value);
                                            // console.log("reserveDate : " + globalContextService.get("BusCallCarAgainPage", "TravelDate") + " " + globalContextService.get("BusCallCarAgainPage", "TravelTime"));
                                            // console.log("stationLineId : " + globalContextService.get("BusCallCarAgainPage", "Route").value);
                                            // console.log("stationLineName : " + globalContextService.get("BusCallCarAgainPage", "Route").label);
                                            // console.log("time : " + globalContextService.get("BusCallCarAgainPage", "TravelTime"));
                                            // console.log("toStationId : " + globalContextService.get("BusCallCarAgainPage", "EndPos").value);
                                            // console.log("toStationName : " + globalContextService.get("BusCallCarAgainPage", "EndPosRoute").label);

                                            props.AddBusCallCarExecute({
                                                busUserId: props.CaseUserId,// 幸福巴士個案id
                                                date: globalContextService.get("BusCallCarAgainPage", "TravelDate"), // 預約日期
                                                fromStationId: globalContextService.get("BusCallCarAgainPage", "StartPos").value, // 起點站牌id
                                                fromStationName: globalContextService.get("BusCallCarAgainPage", "StartPos").label, // 起點站牌名字
                                                id: "",// 幸福巴士預約訂單 id	新增無須上送
                                                orgId: getParseItemLocalStorage("UseOrg")?.id,	// 畫面無此欄位	
                                                passengerNum: globalContextService.get("BusCallCarAgainPage", "AccTotalCounts").value, // 搭車人數
                                                reserveDate: globalContextService.get("BusCallCarAgainPage", "TravelDate") + " " + globalContextService.get("BusCallCarAgainPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
                                                stationLineId: globalContextService.get("BusCallCarAgainPage", "Route").value, // 路線id
                                                stationLineName: globalContextService.get("BusCallCarAgainPage", "Route").label, // 路線名字
                                                time: globalContextService.get("BusCallCarAgainPage", "TravelTime"), //預約時間
                                                toStationId: globalContextService.get("BusCallCarAgainPage", "EndPos").value, // 訖點站牌id
                                                toStationName: globalContextService.get("BusCallCarAgainPage", "EndPos").label, //訖點站牌名字
                                                remark: "",
                                                userId: props.UserId
                                            })
                                        }
                                    }}
                                >
                                    立即預約
                                </NativeLineButton>
                            </BasicContainer>
                        </FormRow>
                    </FormContainer>
                </SubContainer>
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

            </Container>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`
