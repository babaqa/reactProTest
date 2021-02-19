import layout from './Layout/Layout'
import login from './Pages/Login/Login'
import news from './Pages/News/News'
import busRoute from './Pages/BusRoute/BusRoute'
import allBusRouteComponent from './Pages/BusRoute/AllBusRouteComponent/AllBusRouteComponent'

import systemNewsComponent from './Pages/News/SystemNewsComponent/SystemNewsComponent'

import callCar from './Pages/CallCar/CallCar'
import caseCallCarComponent from './Pages/CallCar/CaseCallCarComponent/CaseCallCarComponent'
import busCallCarComponent from './Pages/CallCar/BusCallCarComponent/BusCallCarComponent'
import whiteCallCarComponent from './Pages/CallCar/WhiteCallCarComponent/WhiteCallCarComponent'

import fastCallCar from './Pages/FastCallCar/FastCallCar'

import record from './Pages/Record/Record'
import userInfo from './Pages/UserInfo/UserInfo'
import contact from './Pages/Contact/Contact'
import qAndA from './Pages/QAndA/QAndA'

export default {
    layout,
    pages: {
        login,

        //#region 最新消息
        news: {
            ...news,
            component: {
                systemNewsComponent,
            }
        },

        //#endregion

        //#region 最新消息
        busRoute: {
            ...busRoute,
            component: {
                allBusRouteComponent,
            }
        },

        //#endregion

        //#region 預約訂車
        callCar: {
            ...callCar,
            component: {
                caseCallCarComponent,
                busCallCarComponent,
                whiteCallCarComponent,
            }
        },
        //#endregion

        //#region 快速叫車
        fastCallCar,
        //#endregion

        //#region 訂單檢視
        record,
        //#endregion

        //#region 用戶資料
        userInfo,
        //#endregion

        //#region 聯繫客服
        contact,
        //#endregion

        //#region 常見問題
        qAndA,
        //#endregion

    }
}