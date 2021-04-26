import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';

export const Unit = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [NowTab, setNowTab] = useState("單位介紹"); // 目前公告頁面
    const [Unit, setUnit] = useState([]); // 單位介紹
    const [Width, Height] = useWindowSize();

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("UinitPage", "firstUseAPIgetUnit");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得單位介紹API
    const getUnit = useCallback(async (useAPI = false, newsCategoryId = "", releaseDate = fmt(moment(), "YYYY-MM")) => {

        let defaultLoad;
        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("UnitPage", "firstUseAPIgetUnit")) || useAPI) {
            //#endregion

            if (!useAPI) {
                // 代表初次調用
                //#region 取得單位介紹 API
                fetch(`${APIUrl}GenericContents/Get?id=6781646802071887872`, //GenericContents/Get?id=6781646802071887872
                    {
                        headers: {
                            "X-Token": getParseItemLocalStorage("Auth"),
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
                            // 成功取得單位介紹
                            setUnit(PreResult.result);
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
                        // globalContextService.set("UnitPage", "firstUseAPIgetUnit", false);
                        //#endregion
                    });
                //#endregion
            }
        }
    }, [APIUrl, Switch])

    const [GetUnitTypeExecute, GetUnitTypePending] = useAsync(getUnit, true);
    //#endregion

    return (
        <>
            {
                1024 <= Width &&
                <LaptopL
                    NowTab={NowTab} // 目前公告頁面
                    setNowTab={setNowTab} // 設定目前公告頁面
                    Unit={Unit} // 單位介紹
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
                Width < 1024 &&
                <MobileM
                    NowTab={NowTab} // 目前公告頁面
                    setNowTab={setNowTab} // 設定目前公告頁面
                    Unit={Unit} // 單位介紹
                />
            }
        </>
    )
}