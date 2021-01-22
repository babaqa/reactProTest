import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { useWindowSize } from '../../SelfHooks/useWindowSize';

export const CallCar = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [BasicInf, setBasicInf] = useState({}); // 用戶基本資料
    const [CaseInf, setCaseInf] = useState({}); // 用戶長照資料
    const [WhiteInf, setWhiteInf] = useState({}); // 用戶白牌資料
    const [BusInf, setBusInf] = useState({}); // 用戶巴士資料
    const [CountryInf, setCountryInf] = useState({}); // 用戶偏鄉運能不足資料
    const [DayCareInf, setDayCareInf] = useState({}); // 用戶日照資料
    const [Quota, setQuota] = useState({}); // 用戶可用額度資料
    const [BUnits, setBUnits] = useState([]); // B單位
    const [CarType, setCarType] = useState([]); // 車種
    const [OpenWhiteModal, setOpenWhiteModal] = useState(false); // 是否開啟白牌註冊
    // const [UserTypeInf, setUserTypeInf] = useState([]); // 用戶所有身分
    const [Width, Height] = useWindowSize();

    const [NowTab, setNowTab] = useState("長照"); // 目前預約訂車頁面

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("CallCarPage", "firstUseAPIgetUsers");
            globalContextService.remove("CallCarPage")
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得用戶資料 API
    const getUsers = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("CallCarPage", "firstUseAPIgetUsers")) || useAPI) {
            //#endregion

            //#region 取得用戶基本資料 API
            fetch(`${APIUrl}Users/GetClient?id=${getParseItemLocalStorage("UserID")}`, //users/get
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
                        // 成功用戶資料 API
                        // console.log(PreResult)
                        setBasicInf(PreResult.result);
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
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    // globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                    //#endregion
                });
            //#endregion

            //#region 取得用戶所有身分 API
            fetch(`${APIUrl}Users/GetUnPermissionUserType?userId=${getParseItemLocalStorage("UserID")}`, //Users/GetUnPermissionUserType
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
                        // 成功用戶資料 API
                        // console.log(PreResult.data.filter(X => X.isEnable === true))
                        let allBunit;
                        //#region 取得所有 B單位選項 API
                        fetch(`${APIUrl}orgs/LoadOrgB`, // orgs/LoadOrgB
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
                                    // 成功取得所有 B單位選項 API 資料
                                    // console.log(PreResult)
                                    allBunit = PreResult?.result;
                                    // setAllBUnits(PreResult?.result)
                                    // controllGCS("backFromChildPage"); // 清除子頁面重新發査API的State
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
                        let CaseYet = 0;
                        let permission = PreResult.data
                            .filter(X => {
                                if (X.userType === "caseuser") {
                                    if (CaseYet === 0 && X.isEnable === true) {
                                        CaseYet = 1;
                                        return X;
                                    }
                                    else {
                                        return null
                                    }
                                }
                                else {
                                    return X.isEnable === true
                                }
                            })
                            .map(async item => {

                                //#region 取得用戶身分資料 API
                                await fetch(`${APIUrl}${item.userType}s/Get?id=${item.caseId}`, //CaseUsers/Get
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
                                            // 成功用戶資料 API
                                            console.log(item.userType, PreResult)
                                            switch (item.userType) {
                                                case "caseuser":
                                                    GetQuotasExecute(item.caseId);
                                                    setCaseInf(PreResult.result);
                                                    let hadBUnit = ["orgBId1", "orgBId2", "orgBId3"].map(item => PreResult?.result?.[item]).filter(i => i !== null)

                                                    let bUnitForCaseUser = (allBunit ?? []).filter(item => hadBUnit.includes(item?.id))
                                                    setBUnits(bUnitForCaseUser)
                                                    break;
                                                case "bususer":
                                                    setBusInf(PreResult.result);
                                                    break;
                                                case "selfpayuser":
                                                    setWhiteInf(PreResult.result);
                                                    break;
                                                case "countryside":
                                                    setCountryInf(PreResult.result);
                                                    break;
                                                case "daycare":
                                                    setDayCareInf(PreResult.result);
                                                    break;
                                                default:
                                                    break;
                                            }
                                            // setCaseInf(PreResult);
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
                                        //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                                        // globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                                        //#endregion
                                    });
                                //#endregion


                                return item;
                            })
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
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                    //#endregion
                });
            //#endregion

            //#region 取得車輛類別 API
            fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_CAR`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
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
                        // 成功取得車輛類別 API
                        // console.log(PreResult)
                        setCarType(PreResult?.data.map(d => ({ value: d?.id, label: d?.name })))

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
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    // globalContextService.set("CaseCallCarComponentPage", "firstUseAPIgetAllCars", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])


    const [GetUsersExecute, GetUsersPending] = useAsync(getUsers, true);
    //#endregion

    //#region 取得用戶可用額度資料 API
    const getQuota = useCallback(async (caseId = "") => {

        //#region 取得用戶可用額度資料 API
        fetch(`${APIUrl}CaseUserDiscounts/GetDiscountData?caseuserId=${caseId}`, //CaseUserDiscounts/GetDiscountData?caseuserId=6746156401844330496
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
                    // 成功用戶資料 API
                    // console.log(PreResult)
                    setQuota(PreResult.result);
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
                //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                // globalContextService.set("CallCarPage", "firstUseAPIgetUsers", false);
                //#endregion
            });
        //#endregion

    }, [APIUrl, Switch])


    const [GetQuotasExecute, GetQuotasPending] = useAsync(getQuota, false);
    //#endregion

    return (
        <>
            {/* 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                    BasicInf={BasicInf}
                    Quota={Quota}
                    CaseInf={CaseInf}
                    WhiteInf={WhiteInf}
                    BusInf={BusInf}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    BUnits={BUnits}
                    CarType={CarType}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    BasicInf={BasicInf}
                    Quota={Quota}
                    CaseInf={CaseInf}
                    WhiteInf={WhiteInf}
                    BusInf={BusInf}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    BUnits={BUnits}
                    CarType={CarType}
                />
            }
        </>
    )
}