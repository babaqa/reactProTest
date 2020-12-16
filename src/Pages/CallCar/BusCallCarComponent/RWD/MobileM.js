import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { ReactComponent as Search } from '../../../../Assets/img/BusCallCarComponentPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/BusCallCarComponentPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/BusCallCarComponentPage/StartToEnd.svg'
import { ReactComponent as Resize } from '../../../../Assets/img/BusCallCarComponentPage/Resize.svg'
import { ReactComponent as Arrow } from '../../../../Assets/img/BusCallCarComponentPage/Arrow.svg'
import { ReactComponent as End } from '../../../../Assets/img/BusCallCarComponentPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/BusCallCarComponentPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable, Resizable } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { busCallCarComponent: { rwd: { mobileM } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    return (
        <>

            {/* 底層的地圖容器 */}
            <BasicContainer
                theme={mobileM.mapContainer}
            >
                <Map8Canvas
                    mapId={"test1"}
                    mapAttr={{
                        maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
                        center: [121.474708, 25.012930], // 初始中心座標，格式為 [lng, lat]  // 25.012930, 121.474708
                        zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
                        minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
                        maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
                        pitch: 0, // 攝影機仰角, 可省略, [0-60] // default 50
                        bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
                        attributionControl: false,
                    }}

                    theme={mobileM.map}
                />
            </BasicContainer>

            {/* 地圖上層的表單容器 */}
            <Resizable
                width={"100%"}
                height={"280px"}
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
                    // onClick={() => {
                    //     history.push(`/BusRouteAndStop/BusStop/Edit?stationId=${rowData.id}`)
                    // }}
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
                                (globalContextService.get("BusCallCarComponentPage", "TravelDate")) ?
                                    moment(globalContextService.get("BusCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                    :
                                    null
                            }
                            onChange={(value, momentObj) => {
                                if (value !== globalContextService.get("BusCallCarComponentPage", "TravelDate")) {
                                    globalContextService.set("BusCallCarComponentPage", "TravelDate", value);
                                    globalContextService.remove("BusCallCarComponentPage", "Route")
                                    globalContextService.remove("BusCallCarComponentPage", "StartPos")
                                    globalContextService.remove("BusCallCarComponentPage", "EndPos")
                                    setForceUpdate(f => !f)
                                }
                            }}
                            theme={mobileM.travelDate}
                        />

                        {/*  乘車日期檢核 */}
                        {
                            // !isNil(globalContextService.get("BusCallCarComponentPage", "TravelDate"))
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
                                        (globalContextService.get("BusCallCarComponentPage", "TravelTime")) ?
                                            moment(globalContextService.get("BusCallCarComponentPage", "TravelTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("BusCallCarComponentPage", "TravelTime", value);
                                    }}
                                    theme={mobileM.travelTime}
                                />
                            </>
                        }

                        {/* 車行 CarDealership */}
                        <TextInput
                            viewType
                            topLabel={<>車行</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            // placeholder={""}
                            value={globalContextService.get("WhiteCallCarComponentPage", "CarDealership") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "CarDealership", value);
                            }}
                            theme={mobileM.carDealership}
                        />



                        {/* 路線 Route*/}
                        <NewSelector
                            placeholder={"請選擇路線"}
                            isSearchable
                            // viewType
                            disabled={isNil(globalContextService.get("BusCallCarComponentPage", "TravelDate"))}
                            topLabel={"路線"}
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("BusCallCarComponentPage", "Route") ?? null}
                            onChange={(e, value, onInitial) => {
                                if (value !== globalContextService.get("BusCallCarComponentPage", "Route")) {
                                    globalContextService.set("BusCallCarComponentPage", "Route", value);
                                    globalContextService.remove("BusCallCarComponentPage", "StartPos")
                                    globalContextService.remove("BusCallCarComponentPage", "EndPos")
                                    props.getStationOnRoute(value?.id)
                                    setForceUpdate(f => !f)
                                }
                            }}
                            options={[
                                ...props.AllRoute?.filter((item) => (item?.workWeek?.split(",").includes(moment(globalContextService.get("BusCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss").isoWeekday()?.toString())))
                                // { value: '0', label: "請選擇路線", isDisabled: true },
                                // { value: '1', label: '路線A' },
                                // { value: '2', label: '路線B' },
                            ]}

                            theme={mobileM.route}
                        />

                        {/* 起點站牌 StartPos*/}
                        <NewSelector
                            placeholder={"請選擇起點"}
                            isSearchable
                            // viewType
                            disabled={isNil(globalContextService.get("BusCallCarComponentPage", "Route"))}
                            topLabel={
                                <>
                                    起點站牌
                                        {/* < Text theme={mobileM.convertContainer}
                                            onClick={() => {
                                                // let end = map8Controll.getMarkerPoints("test1")?.[1]?.[0] // 迄點緯度
                                                // let start = map8Controll.getMarkerPoints("test1")?.[0]?.[0] // 起點緯度                                                    
                                                let validMsg = "";
                                                if (valid(globalContextService.get("BusCallCarComponentPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                    validMsg = valid(globalContextService.get("BusCallCarComponentPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
                                                }
                                                else if (valid(globalContextService.get("BusCallCarComponentPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                                    validMsg = valid(globalContextService.get("BusCallCarComponentPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
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

                                                    let startAddr = globalContextService.get("BusCallCarComponentPage", "StartPos");
                                                    let endAddr = globalContextService.get("BusCallCarComponentPage", "EndPos");
                                                    globalContextService.set("BusCallCarComponentPage", "EndPos", { value: startAddr?.value, label: startAddr?.label });
                                                    globalContextService.set("BusCallCarComponentPage", "StartPos", { value: endAddr?.value, label: endAddr?.label });

                                                    // map8Controll.addOrUpdateMarkerPoints("test1", [
                                                    //     ...([map8Controll.getMarkerPoints("test1")?.[1]]),
                                                    //     ...([map8Controll.getMarkerPoints("test1")?.[0]]),
                                                    // ])

                                                    // map8Controll.removeOneRoute("test1"); // 移除路線
                                                }
                                                setForceUpdate(f => !f)
                                            }}
                                        >
                                            <Convert style={mobileM.convertContainerIcon} />
                                                起訖點互換 */}
                                    {/* </Text> */}
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("BusCallCarComponentPage", "StartPos") ?? []}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("BusCallCarComponentPage", "StartPos", value);
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
                            theme={mobileM.startPos}
                        />
                        {/* 起訖點互換按鈕容器 */}
                        <BasicContainer theme={mobileM.convertButtonContainer}>
                            <NativeLineButton theme={mobileM.convertButton}
                                onClick={() => {
                                    // let end = map8Controll.getMarkerPoints("test1")?.[1]?.[0] // 迄點緯度
                                    // let start = map8Controll.getMarkerPoints("test1")?.[0]?.[0] // 起點緯度                                                    
                                    let validMsg = "";
                                    if (valid(globalContextService.get("BusCallCarComponentPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarComponentPage", "StartPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
                                    }
                                    else if (valid(globalContextService.get("BusCallCarComponentPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]) {
                                        validMsg = valid(globalContextService.get("BusCallCarComponentPage", "EndPos").value ?? "", ["^.{1,}$"], ["請選擇起點與迄點"])[1]
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

                                        let startAddr = globalContextService.get("BusCallCarComponentPage", "StartPos");
                                        let endAddr = globalContextService.get("BusCallCarComponentPage", "EndPos");
                                        globalContextService.set("BusCallCarComponentPage", "EndPos", { value: startAddr?.value, label: startAddr?.label });
                                        globalContextService.set("BusCallCarComponentPage", "StartPos", { value: endAddr?.value, label: endAddr?.label });

                                        // map8Controll.addOrUpdateMarkerPoints("test1", [
                                        //     ...([map8Controll.getMarkerPoints("test1")?.[1]]),
                                        //     ...([map8Controll.getMarkerPoints("test1")?.[0]]),
                                        // ])

                                        // map8Controll.removeOneRoute("test1"); // 移除路線
                                    }
                                    setForceUpdate(f => !f)
                                }}
                            >
                                <Convert style={mobileM.convertContainerIcon} />
                                                起訖點互換
                        </NativeLineButton>
                        </BasicContainer>

                        {/* 迄點站牌 EndPos*/}
                        <NewSelector
                            placeholder={"請選擇訖點"}
                            isSearchable
                            // viewType
                            disabled={isNil(globalContextService.get("BusCallCarComponentPage", "Route"))}
                            topLabel={"迄點站牌"}
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("BusCallCarComponentPage", "EndPos") ?? []}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("BusCallCarComponentPage", "EndPos", value);
                                setForceUpdate(f => !f)
                            }}
                            options={[
                                ...(props?.StationOnRoute?.assignLineStations ?? []).map((item, index) => {
                                    return props.AllStation.filter(s => s.id === item)[0]
                                })
                            ]}

                            theme={mobileM.endPos}
                        />


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
                                        {globalContextService.get("BusCallCarComponentPage", "StartPos")?.label}
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
                                        {globalContextService.get("BusCallCarComponentPage", "EndPos")?.label}
                                    </Text>

                                </SubContainer>

                            </Container>

                            {/* 去程容器 */}
                            <Container theme={mobileM.goContainer}>
                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 預估距離 */}
                                    <Text theme={mobileM.contentTitle}>預估距離</Text>
                                    <Text>test</Text>
                                </SubContainer>

                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 預估時間 */}
                                    <Text theme={mobileM.contentTitle}>預估時間</Text>
                                    <Text>test</Text>
                                </SubContainer>

                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 車資總額 */}
                                    <Text theme={mobileM.contentTitle}>車資總額</Text>
                                    <Text>test</Text>
                                </SubContainer>

                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 去程 */}
                                    <Text theme={mobileM.contentRightText}>去程</Text>
                                </SubContainer>

                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 政府補助 */}
                                    <Text theme={mobileM.contentTitle}>政府補助</Text>
                                    <Text>test</Text>
                                </SubContainer>

                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 自負額 */}
                                    <Text theme={mobileM.contentTitle}>自負額</Text>
                                    <Text>test</Text>
                                </SubContainer>

                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 陪同人數 */}
                                    <Text theme={mobileM.contentTitle}>陪同人數</Text>
                                    <Text>test</Text>
                                </SubContainer>

                                <SubContainer theme={mobileM.goContentContainer}>
                                    {/* 個案負擔 */}
                                    <Text theme={mobileM.contentTitle}>個案負擔</Text>
                                    <Text style={{ color: "rgba(255, 122, 69, 1)" }}>test</Text>
                                </SubContainer>
                            </Container>

                        </BasicContainer>

                        {/* 搭車人數 AccTotalCounts */}
                        <NewSelector
                            baseDefaultTheme={"DefaultTheme"}
                            topLabel={"搭車人數"}
                            //viewType
                            isSearchable
                            placeholder={"請選擇搭車人數"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("BusCallCarComponentPage", "AccTotalCounts") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("BusCallCarComponentPage", "AccTotalCounts", value);
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
                            theme={mobileM.accTotalCounts}
                        />

                        {/* 簡訊號碼 SmsNumber */}
                        <TextInput

                            topLabel={<>簡訊號碼</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入接收簡訊號碼"}
                            value={globalContextService.get("BusCallCarComponentPage", "SmsNumber") ?? props.CaseUsers?.enableDate}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("BusCallCarComponentPage", "SmsNumber", value);
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

                    {/* 立即預約按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={mobileM.reservationNow}
                        onClick={() => {
                            // props.controllGCS("return");
                            // history.push("/DriverAndCar/Cars")
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