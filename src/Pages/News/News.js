import React, { useContext, useState } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';

export const News = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [NowTab, setNowTab] = useState("系統公告"); // 目前公告頁面
    const [Width, Height] = useWindowSize();

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
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
            }
            {
                Width < 768 &&
                <MobileM
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
        </>
    )
}