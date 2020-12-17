import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/RecordPage/NoData.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordPage/Share.svg'
import { ReactComponent as Start } from '../../../../Assets/img/RecordPage/Start.svg'
import { ReactComponent as End } from '../../../../Assets/img/RecordPage/End.svg'
import { ReactComponent as Case } from '../../../../Assets/img/RecordPage/Case.svg'
import { ReactComponent as Fleet } from '../../../../Assets/img/RecordPage/Fleet.svg'
import { ReactComponent as Bus } from '../../../../Assets/img/RecordPage/Bus.svg'
import { useHistory } from 'react-router-dom';
import { DispatchTable } from '../../../../ProjectComponent';
import { DateTimePicker, BasicContainer, Tag, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';



const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { allRecordComponent: { rwd: { laptop } } } } } = Theme;
    let history = useHistory()

    let data = [
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", userName: "王小明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", userName: "王小明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", userName: "王大明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位...", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
    ]

    const switchCase = (key) => {
        switch (key) {
            case "長照":
                return (
                    <>
                        <Case style={laptop.caseSvg} />
                    </>
                );
            case "共享車隊":
                return (
                    <>
                        <Fleet style={laptop.caseSvg} />
                    </>
                );
            case "巴士":
                return (
                    <>
                        <Bus style={laptop.caseSvg} />
                    </>
                );
            default:
                return undefined
        }

    }
    //#endregion

    return (
        <>
            {data.length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptop.noDataContainer}
                    >
                        <NoData style={laptop.noDataSvg} />
                    </BasicContainer>
                </>
                :
                <>
                    <Container>
                        {
                            (data).map((item, index) => {
                                return (

                                    <React.Fragment key={index}>

                                        {/* 卡片資料表單區容器 */}
                                        < BasicContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.cardContainer}
                                        >
                                            <Container>

                                                {/* 第一區塊 容器 */}
                                                <SubContainer
                                                    theme={laptop.firstAreaContainer}
                                                >
                                                    {
                                                        switchCase(item?.case)
                                                    }

                                                    {/* 使用者名稱 UserName*/}
                                                    <Text
                                                        theme={laptop.userName}
                                                    >
                                                        {item?.userName}

                                                        {/* 案號 CaseNumber*/}
                                                        <Text
                                                            theme={laptop.caseNumber}
                                                        >
                                                            {"案號 " + item?.caseNumber}
                                                        </Text>
                                                    </Text>

                                                    <Tag
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={laptop.cancelTag}
                                                        text={"服務單位取消"}
                                                    />

                                                    {item?.share
                                                        &&
                                                        <>
                                                            {/* 已共乘  ShareText*/}
                                                            < Text
                                                                theme={laptop.shareText}
                                                            >
                                                                <Share
                                                                    style={laptop.shareSvg}
                                                                />
                                                                    已共乘
                                                                </Text>
                                                        </>
                                                    }

                                                </SubContainer>


                                                {/* 第二區塊 容器 */}
                                                <SubContainer
                                                    theme={laptop.secondAreaContainer}
                                                >
                                                    {/* 訂單編號 標題 */}
                                                    <Text
                                                        theme={laptop.orderNumberTitle}
                                                    >
                                                        訂單編號

                                                        {/* 訂單編號 內文 */}
                                                        <Text
                                                            theme={laptop.orderNumberText}
                                                        >
                                                            {item?.orderNumber}
                                                        </Text>
                                                    </Text>

                                                    {/* 預約搭乘時間 標題 */}
                                                    <Text
                                                        theme={laptop.bookRideTitle}
                                                    >
                                                        預約搭乘時間

                                                        {/* 預約搭乘時間 內文 */}
                                                        <Text
                                                            theme={laptop.bookRideText}
                                                        >
                                                            {item?.bookRide}
                                                        </Text>
                                                    </Text>

                                                    {/* 服務單位 標題 */}
                                                    <Text
                                                        theme={laptop.serviceUnitTitle}
                                                    >
                                                        服務單位

                                                        {/* 服務單位 內文 */}
                                                        <Text
                                                            theme={laptop.serviceUnitText}
                                                        >
                                                            {item?.serviceUnit}
                                                        </Text>
                                                    </Text>

                                                    {/* 司機 標題 */}
                                                    <Text
                                                        theme={laptop.driverTitle}
                                                    >
                                                        司機

                                                        {/* 司機 內文 */}
                                                        <Text
                                                            theme={laptop.driverText}
                                                        >
                                                            {item?.driver}
                                                        </Text>
                                                    </Text>

                                                    {/* 車牌 標題 */}
                                                    <Text
                                                        theme={laptop.licensePlateTitle}
                                                    >
                                                        車牌

                                                        {/* 車牌 內文 */}
                                                        <Text
                                                            theme={laptop.licensePlateText}
                                                        >
                                                            {item?.licensePlate}
                                                        </Text>
                                                    </Text>

                                                    {/* 司機未執行按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.noExecuteButton}
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
                                                        }}
                                                    >
                                                        司機未執行
                                                     </NativeLineButton>

                                                </SubContainer>


                                                {/* 第三區塊 容器 */}
                                                <SubContainer
                                                    theme={laptop.thirdAreaContainer}
                                                >
                                                    <Container>
                                                        {/* 車資總額 標題 */}
                                                        <Text
                                                            theme={laptop.totalFareTitle}
                                                        >
                                                            車資總額

                                                        {/* 車資總額 內文 */}
                                                            <Text
                                                                theme={laptop.totalFareText}
                                                            >
                                                                {"$" + item?.totalFareText}
                                                            </Text>
                                                        </Text>

                                                        {/* 政府補助 標題 */}
                                                        <Text
                                                            theme={laptop.govSubsidyTitle}
                                                        >
                                                            政府補助

                                                        {/* 政府補助 內文 */}
                                                            <Text
                                                                theme={laptop.govSubsidyText}
                                                            >
                                                                {"$" + item?.govSubsidy}
                                                            </Text>
                                                        </Text>

                                                        {/* 陪同金額 標題 */}
                                                        <Text
                                                            theme={laptop.accompanyingAmountTitle}
                                                        >
                                                            陪同金額

                                                        {/* 陪同金額 內文 */}
                                                            <Text
                                                                theme={laptop.accompanyingAmountText}
                                                            >
                                                                {"$" + item?.accompanyingAmount}
                                                            </Text>
                                                        </Text>

                                                    </Container>

                                                    <Container>

                                                        {/* 是否共乘 標題 */}
                                                        <Text
                                                            theme={laptop.canShareTitle}
                                                        >
                                                            是否共乘

                                                        {/* 是否共乘 內文 */}
                                                            <Text
                                                                theme={laptop.canShareText}
                                                            >
                                                                {item?.canShare}
                                                            </Text>
                                                        </Text>


                                                        {/* 人數 標題 */}
                                                        <Text
                                                            theme={laptop.numberOfPeopleTitle}
                                                        >
                                                            人數

                                                        {/* 人數 內文 */}
                                                            <Text
                                                                theme={laptop.numberOfPeopleText}
                                                            >
                                                                {item?.numberOfPeople + "人"}
                                                            </Text>
                                                        </Text>

                                                    </Container>

                                                    <Container
                                                        theme={laptop.startToEndContainer}
                                                    >
                                                        {/* 起點 標題 */}
                                                        <Text
                                                            theme={laptop.startPointTitle}
                                                        >

                                                            <Start style={laptop.startPointSvg} />
                                                            起點

                                                            {/* 起點 內文 */}
                                                            <Text
                                                                theme={laptop.startPointText}
                                                            >
                                                                {item?.startPoint}
                                                            </Text>

                                                        </Text>

                                                        {/* 迄點 標題 */}
                                                        <Text
                                                            theme={laptop.endPointTitle}
                                                        >

                                                            <End style={laptop.endPointSvg} />
                                                            迄點

                                                            {/* 迄點 內文 */}
                                                            <Text
                                                                theme={laptop.endPointText}
                                                            >
                                                                {item?.endPoint}
                                                            </Text>

                                                        </Text>

                                                    </Container>

                                                </SubContainer>

                                                {/* 第四區塊 容器 */}
                                                <SubContainer
                                                    theme={laptop.forthAreaContainer}
                                                >

                                                    {/* 個案負擔 標題 */}
                                                    <Text
                                                        theme={laptop.caseBurdenTitle}
                                                    >
                                                        個案負擔
                                                    </Text>

                                                    {/* 個案負擔 內文 */}
                                                    <Text
                                                        theme={laptop.caseBurdenText}
                                                    >
                                                        {"$" + item?.caseBurden}
                                                    </Text>

                                                    {/* 再叫一次按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.againButton}
                                                        onClick={() => {
                                                            // history.push("/Order/WhiteOrder");
                                                            // props.controllGCS("return")
                                                        }}
                                                    >
                                                        再叫一次
                                                     </NativeLineButton>

                                                    {/* 乘車明細按鈕 */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // 防止提交
                                                        theme={laptop.rideDetailsButton}
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
                                                        theme={laptop.questionnaireButton}
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

                                    </React.Fragment>
                                )
                            })

                        }
                    </Container>
                </>
            }
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`