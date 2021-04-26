import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import isUndefined from 'lodash/isUndefined';

export const Application = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    const [NowTab, setNowTab] = useState(""); // 目前預約訂車頁面
    const [Application1, setApplication1] = useState([]);
    const [Application2, setApplication2] = useState([]);
    const [Application3, setApplication3] = useState([]);
    const [Width, Height] = useWindowSize();

    useEffect(() => {
        setNowTab(urlParams.get("subTab"));
    }, [urlParams.get("subTab")])

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("ApplicationPage");
            // globalContextService.remove("ApplicationPage", "firstUseAPIgetQuestionA");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("ApplicationPage");
                //#endregion
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region 取得 檔案應用 API
    const getApplication = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("ApplicationPage", "firstUseAPIgetApplication")) || useAPI) {
            //#endregion

            //#region 取得 檔案應用 API
            fetch(`${APIUrl}FileApplications/Load`,
                {
                    headers: {
                        // "X-Token": getParseItemLocalStorage("Auth"),
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
                        // 成功取得 檔案應用

                        // 相關法令規章
                        setApplication1(PreResult.data.filter(item => item.typeId === "1"));
                        // 本校檔案應用申請
                        setApplication2(PreResult.data.filter(item => item.typeId === "2"));
                        // 加值應用
                        setApplication3(PreResult.data.filter(item => item.typeId === "3"));

                    }
                    else {
                        throw PreResult;
                    }
                })
                .catch((Error) => {
                    // modalsService.infoModal.warn({
                    //     iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                    //     yes: true,
                    //     yesText: "確認",
                    //     // no: true,
                    //     // autoClose: true,
                    //     backgroundClose: false,
                    //     yesOnClick: (e, close) => {
                    //         if (Error.code === 401) {
                    //             clearSession();
                    //             clearLocalStorage();
                    //             globalContextService.clear();
                    //             Switch();
                    //         }
                    //         close();
                    //     }
                    // })
                    throw Error.message;
                })
                .finally(() => {
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("ApplicationPage", "firstUseAPIgetApplication", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetApplicationExecute, GetApplicationPending] = useAsync(getApplication, true);
    //#endregion 

    return (
        <>
            {/* laptopL、laptop、tablet 共用theme */}
            {
                1024 <= Width &&
                <LaptopL
                    NowTab={NowTab}
                    setNowTab={setNowTab}

                    controllGCS={controllGCS}

                    Application1={Application1} // 相關法令規章
                    Application2={Application2} // 本校檔案應用申請
                    Application3={Application3} // 加值應用
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {/* {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                Width < 1024 &&
                <MobileM
                    NowTab={NowTab}
                    setNowTab={setNowTab}

                    controllGCS={controllGCS}

                    Application1={Application1} // 相關法令規章
                    Application2={Application2} // 本校檔案應用申請
                    Application3={Application3} // 加值應用
                />
            }
        </>
    )
}