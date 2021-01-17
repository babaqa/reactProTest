import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';

export const SystemNewsComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);

    const [Width, Height] = useWindowSize();
    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    // console.log(props.type)

    const data =
        [
            { id: "1", identity: "1", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "2", identity: "2", date: "2018-04-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "3", identity: "3", date: "2018-05-12", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "4", identity: "2", date: "2018-03-22", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "5", identity: "2", date: "2018-06-01", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "6", identity: "3", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "7", identity: "1", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "8", identity: "2", date: "2018-06-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "9", identity: "1", date: "2018-02-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "10", identity: "1", date: "2018-05-06", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
            { id: "11", identity: "2", date: "2018-05-02", announce: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。" },
        ];


    return (
        <>
            {
                768 <= Width &&
                <LaptopL
                    AllNews={props.AllNews} // 類別下所有最新消息
                    GetNewsTypeExecute={props.GetNewsTypeExecute} // 選單更新值調用，取得特定類別所有最新消
                />
            }
            {/* {
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
            } */}
            {
                Width < 768 &&
                <MobileM
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    data={data}
                />
            }
        </>
    )
}