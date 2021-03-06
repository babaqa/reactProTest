import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../Store/Store'
import { BUnitSort, MainPageContainer, MainPageSubTitleBar, MainPageTitleBar, MapGoogle, mapGoogleControll, MapGoogleInput } from '../../../../../ProjectComponent';
import { ReactComponent as Resize } from '../../../../../Assets/img/WhiteCallCarComponentPage/Resize.svg'
import { ReactComponent as Search } from '../../../../../Assets/img/WhiteCallCarComponentPage/Search.svg'
import { ReactComponent as Convert } from '../../../../../Assets/img/WhiteCallCarComponentPage/Convert.svg'
import { ReactComponent as StartToEnd } from '../../../../../Assets/img/WhiteCallCarComponentPage/Arrow.svg'
import { ReactComponent as UpCircle } from '../../../../../Assets/img/WhiteCallCarComponentPage/UpCircle.svg'
import { ReactComponent as End } from '../../../../../Assets/img/WhiteCallCarComponentPage/End.svg'
import { ReactComponent as Start } from '../../../../../Assets/img/WhiteCallCarComponentPage/Start.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, NewSelector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, Resizable, OldTable } from '../../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption } from '../../../../../Mappings/Mappings';
import { valid } from '../../../../../Handlers';
import { fmt } from '../../../../../Handlers/DateHandler';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { whiteCallCarComponent: { rwd: { tablet } } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // ?????????????????????

    let history = useHistory();


    //#region ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????
    const getCaseOrderAmtAPI = useCallback(() => {
        let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // ????????????
        let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // ????????????

        let validMsg = "";
        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
            validMsg = valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
        }
        else if (valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
            validMsg = valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }

        if (validMsg === "") {
            // ?????????????????????????????????????????????????????????????????? ???????????????
            props.GetCaseOrderAmtExecute({
                CaseUserId: props.CaseUserId,
                FromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"),
                // FromAddrId:, // ?????????
                ToAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"),
                FamilyWith: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value,
                // ToAddrId:, // ?????????
                ReservationDate: globalContextService.get("WhiteCallCarComponentPage", "TravelDate") + " " + globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), // ????????????+????????????	???: "2020-11-25 17:45"
            })
        }

    }, [])
    //#endregion

    //#region ????????????????????????????????? ?????????????????????
    const formValid = useCallback(() => {
        //#region ????????????
        let validMsg = "";

        if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["???????????????????????????????????????????????????B??????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "BUnitSort")?.[0]?.id ?? "", ["^.{1,}$"], ["???????????????????????????????????????????????????B??????"])[1]
        }
        // ?????? ???????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????  
        // PS.???????????? ????????????????????? ??? onSelect?????????onChange?????????onSelect????????????????????????????????????onSelect??????
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
        //     validMsg = "???????????????????????????"
        // }        
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
        }
        else if (valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]) {
            validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]
        }
        //#endregion

        return validMsg;

    }, [])
    //#endregion

    return (
        <>
            {/* ????????????????????? */}
            <BasicContainer
                theme={tablet.mapContainer}
            >
                <MapGoogle
                    mapId={"test1"}
                    mapAttr={{
                        //   maxBounds: [[105, 15], [138.45858, 33.4]], // ??????????????????
                        center: { lat: 25.012930, lng: 121.474708 }, // ?????????????????????????????? [lng, lat]  // 25.012930, 121.474708
                        zoom: 16, // ?????? ZOOM LEVEL; [0-20, 0 ????????? (???), 20 ;?????? (???)]
                        //   minZoom: 6, // ????????????????????????????????????, ?????????, [0-19.99]
                        //   maxZoom: 19.99, // ????????????????????????????????????, ????????? [0-19.99]
                        //   pitch: 0, // ???????????????, ?????????, [0-60] // default 50
                        //   bearing: 0, // ????????????, ?????????, [-180 ~ 180; 0 ???????????????, 180 ???????????????]
                        //   attributionControl: false,
                    }}

                    theme={tablet.map}
                />
            </BasicContainer>

            {/* ??????????????????????????? */}
            <Resizable
                width={"100%"}
                height={"480px"}
                maxHeight={"70vh"}
                minHeight={"280px"}
                enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                theme={tablet.resizableContainer}
            >
                {/* ????????????????????? */}
                <Resize style={tablet.resizeSvg} />

                {/* ????????????????????? */}
                <BasicContainer
                    theme={tablet.callCarFormTitleContainer}
                >

                    {/* ???????????? */}
                    <Text
                        theme={tablet.callCarFormCaseName}
                    >
                        {props?.UserName}
                    </Text>
                </BasicContainer>

                {/* ?????????????????? */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.callCarFormContainer}
                >
                    <FormRow>

                        {/* ???????????? TravelDate */}
                        <DateTimePicker
                            topLabel={<>????????????</>}
                            // type={"time"} time???date???week???month???quarter???year
                            type={"date"}
                            format={"YYYY-MM-DD"}
                            bascDefaultTheme={"DefaultTheme"}
                            // viewType
                            isSearchable
                            placeholder={""}
                            value={
                                (globalContextService.get("WhiteCallCarComponentPage", "TravelDate")) ?
                                    moment(globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), "YYYY-MM-DD HH:mm:ss")
                                    :
                                    null
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("WhiteCallCarComponentPage", "TravelDate", value);
                            }}
                            theme={tablet.travelDate}
                        />

                        {/* ???????????? TravelTime */}
                        <DateTimePicker
                            topLabel={<>????????????</>}
                            // type={"time"} time???date???week???month???quarter???year
                            type={"time"}
                            format={"HH:mm"}
                            bascDefaultTheme={"DefaultTheme"}
                            // viewType
                            isSearchable
                            placeholder={""}
                            value={
                                (globalContextService.get("WhiteCallCarComponentPage", "TravelTime")) ?
                                    moment(globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), "HH:mm")
                                    :
                                    null
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("WhiteCallCarComponentPage", "TravelTime", value);
                            }}
                            theme={tablet.travelTime}
                        />

                        {/* ???????????????????????? */}
                        {/* <BUnitSort
                            topLabel={<>???????????????????????? <Text theme={tablet.bUnitSortNote}>(???????????????????????????)</Text></>}
                            bUnit={[
                                { id: "0", name: "0XXXX??????" },
                                { id: "1", name: "1XXXX??????" },
                                { id: "2", name: "2XXXX??????" },
                                { id: "3", name: "3XXXX??????" },
                                { id: "4", name: "3XXXX??????" },
                                { id: "5", name: "3XXXX??????" },
                            ]}
                            value={globalContextService.get("WhiteCallCarComponentPage", `BUnitSort`)}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteCallCarComponentPage", `BUnitSort`, value);
                            }}
                            theme={tablet.bUnitSort}
                        /> */}
                        {/* ?????? StartPos*/}
                        <MapGoogleInput
                            placeholder={"?????????????????????(XX???XX???XX???XX???)"}
                            placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // ????????????API
                            // viewType
                            // disable
                            topLabel={
                                <>
                                    ??????
                                        </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", value);
                            }}
                            onSelect={(e, option, onInitial, posInfo) => {
                                if (mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                    let endMarker = mapGoogleControll.getMarkers("test1")?.[1]?.position // ???????????????
                                    mapGoogleControll.deletePolylineRoute("test1"); // ????????????  
                                    mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // ??????????????????
                                    mapGoogleControll.addMarkerWithIndex("test1", endMarker, 1) // ??????????????????
                                }

                                mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 0) // ??????????????????
                                mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // ???????????????

                                globalContextService.set("WhiteCallCarComponentPage", "StartPos", option.label);

                                getCaseOrderAmtAPI(); // ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????

                                setForceUpdate(f => !f)
                            }}

                            theme={tablet.startPos}
                        />

                        {/* ??????????????????????????? */}
                        <BasicContainer theme={tablet.convertButtonContainer}>
                            <NativeLineButton theme={tablet.convertButton}
                                onClick={() => {
                                    let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // ????????????
                                    let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // ????????????

                                    let validMsg = "";
                                    if (valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                        validMsg = valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                    }
                                    else if (valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                        validMsg = valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                    }

                                    if (validMsg !== "") {
                                        modalsService.infoModal.error({
                                            id: "top1", //?????? ?????????????????????id
                                            iconRightText: validMsg,
                                            yes: true,
                                            yesText: "??????",
                                            // no: true,
                                            // autoClose: true,
                                            backgroundClose: false,
                                            yesOnClick: (e, close) => {
                                                close();
                                            }
                                        })
                                    }
                                    else {
                                        // ??????????????????????????????
                                        let startAddr = globalContextService.get("WhiteCallCarComponentPage", "StartPos");
                                        let endAddr = globalContextService.get("WhiteCallCarComponentPage", "EndPos");

                                        globalContextService.set("WhiteCallCarComponentPage", "EndPos", startAddr);
                                        globalContextService.set("WhiteCallCarComponentPage", "StartPos", endAddr);

                                        let startMarker = mapGoogleControll.getMarkers("test1")?.[0]?.position  // ???????????????
                                        let endMarker = mapGoogleControll.getMarkers("test1")?.[1]?.position // ???????????????

                                        // mapGoogleControll.deleteRoute("test1"); // ???????????? ?????????Call Google??????????????????
                                        mapGoogleControll.deletePolylineRoute("test1"); // ???????????? ?????????????????? ?????????????????? (decodePath) ????????? polyline ??????????????????      

                                        mapGoogleControll.addMarker("test1", endMarker); // ???????????????
                                        mapGoogleControll.addMarker("test1", startMarker); // ???????????????
                                    }
                                    setForceUpdate(f => !f)
                                }}
                            >
                                <Convert style={tablet.convertContainerIcon} />
                                                ???????????????
                        </NativeLineButton>

                        </BasicContainer>


                        {/* ?????? EndPos*/}
                        <MapGoogleInput
                            placeholder={"?????????????????????(XX???XX???XX???XX???)"}
                            placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // ????????????API
                            // viewType
                            // disable
                            topLabel={
                                <>
                                    ??????
                                            <Text theme={tablet.convertContainer}
                                        onClick={() => {
                                            let end = mapGoogleControll.getMarkers("test1")?.[1]?.position?.toJSON()?.lat // ????????????
                                            let start = mapGoogleControll.getMarkers("test1")?.[0]?.position?.toJSON()?.lat  // ????????????

                                            let validMsg = "";
                                            if (valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(end ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                            }
                                            else if (valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                validMsg = valid(start ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                            }

                                            if (validMsg !== "") {
                                                modalsService.infoModal.error({
                                                    id: "top1", //?????? ?????????????????????id
                                                    iconRightText: validMsg,
                                                    yes: true,
                                                    yesText: "??????",
                                                    // no: true,
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    yesOnClick: (e, close) => {
                                                        close();
                                                    }
                                                })
                                            }
                                            else {
                                                // ??????????????????????????????

                                                //#region ?????????Call Google??????????????????
                                                // mapGoogleControll.addRoute("test1",
                                                //     {
                                                //         // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                //         origin: mapGoogleControll.getMarkers("test1")[0].position,
                                                //         destination: mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                //         waypoints: [
                                                //             // {
                                                //             //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // ????????????
                                                //             //     stopover: true,
                                                //             // },
                                                //         ]
                                                //     }
                                                // )
                                                //#endregion

                                                //#region ?????????????????? ?????????????????? (decodePath) ????????? polyline ??????????????????

                                                props.GetPolylineRouteExecute(
                                                    {
                                                        fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"),
                                                        toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"),
                                                        mapId: "test1",
                                                        routeAttr: {
                                                            // origin: new window.google.maps.LatLng(25.012930,121.994708),
                                                            origin: mapGoogleControll.getMarkers("test1")[0].position,
                                                            destination: mapGoogleControll.getMarkers("test1")[1].position,// new window.google.maps.LatLng(25.012930,121.974708),
                                                            waypoints: [
                                                                // {
                                                                //     location: { lat: 25.012930, lng: 121.984708 },// new window.google.maps.LatLng(25.012930,121.984708), // ????????????
                                                                //     stopover: true,
                                                                // },
                                                            ]
                                                        }
                                                    }
                                                )
                                                //#endregion

                                                // setForceUpdate(f => !f)
                                            }
                                        }}
                                    >
                                        ????????????
                                            </Text>
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", value);
                            }}
                            onSelect={(e, option, onInitial, posInfo) => {
                                if (mapGoogleControll.getPolylineRoutes("test1")?.[0]) {
                                    let startMarker = mapGoogleControll.getMarkers("test1")?.[0]?.position // ???????????????
                                    mapGoogleControll.deletePolylineRoute("test1"); // ????????????  
                                    mapGoogleControll.addMarkerWithIndex("test1", startMarker, 0) // ??????????????????
                                }

                                //#region ????????????????????????
                                if (!mapGoogleControll.getMarkers("test1")?.[0]) {
                                    mapGoogleControll.addMarkerWithIndex("test1", {}, 0) // ?????? ??????????????? ??????
                                }
                                //#endregion
                                mapGoogleControll.addMarkerWithIndex("test1", { lat: posInfo?.lat, lng: posInfo?.lon }, 1) // ??????????????????
                                mapGoogleControll.setCenter("test1", { lat: posInfo?.lat, lng: posInfo?.lon }); // ???????????????

                                globalContextService.set("WhiteCallCarComponentPage", "EndPos", option.label);

                                getCaseOrderAmtAPI(); // ????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????? Table??????

                                setForceUpdate(f => !f)
                            }}

                            theme={tablet.endPos}
                        />

                        {/* ???????????????????????? */}
                        <BasicContainer
                            theme={tablet.todayToDoContainer}
                        >
                            {/* ???????????????????????? */}
                            <Text
                                theme={tablet.todayToDoTitle}
                            >
                                ??????????????????

                                </Text>

                            <Container>
                                {/* ???????????? */}
                                <SubContainer theme={tablet.todayToDoStartContainer}>

                                    {/* ?????? */}
                                    <Text
                                        theme={tablet.todayToDoStart}
                                    >
                                        <Start style={tablet.todayToDoStartSvg} />
                                            (??????)
                                        </Text>

                                    <StartToEnd
                                        style={tablet.startToEndSvg}
                                    />

                                    {/* ???????????? */}
                                    <Text
                                        theme={tablet.todayToDoStartAddr}
                                    >
                                        {globalContextService.get("WhiteCallCarComponentPage", "StartPos")}
                                    </Text>

                                </SubContainer>

                                {/* ???????????? */}
                                <SubContainer theme={tablet.todayToDoEndContainer}>

                                    {/* ?????? */}
                                    <Text
                                        theme={tablet.todayToDoEnd}
                                    >
                                        <End style={tablet.todayToDoEndSvg} />
                                            (??????)
                                        </Text>

                                    {/* ???????????? */}
                                    <Text
                                        theme={tablet.todayToDoEndAddr}
                                    >
                                        {globalContextService.get("WhiteCallCarComponentPage", "EndPos")}
                                    </Text>

                                </SubContainer>

                            </Container>

                        </BasicContainer>


                        {/* Table ?????? */}
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            open={props.TodayToDoOpen}
                            theme={tablet.tableContainer}
                        >
                            <OldTable
                                pagination={false}
                                checkbox={false}
                                // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("WhiteCallCarComponentPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("WhiteCallCarComponentPage", "CheckedRowsData", checkedRows);
                                    }
                                }
                                setPerCheckBoxDisabled={(record) => {
                                    return {
                                        // ...record, // ??????CheckBox????????????
                                        // disabled: record.name === 'Edrward 11',
                                    }
                                }}
                                //scrollAreaWidth={"calc( 1900px - 300px )"} // ????????? ??????????????????
                                //scrollAreaHeight={"calc( 100% - 55px )"}
                                columnsAttr={
                                    //#region ???????????????
                                    [
                                        {
                                            title: '??????',
                                            width: "60px",
                                            dataIndex: 'type',
                                            sorter: (a, b) => a.carNo.length - b.carNo.length,
                                            fixed: 'left',
                                            render: (rowData) => {
                                                return <>
                                                    <Text theme={tablet.type}>
                                                        {rowData}
                                                    </Text>
                                                </>
                                            },
                                        },
                                        {
                                            title: '????????????',
                                            width: "100px",
                                            dataIndex: 'distance',
                                            // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `${(rowData / 1000)?.toFixed(2)}??????` : ""
                                            }
                                        },
                                        {
                                            title: '????????????',
                                            width: "100px",
                                            dataIndex: 'duration',
                                            // sorter: (a, b) => a.carCategoryName.length - b.carCategoryName.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `${(rowData / 60)?.toFixed(0)}??????` : ""
                                            }
                                        },
                                        {
                                            title: '????????????',
                                            width: "100px",
                                            dataIndex: 'totalAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '????????????',
                                            width: "100px",
                                            dataIndex: 'subsidyAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '?????????',
                                            width: "100px",
                                            dataIndex: 'selfPayAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '????????????',
                                            width: "100px",
                                            dataIndex: 'withAmt',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return !isNil(rowData) ? `$${rowData}` : ""
                                            }
                                        },
                                        {
                                            title: '????????????',
                                            width: "100px",
                                            // dataIndex: 'seatNum',
                                            // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                            fixed: 'right',
                                            render: (rowData) => {
                                                return !isNil(rowData?.withAmt) ? `$${rowData?.withAmt + rowData?.selfPayAmt}` : ""
                                            }
                                        },
                                        {
                                            title: '',
                                            width: "0px",
                                            dataIndex: 'rightOccupy',
                                            fixed: 'right',
                                            sorter: false
                                        },
                                    ]
                                    //#endregion
                                }
                                //sort
                                //showHeader={false}
                                data={[
                                    { id: "1", type: "??????" },
                                    // { id: "2", type: "??????" },
                                ]}
                                // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                // data={props.AllCars.data}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </BasicContainer>


                        {/* ???????????? RideTogetherReview */}
                        <Radio
                            // viewType
                            // disable
                            topLabel={"????????????"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "RideTogetherReview") ?? 1}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteCallCarComponentPage", "RideTogetherReview", value);
                                // console.log(globalContextService.get("CarsAddPage", "CarReview"));
                            }}
                            theme={tablet.rideTogetherReview}
                        >
                            {/* ???????????? RideTogetherReview  ?????? */}
                            <RadioItem value={1} >???</RadioItem>
                            <RadioItem value={0} >???</RadioItem>
                        </Radio>

                        {/* ?????? CarType */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>??????</>}
                            bottomLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"?????????????????????"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteCallCarComponentPage", "CarType") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "CarType", value);
                            }}

                            options={[
                                { value: 'hint', label: "?????????????????????", isDisabled: true },
                                ...props?.AllCarType
                            ]}
                            // menuPosition={true}
                            theme={tablet.carType}
                        />

                        {/* ???????????? AccompanyCounts */}
                        <NewSelector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>????????????</>}
                            bottomLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"?????????????????????"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts") ?? null}
                            onChange={(e, value, onInitial) => {
                                if (!isEqual(value, globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))) {
                                    // ???????????????????????????
                                    let preNum = globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value;
                                    Array(preNum).fill(0).forEach((it, ind) => {
                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerName_${ind + 1}`)
                                        globalContextService.remove("WhiteCallCarComponentPage", `TakerBrithday_${ind + 1}`)
                                    });

                                    globalContextService.set("WhiteCallCarComponentPage", "AccompanyCounts", value)
                                    setForceUpdate(f => !f);
                                }
                            }}

                            options={[
                                { value: 'hint', label: "?????????????????????", isDisabled: true },
                                { value: 1, label: "1???" },
                                { value: 2, label: "2???" },
                                { value: 3, label: "3???" },
                                { value: 4, label: "4???" },
                                { value: 5, label: "5???" },
                                { value: 6, label: "6???" },
                                { value: 7, label: "7???" },
                                { value: 8, label: "8???" },
                            ]}
                            // menuPosition={true}
                            theme={tablet.accompanyCounts}
                        />

                        {/* ???????????? SmsNumber */}
                        <TextInput

                            topLabel={<>????????????</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"???????????????????????????"}
                            value={globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? null}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteCallCarComponentPage", "SmsNumber", value);
                            }}
                            theme={tablet.smsNumber}
                        />

                        {/*??????????????????*/}
                        <SubContainer theme={tablet.companyEnableOccupy} />

                        {!isNil(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts"))
                            &&
                            (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {/* ???????????? TakerName */}
                                        <TextInput
                                            topLabel={`????????????${index + 1}`}
                                            baseDefaultTheme={"DefaultTheme"}
                                            type="text"
                                            placeholder={``}
                                            value={globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? ""}
                                            onChange={(e, value, onInitial) => {
                                                globalContextService.set("WhiteCallCarComponentPage", `TakerName_${index + 1}`, value);
                                            }}
                                            theme={tablet.takerName}
                                        />

                                        {/* ???????????? TakerBrithday */}
                                        <DateTimePicker
                                            topLabel={`????????????${index + 1}`}
                                            // type={"time"} time???date???week???month???quarter???year
                                            type={"date"}
                                            format={"YYYY-MM-DD"}
                                            bascDefaultTheme={"DefaultTheme"}
                                            // viewType
                                            isSearchable
                                            placeholder={""}
                                            value={
                                                (globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`)) ?
                                                    moment(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`), "YYYY-MM-DD HH:mm:ss")
                                                    :
                                                    null
                                            }
                                            onChange={(value, momentObj) => {
                                                globalContextService.set("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`, value);
                                            }}
                                            theme={tablet.takerBrithday}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }

                    </FormRow>
                </FormContainer>

                {/* ??????????????????????????? */}
                <BasicContainer
                    theme={tablet.callCarFormBottomContainer}
                >
                    {/* ??????????????? */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // ????????????
                        theme={tablet.returnButton}
                        onClick={() => {
                            history.push("/Case");
                            props.controllGCS("return")
                        }}
                    >
                        ?????????
                                </NativeLineButton>

                    {/* ?????????????????? */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // ????????????
                        theme={tablet.reservationNow}
                        onClick={() => {
                            //#region ????????????
                            let validMsg = "";

                            if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelDate") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "TravelTime") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "StartPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "EndPos") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                            }
                            // else if (map8Controll.getMarkerPoints("test1").length !== 2) {
                            //     validMsg = "???????????????????????????"
                            // }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "CarType")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                            }
                            else if (valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]) {
                                validMsg = valid(globalContextService.get("WhiteCallCarComponentPage", "SmsNumber") ?? "", ["^.{1,}$", "^09[0-9]{8,8}$"], ["???????????????????????????", "???????????????????????????"])[1]
                            }
                            else if (
                                !(
                                    (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                        .map((item, index) => {
                                            // ??????????????????????????????????????????????????????????????????
                                            return [
                                                valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1],
                                                valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1]
                                            ]
                                        }).flat().every(V => (V === null))
                                )
                            ) {

                                validMsg = (Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0)
                                    .map((item, index) => {
                                        return [
                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1],
                                            valid(globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`) ?? "", ["^.{1,}$"], [`?????????????????????${index + 1}`])[1]
                                        ]
                                    }).flat().filter(v => v !== null)[0]; // ??????????????????????????????????????????
                            }
                            //#endregion

                            //#region ?????????????????????
                            if (validMsg !== "") {
                                // console.log(validMsg, globalContextService.get("CaseAddPage"))
                                modalsService.infoModal.error({
                                    id: "top1", //?????? ?????????????????????id
                                    iconRightText: validMsg,
                                    yes: true,
                                    yesText: "??????",
                                    // no: true,
                                    // autoClose: true,
                                    backgroundClose: false,
                                    yesOnClick: (e, close) => {
                                        close();
                                    }
                                })
                            }

                            else {
                                props.AddOrderOfSelfPayUsersExecute({
                                    CarCategoryName: globalContextService.get("WhiteCallCarComponentPage", "CarType").label, //?????? ??? label
                                    canShared: globalContextService.get("WhiteCallCarComponentPage", "RideTogetherReview") === 1 ? true : false, //????????????
                                    carCategoryId: globalContextService.get("WhiteCallCarComponentPage", "CarType").value,	//?????? ??? value
                                    date: globalContextService.get("WhiteCallCarComponentPage", "TravelDate"), //????????????
                                    fromAddr: globalContextService.get("WhiteCallCarComponentPage", "StartPos"), //	??????
                                    fromLat: mapGoogleControll.getMarkerPoints("test1")?.[0]?.[1] ?? 0, //????????????
                                    fromLon: mapGoogleControll.getMarkerPoints("test1")?.[0]?.[0] ?? 0,//????????????
                                    // id: ""	?????????????????? id
                                    noticePhone: globalContextService.get("WhiteCallCarComponentPage", "SmsNumber"),	//??????????????????
                                    orgId: "",//	??????????????????
                                    passengerNum: globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts").value,	//????????????
                                    remark: JSON.stringify((Array(globalContextService.get("WhiteCallCarComponentPage", "AccompanyCounts")?.value)).fill(0).map((item, index) => {
                                        return {
                                            name: globalContextService.get("WhiteCallCarComponentPage", `TakerName_${index + 1}`),
                                            birth: globalContextService.get("WhiteCallCarComponentPage", `TakerBrithday_${index + 1}`)
                                        }
                                    })),	//????????????????????????
                                    reserveDate: `${globalContextService.get("WhiteCallCarComponentPage", "TravelDate")} ${globalContextService.get("WhiteCallCarComponentPage", "TravelTime")}`,	//????????????+ ????????????
                                    selfPayUserId: props.CaseUserId, //????????????id
                                    status: 1,	//??????????????????
                                    time: globalContextService.get("WhiteCallCarComponentPage", "TravelTime"), //????????????
                                    toAddr: globalContextService.get("WhiteCallCarComponentPage", "EndPos"), //	??????
                                    toLat: mapGoogleControll.getMarkerPoints("test1")?.[1]?.[0] ?? 0,//	????????????
                                    toLon: mapGoogleControll.getMarkerPoints("test1")?.[1]?.[1] ?? 0,//	????????????
                                    userId: props.UserId
                                })
                            }
                        }}
                    >
                        ????????????
                                </NativeLineButton>
                </BasicContainer>

            </Resizable>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`

