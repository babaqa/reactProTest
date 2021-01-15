import React, { useContext, useState } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

export const FleetRecordComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;

    const [Width, Height] = useWindowSize();
    const data = [
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2021-01-19 21:30", serviceUnit: "測試交通單位", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", passenger: ["123", "王小花", "王大明"], userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2021-01-14 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", passenger: ["123", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", passenger: ["123", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-12-01 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-12-21 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2021-01-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", passenger: ["王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", userName: "王大明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "長照", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "巴士", userName: "王小明明", caseNumber: "1081213001", share: true, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "願意共乘", numberOfPeople: "10", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", passenger: ["王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明", "321", "王小花", "王大明"], userName: "王小明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
        { case: "共享車隊", userName: "王大明明", caseNumber: "1081213001", share: false, orderNumber: "TS16063797554258", bookRide: "2020-11-29 21:30", serviceUnit: "測試交通單位1測試交通單位1測試交通單位位測試交通單位1測試交通單位1測試交通單位位 text", driver: "王小明明", licensePlate: "MMM-0000", totalFareText: "480", govSubsidy: "480", accompanyingAmount: "0", canShare: "不願意共乘", numberOfPeople: "5", startPoint: "台灣新北市板橋區中山路一段161號一段161號一段161號一段161號", endPoint: "台灣新北市板橋區自由路車站前麵線肉圓", caseBurden: "123" },
    ]

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    data={data}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    data={data}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    data={data}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    data={data}
                />
            }
        </>
    )
}

