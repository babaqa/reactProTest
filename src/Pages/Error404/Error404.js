import React, { useContext, useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../Store/Store'
import { MainPageContainer, Map8Canvas, map8Controll, MapGoogle, mapGoogleControll, MapGoogleInput } from '../../ProjectComponent';
import { useAsync } from '../../SelfHooks/useAsync';
import { getItemLocalStorage } from '../../Handlers';

//#region signalr
import { HubConnectionBuilder } from '@microsoft/signalr';
import { globalContextService } from '../../Components';
import { Map8Input } from '../../ProjectComponent/Map8Canvas/Map8Canvas';

// import ChatWindow from './ChatWindow/ChatWindow';
// import ChatInput from './ChatInput/ChatInput';
//#endregion

export const Error404 = (props) => {

    const { APIUrl, APIAppKey, Theme } = useContext(Context);
    const { } = Theme;

    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://openauth.1966.org.tw/api/chatHub")
            // .withUrl(`${APIUrl}chatHub`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {


            connection.start()
                .then(result => {
                    console.log('Connected!');
                    console.log("result", result)
                    connection.on('ReceiveOrderMessage', message => {
                        // const updatedChat = [...latestChat.current];
                        // updatedChat.push(message);

                        // setChat(updatedChat);
                        console.log("ReceiveOrderMessage", message)
                    });

                    connection.on('ReceiveOrderHide', message => {
                        // const updatedChat = [...latestChat.current];
                        // updatedChat.push(message);

                        // setChat(updatedChat);
                        console.log("ReceiveOrderHide", message)
                    });


                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    return (
        <>
            <MainPageContainer
            // theme={{
            //     tabletOutContainer: {
            //         basic: (style) => {
            //             console.log(style)
            //             return {
            //                 ...style,
            //                 background: "red"
            //             }
            //         }
            //     }
            // }}
            >
                <div style={{ height: "100rem", width: "100%", textAlign: "left", color: "red", padding: "0px" }}
                // onClick={() => { connection.send('SendMessage', "????????????"); }}
                >
                    ????????????????????????
                
                <Map8Canvas
                    mapId={"test1"}
                    mapAttr={{
                        maxBounds: [[105, 15], [138.45858, 33.4]], // ??????????????????
                        center: [121.474708, 25.012930], // ?????????????????????????????? [lng, lat]  // 25.012930, 121.474708
                        zoom: 16, // ?????? ZOOM LEVEL; [0-20, 0 ????????? (???), 20 ;?????? (???)]
                        minZoom: 6, // ????????????????????????????????????, ?????????, [0-19.99]
                        maxZoom: 19.99, // ????????????????????????????????????, ????????? [0-19.99]
                        pitch: 0, // ???????????????, ?????????, [0-60] // default 50
                        bearing: 0, // ????????????, ?????????, [-180 ~ 180; 0 ???????????????, 180 ???????????????]
                        attributionControl: false,
                    }}
                
                    theme={{
                        mapContainer:{
                            basic:(style,props)=>({
                            ...style,
                            width:"100%",
                            height:"300px"    
                            })
                        }
                    }}
                />
                <button onClick={()=>{
                     var nowMapCenterPoint = map8Controll.getBasicMap("test1")?.getCenter();
                    //  console.log( globalContextService.get("Map8Obj","test1"),nowMapCenterPoint)

                        map8Controll.addOneMarkerPoint("test1",nowMapCenterPoint)
      

                }}
                >
                    ??????????????????        
                </button>

                <button onClick={()=>{
                    var nowMapCenterPoint = map8Controll.getBasicMap("test1")?.getCenter();
                    //  console.log( globalContextService.get("Map8Obj","test1"),nowMapCenterPoint)

                     map8Controll.removeOneMarkerPoint("test1",nowMapCenterPoint)
       
                }}
                >
                    ??????????????????

                    </button>

                <button onClick={()=>{
    
                    let routeInfo=map8Controll.addOneRoute("test1",{
                        origin: [121.474708, 25.012930], // ??????
                        destination: [121.570260, 25.032806], // ??????
                        waypoints: [
                            [121.49993, 25.03678], // ?????????
                            [121.517498, 25.046273] // ????????????
                        ],
                    })
                    routeInfo?.getOrigin && console.log(routeInfo.getOrigin())
                }}
                >
                    ??????????????????
                </button>

                <button onClick={()=>{
 
                   map8Controll.removeOneRoute("test1")
                   
                }}
                >
                    ??????????????????
                </button>
         
                <button onClick={()=>{

                    let routeInfo=map8Controll.addOneRoute("test1",{
                        origin: [121.474708, 25.012930], // ??????
                        destination: [121.570260, 25.032806], // ??????
                        waypoints: [
                            // [121.607064,25.053189], // ????????????
                            [121.49993, 25.03678], // ?????????
                            [121.517498, 25.046273], // ????????????
                            [121.607064,25.053189], // ????????????
                        ],
                    })
                    routeInfo?.getOrigin && console.log(routeInfo.getOrigin())
                }}
                >
                    ?????????????????????
                </button>
                <button onClick={()=>{

                        map8Controll.addOrUpdateMarkerPoints("test1",[
                            // [121.607064,25.053189], // ????????????
                            [121.49993, 25.03678], // ?????????
                            [121.517498, 25.046273], // ????????????
                            [121.607064,25.053189], // ????????????
                        ])
      
                        map8Controll.setCenter("test1" , [121.517498, 25.046273]);
                }}
                >
                    ??????????????????        
                </button>

                <button onClick={()=>{
                        map8Controll.addOrUpdateMarkerPoints("test1",[
                            // [121.607064,25.053189], // ????????????
                            [121.49993, 25.03678], // ?????????
                            [121.517498, 25.046273], // ????????????
                            [121.607064,25.053189], // ????????????
                            [121.774639,24.678008], // ??????
                        ])

                    }}
                >
                    ??????????????????        
                </button>

                <button onClick={()=>{
                        map8Controll.appendMarkerPoints("test1",[
                            [121.515559,25.114523], // ??????
                        ])
                    }}
                >
                    ??????????????????        
                </button>

                <button onClick={()=>{
                        map8Controll.delAllMarkerPoints("test1",[
                            [121.515559,25.114523], // ??????
                        ])
                    }}
                >
                    ??????????????????        
                </button>

                <Map8Input
                    placeholder={"?????????????????????(XX???XX???XX???XX???)"}

                    // viewType
                    // disable
                    topLabel={"??????"}
                    baseDefaultTheme={"DefaultTheme"}
                    // value={globalContextService.get("BusRouteAddPage", "Sort") ?? ""}
                    // onChange={(e, value, onInitial) => {
                    //     globalContextService.set("BusRouteAddPage", "Sort", value);
                    // }}
                    onSelect={(e, option, onInitial,posInfo)=>{
                        console.log("onSelect-onSelect",posInfo)

                        map8Controll.addOrUpdateMarkerPoints("test1",[
                            [posInfo?.geometry?.location?.lng,posInfo?.geometry?.location?.lat], // ????????????
                        ])
      
                        map8Controll.setCenter("test1" , [posInfo?.geometry?.location?.lng,posInfo?.geometry?.location?.lat]);

                    }}

                    theme={ {
                        viewTypeContainer: {
                            basic: (style, props) => ({
                                ...style,
                                //left:"-8px",
                                padding: "0 12px",
                                ...style.occupy(4),
                                // maxWidth: "calc( 33.33% - 4px )",
                                // flexBasis: "calc( 33.33% - 4px )",
                            })
                        },
                        container: {
                            basic: (style, props) => ({
                                ...style,
                                //left:"-8px",
                                padding: "0 12px",
                                ...style.occupy(4),
                                // maxWidth: "calc( 33.33% - 4px )",
                                // flexBasis: "calc( 33.33% - 4px )",
                            })
                        },
                        topLabel: {
                            basic: (style, props) => ({
                                ...style,
                                // height: "0px"
                            })
                        },
                        numberInputContainer: {
                            basic: (style, props) => {
                                return {
                                    ...style,
                                    color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
                                }
                            }
                        },
                        numberInputSubContainer: {
                            basic: (style, props) => ({
                                ...style,
                                height: "28px",
                            })
                        },
                        bottomLabel: {
                            basic: (style, props) => ({
                                ...style,
                                // height: "24px"
                                minHeight: "24px",
                                height: "auto"
                            })
                        }
                    }}
                />


                    <MapGoogle 
                      mapId={"test1"}
                      mapAttr={{
                        //   maxBounds: [[105, 15], [138.45858, 33.4]], // ??????????????????
                          center: { lat:  25.012930, lng: 121.474708} , // ?????????????????????????????? [lng, lat]  // 25.012930, 121.474708
                          zoom: 16, // ?????? ZOOM LEVEL; [0-20, 0 ????????? (???), 20 ;?????? (???)]
                        //   minZoom: 6, // ????????????????????????????????????, ?????????, [0-19.99]
                        //   maxZoom: 19.99, // ????????????????????????????????????, ????????? [0-19.99]
                        //   pitch: 0, // ???????????????, ?????????, [0-60] // default 50
                        //   bearing: 0, // ????????????, ?????????, [-180 ~ 180; 0 ???????????????, 180 ???????????????]
                        //   attributionControl: false,
                      }}
                  
                      theme={{
                          mapContainer:{
                              basic:(style,props)=>({
                              ...style,
                              width:"100%",
                              height:"300px"    
                              })
                          }
                      }}
                      />
                    
                    <button onClick={()=>{
                     // var nowMapCenterPoint = map8Controll.getBasicMap("test1")?.getCenter();
                    //  console.log( globalContextService.get("Map8Obj","test1"),nowMapCenterPoint)

                    mapGoogleControll.addMarker("test1",{ lat:  25.012930, lng: 121.474708})
                    mapGoogleControll.addMarker("test1",{ lat:  25.012930, lng: 121.574708})
                    mapGoogleControll.addMarker("test1",{ lat:  25.012930, lng: 121.674708})
      

                    }}
                    >
                    ????????????        
                    </button>

                    <button onClick={()=>{
                        mapGoogleControll.hideMarkers("test1")
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                        mapGoogleControll.showMarkers("test1")
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                        mapGoogleControll.deleteMarkers("test1")
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                    //    console.log(mapGoogleControll.getBasicMap("test1")?.setCenter({ lat:  25.012930, lng: 121.474708}))

                       mapGoogleControll.setCenter("test1",{ lat:  25.012930, lng: 121.974708})
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                    console.log(mapGoogleControll.getMarkers("test1"))
                    console.log( new window.google.maps.LatLng(45.658197,-73.636333))

                    mapGoogleControll.addRoute("test1",
                        {
                            // origin: new window.google.maps.LatLng(25.012930,121.994708),
                            origin: mapGoogleControll.getMarkers("test1")[0].position,
                            destination: {lat:25.012930, lng:121.974708},// new window.google.maps.LatLng(25.012930,121.974708),
                            waypoints:[
                                {
                                  location:  {lat:25.012930,lng:121.984708},// new window.google.maps.LatLng(25.012930,121.984708), // ????????????
                                  stopover: true,
                                },
                            ]
                        }
                    )
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                    console.log(mapGoogleControll.getMarkers("test1"))
                    console.log( new window.google.maps.LatLng(45.658197,-73.636333))

                    mapGoogleControll.addRoute("test1",
                        {
                            // origin: new window.google.maps.LatLng(25.012930,121.994708),
                            origin: "???????????????",
                            destination: {lat:25.022930, lng:121.994708},// new window.google.maps.LatLng(25.012930,121.974708),
                            waypoints:[
                                {
                                  location:  "???????????????",// new window.google.maps.LatLng(25.012930,121.984708), // ????????????
                                  stopover: true,
                                },
                            ]
                        }
                    )
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                    console.log(mapGoogleControll.getRoutes("test1"))
                    console.log( new window.google.maps.LatLng(45.658197,-73.636333))

                    mapGoogleControll.deleteRoute("test1" )
                    }}
                    >
                    ????????????

                    </button>


<MapGoogleInput
   placeholder={"?????????????????????(XX???XX???XX???XX???)"}

   // viewType
   // disable
   topLabel={"??????"}
   baseDefaultTheme={"DefaultTheme"}
   // value={globalContextService.get("BusRouteAddPage", "Sort") ?? ""}
   // onChange={(e, value, onInitial) => {
   //     globalContextService.set("BusRouteAddPage", "Sort", value);
   // }}
   onSelect={(e, option, onInitial,posInfo)=>{
       console.log("onSelect-onSelect",posInfo)

    //    map8Controll.addOrUpdateMarkerPoints("test1",[
    //        [posInfo?.geometry?.location?.lng,posInfo?.geometry?.location?.lat], // ????????????
    //    ])

    //    map8Controll.setCenter("test1" , [posInfo?.geometry?.location?.lng,posInfo?.geometry?.location?.lat]);

   }}

   theme={ {
       viewTypeContainer: {
           basic: (style, props) => ({
               ...style,
               //left:"-8px",
               padding: "0 12px",
               ...style.occupy(4),
               // maxWidth: "calc( 33.33% - 4px )",
               // flexBasis: "calc( 33.33% - 4px )",
           })
       },
       container: {
           basic: (style, props) => ({
               ...style,
               //left:"-8px",
               padding: "0 12px",
               ...style.occupy(4),
               // maxWidth: "calc( 33.33% - 4px )",
               // flexBasis: "calc( 33.33% - 4px )",
           })
       },
       topLabel: {
           basic: (style, props) => ({
               ...style,
               // height: "0px"
           })
       },
       numberInputContainer: {
           basic: (style, props) => {
               return {
                   ...style,
                   color: props.disable ? null : ((props.focus || props.hover) ? "#1890ff" : "rgba(0, 0, 0, 0.25)")
               }
           }
       },
       numberInputSubContainer: {
           basic: (style, props) => ({
               ...style,
               height: "28px",
           })
       },
       bottomLabel: {
           basic: (style, props) => ({
               ...style,
               // height: "24px"
               minHeight: "24px",
               height: "auto"
           })
       }
   }}
/>








                    <MapGoogle 
                      mapId={"test2"}
                      mapAttr={{
                        //   maxBounds: [[105, 15], [138.45858, 33.4]], // ??????????????????
                          center: { lat:  25.012930, lng: 121.474708} , // ?????????????????????????????? [lng, lat]  // 25.012930, 121.474708
                          zoom: 16, // ?????? ZOOM LEVEL; [0-20, 0 ????????? (???), 20 ;?????? (???)]
                        //   minZoom: 6, // ????????????????????????????????????, ?????????, [0-19.99]
                        //   maxZoom: 19.99, // ????????????????????????????????????, ????????? [0-19.99]
                        //   pitch: 0, // ???????????????, ?????????, [0-60] // default 50
                        //   bearing: 0, // ????????????, ?????????, [-180 ~ 180; 0 ???????????????, 180 ???????????????]
                        //   attributionControl: false,
                      }}
                  
                      theme={{
                          mapContainer:{
                              basic:(style,props)=>({
                              ...style,
                              width:"100%",
                              height:"300px"    
                              })
                          }
                      }}
                      />
                    
                    <button onClick={()=>{
                     // var nowMapCenterPoint = map8Controll.getBasicMap("test1")?.getCenter();
                    //  console.log( globalContextService.get("Map8Obj","test1"),nowMapCenterPoint)

                    mapGoogleControll.addMarker("test2",{ lat:  25.012930, lng: 121.474708})
                    mapGoogleControll.addMarker("test2",{ lat:  25.013930, lng: 121.574708})
                    mapGoogleControll.addMarker("test2",{ lat:  25.014930, lng: 121.674708})
      

                    }}
                    >
                    ????????????        
                    </button>

                    <button onClick={()=>{
                        mapGoogleControll.hideMarkers("test2")
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                        mapGoogleControll.showMarkers("test2")
                    }}
                    >
                    ????????????

                    </button>

                    <button onClick={()=>{
                        mapGoogleControll.deleteMarkers("test2")
                    }}
                    >
                    ????????????

                    </button>

                </div>



            </MainPageContainer>
        </>
    )
}