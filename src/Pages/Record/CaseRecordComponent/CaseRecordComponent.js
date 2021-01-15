import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const CaseRecordComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [Client, setClient] = useState(true); // 本日行程一覽 展開
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開

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

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        console.log(type)
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("CaseCallCarComponentPage");
                //#endregion
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            // console.log(location, action, "路由變化")
            globalContextService.remove("CaseCallCarComponentPage", "firstUseAPIgetClient");
            globalContextService.remove("CaseCallCarComponentPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    UserId={urlParams.get("userId")}
                    UserName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    data={data}
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}

                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    UserName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    data={data}
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}

                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    UserName={urlParams.get("caseName")}
                    Client={Client} // 客戶端用戶的基本資料
                    data={data}
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}

                    controllGCS={controllGCS}
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