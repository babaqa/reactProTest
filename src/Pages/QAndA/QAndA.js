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

export const QAndA = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [WhichForm, setWhichForm] = useState("Login"); // 切換 登入、忘記密碼、設定登入密碼 表單
    const [SendedAuthCode, setSendedAuthCode] = useState(false); // 紀錄是否已經發送過驗證碼 (要不要顯示重新發送驗證碼)
    const [WaitSecToZero, setWaitSecToZero] = useState(true); // 控制驗證碼倒數
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    const [NowTab, setNowTab] = useState(""); // 目前公告頁面
    const [QuestionA1, setQuestionA1] = useState([]); // 文書相關檔案QA(表單申請下載)
    const [QuestionA2, setQuestionA2] = useState([]); // 文書相關檔案QA(文書常見問題)
    const [Width, Height] = useWindowSize();

    useEffect(() => {
        setNowTab(urlParams.get("subTab"));
    }, [urlParams.get("subTab")])

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("QAndAPage");
            // globalContextService.remove("QAndAPage", "firstUseAPIgetQuestionA");
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
                globalContextService.remove("QAndAPage");
                //#endregion
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region 取得 檔案下載(文書檔案相關QA) API
    const getQuestionA = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("QAndAPage", "firstUseAPIgetQuestionA")) || useAPI) {
            //#endregion

            //#region 取得 檔案下載(文書檔案相關QA) API
            fetch(`${APIUrl}QuestionA/Load`,
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
                        // 成功取得 檔案下載(文書檔案相關QA) 

                        //文書檔案相關QA
                        setQuestionA1(PreResult.data.filter(item => item.typeId === "1"));
                        setQuestionA2(PreResult.data.filter(item => item.typeId === "2"));

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
                    globalContextService.set("QAndAPage", "firstUseAPIgetQuestionA", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetQuestionAExecute, GetQuestionAPending] = useAsync(getQuestionA, true);
    //#endregion 

    return (
        <>
            {/* 共用theme */}
            {
                1024 <= Width &&
                <LaptopL
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    NowTab={NowTab}
                    setNowTab={setNowTab}

                    controllGCS={controllGCS}

                    QuestionA1={QuestionA1} // 文書相關檔案QA(表單申請下載)
                    QuestionA2={QuestionA2} // 文書相關檔案QA(文書常見問題)
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
            }
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
            } */}
            {
                Width < 1024 &&
                <MobileM
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    NowTab={NowTab}
                    setNowTab={setNowTab}

                    controllGCS={controllGCS}
                    QuestionA1={QuestionA1} // 文書相關檔案QA(表單申請下載)
                    QuestionA2={QuestionA2} // 文書相關檔案QA(文書常見問題)
                />
            }
        </>
    )
}