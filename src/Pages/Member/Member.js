import React, { useContext, useState } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';

export const Member = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [CheckDetail, setCheckDetail] = useState({}); // 詳細資料
    const [NowTab, setNowTab] = useState("成員介紹"); // 目前公告頁面
    const [Width, Height] = useWindowSize();

    return (
        <>
            {/* 共用theme */}
            {
                1024 <= Width &&
                <LaptopL
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
                    NowTab={NowTab}
                    setNowTab={setNowTab}
                    CheckDetail={CheckDetail}
                    setCheckDetail={setCheckDetail}
                />
            }
        </>
    )
}