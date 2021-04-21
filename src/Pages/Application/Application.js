import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { useLocation } from 'react-router-dom';

export const Application = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    const [NowTab, setNowTab] = useState(""); // 目前預約訂車頁面
    const [Width, Height] = useWindowSize();

    useEffect(() => {
        setNowTab(urlParams.get("subTab"));
    }, [urlParams.get("subTab")])

    return (
        <>
            {/* laptopL、laptop、tablet 共用theme */}
            {
                1024 <= Width &&
                <LaptopL
                    NowTab={NowTab}
                    setNowTab={setNowTab}
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
                />
            }
        </>
    )
}