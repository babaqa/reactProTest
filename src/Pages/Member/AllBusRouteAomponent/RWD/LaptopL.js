import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { DateTimePicker, Upload, BasicContainer, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable, NativeLineButton } from '../../../../Components';
import { isEqual, isNil, isUndefined, toString } from 'lodash';
import { ReactComponent as Check } from '../../../../Assets/img/BusRoutePage/Check.svg'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { member: { component: { allBusRouteComponent: { rwd: { laptopL } } } } } } = Theme;
    const [Width, Height] = useWindowSize();

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    // let props.CheckDetail?.serviceTime = "每週一至週五行駛，每日營運4班次。去程：8時、15時；返程：9時、16時。遇天候不佳或其他因素視情況停駛。";
    let serviceTime = "每週一至週五行駛。採 預約制；遇天候不佳或其他因素視情況停駛。";
    let history = useHistory()
    // console.log(props?.CheckDetail?.routeName);
    return (
        <>
            {isUndefined(props?.CheckDetail?.routeName)
                ?
                <Container>
                    {
                        (props?.data ?? []).map(item => {
                            return (
                                <>

                                    {/* 卡片外側容器 */}
                                    <SubContainer
                                        theme={laptopL.outsideContainer}
                                    >
                                        {/* 卡片容器 */}
                                        <BasicContainer
                                            theme={laptopL.cardContainer}
                                        >

                                            {/* 圖片 */}
                                            {/* <Upload
                                                viewType
                                                imageUrl={img[item]}
                                                onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                                                    globalContextService.set("CarsEditPage", "CarPic", info?.file?.originFileObj)
                                                }}
                                                theme={laptopL.carImgUpload}
                                            /> */}
                                            <BasicContainer theme={laptopL.carImgUpload}>
                                                {props.dataDetail.filter(d => d.routeName === item)?.[0].pic}
                                            </BasicContainer>

                                            {/* 路線名稱 */}
                                            <Text
                                                theme={laptopL.routeName}
                                                onClick={() => {
                                                    props.setCheckDetail(props.dataDetail?.filter(d => d.routeName === item)?.[0])
                                                }}
                                            >
                                                <Check style={laptopL.checkSvg} />
                                                {item}
                                            </Text>

                                            {/* 查看時刻表及站點資訊 */}
                                            {/* <Text
                                                theme={laptopL.checkTime}
                                                onClick={() => {
                                                    console.log("hi")
                                                }}
                                            >
                                                <Check style={laptopL.checkSvg} />
                                            查看時刻表及站點資訊
                                        </Text> */}

                                        </BasicContainer>
                                    </SubContainer>
                                </>
                            )
                        })
                    }
                </Container>
                :
                // {/* 路線詳細資訊容器 */ }
                < Container
                    height={Height}
                    theme={laptopL.detailContainer}
                >
                    {/* 路線詳細資訊卡片容器 */}
                    <BasicContainer
                        theme={laptopL.detailCardContainer}
                    >
                        {/* 詳細資料 路線名稱 */}
                        <Text
                            theme={laptopL.detailRouteName}
                        >
                            {props.CheckDetail?.routeName}
                        </Text>

                        {/* 詳細資料 資料容器 */}
                        <SubContainer
                            theme={laptopL.detailDataContainer}
                        >
                            {/* 詳細資料 營運里程 標題 */}
                            <Text
                                theme={laptopL.detailDataTitle}
                            >
                                營運里程：

                                {/* 詳細資料 營運里程 內文 */}
                                <Text
                                    theme={laptopL.detailDataText}
                                >
                                    {"每班次營運里程約 "}
                                    {
                                        <Text
                                            theme={laptopL.pointText}
                                        >
                                            {props.CheckDetail?.totalMileage}
                                            {" 公里"}
                                        </Text>}
                                    {"，約 "}
                                    {
                                        <Text
                                            theme={laptopL.pointText}
                                        >
                                            {props.CheckDetail?.expectedMinute}
                                            {" 分"}
                                        </Text>
                                    }。
                                </Text>
                            </Text>
                            {props.CheckDetail?.goDataText ?
                                <>
                                    {/* 詳細資料 去程 標題 */}
                                    <Text
                                        theme={laptopL.detailDataTitle}
                                    >
                                        去程：

                                    {/* 詳細資料 去程 內文 */}
                                        <Text
                                            theme={laptopL.detailDataText}
                                        >
                                            {props.CheckDetail?.goDataText}
                                        </Text>
                                    </Text>

                                    {/* 詳細資料 回程 標題 */}
                                    <Text
                                        theme={laptopL.detailDataTitle}
                                    >
                                        回程：

                                    {/* 詳細資料 回程 內文 */}
                                        <Text
                                            theme={laptopL.detailDataText}
                                        >
                                            {props.CheckDetail?.backDataText}
                                        </Text>
                                    </Text>
                                    {/* 詳細資料 營運時間 標題 */}
                                    <Text
                                        theme={laptopL.detailDataTitle}
                                    >
                                        營運時間：

                                    {/* 詳細資料 營運時間 內文 */}
                                        <Text
                                            theme={laptopL.detailDataText}
                                        >
                                            {props.CheckDetail?.serviceTime}
                                            {/* {props.CheckDetail?.serviceTime.split('去程：').length > 1
                                        &&
                                        <>
                                            {props.CheckDetail?.serviceTime.split('去程：')[0]}
                                            去程：
                                            <Text
                                                theme={laptopL.pointText}
                                            >
                                                {props.CheckDetail?.serviceTime.split('去程：')[1].split('；')[0]}
                                            </Text>
                                            ；回程：
                                            <Text
                                                theme={laptopL.pointText}
                                            >
                                                {props.CheckDetail?.serviceTime.split('返程：')[1].split('。')[0]}
                                            </Text>
                                            。
                                            {props.CheckDetail?.serviceTime.split('返程：')[1].split('。')[1]}
                                        </>
                                    }

                                    {props.CheckDetail?.serviceTime.split('預約制').length > 1
                                        &&
                                        <>
                                            {props.CheckDetail?.serviceTime.split('預約制')[0]}
                                            <Text
                                                theme={laptopL.pointText}
                                            >
                                                預約制
                                            </Text>
                                            {props.CheckDetail?.serviceTime.split('預約制')[1]}
                                        </>
                                    } */}
                                        </Text>
                                    </Text>
                                </>
                                :
                                <>
                                    {/* 詳細資料 營運天數及時間： 標題 */}
                                    <Text
                                        theme={laptopL.detailDataTitle}
                                    >
                                        營運天數及時間：

                                    {/* 詳細資料 營運天數及時間： 內文 */}
                                        <Text
                                            theme={laptopL.detailDataText}
                                        >
                                            {props.CheckDetail?.serviceTime}

                                        </Text>
                                    </Text>
                                    {/* 詳細資料 營運路線 標題 */}
                                    <Text
                                        theme={laptopL.detailDataTitle}
                                    >
                                        營運路線：

                                    {/* 詳細資料 營運路線 內文 */}
                                        <Text
                                            theme={laptopL.detailDataText}
                                        >
                                            {props.CheckDetail?.dataText}
                                        </Text>
                                    </Text>
                                </>
                            }

                        </SubContainer>

                        {/* 詳細資料 圖片 */}
                        {/* <Upload
                            viewType
                            imageUrl={undefined}
                            onChange={(info, acceptFileType, imageUrl, OnInitial) => {
                                globalContextService.set("CarsEditPage", "CarPic", info?.file?.originFileObj)
                            }}
                            theme={laptopL.detailImg}
                        /> */}
                        <BasicContainer>
                            {props.CheckDetail?.pic}
                        </BasicContainer>

                    </BasicContainer>

                    {/*  回列表按鈕 (標題列右方) 容器 */}
                    <SubContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptopL.returnContainer}
                    >
                        {/* 回列表按鈕 */}
                        <NativeLineButton
                            baseDefaultTheme={"DefaultTheme"}
                            disable={false}
                            type="button" // 防止提交
                            theme={laptopL.returnButton}
                            onClick={() => {
                                props.setCheckDetail({})
                            }}
                        >
                            回列表
                        </NativeLineButton>
                    </SubContainer>

                </Container>

            }
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`