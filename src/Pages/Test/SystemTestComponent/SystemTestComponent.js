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

export const SystemTestComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);

    const [Width, Height] = useWindowSize();
    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    // console.log(props.type)

    return (
        <>
            {
                1024 <= Width &&
                <LaptopL
                    NowTab={props.NowTab} // 目前使用的頁籤資訊
                    CheckDetail={props.CheckDetail} // 詳細資料
                    setCheckDetail={props.setCheckDetail} // 設定詳細資料

                    LawsType1={props.LawsType1}
                    LawsType2={props.LawsType2}
                    GetFileAppExecute={props.GetFileAppExecute}
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
                Width < 1024 &&
                <MobileM
                    NowTab={props.NowTab} // 目前使用的頁籤資訊
                    CheckDetail={props.CheckDetail} // 詳細資料
                    setCheckDetail={props.setCheckDetail} // 設定詳細資料
                />
            }
        </>
    )
}