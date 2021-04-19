import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as GreenLine } from '../../../Assets/img/BusRoutePage/GreenLine.svg'
import { ReactComponent as BlueLine } from '../../../Assets/img/BusRoutePage/BlueLine.svg'
import { ReactComponent as OrangeLine } from '../../../Assets/img/BusRoutePage/OrangeLine.svg'
import { ReactComponent as RedLine } from '../../../Assets/img/BusRoutePage/RedLine.svg'
import { ReactComponent as Line5 } from '../../../Assets/img/BusRoutePage/Line5.svg'
import { ReactComponent as Line6 } from '../../../Assets/img/BusRoutePage/Line6.svg'
import { ReactComponent as Line7 } from '../../../Assets/img/BusRoutePage/Line7.svg'
import { ReactComponent as Line8 } from '../../../Assets/img/BusRoutePage/Line8.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { AllBusRouteAomponent } from '../AllBusRouteAomponent/AllBusRouteAomponent'
import { ScrollBar } from '../../../Components/ScrollBar/ScrollBar';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { member: { rwd: { mobileM } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const data = [
        { township: "滿州鄉", routeName: ["綠線(龍口線)", "橘線(龍爪線)", "高士四林線", "旭海南線"] },
        { township: "牡丹鄉", routeName: ["藍線(龍脊線)", "紅線(龍尾線)", "牡丹東源線"] },
        { township: "貴州鄉", routeName: ["旭海北線"] },
    ]

    const dataDetail = [
        { routeName: "綠線(龍口線)", pic: <GreenLine style={mobileM.mapPic} />, totalMileage: 33.9, expectedMinute: 51, goDataText: "滿州鄉公所、分水嶺社區、三灣、南仁港、片埔路口、中山港。", backDataText: "中山港、片埔路口、南仁港、三灣、分水嶺社區、滿州鄉公所。 ", serviceTime: <Text theme={mobileM.detailDataText}>每週一至週五行駛，每日營運4班次。去程：<Text theme={mobileM.pointText}>8時、15時</Text>；返程：<Text theme={mobileM.pointText}>9時、16時</Text>。遇天候不佳或其他因素視情況停駛。</Text> },
        { routeName: "藍線(龍脊線)", pic: <BlueLine style={mobileM.mapPic} />, totalMileage: 14.05, expectedMinute: 40, goDataText: "滿州鄉公所、小路部落、長樂文健站。", backDataText: "長樂國小、響林村（福德路口）、滿州鄉公所。", serviceTime: <Text theme={mobileM.detailDataText}>每週一至週五行駛。採 <Text theme={mobileM.pointText}>預約制</Text>；遇天候不佳或其他因素視情況停駛。</Text> },
        { routeName: "橘線(龍爪線)", pic: <OrangeLine style={mobileM.mapPic} />, totalMileage: 25.7, expectedMinute: 44, goDataText: "滿州鄉公所、里德文健站、欖仁部落、七孔瀑布、呆風、吊橋、興海路。", backDataText: "興海路、吊橋、呆風、七孔瀑布、欖仁部落、里德文健站、滿州鄉公所。", serviceTime: <Text theme={mobileM.detailDataText}>每週一至週五行駛。採 <Text theme={mobileM.pointText}>預約制</Text>；遇天候不佳或其他因素視情況停駛。</Text> },
        { routeName: "紅線(龍尾線)", pic: <RedLine style={mobileM.mapPic} />, totalMileage: 12.9, expectedMinute: 21, goDataText: "滿州鄉公所、恆春旅遊醫院、恆春南門醫院、恆春基督教醫院。", backDataText: "恆春基督教醫院、恆春南門醫院、恆春旅遊醫院、恆春市場、滿州鄉公所。", serviceTime: <Text theme={mobileM.detailDataText}>每週一至週五行駛，每日營運4班次，去程：<Text theme={mobileM.pointText}>10時、14時</Text>；返程：<Text theme={mobileM.pointText}>10時30分、14時30分</Text>。遇天候不佳或其他因素視情況停駛。</Text> },
        { routeName: "高士四林線", pic: <Line5 style={mobileM.mapPic} />, totalMileage: 51.7, expectedMinute: "1 時 39", dataText: "牡丹鄉公所→高士村→四林村→恆春基督教醫院。", serviceTime: "每天行駛2班次，每週行駛兩天。" },
        { routeName: "牡丹東源線", pic: <Line6 style={mobileM.mapPic} />, totalMileage: 51.7, expectedMinute: "1 時 21", dataText: "牡丹鄉公所→牡丹村集會所→東源村集會所→恆春基督教醫院。", serviceTime: "每天行駛2班次，每週行駛四天。" },
        { routeName: "旭海北線", pic: <Line7 style={mobileM.mapPic} />, totalMileage: 61.9, expectedMinute: "1 時 38", dataText: "牡丹鄉公所→旭海村集會所(屏199線)→恆春基督教醫院。", serviceTime: "每天行駛2班次，每週行駛兩天。" },
        { routeName: "旭海南線", pic: <Line8 style={mobileM.mapPic} />, totalMileage: 133, expectedMinute: "3 時 40", dataText: "牡丹鄉公所→旭海村集會所(台26線)→恆春基督教醫院。", serviceTime: "每天行駛2班次，每週行駛兩天。" }
    ]

    const list = ["全部路線"].concat(data.map(item => item.township));

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "全部路線": <AllBusRouteAomponent />,
                    }
                );
            case "tabArray":
            default:
                return list
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >
                            <ScrollBar
                                basedefaulttheme={"DefaultTheme"}
                                autoHide={true}
                                theme={mobileM.containerScrollBar}
                            >
                                {tabMap().map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Text
                                                onClick={() => { props.setNowTab(item) }}
                                                isActive={props.nowTab === item}
                                                theme={mobileM.titleBarBusRouteCallCarTab}
                                            >
                                                {item}
                                            </Text>
                                        </React.Fragment>
                                    )
                                })}

                            </ScrollBar>
                        </BasicContainer>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                <AllBusRouteAomponent
                    data={data.filter(X => X.township === props.nowTab || "全部路線" === props.nowTab).map(item => { return item.routeName }).flat()}
                    CheckDetail={props.CheckDetail}
                    setCheckDetail={props.setCheckDetail}
                    dataDetail={dataDetail}
                />

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`