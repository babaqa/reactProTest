import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useHistory, useLocation } from 'react-router-dom';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { useAsync } from '../../SelfHooks/useAsync';
import { clearSession, clearLocalStorage, getParseItemLocalStorage } from '../../Handlers';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';
import { allCaseListMapping } from '../../Mappings/Mappings';

export const LawsAndRegulations = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [CaseRecord, setCaseRecord] = useState([]); // 長照搭乘紀錄
    const [WhiteRecord, setWhiteRecord] = useState([]); // 共享車隊搭乘紀錄
    const [BusRecord, setBusRecord] = useState([]); // 巴士搭乘紀錄
    // const [RemoteCithRecord, setRemoteCithRecord] = useState([]); // 偏鄉搭乘紀錄
    // const [DayCareRecord, setDayCareRecord] = useState([]); // 日照搭乘紀錄
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    const [NowTab, setNowTab] = useState(""); // 目前搭乘紀錄頁面
    const [AllTabs, setAllTabs] = useState([]); // 用戶身分頁面
    const [LawsType1, setLawsType1] = useState([]); // 本校法規
    const [LawsType2, setLawsType2] = useState([]); // 文書檔案相關法規
    const [Width, Height] = useWindowSize();

    let history = useHistory();

    useEffect(() => {
        setNowTab(urlParams.get("subTab"));
    }, [urlParams.get("subTab")])

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("LawsAndRegulationsPage", "firstUseAPIgetFileApp");
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
            //console.log(location, action)
            globalContextService.remove("LawsAndRegulationsPage", "firstUseAPIgetFileApp");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    //#region 取得 法令規章 API
    const getFileApp = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("LawsAndRegulationsPage", "firstUseAPIgetFileApp")) || useAPI) {
            //#endregion

            //#region 取得 法令規章 API
            fetch(`${APIUrl}Decrees/Load`,
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
                        // 成功取得 法令規章 

                        //本校法規
                        setLawsType1(PreResult.data.filter(item => item.typeId === "1"));

                        //文書檔案相關法規
                        setLawsType2(PreResult.data.filter(item => item.typeId === "2"));

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
                    globalContextService.set("LawsAndRegulationsPage", "firstUseAPIgetFileApp", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetFileAppExecute, GetFileAppPending] = useAsync(getFileApp, true);
    //#endregion 

    return (
        <>
            {
                1024 <= Width &&
                <LaptopL
                    CaseRecord={CaseRecord} // 長照搭乘紀錄
                    WhiteRecord={WhiteRecord} // 共享車隊搭乘紀錄
                    BusRecord={BusRecord}  // 巴士搭乘紀錄
                    NowTab={NowTab}  // 目前搭乘紀錄頁面
                    // GetRecordsExecute={GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    // GetRecordsPending={GetRecordsPending}
                    setNowTab={setNowTab} // 設定目前搭乘紀錄葉面
                    AllTabs={AllTabs} // 用戶身分頁面

                    LawsType1={LawsType1}
                    LawsType2={LawsType2}
                    GetFileAppExecute={GetFileAppExecute}
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
                    NowTab={NowTab}  // 目前頁面
                    setNowTab={setNowTab} // 設定目前頁面

                    LawsType1={LawsType1}
                    LawsType2={LawsType2}
                    GetFileAppExecute={GetFileAppExecute}

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}