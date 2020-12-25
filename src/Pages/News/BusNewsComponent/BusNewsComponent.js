import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';

export const BusNewsComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);

    const [Width, Height] = useWindowSize();

    const data =
        [
            // { id: "1", identity: "1", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "2", identity: "2", date: "2018-04-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "3", identity: "3", date: "2018-05-12", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "4", identity: "2", date: "2018-03-22", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "5", identity: "2", date: "2018-06-01", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "6", identity: "3", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "7", identity: "1", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "8", identity: "2", date: "2018-06-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "9", identity: "1", date: "2018-02-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "10", identity: "1", date: "2018-05-06", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            // { id: "11", identity: "2", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
        ];

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":

                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("BusNewsComponentPage");
                //#endregion

                //#region 清除上一頁的勾選項
                globalContextService.remove("BusNewsComponentPage", "CheckedRowKeys");
                globalContextService.remove("BusNewsComponentPage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("BusNewsComponentPage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("BusNewsComponentPage", item);
                    }
                })
                //#endregion
                //#endregion
                if (payload === "API") {
                    globalContextService.remove("BusNewsComponentPage", "CheckedRowKeys");
                    globalContextService.remove("BusNewsComponentPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Save":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("BusNewsComponentPage");
                //#endregion

                //#region 清除上一頁的勾選項
                globalContextService.remove("BusNewsComponentPage", "CheckedRowKeys");
                globalContextService.remove("BusNewsComponentPage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("BusNewsComponentPage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("BusNewsComponentPage", item);
                    }
                })
                //#endregion
                //#endregion
                if (payload === "API") {
                    globalContextService.remove("BusNewsComponentPage", "CheckedRowKeys");
                    globalContextService.remove("BusNewsComponentPage", "CheckedRowsData");
                }
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
            globalContextService.remove("BusNewsComponentPage", "firstUseAPIgetCarType");
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
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}