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

export const UserInfo = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [WhichForm, setWhichForm] = useState("Login"); // 切換 登入、忘記密碼、設定登入密碼 表單
    const [SendedAuthCode, setSendedAuthCode] = useState(false); // 紀錄是否已經發送過驗證碼 (要不要顯示重新發送驗證碼)
    const [WaitSecToZero, setWaitSecToZero] = useState(true); // 控制驗證碼倒數
    const [NowTab, setNowTab] = useState("車行公告"); // 目前公告頁面
    const [BasicInf, setBasicInf] = useState([]); // 用戶基本資料
    const [CaseInf, setCaseInf] = useState([]); // 用戶長照資料
    const [WhiteInf, setWhiteInf] = useState([]); // 用戶白牌資料
    const [BusInf, setBusInf] = useState([]); // 用戶巴士資料
    // const [UserTypeInf, setUserTypeInf] = useState([]); // 用戶所有身分
    const [Width, Height] = useWindowSize();

    let history = useHistory();


    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("UserInfoPage", "firstUseAPIgetUsers");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得用戶資料 API
    const getUsers = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("UserInfoPage", "firstUseAPIgetUsers")) || useAPI) {
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
                        console.log(PreResult)
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
                    // globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
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
                        console.log(PreResult.data.filter(X => X.isEnable === true))

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
                                                    setCaseInf(PreResult.result);
                                                    break;
                                                case "bususer":
                                                    setBusInf(PreResult.result);
                                                    break;
                                                case "selfpayuser":
                                                    setWhiteInf(PreResult.result);
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
                                        // globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
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
                    globalContextService.set("UserInfoPage", "firstUseAPIgetUsers", false);
                    //#endregion
                });
            //#endregion
        }
    }, [APIUrl, Switch])

    const [GetUsersExecute, GetUsersePending] = useAsync(getUsers, true);


    return (
        <>
            {/* laptopL、laptop 共用theme */}
            {
                1024 <= Width &&
                <LaptopL
                    BasicInf={BasicInf}
                    CaseInf={CaseInf}
                    WhiteInf={WhiteInf}
                    BusInf={BusInf}
                // WaitSecToZero={WaitSecToZero}
                // setWaitSecToZero={setWaitSecToZero}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
        </>
    )
}