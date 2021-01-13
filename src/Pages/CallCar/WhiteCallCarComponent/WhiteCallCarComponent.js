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
import { mapGoogleControll } from '../../../ProjectComponent';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';

export const WhiteCallCarComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [AllCarType, setAllCarType] = useState([]); // 本日行程一覽 展開
    const [TodayToDoOpen, setTodayToDoOpen] = useState(true); // 本日行程一覽 展開

    const [Width, Height] = useWindowSize();

    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    const [WhiteOrderAmt, setWhiteOrderAmt] = useState(
        [
            { id: "1", type: "去程" },
            { id: "2", type: "回程" },
        ]
    ); // 訂單金額資訊
    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":

                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("WhiteCallCarComponentPage");
                //#endregion

                //#region 清除上一頁的勾選項
                globalContextService.remove("CasePage", "CheckedRowKeys");
                globalContextService.remove("CasePage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("CasePage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("CasePage", item);
                    }
                })
                //#endregion
                //#endregion
                if (payload === "API") {
                    globalContextService.remove("WhiteCallCarComponentPage", "CheckedRowKeys");
                    globalContextService.remove("WhiteCallCarComponentPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Save":
                //#region 當點擊 立即預約 按鈕時，要清除的資料
                globalContextService.remove("WhiteCallCarComponentPage");
                //#endregion

                //#region 清除上一頁的勾選項
                globalContextService.remove("CasePage", "CheckedRowKeys");
                globalContextService.remove("CasePage", "CheckedRowsData");
                //#region Table內 身份下拉選單值清空
                Object.keys(globalContextService.get("CasePage") ?? {}).forEach((item, index) => {
                    if (item.includes("CaseList_")) {
                        globalContextService.remove("CasePage", item);
                    }
                })
                //#endregion
                //#endregion
                if (payload === "API") {
                    globalContextService.remove("WhiteCallCarComponentPage", "CheckedRowKeys");
                    globalContextService.remove("WhiteCallCarComponentPage", "CheckedRowsData");
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
            globalContextService.remove("WhiteCallCarComponentPage", "firstUseAPIgetCarType");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 車種下拉選單選項 API
    const getCarType = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("WhiteCallCarComponentPage", "firstUseAPIgetCarType")) || useAPI) {
            //#endregion

            //#region 取得 車種下拉選單選項 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_CAR`, // categorys/load?page=1&limit=99999&TypeId=SYS_CAR
                // 注意!! 目前尚未提供查詢管理單位API，可能因為權限而取不到值，所以目前這裡一律寫死A單位 orgId，直到未來提供新的查詢API
                {
                    headers: {
                        "X-Token": getParseItemLocalStorage("CAuth"),
                        "content-type": "application/json; charset=utf-8",
                    },
                    method: "GET"
                })
                .then(Result => {
                    const ResultJson = Result.clone().json();//Respone.clone()
                    return ResultJson;
                })
                .then((PreResult) => {

                    if (PreResult.code === 200) {
                        // 成功取得 車種下拉選單選項 
                        // console.log(PreResult.data);
                        setAllCarType(PreResult.data
                            .map(item => ({ value: item.id, label: item.name }))
                        );
                    }
                    else {
                        throw PreResult;
                    }
                })
                .catch((Error) => {
                    modalsService.infoModal.warn({
                        iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                        yes: true,
                        yesText: "確認",
                        // no: true,
                        // autoClose: true,
                        backgroundClose: false,
                        yesOnClick: (e, close) => {
                            if (Error.code === 401) {
                                clearSession();
                                clearLocalStorage();
                                globalContextService.clear();
                                Switch();
                            }
                            close();
                        }
                    })
                    throw Error.message;
                })
                .finally(() => {
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("WhiteCallCarComponentPage", "firstUseAPIgetCarType", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetCarTypeExecute, GetCarTypePending] = useAsync(getCarType, true);
    //#endregion

    //#region 新增、編輯客戶端用戶 API 
    const addOrderOfSelfPayUsers = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增、編輯客戶端用戶 API 
        fetch(`${APIUrl}orderOfSelfPayUsers/add`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("CAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addOrUpdateRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功新增、編輯客戶端用戶 API 
                    // console.log(PreResult.data)
                    if (addOrUpdateRowdata?.isLastOrder) {
                        history.push("/Case");
                        controllGCS("Save", "API");
                    }
                }
                else {
                    throw PreResult;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: false,
                    yesOnClick: (e, close) => {
                        if (Error.code === 401) {
                            clearSession();
                            clearLocalStorage();
                            globalContextService.clear();
                            Switch();
                        }
                        close();
                    }
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    const [AddOrderOfSelfPayUsersExecute, AddOrderOfSelfPayUsersPending] = useAsync(addOrderOfSelfPayUsers, false);
    //#endregion 


    //#region 取得 Polyline 加密路線字串 API
    const getPolylineRoute = useCallback(async (addrData) => {

        // console.log(updateRowdata)
        //#region 取得 Polyline 加密路線字串 API
        fetch(`${APIUrl}Maps/Route`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("Auth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addrData })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 取得 Polyline 加密路線字串 API
                    // console.log(PreResult.data)
                    // controllGCS("UpdateWealType", "API");
                    mapGoogleControll.addPolylineRoute(addrData?.mapId, PreResult?.result?.polyLine, addrData?.routeAttr)
                }
                else {
                    throw PreResult;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: false,
                    yesOnClick: (e, close) => {
                        if (Error.code === 401) {
                            clearSession();
                            clearLocalStorage();
                            globalContextService.clear();
                            Switch();
                        }
                        close();
                    }
                    // theme: {
                    //     yesButton: {
                    //         text: {
                    //             basic: (style, props) => {
                    //                 console.log(style)
                    //                 return {
                    //                     ...style,
                    //                     color: "red"
                    //                 }
                    //             },
                    //         }
                    //     }
                    // }
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    const [GetPolylineRouteExecute, GetPolylineRoutePending] = useAsync(getPolylineRoute, false);
    //#endregion 

    return (
        <>
            {
                768 <= Width &&
                <LaptopL
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    AllCarType={AllCarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}
                    controllGCS={controllGCS}

                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    AllCarType={AllCarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}
                    controllGCS={controllGCS}

                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    AllCarType={AllCarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}

                    controllGCS={controllGCS}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    AllCarType={AllCarType} // 車種
                    WhiteOrderAmt={WhiteOrderAmt} // 訂單金額資訊
                    TodayToDoOpen={TodayToDoOpen}
                    setTodayToDoOpen={setTodayToDoOpen}
                    AddOrderOfSelfPayUsersPending={AddOrderOfSelfPayUsersPending}
                    AddOrderOfSelfPayUsersExecute={AddOrderOfSelfPayUsersExecute}
                    GetPolylineRouteExecute={GetPolylineRouteExecute}

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}