import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { useAsync } from '../../SelfHooks/useAsync';
import isUndefined from 'lodash/isUndefined';
import { clearLocalStorage, clearSession, getParseItemLocalStorage } from '../../Handlers';
import { useHistory } from 'react-router';

export const Member = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [CheckDetail, setCheckDetail] = useState({}); // 詳細資料
    const [NowTab, setNowTab] = useState("成員介紹"); // 目前公告頁面
    const [Member, setMember] = useState([]); // 成員介紹
    const [Width, Height] = useWindowSize();

    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("MemberPage", "firstUseAPIgetMember");
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
            globalContextService.remove("MemberPage", "firstUseAPIgetMember");
        });

        return () => {
            historyUnlisten();
            globalContextService.remove("MemberPage")
        }
    }, [])
    //#endregion

    //#region 取得 成員介紹 API
    const getMember = useCallback(async (useAPI = false) => {

        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("MemberPage", "firstUseAPIgetMember")) || useAPI) {
            //#endregion

            //#region 取得 成員介紹 API
            fetch(`${APIUrl}Members/Load`,
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
                        // 成功取得 成員介紹 
                        // console.log(PreResult);
                        setMember(PreResult.data)
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
                    globalContextService.set("MemberPage", "firstUseAPIgetMember", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetMemberExecute, GetMemberPending] = useAsync(getMember, true);
    //#endregion 

    return (
        <>
            {/* 共用theme */}
            {
                1024 <= Width &&
                <LaptopL
                    Member={Member}

                    NowTab={NowTab}
                    setNowTab={setNowTab}
                    CheckDetail={CheckDetail}
                    setCheckDetail={setCheckDetail}
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
                    Member={Member}

                    NowTab={NowTab}
                    setNowTab={setNowTab}
                    CheckDetail={CheckDetail}
                    setCheckDetail={setCheckDetail}

                    controllGCS={controllGCS}
                />
            }
        </>
    )
}