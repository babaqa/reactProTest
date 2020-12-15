import layout from './Layout/Layout'
import login from './Pages/Login/Login'
import cases from './Pages/Case/Case'
import orgManager from './Pages/Base/OrgManager/OrgManager'
import roleManager from './Pages/Base/RoleManager/RoleManager'
import userManager from './Pages/Base/UserManager/UserManager'
import carAndDriverSetting from './Pages/Base/CarAndDriverSetting/CarAndDriverSetting'
import fareSubsidyParam from './Pages/Base/FareSubsidyParam/FareSubsidyParam'
import medicalOrgManager from './Pages/Base/MedicalOrgManager/MedicalOrgManager'
import operatingUnitSetting from './Pages/Base/OperatingUnitSetting/OperatingUnitSetting'
import news from './Pages/News/News'

import callCar from './Pages/CallCar/CallCar'
import caseCallCarComponent from './Pages/CallCar/CaseCallCarComponent/CaseCallCarComponent'
import busCallCarComponent from './Pages/CallCar/BusCallCarComponent/BusCallCarComponent'
import whiteCallCarComponent from './Pages/CallCar/WhiteCallCarComponent/WhiteCallCarComponent'

import record from './Pages/Record/Record'
import contact from './Pages/Contact/Contact'
import qAndA from './Pages/QAndA/QAndA'
import order from './Pages/Order/Order'
import busRoute from './Pages/BusRouteAndStop/BusRoute/BusRoute'
import pickUpData from './Pages/Report/PickUpData/PickUpData'
import revenue from './Pages/Report/Revenue/Revenue'
import carUsed from './Pages/Report/CarUsed/CarUsed'
import carAreaRate from './Pages/Report/CarAreaRate/CarAreaRate'
import serviceMonthlyReport from './Pages/Report/ServiceMonthlyReport/ServiceMonthlyReport'
import problemSheet from './Pages/Report/ProblemSheet/ProblemSheet'
import exportReport from './Pages/Report/ExportReport/ExportReport'

import drivers from './Pages/DriverAndCar/Drivers/Drivers'
import cars from './Pages/DriverAndCar/Cars/Cars'
import carFixedRecord from './Pages/DriverAndCar/CarFixedRecord/CarFixedRecord'

import busStop from './Pages/BusRouteAndStop/BusStop/BusStop'

import whiteConsole from './Pages/Dispatch/WhiteConsole/WhiteConsole'
import busConsole from './Pages/Dispatch/BusConsole/BusConsole'

export default {
    layout,
    pages: {
        login,
        cases, // case 是保留字

        //#region Base 系統資料管理
        orgManager,
        roleManager,
        userManager,
        carAndDriverSetting,
        fareSubsidyParam,
        medicalOrgManager,
        operatingUnitSetting,
        //#endregion

        //#region 最新消息
        news,
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

        //#region 搭乘紀錄
        record,
        //#endregion

        //#region 聯繫客服
        contact,
        //#endregion

        //#region 常見問題
        qAndA,
        //#endregion

        //#region 預約訂單
        order,
        //#endregion

        //#region 報表管理
        pickUpData,
        revenue,
        carUsed,
        carAreaRate,
        serviceMonthlyReport,
        problemSheet,
        exportReport,
        //#endregion

        busRoute,

        //#region 司機車輛管理
        drivers,
        cars,
        carFixedRecord,
        //#endregion

        //#region 路線及站牌管理
        busStop,
        //#endregion

        //#region 派車調度
        whiteConsole, // 白牌車調度台
        busConsole, // 幸福巴士調度台
        //#endregion

    }
}