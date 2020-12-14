import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
import { AutoComplete as AutoCompleteExtend } from 'antd';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isNil, isUndefined, debounce, throttle } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { cssifyObject } from 'css-in-js-utils';
import { valid } from '../../Handlers';
import { useAsync } from '../../SelfHooks/useAsync';
import { useCallback } from 'react';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region MapGoogle 地圖組件
const MapGoogleBase = (props) => {

    // MapGoogle API Key Setting
    const key = props?.mapKey ?? "AIzaSyA1h_cyazZLo1DExB0h0B2JBuOfv-yFtsM";

    useEffect(() => {

        // console.log(props?.mapId)
        // if (isNil(globalContextService.get("GMapObj", props?.mapId ?? "gmap"))) {
        if (window.google) {
            // window.google.accessToken = key;

            const map = new window.google.maps.Map(document.getElementById(props?.mapId ?? "gmap"), {
                center: { lat: 25.012930, lng: 121.474708 }, // 初始中心座標，格式為 {lat, lng}  // 25.012930, 121.474708
                zoom: 16, // 初始 ZOOM LEVEL; 
                ...props?.mapAttr,
            });

            globalContextService.set("GMapObj", props?.mapId ?? "gmap", map); // 將地圖物件放入 GCS
            globalContextService.set("GMapObj", `${props?.mapId ?? "gmap"}_markers`, []); // 將地圖 標記 物件放入 GCS
            globalContextService.set("GMapObj", `${props?.mapId ?? "gmap"}_Routes`, []); // 將地圖 路線 物件放入 GCS

        }

        return () => {
            // document.body.removeChild(mapBasicScript);
            // document.body.removeChild(mapServiceScript);
            // document.body.removeChild(mapRouteScript);
        }
    }, []);



    return (
        <>
            {/* 地圖容器 */}
            <BasicContainer
                id={props?.mapId ?? "gmap"} // 必傳
                {...props.mapContainerEvent}
                baseDefaultTheme={"DefaultTheme"}
                className={`${props.className} mapContainer`}
                theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mapContainer")}
            >

            </BasicContainer>
        </>
    )
}
//#endregion

export const MapGoogle = styled(MapGoogleBase).attrs((props) => ({}))`
`
//#endregion


//#region 導出可用方法 - (不能在地圖渲染完成前使用)

//#region 取得基礎地圖物件
const getBasicMap = (mapId) => {
    let basicMap = globalContextService.get("GMapObj", mapId);
    return basicMap;
}
//#endregion

//#region 轉換經緯度維Google經緯度物件 ，latlng = { lat: 25.012930, lng: 121.974708 }
const transLatLng = (latlng = { lat: 25.012930, lng: 121.974708 }) => {
    return new window.google.maps.LatLng(latlng.lat, latlng.lng);
}
//#endregion

//#region 新增地圖標記
const addMarker = (mapId, location) => {

    if (window.google) {
        const marker = new window.google.maps.Marker({
            position: location,
            // animation: window.google.maps.Animation.DROP,
            map: getBasicMap(mapId),
        });

        let markers = globalContextService.get("GMapObj", `${mapId ?? "gmap"}_markers`)
        markers.push(marker);
        globalContextService.set("GMapObj", `${mapId ?? "gmap"}_markers`, markers);

        return { markers, marker }; // 返回新增後所有標記、與當次標記

    }
    else {
        return null;
    }

}
//#endregion

//#region 設定標記至指定地圖 (以 array 內標記 去顯示) 不導出使用
const setMapOnAll = (mapId, hide = false) => {
    if (window.google) {
        let markers = globalContextService.get("GMapObj", `${mapId ?? "gmap"}_markers`);
        let gmap = globalContextService.get("GMapObj", mapId ?? "gmap");

        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap((hide ? null : gmap));
        }
    }
    else {
        return null;
    }
}
//#endregion

//#region 隱藏標記至指定地圖 (array 內標記依然保存， 取消顯示在地圖上)
const hideMarkers = (mapId) => {
    if (window.google) {
        setMapOnAll(mapId, true);
    }
    else {
        return null;
    }
}
//#endregion

//#region 顯示標記至指定地圖 (array 內標記依然保存)
const showMarkers = (mapId) => {
    if (window.google) {
        setMapOnAll(mapId);
    }
    else {
        return null;
    }
}
//#endregion

//#region 刪除標記至指定地圖 (array 內標記清空)
const deleteMarkers = (mapId) => {
    hideMarkers(mapId);
    globalContextService.set("GMapObj", `${mapId ?? "gmap"}_markers`, []); // 將地圖 標記 物件放入 GCS
}
//#endregion

//#region 取得目前標記
const getMarkers = (mapId) => {
    return globalContextService.get("GMapObj", `${mapId ?? "gmap"}_markers`); // 將地圖 標記 物件放入 GCS
}
//#endregion

//#region 更新地圖攝影機中心位置
const setCenter = (mapId, center) => {

    let basicMap = globalContextService.get("GMapObj", mapId);

    if (window.google) {
        basicMap.panTo(center);
    }
    return basicMap ?? null;
}
//#endregion

//#region 路線標記製作
const createMarker = (mapId, latlng, type = "waypoint") => {
    let markers = globalContextService.get("GMapObj", `${mapId ?? "gmap"}_markers`)

    switch (type) {
        case "start":
            let startMarker = new window.google.maps.Marker({
                position: latlng, // window.google.maps.LatLng(25.012930,121.974708)
                map: getBasicMap(mapId),
                label: { text: "起", color: "white" }
            });

            markers.push(startMarker);
            globalContextService.set("GMapObj", `${mapId ?? "gmap"}_markers`, markers);
            break;
        case "end":
            let endMarker = new window.google.maps.Marker({
                position: latlng, // window.google.maps.LatLng(25.012930,121.974708)
                map: getBasicMap(mapId),
                label: { text: "迄", color: "white" }
            });

            markers.push(endMarker);
            globalContextService.set("GMapObj", `${mapId ?? "gmap"}_markers`, markers);
            break;
        case "waypoint":
            let waypointMarker = new window.google.maps.Marker({
                position: latlng, // window.google.maps.LatLng(25.012930,121.974708)
                map: getBasicMap(mapId),
                label: { text: "經", color: "white" }
            });

            markers.push(waypointMarker);
            globalContextService.set("GMapObj", `${mapId ?? "gmap"}_markers`, markers);
            break;
        default:
            break;
    }
}
//#endregion

//#region 新增一條路線 (移除原有所有標記)
const addRoute = (mapId, routeAttr) => {
    if (window.google) {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        deleteMarkers(mapId); //移除原有所有標記

        //#region 添加標記  順序上 起點是陣列第一個、迄點是第二個、接著才是中途點
        routeAttr?.origin && createMarker(mapId, routeAttr.origin, "start");
        routeAttr?.destination && createMarker(mapId, routeAttr.destination, "end");
        (routeAttr?.waypoints ?? []).forEach((item, index) => {
            createMarker(mapId, item.location, "waypoint");
        });
        //#endregion

        directionsService.route(
            {
                // origin: document.getElementById("start").value,
                // destination: document.getElementById("end").value,
                // waypoints: [
                //     {
                //       location: new google.maps.LatLng(45.658197,-73.636333), // 或是地址
                //       stopover: true,
                //     },
                //     {
                //       location: new google.maps.LatLng(45.658197,-73.636333), // 或是地址
                //       stopover: true,
                //     },
                // ],
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,
                ...routeAttr
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                } else {
                    window.alert("路線繪製錯誤，歸因於: " + status);
                }
            }
        );

        let basicMap = globalContextService.get("GMapObj", mapId);

        directionsRenderer.setMap(basicMap);

        let routes = globalContextService.get("GMapObj", `${mapId ?? "gmap"}_Routes`);
        routes.push(directionsRenderer);
        globalContextService.set("GMapObj", `${mapId ?? "gmap"}_Routes`, routes); // 將地圖 路線 物件放入 GCS

        return routeAttr; // 返回路線設置屬性
    }
    else {
        return null;
    }
}
//#endregion

//#region 刪除一條路線 (移除原有所有標記)
const deleteRoute = (mapId, routeNo = 0) => {
    if (window.google) {

        let route = globalContextService.get("GMapObj", `${mapId ?? "gmap"}_Routes`)?.[routeNo];

        route && route.setMap(null);

        route && deleteMarkers(mapId); //移除原有所有標記

        let routes = globalContextService.get("GMapObj", `${mapId ?? "gmap"}_Routes`);
        routes.splice(routeNo, 1);
        globalContextService.set("GMapObj", `${mapId ?? "gmap"}_Routes`, routes); // 將地圖 路線 物件放入 GCS
    }
    else {
        return null;
    }
}
//#endregion

//#region 取得目前所有路線
const getRoutes = (mapId) => {
    if (window.google) {
        return globalContextService.get("GMapObj", `${mapId ?? "gmap"}_Routes`);
    }
    else {
        return null;
    }
}
//#endregion

//#region 方法承載物件 (不能在地圖渲染完成前使用)
const mapGoogleControll = {
    getBasicMap, // 取得基礎地圖物件
    transLatLng, // 轉換經緯度維Google經緯度物件 ，latlng = { lat: 25.012930, lng: 121.974708 }
    addMarker, // 新增地圖標記
    hideMarkers, // 隱藏所有地圖標記
    showMarkers, // 顯示所有地圖標記
    deleteMarkers, // 刪除所有地圖標記
    getMarkers, // 取得目前標記
    setCenter, // 更新地圖攝影機中心位置
    addRoute, // 新增一條路線 (移除原有所有標記)
    deleteRoute, // 刪除一條路線 (移除原有所有標記)
    getRoutes, // 取得目前所有路線
}
//#endregion

export { mapGoogleControll }
//#endregion


//#region 搜尋地圖資訊組件

//#region 搜尋地圖資訊組件
const AutoCompleteExtendStyle = styled(AutoCompleteExtend).attrs((props) => ({}))`
//#region 

&.ant-select {
    width: 100%;
}

&& .ant-select-selector {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "gmapInputSubContainer")['basic']))}  
}
&& .ant-select-selection-search {
    height: 100%;
}

// && .ant-select-selection-search-input{
//     //權重不夠高
//     ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "gmapInput")['basic']))}  
// }

&&.ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "gmapInput")['basic']))}  
}

&& .ant-select-selection-placeholder {
    position: relative;
    opacity: 1;
    color: rgba(0,0,0,0.65);
    top: -2px;
}

//#endregion


`
//#endregion

//#region 搜尋地圖資訊組件
export const MapGoogleInputBase = (props) => {

    const [Value, setValue] = useState("");
    const [ViewTypeValue, setViewTypeValue] = useState("");
    const [options, setOptions] = useState([]);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用

    useEffect(() => {
        setValue(props.value)
        if (props.value) {
            setViewTypeValue(`${props.value}`)
        }
        else {
            setViewTypeValue("")
        }

        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.value, props.onChange])

    // const delayedHandleSearch = debounce(eventData => GetSearchPosExecute(eventData), 1000);

    //#region 自動完成查詢 API
    const getSearchPos = useCallback(async (searchText) => {
        if (!valid(searchText, ["[^\u3100-\u312F]+$"], ["含有注音"])[1]) { // 若有注音則，vaild有值不發API

            const autocomplete = new window.google.maps.places.Autocomplete(searchText);

            console.log("autocomplete", autocomplete)

            // const key = "AIzaSyA1h_cyazZLo1DExB0h0B2JBuOfv-yFtsM";

            // fetch(`https://api.gmap.zone/v2/place/autocomplete?key=${key}&input=${encodeURIComponent(searchText)}&location=25.06102,121.58790&radius=50.000`,
            //     {})
            //     .then(Result => {
            //         const ResultJson = Result.clone().json();//Respone.clone()
            //         return ResultJson;
            //     })
            //     .then((PreResult) => {
            //         // console.log(PreResult)

            //         if (PreResult.status === "OK") {
            //             let a = PreResult.predictions.map((item) => { return { label: item.name, value: item.id } })
            //             setOptions(!searchText ? [] : a)
            //         }
            //         else if (PreResult.status === "ZERO_RESULTS") {
            //             setOptions(!searchText ? [] : [{ label: "查無資料", value: "查無資料", disabled: true }])
            //         }
            //         else {
            //             throw PreResult;
            //         }
            //     })
            //     .catch((Error) => {
            //     })
            //     .finally(() => {
            //     });
        }

    }, [])

    const [GetSearchPosExecute, GetSearchPosPending] = useAsync(getSearchPos, false);
    //#endregion 

    // const onSearch = (searchText) => {
    //     delayedHandleSearch(searchText); // 防抖動效果
    // }

    const onSearch = useCallback(debounce(v => {
        GetSearchPosExecute(v); // 防抖動效果
    }, 1000), [debounce]);


    return (
        <>
            {
                props.viewType ?
                    // 展示模式 (未開放)
                    // 容器
                    <SubContainer
                        {...props.viewTypeContainerEvent}
                        baseDefaultTheme={"DefaultTheme"}
                        className={`${props.className} viewTypeContainer`}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeContainer") }}
                    >
                        {/* 上標題 */}
                        <Text
                            {...props.viewTypeTopLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeTopLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTopLabel") }}
                        >
                            {props.viewTypeTopLabel ?? props.topLabel}
                        </Text>
                        {/* 勾選框本體 */}
                        <BasicContainer
                            {...props.viewTypeMapGoogleInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeMapGoogleInputContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeMapGoogleInputContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeMapGoogleInputEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeMapGoogleInput`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeMapGoogleInput") }}
                            >
                                {ViewTypeValue ?? ""}
                            </Text>
                        </BasicContainer>
                        {/* 下標題 */}
                        <Text
                            {...props.viewTypeBottomLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeBottomLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeBottomLabel") }}
                        >
                            {props.viewTypeBottomLabel ?? props.bottomLabel}
                        </Text>
                    </SubContainer>
                    :
                    // 一般編輯模式
                    // 容器
                    <SubContainer
                        {...props.containerEvent}
                        baseDefaultTheme={"DefaultTheme"}
                        className={`${props.className} container`}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "container") }}
                    >
                        {/* 上標題 */}
                        <Text
                            {...props.topLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} topLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "topLabel") }}
                        >
                            {props.topLabel}
                        </Text>
                        {/* 搜尋地圖資訊組件本體 */}
                        <BasicContainer
                            {...props.gmapInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} gmapInputContainer`}
                            onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                            onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                            onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                            onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "gmapInputContainer") }}
                        >

                            {/* 搜尋地圖資訊組件 */}
                            < AutoCompleteExtendStyle
                                options={options}
                                onSelect={(value, option) => {
                                    // console.log('onSelect', value, option);
                                    // "https://api.gmap.zone/v2/place/details/json?key=<您的 key>&placeid=NzYqAQYARhkCVltTRRxiJBIYMDIIZgVSLyMdf25eBDIIPQ1VHWEwEg==&postcode=true"
                                    const key = "AIzaSyA1h_cyazZLo1DExB0h0B2JBuOfv-yFtsM";

                                    fetch(`https://api.gmap.zone/v2/place/details/json?key=${key}&placeid=${encodeURIComponent(value)}&postcode=true`,
                                        // https://api.gmap.zone/v2/place/geocode/json?key=<您的 key>&address=台北市內湖區新湖三路189號
                                        // fetch(`https://api.gmap.zone/v2/place/geocode/json?key=${key}&address=${encodeURIComponent(option.label)}`,
                                        {})
                                        .then(Result => {
                                            const ResultJson = Result.clone().json();//Respone.clone()
                                            return ResultJson;
                                        })
                                        .then((PreResult) => {
                                            // console.log(PreResult)
                                            // console.log(PreResult.results[0])

                                            if (PreResult.status === "OK") {
                                                props.onSelect && props.onSelect(null, option, OnInitial, PreResult.result);
                                                // props.onSelect && props.onSelect(null, option, OnInitial, PreResult.results[0]);
                                            }
                                            else {
                                                throw PreResult;
                                            }
                                        })
                                        .catch((Error) => {
                                            // console.log(Error)
                                        })
                                        .finally(() => {
                                        });
                                }}

                                onSearch={onSearch}

                                disabled={props.disable ?? false}
                                // disable={props.disable ?? false} //供判斷
                                // focus={Focus}
                                // hover={Hover}
                                placeholder={props.placeholder ?? "請搜尋地址"} // 具locale預設值
                                transitionName="" //取消動畫
                                value={Value}

                                onChange={(value, option) => {
                                    // console.log(value, option)
                                    props.onChange && props.onChange(null, option?.label ?? value, OnInitial);
                                    setValue(option?.label ?? value);
                                    setViewTypeValue(option?.label ?? value)
                                }}
                                theme={props.theme}
                            />

                        </BasicContainer>
                        {/* 下標題 */}
                        <Text
                            {...props.bottomLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} bottomLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "bottomLabel") }}
                        >
                            {props.bottomLabel}
                        </Text>
                    </SubContainer >
            }
        </>
    )
}

export const MapGoogleInput = styled(MapGoogleInputBase).attrs((props) => ({}))`

`
//#endregion

//#endregion
