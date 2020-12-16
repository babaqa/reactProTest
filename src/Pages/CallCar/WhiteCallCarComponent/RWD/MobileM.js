import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { ReactComponent as Resize } from '../../../../Assets/img/WhiteCallCarComponentPage/Resize.svg'
import { ReactComponent as Search } from '../../../../Assets/img/WhiteCallCarComponentPage/Search.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/WhiteCallCarComponentPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../Assets/img/WhiteCallCarComponentPage/Arrow.svg'
import { ReactComponent as UpCircle } from '../../../../Assets/img/WhiteCallCarComponentPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../Assets/img/WhiteCallCarComponentPage/End.svg'
import { ReactComponent as Start } from '../../../../Assets/img/WhiteCallCarComponentPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, NewSelector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, Resizable, OldTable } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { whiteCallCarComponent: { rwd: { mobileM } } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();
    return (
        <>
            {/* <MainPageContainer
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <></>
                }
            > */}

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
                                (globalContextService.get("WhiteCallCarComponentPage", "TravelDate")) ?
                                    moment(globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                    :
                                    null
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("WhiteCallCarComponentPage", "TravelDate", value);
                            }}
                            theme={mobileM.travelDate}
                        />

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
                                (globalContextService.get("WhiteCallCarComponentPage", "TravelTime")) ?
                                    moment(globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), "HH:mm")
                                    :
                                    null
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("WhiteCallCarComponentPage", "TravelTime", value);
                            }}
                            theme={mobileM.travelTime}
                        />

                        {/* 優先搭乘車行排序 */}
                        <BUnitSort
                            topLabel={<>優先搭乘車行排序 <Text theme={mobileM.bUnitSortNote}>(請依序點擊完成排序)</Text></>}
                            bUnit={[
                                { id: "0", name: "0XXXX車行" },
                                { id: "1", name: "1XXXX車行" },
                                { id: "2", name: "2XXXX車行" },
                                { id: "3", name: "3XXXX車行" },
                                { id: "4", name: "3XXXX車行" },
                                { id: "5", name: "3XXXX車行" },
                            ]}
                            value={globalContextService.get("WhiteCallCarComponentPage", `BUnitSort`)}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteCallCarComponentPage", `BUnitSort`, value);
                            }}
                            theme={mobileM.bUnitSort}
                        />

                        {/* 起點 StartPos*/}
                        <Map8Input
                            placeholder={"請輸入搭車地點(XX市XX區XX路XX號)"}

                            // viewType
                            // disable
                            topLabel={"起點"}
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", value);
                            }}
                            onSelect={(e, option, onInitial, posInfo) => {
                                map8Controll.addOrUpdateMarkerPoints("test1", [
                                    [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                    ...(map8Controll.getMarkerPoints("test1")?.[1] ? [map8Controll.getMarkerPoints("test1")[1]] : []),
                                ]) // 更新選中起點

                                map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                map8Controll.removeOneRoute("test1"); // 移除路線

                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", option.label);
                                setForceUpdate(f => !f)
                            }}

                            theme={mobileM.startPos}
                        />
                        <BasicContainer theme={mobileM.convertButtonContainer}>
                            <NativeLineButton theme={mobileM.convertButton}
                                onClick={() => {
                                    let end = map8Controll.getMarkerPoints("test1")?.[1]?.[0] // 迄點緯度
                                    let start = map8Controll.getMarkerPoints("test1")?.[0]?.[0] // 起點緯度

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
                                        let startAddr = globalContextService.get("WhiteCallCarComponentPage", "StartPos");
                                        let endAddr = globalContextService.get("WhiteCallCarComponentPage", "EndPos");

                                        globalContextService.set("WhiteCallCarComponentPage", "EndPos", startAddr);
                                        globalContextService.set("WhiteCallCarComponentPage", "StartPos", endAddr);

                                        map8Controll.addOrUpdateMarkerPoints("test1", [
                                            ...([map8Controll.getMarkerPoints("test1")?.[1]]),
                                            ...([map8Controll.getMarkerPoints("test1")?.[0]]),
                                        ])

                                        map8Controll.removeOneRoute("test1"); // 移除路線
                                    }
                                    setForceUpdate(f => !f)
                                }}
                            >
                                <Convert style={mobileM.convertContainerIcon} />
                                                起訖點互換
                        </NativeLineButton>
                        </BasicContainer>

                        {/* 迄點 EndPos*/}
                        <Map8Input
                            placeholder={"請輸入下車地點(XX市XX區XX路XX號)"}

                            // viewType
                            // disable
                            topLabel={<>
                                迄點
                                        <Text theme={mobileM.convertContainer}
                                    onClick={() => {

                                        let end = map8Controll.getMarkerPoints("test1")?.[1]?.[0] // 迄點緯度
                                        let start = map8Controll.getMarkerPoints("test1")?.[0]?.[0] // 起點緯度

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
                                            let routeInfo = map8Controll.addOneRoute("test1", {
                                                origin: map8Controll.getMarkerPoints("test1")[0].filter(i => i !== "hide"), //[121.474708, 25.012930] or [121.474708, 25.012930, "hide"], // 公司
                                                destination: map8Controll.getMarkerPoints("test1")[1].filter(i => i !== "hide")// [121.570260, 25.032806] or [121.474708, 25.012930, "hide"], // 象山
                                                // waypoints: [
                                                //     [121.49993, 25.03678], // 龍山寺
                                                //     [121.517498, 25.046273] // 台北摻站
                                                // ],
                                            })
                                            // routeInfo?.getOrigin && console.log(routeInfo.getOrigin())
                                            map8Controll.hideAllMarkerPoints("test1")
                                            // setForceUpdate(f => !f)
                                        }
                                    }}
                                >
                                    路線預覽
                                         </Text>
                            </>}
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", value);
                            }}
                            onSelect={(e, option, onInitial, posInfo) => {
                                map8Controll.addOrUpdateMarkerPoints("test1", [
                                    ...(map8Controll.getMarkerPoints("test1")?.[0] ? [map8Controll.getMarkerPoints("test1")[0]] : []),
                                    [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat],
                                ]) // 更新選中起點

                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", option.label);
                                map8Controll.setCenter("test1", [posInfo?.geometry?.location?.lng, posInfo?.geometry?.location?.lat]); // 移動中心點
                                map8Controll.removeOneRoute("test1"); // 移除路線

                                setForceUpdate(f => !f)
                            }}

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
                                        {globalContextService.get("WhiteCallCarComponentPage", "StartPos")}
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
                                        {globalContextService.get("WhiteCallCarComponentPage", "EndPos")}
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

                        {/* 願意共乘 RideTogetherReview */}
                        <Radio
                            // viewType
                            // disable
                            topLabel={"願意共乘"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "RideTogetherReview") ?? 1}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteCallCarComponentPage", "RideTogetherReview", value);
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
                            value={globalContextService.get("WhiteCallCarComponentPage", "CarType") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "CarType", value);
                            }}

                            options={[
                                { value: 'hint', label: "請選擇車種類型", isDisabled: true },
                                ...props?.AllCarType
                            ]}
                            // menuPosition={true}
                            theme={mobileM.carType}
                        />

                        {/* 搭車人數 AccompanyCounts */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>搭車人數</>}
                            bottomLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"請選擇搭乘人數"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts") ?? null}
                            onChange={(e, value, onInitial) => {
                                if (!isEqual(value, globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))) {
                                    // 清空重新選擇前的值
                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                    Array(preNum).fill(0).forEach((it, ind) => {
                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${ind + 1}`)
                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerBrithday_${ind + 1}`)
                                    });

                                    globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", value)
                                    setForceUpdate(f => !f);
                                }
                            }}

                            options={[
                                { value: 'hint', label: "請選擇搭乘人數", isDisabled: true },
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
                            theme={mobileM.accompanyCounts}
                        />

                        {/* 簡訊號碼 SmsNumber */}
                        <TextInput

                            topLabel={<>簡訊號碼</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入接收簡訊號碼"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "SmsNumber", value);
                            }}
                            theme={mobileM.smsNumber}
                        />

                        {/*維持排版佔位*/}
                        <SubContainer theme={mobileM.returnEnableDateOccupy} />

                        {!isNil(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))
                            &&
                            (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* 搭車姓名 TakerName */}
                                        <TextInput
                                            topLabel={`搭車姓名${index + 1}`}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={``}
                                            value={globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? ""}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("WhiteCallCarComponentPage", `TakerName_${index + 1}`, value);
                                            }}
                                            theme={mobileM.takerName}
                                        />

                                        {/* 搭車生日 TakerBrithday */}
                                        <DateTimePicker
                                            topLabel={`搭車生日${index + 1}`}
                                            // type={"time"} time、date、week、month、quarter、year
                                            type={"date"}
                                            format={"YYYY-MM-DD"}
                                            bascDefaultTheme={"DefaultTheme"}
                                            // viewType
                                            isSearchable
                                            placeholder={""}
                                            value={
                                                (globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`)) ?
                                                    moment(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                    :
                                                    null
                                            }
                                            onChange={(value, momentObj) => {
                                                globalContextService.set("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`, value);
                                            }}
                                            theme={mobileM.takerBrithday}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }

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
                            //#region 表單驗證
                            let validMsg = "";

                            if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["請選擇乘車日期"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["請選擇乘車時間"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["請輸入起點地址"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["請輸入迄點地址"])[1]
                            }
                            // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
                            //     validMsg = "請重新輸入起訖地址"
                            // }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["請選擇車種"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "Phone") ?? "", ["^.{1,}$"], ["請輸入聯絡電話"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["請選擇搭車人數"])[1]
                            }
                            else if (
                                !(
                                    (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                        .map((item, index) => {
                                            // 必須保留多種檢核的可能，不能只有寫死檢核必輸
                                            return [
                                                valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                                valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
                                            ]
                                        }).flat().every(V => (V === null))
                                )
                            ) {

                                validMsg = (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                    .map((item, index) => {
                                        return [
                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車姓名${index + 1}`])[1],
                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`請輸入搭車生日${index + 1}`])[1]
                                        ]
                                    }).flat().filter(v => v !== null)[0]; // 拿第一個檢核不通過的錯誤訊息
                            }
                            //#endregion

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
                                props.AddOrderOfSelfPayUsersExecute({
                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //車種 的 label
                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "RideTogetherReview") === 1 ? true : false, //願意共乘
                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//車種 的 value
                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //預約日期
                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	起點
                                    fromLat: map8Controll.getMarkerPoints("test1")?.[0]?.[1] ?? 0, //起點緯度
                                    fromLon: map8Controll.getMarkerPoints("test1")?.[0]?.[0] ?? 0,//起點經度
                                    // id: ""	白牌預約訂單 id
                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "Phone"),	//畫面無此欄位
                                    orgId: "",//	畫面無此欄位
                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value,	//搭乘人數
                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                        return {
                                            name: globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`),
                                            birth: globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`)
                                        }
                                    })),	//搭乘人員資訊陣列
                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "TravelTime")}`,	//預約日期+ 預約時間
                                    selfPayUserId: props.CaseUserId, //白牌個案id
                                    status: 1,	//畫面無此欄位
                                    time: globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), //預約時間
                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	迄點
                                    toLat: map8Controll.getMarkerPoints("test1")?.[1]?.[0] ?? 0,//	迄點緯度
                                    toLon: map8Controll.getMarkerPoints("test1")?.[1]?.[1] ?? 0,//	迄點經度
                                    userId: props.UserId
                                })
                            }
                        }}
                    >
                        立即預約
                                </NativeLineButton>
                </BasicContainer>

            </Resizable>

            {/* </MainPageContainer> */}
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`

