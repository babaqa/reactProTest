import layout from './Layout/Layout'
import login from './Pages/Login/Login'
import unit from './Pages/Unit/Unit'
import test from './Pages/Test/Test'
import member from './Pages/Member/Member'
import allBusRouteComponent from './Pages/Member/AllBusRouteComponent/AllBusRouteComponent'

import systemNewsComponent from './Pages/Unit/SystemNewsComponent/SystemNewsComponent'
// import systemTestComponent from './Pages/Test/SystemTestComponent/SystemTestComponent'

import mailService from './Pages/MailService/MailService'
import caseCallCarComponent from './Pages/MailService/CaseCallCarComponent/CaseCallCarComponent'
import busCallCarComponent from './Pages/MailService/BusCallCarComponent/BusCallCarComponent'
import whiteCallCarComponent from './Pages/MailService/WhiteCallCarComponent/WhiteCallCarComponent'
// import callCarAgain from './Pages/CallCarAgain/CallCarAgain'

// import fastCallCar from './Pages/FastCallCar/FastCallCar'

import lawsAndRegulations from './Pages/LawsAndRegulations/LawsAndRegulations'
import files from './Pages/Files/Files'
import application from './Pages/Application/Application'
import qAndA from './Pages/QAndA/QAndA'

export default {
    layout,
    pages: {
        login,

        //#region 測試首頁
        // test: {
        //     ...test,
        //     component: {
        //         systemTestComponent,
        //     }
        // },

        //#endregion

        //#region 單位簡介
        unit: {
            ...unit,
            component: {
                systemNewsComponent,
            }
        },

        //#endregion

        //#region 成員介紹
        member: {
            ...member,
            component: {
                allBusRouteComponent,
            }
        },

        //#endregion

        //#region 郵寄服務
        mailService: {
            ...mailService,
            component: {
                caseCallCarComponent,
                busCallCarComponent,
                whiteCallCarComponent,
            }
        },
        //#endregion

        //#region 快速叫車
        // fastCallCar,
        //#endregion

        //#region 再次預約
        // callCarAgain,
        //#endregion

        //#region 法令規章
        lawsAndRegulations,
        //#endregion

        //#region 臺藝檔案
        files,
        //#endregion

        //#region 檔案應用
        application,
        //#endregion

        //#region 常見問題
        qAndA,
        //#endregion

    }
}