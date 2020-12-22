import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MapGoogle, mapGoogleControll, MapGoogleInput } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/CaseCallCarComponentPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/CaseCallCarComponentPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/CaseCallCarComponentPage/StartToEnd.svg'
import { ReactComponent as Resize } from '../../../../Assets/img/CaseCallCarComponentPage/Resize.svg'
import { ReactComponent as Arrow } from '../../../../Assets/img/CaseCallCarComponentPage/Arrow.svg'
import { ReactComponent as End } from '../../../../Assets/img/CaseCallCarComponentPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/CaseCallCarComponentPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable, Resizable } from '../../../../Components';
import { posRemarksSelectOption } from '../../../../Mappings/Mappings';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { caseCallCarComponent: { rwd: { mobileM } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    //#region 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // 迄點緯度
        let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // 起點緯度

        let validMsg = "";
        if (valid(globalContextService.get("CaseCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(end ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]) {
            validMsg = valid(start ?? "", ["^.{1,}$"], ["請輸入起點與迄點"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]
        }

        if (validMsg === "") {
            // 如果起迄點、搭車日期、搭車時間有值、陪同人數 皆已有有值
            props.GetCaseOrderAmtExecute({
                CaseUserId: props.CaseUserId,
                FromAddr: globalContextService.get("CaseCallCarComponentPage", "StartPos"),
                // FromAddrId:, // 不用丟
                ToAddr: globalContextService.get("CaseCallCarComponentPage", "EndPos"),
                FamilyWith: globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value,
                // ToAddrId:, // 不用丟
                ReservationDate: globalContextService.get("CaseCallCarComponentPage", "TravelDate") + " " + globalContextService.get("CaseCallCarComponentPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45"
            })
        }

    }, [])
    //#endregion

    //#region 新增下個地點、立即預約 送出前欄位檢核
    const formValid = useCallback(() => {
        //#region 表單驗證
        let validMsg = "";

        if (valid(globalContextService.get("CaseCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["請選擇優先搭乘車行排序，或需先新增B單位"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "Orderer")?.value ?? "", ["^.{1,}$"], ["請選擇訂車人身分"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "Orderer")?.value ?? "", ["^.{1,}$"], ["請選擇訂車人身分"])[1]
        }
        // 其實 應該要連實際經緯度標記坐標一起檢核，目前尚未防堵 選擇自動完成選項後，又改動輸入框地址內容，然後送出的情況  
        // PS.可以分成 目前輸入框內容 與 onSelect的值，onChange時清掉onSelect的值，然後送出時一律檢核onSelect的值
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇起點備註"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇起點備註"])[1]
        }
        else if (
            (globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.label === "其他")
            &&
            valid(globalContextService.get("CaseCallCarComponentPage", "OtherStartPosRemarks") ?? "", ["^.{1,}$"], ["請輸入起點備註 - 其他"])[1]
        ) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "OtherStartPosRemarks") ?? "", ["^.{1,}$"], ["請輸入起點備註 - 其他"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇迄點備註"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.value ?? "", ["^.{1,}$"], ["請選擇迄點備註"])[1]
        }
        else if (
            (globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.label === "其他")
            &&
            valid(globalContextService.get("CaseCallCarComponentPage", "OtherEndPosRemarks") ?? "", ["^.{1,}$"], ["請輸入迄點備註 - 其他"])[1]
        ) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "OtherEndPosRemarks") ?? "", ["^.{1,}$"], ["請輸入迄點備註 - 其他"])[1]
        }
        // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
        //     validMsg = "請重新輸入起訖地址"
        // }
        else if (
            (globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") === 1)
            &&
            valid(globalContextService.get("CaseCallCarComponentPage", "ReturnEnableDate") ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]
        ) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "ReturnEnableDate") ?? "", ["^.{1,}$"], ["請選擇回程乘車時間"])[1]
        }
        else if (
            (globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") === 1)
            &&
            !moment(globalContextService.get("CaseCallCarComponentPage", "ReturnEnableDate"), "HH:mm").isAfter(moment(globalContextService.get("CaseCallCarComponentPage", "TravelTime"), "HH:mm"))
        ) {  // !(去程時間 > 回程時間)
            validMsg = "回程乘車時間不可早於或等於去程時間"
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇陪同人數"])[1]
        }
        else if (valid(globalContextService.get("CaseCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]) {
            validMsg = valid(globalContextService.get("CaseCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["請輸入接收簡訊號碼", "請輸入正確手機格式"])[1]
        }
        //#endregion

        return validMsg;

    }, [])
    //#endregion

    return (
        <>

            {/* 底層的地圖容器 */}
            <BasicContainer
                theme={mobileM.mapContainer}
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

                    theme={mobileM.map}
                />
            </BasicContainer>

            {/* 地圖上層的表單容器 */}
            <Resizable
                width={"100%"}
                height={"380px"}
                maxHeight={"70vh"}
                minHeight={"280px"}
                enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                theme={mobileM.resizableContainer}
            >
                {/* 可調整大小圖標 */}
                <Resize style={mobileM.resizeSvg} />

                {/* 叫車表單標題列 */}
                <BasicContainer
                    theme={mobileM.callCarFormTitleContainer}
                >

                    {/* 個案名字 */}
                    <Text
                        theme={mobileM.callCarFormCaseName}
                    >
                        {props?.UserName}
                    </Text>
                    {/* 可用補助餘額查詢按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={mobileM.balanceInquiryButton}
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
                                        <BasicContainer theme={mobileM.balanceInquiryMTodalTextContainer}>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                總額度
                                            </Text>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                ${`${props?.CaseDiscount?.totalAmt ?? 0}`}
                                            </Text>
                                        </BasicContainer>
                                        <BasicContainer theme={mobileM.balanceInquiryMTodalTextContainer}>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                使用額度
                                        </Text>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                ${`${props?.CaseDiscount?.discountAmt ?? 0}`}
                                            </Text>
                                        </BasicContainer>
                                        <BasicContainer theme={mobileM.balanceInquiryMTodalTextContainer}>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                剩餘額度
                                        </Text>
                                            <Text
                                                theme={mobileM.balanceInquiryMTodalText}
                                            >
                                                ${`${props?.CaseDiscount?.lastDiscountAmt ?? 0}`}
                                            </Text>
                                        </BasicContainer>
                                    </Container>
                                ),
                                theme: mobileM.editModal
                            })
                            //#endregion

                        }}
                    >
                        <Search
                            style={mobileM.balanceInquiryButtonIcon}
                        />
                                可用補助餘額查詢
                            </NativeLineButton>
                </BasicContainer>

                {/* 叫車表單容器 */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={mobileM.callCarFormContainer}
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
                                (globalContextService.get("CaseCallCarComponentPage", "TravelDate")) ?
                                    moment(globalContextService.get("CaseCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                    :
                                    null
                            }
                            onChange={(value, momentObj) => {
                                if (value !== globalContextService.get("CaseCallCarComponentPage", "TravelDate")) {
                                    globalContextService.set("CaseCallCarComponentPage", "TravelDate", value);
                                    getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
                                    setForceUpdate(f => !f)
                                }
                            }}
                            theme={mobileM.travelDate}
                        />

                        {/*  乘車日期檢核 */}
                        {
                            !isNil(globalContextService.get("CaseCallCarComponentPage", "TravelDate"))
                                ?
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
                                            (globalContextService.get("CaseCallCarComponentPage", "TravelTime")) ?
                                                moment(globalContextService.get("CaseCallCarComponentPage", "TravelTime"), "HH:mm")
                                                :
                                                null
                                        }
                                        onChange={(value, momentObj) => {
                                            if (value !== globalContextService.get("CaseCallCarComponentPage", "TravelTime")) {
                                                globalContextService.set("CaseCallCarComponentPage", "TravelTime", value);
                                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料
                                                setForceUpdate(f => !f)
                                            }
                                        }}
                                        theme={mobileM.travelTime}
                                    />
                                </>
                                :
                                // 維持排版佔位
                                <SubContainer theme={mobileM.travelTimeOccupy} />
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
                            value={globalContextService.get("CaseCallCarComponentPage", "Orderer") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("CaseCallCarComponentPage", "Orderer", value);
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
                            theme={mobileM.orderer}
                        />

                        {/* 優先搭乘車行排序 */}
                        <BUnitSort
                            topLabel={<>優先搭乘車行排序 <Text theme={mobileM.bUnitSortNote}>(請依序點擊完成排序)</Text></>}
                            bUnit={props?.CaseUsers?.bUnitForCaseUser}
                            // bUnit={[
                            //     { id: "0", name: "0XXXX車行" },
                            //     { id: "1", name: "1XXXX車行" },
                            //     { id: "2", name: "2XXXX車行" },
                            //     { id: "3", name: "3XXXX車行" },
                            // ]}
                            value={globalContextService.get("CaseCallCarComponentPage", `BUnitSort`)}
                            onChange={(e, value, onInitial) => {
                                console.log(value)
                                globalContextService.set("CaseCallCarComponentPage", `BUnitSort`, value);
                            }}
                            theme={mobileM.bUnitSort}
                        />

                        {/* 起點 StartPos*/}
                        <MapGoogleInput
                            placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}
                            placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                            // viewType
                            // disable
                            topLabel={"起點"}
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("CaseCallCarComponentPage", "StartPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("CaseCallCarComponentPage", "StartPos", value);
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

                                globalContextService.set("CaseCallCarComponentPage", "StartPos", option.label);

                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料

                                setForceUpdate(f => !f)
                            }}

                            theme={mobileM.startPos}
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
                            value={globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks") ?? null}
                            onChange={(e, value, onInitial) => {
                                if (value?.label === '其他') {
                                    if (value?.label !== globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.label) {
                                        setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                    }
                                }
                                else if (globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.label === '其他') {
                                    setForceUpdate(f => !f); // 剛選擇 起點備註 時，重新渲染
                                }
                                globalContextService.set("CaseCallCarComponentPage", "StartPosRemarks", value);

                            }}

                            options={[
                                { value: 'hint', label: "請選擇備註", isDisabled: true },
                                ...posRemarksSelectOption
                                // ...Counties
                            ]}
                            // menuPosition={true}
                            theme={mobileM.startPosRemarks}
                        />

                        {/*  起點備註檢核 */}
                        {
                            globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.label === "其他"
                            &&
                            <>
                                {/* 起點備註 - 其他 OtherStartPosRemarks */}
                                <TextInput
                                    topLabel={<>起點備註 - 其他</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={"請輸入起點備註 - 其他"}
                                    value={globalContextService.get("CaseCallCarComponentPage", "OtherStartPosRemarks") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseCallCarComponentPage", "OtherStartPosRemarks", value);
                                    }}
                                    theme={mobileM.otherStartPosRemarks}
                                />
                            </>
                        }


                        {/* 起訖點互換按鈕容器 */}
                        <BasicContainer theme={mobileM.convertButtonContainer}>
                            {/* 起訖點互換按鈕 */}
                            <NativeLineButton theme={mobileM.convertButton}
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
                                        let startAddr = globalContextService.get("CaseCallCarComponentPage", "StartPos");
                                        let endAddr = globalContextService.get("CaseCallCarComponentPage", "EndPos");

                                        globalContextService.set("CaseCallCarComponentPage", "EndPos", startAddr);
                                        globalContextService.set("CaseCallCarComponentPage", "StartPos", endAddr);

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
                                <Convert style={mobileM.convertContainerIcon} />
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
                                            <Text theme={mobileM.convertContainer}
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
                                                        fromAddr: globalContextService.get("CaseCallCarComponentPage", "StartPos"),
                                                        toAddr: globalContextService.get("CaseCallCarComponentPage", "EndPos"),
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
                            value={globalContextService.get("CaseCallCarComponentPage", "EndPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("CaseCallCarComponentPage", "EndPos", value);
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

                                globalContextService.set("CaseCallCarComponentPage", "EndPos", option.label);

                                getCaseOrderAmtAPI(); // 如果起迄點、搭車日期、搭車時間有值、陪同人數皆已有有值，則帶回 本日行程一覽 Table資料

                                setForceUpdate(f => !f)
                            }}

                            theme={mobileM.endPos}
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
                            value={globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks") ?? null}
                            onChange={(e, value, onInitial) => {
                                if (value?.label === '其他') {
                                    if (value?.label !== globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.label) {
                                        setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                    }
                                }
                                else if (globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.label === '其他') {
                                    setForceUpdate(f => !f); // 剛選擇 迄點備註 時，重新渲染
                                }
                                globalContextService.set("CaseCallCarComponentPage", "EndPosRemarks", value);

                            }}

                            options={[
                                { value: 'hint', label: "請選擇備註", isDisabled: true },
                                ...posRemarksSelectOption
                                // ...Counties
                            ]}
                            // menuPosition={true}
                            theme={mobileM.endPosRemarks}
                        />

                        {/*  迄點備註註檢核 */}
                        {
                            globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.label === "其他"
                            &&
                            <>
                                {/* 迄點備註 - 其他 OtherEndPosRemarks */}
                                <TextInput
                                    topLabel={<>迄點備註 - 其他</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={"請輸入迄點備註"}
                                    value={globalContextService.get("CaseCallCarComponentPage", "OtherEndPosRemarks") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CaseCallCarComponentPage", "OtherEndPosRemarks", value);
                                    }}
                                    theme={mobileM.otherEndPosRemarks}
                                />
                            </>
                        }

                        {/* 本日行程一覽容器 */}
                        <BasicContainer
                            theme={mobileM.todayToDoContainer}
                        >
                            {/* 本日行程一覽標題 */}
                            <Text
                                theme={mobileM.todayToDoTitle}
                            >
                                本日行程一覽

                                </Text>

                            <Container>
                                {/* 起點容器 */}
                                <SubContainer theme={mobileM.todayToDoStartContainer}>

                                    {/* 起點 */}
                                    <Text
                                        theme={mobileM.todayToDoStart}
                                    >
                                        <Start style={mobileM.todayToDoStartSvg} />
                                            (起點)
                                        </Text>

                                    {/* <Arrow
                                        style={mobileM.startToEndSvg}
                                    /> */}

                                    {/* 起點地址 */}
                                    <Text
                                        theme={mobileM.todayToDoStartAddr}
                                    >
                                        {globalContextService.get("CaseCallCarComponentPage", "StartPos")}
                                    </Text>

                                </SubContainer>

                                {/* 迄點容器 */}
                                <SubContainer theme={mobileM.todayToDoEndContainer}>

                                    {/* 迄點 */}
                                    <Text
                                        theme={mobileM.todayToDoEnd}
                                    >
                                        <End style={mobileM.todayToDoEndSvg} />
                                            (迄點)
                                        </Text>

                                    {/* 迄點地址 */}
                                    <Text
                                        theme={mobileM.todayToDoEndAddr}
                                    >
                                        {globalContextService.get("CaseCallCarComponentPage", "EndPos")}
                                    </Text>

                                </SubContainer>

                            </Container>

                            {/* 去程容器 */}
                            <Container theme={mobileM.goContainer}>
                                {/* 預估距離 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentTitle}>預估距離</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[0]?.distance) ? `${(props.CaseOrderAmt[0]?.distance / 1000)?.toFixed(2)}公里` : ""}</Text>
                                </SubContainer>

                                {/* 預估時間 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentTitle}>預估時間</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[0]?.duration) ? `${(props.CaseOrderAmt[0]?.duration / 60)?.toFixed(0)}分鐘` : ""}</Text>
                                </SubContainer>

                                {/* 車資總額 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentTitle}>車資總額</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[0]?.totalAmt) ? `$${props.CaseOrderAmt[0]?.totalAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 去程 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentRightText}>去程</Text>
                                </SubContainer>

                                {/* 政府補助 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentTitle}>政府補助</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[0]?.subsidyAmt) ? `$${props.CaseOrderAmt[0]?.subsidyAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 自負額 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentTitle}>自負額</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[0]?.selfPayAmt) ? `$${props.CaseOrderAmt[0]?.selfPayAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 陪同人數 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentTitle}>陪同總額</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[0]?.withAmt) ? `$${props.CaseOrderAmt[0]?.withAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 個案負擔 */}
                                <SubContainer theme={mobileM.goContentContainer}>
                                    <Text theme={mobileM.contentTitle}>個案負擔</Text>
                                    <Text style={{ color: "rgba(255, 122, 69, 1)" }}>{!isNil(props.CaseOrderAmt[0]?.withAmt) ? `$${props.CaseOrderAmt[0]?.withAmt + props.CaseOrderAmt[0]?.selfPayAmt}` : ""}</Text>
                                </SubContainer>
                            </Container>

                            {/* 回程容器 */}
                            <Container theme={mobileM.returnContainer}>
                                {/* 預估距離 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentTitle}>預估距離</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[1]?.distance) ? `${(props.CaseOrderAmt[1]?.distance / 1000)?.toFixed(2)}公里` : ""}</Text>
                                </SubContainer>

                                {/* 預估時間 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentTitle}>預估時間</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[1]?.duration) ? `${(props.CaseOrderAmt[1]?.duration / 60)?.toFixed(0)}分鐘` : ""}</Text>
                                </SubContainer>

                                {/* 車資總額 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentTitle}>車資總額</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[1]?.totalAmt) ? `$${props.CaseOrderAmt[1]?.totalAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 回程 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentRightText}>回程</Text>
                                </SubContainer>

                                {/* 政府補助 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentTitle}>政府補助</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[1]?.subsidyAmt) ? `$${props.CaseOrderAmt[1]?.subsidyAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 自負額 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentTitle}>自負額</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[1]?.selfPayAmt) ? `$${props.CaseOrderAmt[1]?.selfPayAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 陪同人數 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentTitle}>陪同總額</Text>
                                    <Text>{!isNil(props.CaseOrderAmt[1]?.withAmt) ? `$${props.CaseOrderAmt[1]?.withAmt}` : ""}</Text>
                                </SubContainer>

                                {/* 個案負擔 */}
                                <SubContainer theme={mobileM.returnContentContainer}>
                                    <Text theme={mobileM.contentTitle}>個案負擔</Text>
                                    <Text style={{ color: "rgba(255, 122, 69, 1)" }}>{!isNil(props.CaseOrderAmt[1]?.withAmt) ? `$${props.CaseOrderAmt[1]?.withAmt + props.CaseOrderAmt[1]?.selfPayAmt}` : ""}</Text>
                                </SubContainer>
                            </Container>
                        </BasicContainer>

                        {/* 預約回程檢核 */}
                        {
                            !isNil(globalContextService.get("CaseCallCarComponentPage", "TravelTime"))
                            &&
                            <>
                                {/* 我要預約回程(回居住地址) ScheduleReturnReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"我要預約回程(回居住地址)"}
                                    value={globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") ?? 0}
                                    onChange={(e, value, onInitial) => {
                                        if (value === 1) {
                                            if (value !== globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview")) {
                                                setForceUpdate(f => !f); // 剛選擇 預約回程 是 時，重新渲染
                                            }
                                        }
                                        else if (globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") === 1) {
                                            setForceUpdate(f => !f); // 剛選擇 預約回程 是，重新渲染
                                        }
                                        globalContextService.set("CaseCallCarComponentPage", "ScheduleReturnReview", value);
                                    }}
                                    theme={mobileM.scheduleReturnReview}
                                >
                                    {/* 我要預約回程(回居住地址) ScheduleReturnReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {
                                    globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") === 1
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
                                                    (globalContextService.get("CaseCallCarComponentPage", "ReturnEnableDate")) ?
                                                        moment(globalContextService.get("CaseCallCarComponentPage", "ReturnEnableDate"), "HH:mm")
                                                        :
                                                        null
                                                }
                                                onChange={(value, momentObj) => {
                                                    globalContextService.set("CaseCallCarComponentPage", `ReturnEnableDate`, value);
                                                }}
                                                theme={mobileM.returnTravelTime}
                                            />
                                        </>
                                        :
                                        // 維持排版佔位
                                        <SubContainer theme={mobileM.returnEnableDateOccupy} />
                                }
                            </>
                        }

                        {/* 願意共乘 RideTogetherReview */}
                        <Radio
                            // viewType
                            // disable
                            topLabel={"願意共乘"}
                            value={globalContextService.get("CaseCallCarComponentPage", "RideTogetherReview") ?? 1}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("CaseCallCarComponentPage", "RideTogetherReview", value);
                                // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                            }}
                            theme={mobileM.rideTogetherReview}
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
                            value={globalContextService.get("CaseCallCarComponentPage", "CarType") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value?.label)
                                // console.log(globalContextService.get("CaseCallCarComponentPage", "CarType"))
                                if (!isEqual(value, globalContextService.get("CaseCallCarComponentPage", "CarType"))) {
                                    globalContextService.remove("CaseCallCarComponentPage", "Wheelchair")
                                    globalContextService.set("CaseCallCarComponentPage", "CarType", value);
                                    setForceUpdate(f => !f); // 剛選擇 車種 時，重新渲染
                                }
                            }}

                            options={[
                                { value: 'hint', label: "請選擇車種類型", isDisabled: true },
                                ...props?.CarType
                                // ...Counties
                            ]}
                            // menuPosition={true}
                            theme={mobileM.carType}
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
                            value={globalContextService.get("CaseCallCarComponentPage", "Wheelchair") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("CaseCallCarComponentPage", "Wheelchair", value);
                                // console.log("請選擇居住縣市", value, globalContextService.get("CaseEditPage", "County"))
                            }}
                            options={
                                [
                                    { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                    ...(
                                        (
                                            globalContextService.get("CaseCallCarComponentPage", "CarType")?.label === "一般車"
                                                ?
                                                [
                                                    { value: '無', label: "無" },
                                                    { value: '普通輪椅(可收折)', label: "普通輪椅(可收折)" },
                                                ]
                                                :
                                                (
                                                    globalContextService.get("CaseCallCarComponentPage", "CarType")?.label === "福祉車"
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
                            theme={mobileM.wheelchair}
                        />

                        {/* 陪同人數 AccompanyCounts */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>陪同人數</>}
                            bottomLabel={<><Text theme={mobileM.accompanyCountsRequired}>第一人免費、第二人自費加價50元、第三人(含)及以上每位自費加價200元</Text></>}
                            //viewType
                            isSearchable
                            placeholder={"請選擇陪同人數"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts") ?? null}
                            onChange={(e, value, onInitial) => {

                                if ((!isEqual(value?.value, globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value))) {
                                    globalContextService.set("CaseCallCarComponentPage", "AccompanyCounts", value);
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
                            theme={mobileM.accompanyCounts}
                        />

                        {/* 簡訊號碼 SmsNumber */}
                        <TextInput
                            topLabel={<>簡訊號碼</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入接收簡訊號碼"}
                            value={globalContextService.get("CaseCallCarComponentPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("CaseCallCarComponentPage", "SmsNumber", value);
                            }}
                            theme={mobileM.smsNumber}
                        />

                    </FormRow>
                </FormContainer>

                {/* 叫車表單下方按鈕列 */}
                <BasicContainer
                    theme={mobileM.callCarFormBottomContainer}
                >
                    {/* 回列表按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={mobileM.returnButton}
                        onClick={() => {
                            history.push("/Case");
                            props.controllGCS("return")
                        }}
                    >
                        回列表
                                </NativeLineButton>

                    {/* 新增下個地點檢核 */}
                    {
                        globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") !== 1
                        &&
                        <>
                            {/* 新增下個地點按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.addNextLocation}
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
                                            reserveDate: globalContextService.get("CaseCallCarComponentPage", "TravelDate") + " " + globalContextService.get("CaseCallCarComponentPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45",
                                            transOrgs: globalContextService.get("CaseCallCarComponentPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                            createdIdentity: globalContextService.get("CaseCallCarComponentPage", "Orderer")?.value, // 訂車人身分
                                            fromAddr: globalContextService.get("CaseCallCarComponentPage", "StartPos"), // 起點
                                            fromAddrRemark: (
                                                globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.label === "其他" ?
                                                    globalContextService.get("CaseCallCarComponentPage", "OtherStartPosRemarks")
                                                    :
                                                    globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.value
                                            ), // 起點備註 (含備註 - 其他)
                                            toAddr: globalContextService.get("CaseCallCarComponentPage", "EndPos"), // 迄點
                                            toAddrRemark: (
                                                globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.label === "其他" ?
                                                    globalContextService.get("CaseCallCarComponentPage", "OtherEndPosRemarks")
                                                    :
                                                    globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.value
                                            ), // 迄點備註 (含備註 - 其他)
                                            remark: "", // 無此欄位
                                            isBack: globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                            canShared: globalContextService.get("CaseCallCarComponentPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                            carCategoryId: globalContextService.get("CaseCallCarComponentPage", "CarType")?.value, // 車種id
                                            carCategoryName: globalContextService.get("CaseCallCarComponentPage", "CarType")?.label, // 車種名稱
                                            wheelchairType: globalContextService.get("CaseCallCarComponentPage", "Wheelchair")?.value, // 輪椅
                                            familyWith: globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value, // 陪同人數
                                            noticePhone: globalContextService.get("CaseCallCarComponentPage", "SmsNumber"), // 簡訊號碼
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
                        theme={mobileM.reservationNow}
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
                                    reserveDate: globalContextService.get("CaseCallCarComponentPage", "TravelDate") + " " + globalContextService.get("CaseCallCarComponentPage", "TravelTime"), // 預約日期+預約時間	如: "2020-11-25 17:45",
                                    transOrgs: globalContextService.get("CaseCallCarComponentPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                    createdIdentity: globalContextService.get("CaseCallCarComponentPage", "Orderer")?.value, // 訂車人身分
                                    fromAddr: globalContextService.get("CaseCallCarComponentPage", "StartPos"), // 起點
                                    fromAddrRemark: (
                                        globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.label === "其他" ?
                                            globalContextService.get("CaseCallCarComponentPage", "OtherStartPosRemarks")
                                            :
                                            globalContextService.get("CaseCallCarComponentPage", "StartPosRemarks")?.value
                                    ), // 起點備註 (含備註 - 其他)
                                    toAddr: globalContextService.get("CaseCallCarComponentPage", "EndPos"), // 迄點
                                    toAddrRemark: (
                                        globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.label === "其他" ?
                                            globalContextService.get("CaseCallCarComponentPage", "OtherEndPosRemarks")
                                            :
                                            globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.value
                                    ), // 迄點備註 (含備註 - 其他)
                                    remark: "", // 無此欄位
                                    isBack: globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                    canShared: globalContextService.get("CaseCallCarComponentPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                    carCategoryId: globalContextService.get("CaseCallCarComponentPage", "CarType")?.value, // 車種id
                                    carCategoryName: globalContextService.get("CaseCallCarComponentPage", "CarType")?.label, // 車種名稱
                                    wheelchairType: globalContextService.get("CaseCallCarComponentPage", "Wheelchair")?.value, // 輪椅
                                    familyWith: globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value, // 陪同人數
                                    noticePhone: globalContextService.get("CaseCallCarComponentPage", "SmsNumber"), // 簡訊號碼
                                    haveNextOrderFlag: false, // 立即預約 按鈕發送
                                    isBackOrder: false, // 立即預約 按鈕發送 (去程)
                                })

                                //回程
                                props.AddOrderOfCaseUsersExecute({
                                    // id: "", // 訂單id，新增無須上送
                                    userId: props.UserId, // 用戶id
                                    caseUserId: props.CaseUserId, // 長照身份id
                                    orgId: "", // 送空字串
                                    reserveDate: globalContextService.get("CaseCallCarComponentPage", "TravelDate") + " " + globalContextService.get("CaseCallCarComponentPage", "ReturnEnableDate"), // 預約日期+預約回程時間	如: "2020-11-25 17:45",
                                    transOrgs: globalContextService.get("CaseCallCarComponentPage", "BUnitSort")?.map(item => item?.id), // 優先搭乘車行排序
                                    createdIdentity: globalContextService.get("CaseCallCarComponentPage", "Orderer")?.value, // 訂車人身分
                                    fromAddr: globalContextService.get("CaseCallCarComponentPage", "EndPos"), // 起點
                                    fromAddrRemark: (
                                        globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.label === "其他" ?
                                            globalContextService.get("CaseCallCarComponentPage", "OtherEndPosRemarks")
                                            :
                                            globalContextService.get("CaseCallCarComponentPage", "EndPosRemarks")?.value
                                    ), // 起點備註 (含備註 - 其他)
                                    toAddr: `${props?.CaseUsers?.county}${props?.CaseUsers?.district}${props?.CaseUsers?.addr}`,
                                    toAddrRemark: "住家",
                                    remark: "", // 無此欄位
                                    isBack: globalContextService.get("CaseCallCarComponentPage", "ScheduleReturnReview") === 1 ? true : false, //我要預約回程 
                                    canShared: globalContextService.get("CaseCallCarComponentPage", "RideTogetherReview") === 1 ? true : false, // 願意共乘
                                    carCategoryId: globalContextService.get("CaseCallCarComponentPage", "CarType")?.value, // 車種id
                                    carCategoryName: globalContextService.get("CaseCallCarComponentPage", "CarType")?.label, // 車種名稱
                                    wheelchairType: globalContextService.get("CaseCallCarComponentPage", "Wheelchair")?.value, // 輪椅
                                    familyWith: globalContextService.get("CaseCallCarComponentPage", "AccompanyCounts")?.value, // 陪同人數
                                    noticePhone: globalContextService.get("CaseCallCarComponentPage", "SmsNumber"), // 簡訊號碼
                                    haveNextOrderFlag: false, // 立即預約 按鈕發送
                                    isBackOrder: true, // 立即預約 按鈕發送 (回程)
                                })
                            }
                        }}
                    >
                        立即預約
                                </NativeLineButton>
                </BasicContainer>

            </Resizable>

        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
