import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/RecordPage/NoData.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordPage/Share.svg'
import { ReactComponent as Start } from '../../../../Assets/img/RecordPage/Start.svg'
import { ReactComponent as End } from '../../../../Assets/img/RecordPage/End.svg'
import { ReactComponent as Bus } from '../../../../Assets/img/RecordPage/BusMobileM.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, Tag, Tooltip, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { busRecordComponent: { rwd: { mobileM } } } } } = Theme;

    let data = [
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", passenger: ["123", "王小花", "王大明"], userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", passenger: ["123", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", passenger: ["123", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", passenger: ["王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", userName: "王大明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", passenger: ["王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", userName: "王大明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
    ]

    return (
        <>
            {data.length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={mobileM.noDataContainer}
                    >
                        <NoData style={mobileM.noDataSvg} />
                    </BasicContainer>
                </>
                :
                <>
                    <Container>
                        <OldTable
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
                                                        theme={mobileM.cardContainer}
                                                    >
                                                        <Container>

                                                            {/* 第一區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.firstAreaContainer}
                                                            >
                                                                <Bus style={mobileM.caseSvg} />

                                                                {/* 使用者名稱 UserName*/}
                                                                <Text
                                                                    theme={mobileM.userName}
                                                                >
                                                                    {rowData?.userName}


                                                                    {rowData?.case === "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 案號 標題*/}
                                                                            <Text
                                                                                theme={mobileM.caseNumberTitle}
                                                                            >
                                                                                案號
                                                                            {/* 案號 內文*/}
                                                                                <Text
                                                                                    theme={mobileM.caseNumberText}
                                                                                >
                                                                                    {rowData?.caseNumber}
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }


                                                                </Text>

                                                                {rowData?.case !== "巴士"
                                                                    &&
                                                                    <>
                                                                        {/* 已共乘  ShareText*/}
                                                                        < Text
                                                                            theme={mobileM.shareText}
                                                                        >
                                                                            <Share
                                                                                style={mobileM.shareSvg}
                                                                            />
                                                                                已共乘
                                                                            </Text>
                                                                    </>
                                                                }

                                                                <Tag
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    theme={mobileM.cancelTag}
                                                                    text={"服務單位取消"}
                                                                />



                                                            </SubContainer>


                                                            {/* 第二區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.secondAreaContainer}
                                                            >
                                                                {/* 訂單編號 標題 */}
                                                                <Text
                                                                    theme={mobileM.orderNumberTitle}
                                                                >
                                                                    訂單編號

                                                                        {/* 訂單編號 內文 */}
                                                                    <Text
                                                                        theme={mobileM.orderNumberText}
                                                                    >
                                                                        {rowData?.orderNumber}
                                                                    </Text>
                                                                </Text>

                                                                {/* 預約搭乘時間 標題 */}
                                                                <Text
                                                                    theme={mobileM.bookRideTitle}
                                                                >
                                                                    預約搭乘時間

                                                                    {/* 預約搭乘時間 內文 */}
                                                                    <Text
                                                                        theme={mobileM.bookRideText}
                                                                    >
                                                                        {rowData?.bookRide}
                                                                    </Text>
                                                                </Text>

                                                                {/* 司機 標題 */}
                                                                <Text
                                                                    theme={mobileM.driverTitle}
                                                                >
                                                                    司機

                                                                    {/* 司機 內文 */}
                                                                    <Text
                                                                        theme={mobileM.driverText}
                                                                    >
                                                                        {rowData?.driver}
                                                                    </Text>
                                                                </Text>

                                                                {/* 車牌 標題 */}
                                                                <Text
                                                                    theme={mobileM.licensePlateTitle}
                                                                >
                                                                    車牌

                                                                    {/* 車牌 內文 */}
                                                                    <Text
                                                                        theme={mobileM.licensePlateText}
                                                                    >
                                                                        {rowData?.licensePlate}
                                                                    </Text>
                                                                </Text>



                                                            </SubContainer>


                                                            {/* 第三區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.thirdAreaContainer}
                                                            >
                                                                {/* 第三區塊上層 容器 */}
                                                                <Container
                                                                    theme={mobileM.thirdAreaTopContainer}
                                                                >

                                                                    {rowData?.case === "共享車隊"
                                                                        &&
                                                                        <>
                                                                            {/* 是否共乘 特別版 標題 */}
                                                                            <Text
                                                                                theme={mobileM.specialCanShareTitle}
                                                                            >
                                                                                是否共乘

                                                                                {/* 是否共乘 特別版 內文 */}
                                                                                <Text
                                                                                    theme={mobileM.specialCanShareText}
                                                                                >
                                                                                    {rowData?.canShare}
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }

                                                                    {rowData?.case !== "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 人數 特別版 標題 */}
                                                                            <Text
                                                                                theme={mobileM.specialNumberOfPeopleTitle}
                                                                            >
                                                                                人數

                                                                            {/* 人數 特別版 內文 */}
                                                                                <Text
                                                                                    theme={mobileM.specialNumberOfPeopleText}
                                                                                >
                                                                                    {rowData?.numberOfPeople + "人"}
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }

                                                                    {rowData?.case !== "共享車隊"
                                                                        &&
                                                                        <>
                                                                            {/* 車資總額 標題 */}
                                                                            <Text
                                                                                theme={mobileM.totalFareTitle}
                                                                            >
                                                                                車資總額

                                                                                    {/* 車資總額 內文 */}
                                                                                <Text
                                                                                    theme={mobileM.totalFareText}
                                                                                >
                                                                                    {"$" + rowData?.totalFareText}
                                                                                </Text>
                                                                            </Text>

                                                                            {rowData?.case === "長照"
                                                                                &&
                                                                                <>
                                                                                    {/* 政府補助 標題 */}
                                                                                    <Text
                                                                                        theme={mobileM.govSubsidyTitle}
                                                                                    >
                                                                                        政府補助

                                                                                {/* 政府補助 內文 */}
                                                                                        <Text
                                                                                            theme={mobileM.govSubsidyText}
                                                                                        >
                                                                                            {"$" + rowData?.govSubsidy}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    {/* 陪同金額 標題 */}
                                                                                    <Text
                                                                                        theme={mobileM.accompanyingAmountTitle}
                                                                                    >
                                                                                        陪同金額

                                                                                {/* 陪同金額 內文 */}
                                                                                        <Text
                                                                                            theme={mobileM.accompanyingAmountText}
                                                                                        >
                                                                                            {"$" + rowData?.accompanyingAmount}
                                                                                        </Text>
                                                                                    </Text>
                                                                                </>
                                                                            }
                                                                        </>
                                                                    }
                                                                    {/* 個案負擔 標題 */}
                                                                    <Text
                                                                        theme={mobileM.caseBurdenTitle}
                                                                    >
                                                                        用戶負擔

                                                                                {/* 個案負擔 內文 */}
                                                                        <Text
                                                                            theme={mobileM.caseBurdenText}
                                                                        >
                                                                            {"$" + rowData?.caseBurden}
                                                                        </Text>
                                                                    </Text>

                                                                </Container>

                                                                {rowData?.case === "長照"
                                                                    &&
                                                                    <>
                                                                        {/* 是否共乘 標題 */}
                                                                        <Text
                                                                            theme={mobileM.canShareTitle}
                                                                        >
                                                                            是否共乘

                                                                                {/* 是否共乘 內文 */}
                                                                            <Text
                                                                                theme={mobileM.canShareText}
                                                                            >
                                                                                {rowData?.canShare}
                                                                            </Text>
                                                                        </Text>



                                                                        {/* 人數 標題 */}
                                                                        <Text
                                                                            theme={mobileM.numberOfPeopleTitle}
                                                                        >
                                                                            人數

                                                                        {/* 人數 內文 */}
                                                                            <Text
                                                                                theme={mobileM.numberOfPeopleText}
                                                                            >
                                                                                {rowData?.numberOfPeople + "人"}
                                                                            </Text>
                                                                        </Text>
                                                                    </>
                                                                }


                                                                {/* 服務單位 標題 */}
                                                                <Text
                                                                    theme={mobileM.serviceUnitTitle}
                                                                >
                                                                    服務單位

                                                                    {/* 服務單位 內文 */}
                                                                    <Tooltip placement="top" title={rowData?.serviceUnit}>

                                                                        <Text
                                                                            theme={mobileM.serviceUnitText}
                                                                        >
                                                                            {rowData?.serviceUnit}
                                                                        </Text>
                                                                    </Tooltip>

                                                                </Text>

                                                                {rowData?.case !== "長照"
                                                                    &&
                                                                    <Container>

                                                                        {/* 乘客 標題 */}
                                                                        <Text
                                                                            theme={mobileM.passengerTitle}
                                                                        >
                                                                            乘客
                                                                        </Text>

                                                                        {/* 乘客 內文 容器*/}
                                                                        <Text
                                                                            theme={mobileM.passengerContainer}
                                                                        >
                                                                            <Container>
                                                                                {
                                                                                    (rowData?.passenger ?? []).map((passenger, index) => {
                                                                                        return (
                                                                                            <React.Fragment key={index}>
                                                                                                {/* 乘客 內文 */}
                                                                                                <Text
                                                                                                    theme={mobileM.passengerText}
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

                                                                <Container
                                                                    theme={mobileM.startToEndContainer}
                                                                >
                                                                    {/* 起點 標題 */}
                                                                    <Text
                                                                        theme={mobileM.startPointTitle}
                                                                    >

                                                                        <Start style={mobileM.startPointSvg} />
                                                                            起點
                                                                    </Text>

                                                                    {/* 起點 內文 */}
                                                                    <Text
                                                                        theme={mobileM.startPointText}
                                                                    >
                                                                        {rowData?.startPoint}
                                                                    </Text>

                                                                    {/* 迄點 標題 */}
                                                                    <Text
                                                                        theme={mobileM.endPointTitle}
                                                                    >

                                                                        <End style={mobileM.endPointSvg} />
                                                                            迄點
                                                                    </Text>

                                                                    {/* 迄點 內文 */}
                                                                    <Text
                                                                        theme={mobileM.endPointText}
                                                                    >
                                                                        {rowData?.endPoint}
                                                                    </Text>

                                                                </Container>

                                                            </SubContainer>

                                                            {/* 第四區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.forthAreaContainer}
                                                            >
                                                                {/* 司機未執行按鈕 */}
                                                                <NativeLineButton
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    disable={false}
                                                                    type="button" // 防止提交
                                                                    theme={mobileM.noExecuteButton}
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
                                                                            theme={mobileM.againButton}
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
                                                                    theme={mobileM.rideDetailsButton}
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
                                                                    theme={mobileM.questionnaireButton}
                                                                    onClick={() => {
                                                                        // history.push("/Order/WhiteOrder");
                                                                        // props.controllGCS("return")
                                                                    }}
                                                                >
                                                                    填寫問卷
                                                                        </NativeLineButton>

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
                            //showHeader={false}
                            data={data.filter(i => i.case === "巴士")}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </Container>
                </>
            }

            {/* 沒有更多搭乘紀錄 提醒 */}
            <Text
                theme={mobileM.noDataTip}
            >
                沒有更多搭乘紀錄
            </Text>

        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
