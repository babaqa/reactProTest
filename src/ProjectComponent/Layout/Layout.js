import React, { useState, useContext, useEffect } from 'react';
import { Context, Tooltip, BackstageLeftSideMenuBar, BackstagePageTabBar, BackstageTopMenuBar, ScrollBar, BasicContainer, LeftSideDrawer, SubContainer, Text, BasicButton, DropDown, modalsService, globalContextService, Container } from '../../Components'
import { useWindowSize } from '../../SelfHooks/useWindowSize'
import { ReactComponent as ArrowUp } from '../../Assets/img/BackstageLeftSideMenuBar/ArrowUp.svg'
import { ReactComponent as WhiteBlock } from '../../Assets/img/BackstageLeftSideMenuBar/WhiteBlock.svg'

import { ReactComponent as LaptopLLogo } from '../../Assets/img/LaptopLLogo.svg'
import { ReactComponent as LaptopLogo } from '../../Assets/img/LaptopLogo.svg'
import { ReactComponent as TabletLogo } from '../../Assets/img/TabletLogo.svg'
import { ReactComponent as MobileMLogo } from '../../Assets/img/LaptopLogo.svg'
import { ReactComponent as MobileMMenu } from '../../Assets/img/MobileMMenu.svg'

import { ReactComponent as NewsTab } from '../../Assets/img/NewsTab.svg'
import { ReactComponent as CallCarTab } from '../../Assets/img/CallCarTab.svg'
import { ReactComponent as BusRouteTab } from '../../Assets/img/BusRouteTab.svg'
import { ReactComponent as RecordTab } from '../../Assets/img/RecordTab.svg'
import { ReactComponent as UserInfoTab } from '../../Assets/img/UserInfoTab.svg'
import { ReactComponent as ContactTab } from '../../Assets/img/ContactTab.svg'
import { ReactComponent as QAndATab } from '../../Assets/img/QAndATab.svg'
import { ReactComponent as LogoutLaptop } from '../../Assets/img/LogoutLaptop.svg'
import { ReactComponent as LoginLaptop } from '../../Assets/img/LoginLaptop.svg'
import { ReactComponent as MailService } from '../../Assets/img/MailService.svg'

import { ReactComponent as Line } from '../../Assets/img/Line.svg'
import { ReactComponent as Castle } from '../../Assets/img/Castle.svg'
import { ReactComponent as Clock } from '../../Assets/img/Clock.svg'
import { ReactComponent as CallWorkTime } from '../../Assets/img/CallWorkTime.svg'
import { ReactComponent as DotOfmap } from '../../Assets/img/DotOfmap.svg'

import { ReactComponent as LeftMenuTab } from '../../Assets/img/LeftMenuTab.svg'
import { ReactComponent as LeftMenuCross } from '../../Assets/img/LeftMenuCross.svg'
import { ReactComponent as LeftMenuPlus } from '../../Assets/img/LeftMenuPlus.svg'
import { ReactComponent as LeftMenuCloseSubTab } from '../../Assets/img/LeftMenuCloseSubTab.svg'

import { ReactComponent as MobileMFooterLogo } from '../../Assets/img/MobileMFooterLogo.svg'

import { getParseItemLocalStorage, setStringifyItemSession, pushAndNotExsistItemSession, getParseItemSession, removeByKeyItemSession, clearLocalStorage, clearSession, setStringifyItemLocalStorage } from '../../Handlers';
import { iconMap, pageTabBarUrlMapping, pageTextUrlMapping, subTabMapping, urlMapping } from '../../Mappings/Mappings'
import { useHistory, useLocation } from 'react-router-dom';
import { isNil } from 'lodash';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

export const Layout = (props) => {
    //const [Collapse, setCollapse] = useState(false);
    const [DrawerCollapse, setDrawerCollapse] = useState(true);
    const [NeedHover, setNeedHover] = useState(false); // DropDown ???????????????hover
    const [ExtendSubTab, setExtendSubTab] = useState(""); // ????????????Tab
    const [width, Height] = useWindowSize();

    const { Collapse, setCollapse, Theme, Switch } = useContext(Context);
    const { layout } = Theme;
    let history = useHistory();
    let location = useLocation();

    const [ExpandMenuName, setExpandMenuName] = useState([]); // ?????????????????????
    const [IsHoverMenuName, setIsHoverMenuName] = useState([]); // ?????????????????????

    if (!getParseItemLocalStorage("MenuNameAndSubUrl")) {
        setStringifyItemLocalStorage("MenuNameAndSubUrl",
            {
                "????????????": ["/Unit"],
                "????????????": ["/Member"],
                "????????????": ["/LawsAndRegulations"],
                "????????????": ["/LawsAndRegulations"],
                "????????????????????????": ["/LawsAndRegulations"],
                "????????????": ["/Files"],
                "????????????": ["/Files"],
                "???????????????": ["/Files"],
                "???????????????": ["/Files"],
                "????????????": ["/Application"],
                "??????????????????": ["/Application"],
                "??????????????????": ["/Application"],
                "????????????": ["/Application"],
                "??????????????????Q&A": ["/QAndA"],
                "??????????????????": ["/QAndA"],
                "??????????????????": ["/QAndA"],
                "????????????": ["/MailService"],
            })
    }

    useEffect(() => {
        //#region 
        setExtendSubTab(location.pathname);
        //#endregion
    }, [location])

    useEffect(() => {
        setDrawerCollapse(true);
    }, [width])

    useEffect(() => {
        //#region ????????????????????????????????????
        // console.log(getParseItemSession("Ctab"))
        if (isNil(getParseItemSession("Ctab")) || (getParseItemSession("Ctab") ?? []).length === 0) {
            setStringifyItemSession("Ctab", [{ title: "??????", path: "/" }])
        }
        //#endregion
    })

    useEffect(() => {
        // setStringifyItemSession("Ctab", [{ title: "???????????????", path: "/xxx/yyy" }, { title: "???????????????", path: "/aaa/bbb" }, { title: "???????????????c", path: "/aaa/ccc" },
        // { title: "???????????????", path: "/aaa/111" }, { title: "???????????????", path: "/aaa/333" }, { title: "???????????????c", path: "/aaa/555" },
        // { title: "???????????????", path: "/aaa/222" }, { title: "???????????????", path: "/aaa/444" }, { title: "???????????????c", path: "/aaa/666" }])

        //#region ????????????????????????????????????
        // console.log(getParseItemSession("Ctab"))
        // if (isNil(getParseItemSession("Ctab")) || (getParseItemSession("Ctab") ?? []).length === 0) {
        //     setStringifyItemSession("Ctab", [{ title: "??????", path: "/" }])
        // }
        //#endregion

        //#region ?????????????????????????????????????????? ?????? ?????????????????????????????????
        // !! ?????? ?????????????????? pageTabBarUrlMapping ?????????????????? 
        let historyOpenTab = (getParseItemSession("Ctab") ?? []).map((item => item.path))
        if ((!historyOpenTab.includes(location.pathname) && pageTabBarUrlMapping[location.pathname])) {
            pushAndNotExsistItemSession("Ctab", "path", location.pathname, { title: pageTabBarUrlMapping[location.pathname], path: location.pathname })
        }
        //#endregion

        //#region ??????????????????????????????????????????
        let canUseFunctions = getParseItemLocalStorage("Functions") ?? []
        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl") ?? []) ?? []
        let res = [];
        // console.log(keys);
        //#region ???????????????????????????????????????????????????????????????????????? Functions
        if (canUseFunctions.includes(location.pathname)) {
            //?????????????????????
            let totalLength = location.pathname.length;
            let split = location.pathname.split("/")
            let howManyToRemove = [...split[split.length - 1]].length + 1;
            let pathnameRes = location.pathname.substring(0, totalLength - howManyToRemove);// ??????????????? ????????? ????????????

            keys.forEach(
                (item) => {
                    if (menuNameAndSubUrl[item].includes(pathnameRes)) {
                        res = [...res, item]
                    }
                }
            )
        }
        else {
            //??????????????????
            keys.forEach(
                (item) => {
                    if (menuNameAndSubUrl[item].includes(location.pathname)) {
                        res = [...res, item]
                    }
                }
            )
        }
        // console.log(res)
        //#endregion
        setExpandMenuName(res.length > 1 ? res : [])
        //#endregion

    }, [DrawerCollapse]) // ????????????????????????????????? ????????? ?????? ??????????????????????????? ??????????????? ??????

    if (localStorage.getItem("CAuth") === null) {
        // return null
    }

    const TabMapping = (key) => {
        // ????????????  Unit
        // ????????????  Member
        // ????????????  LawsAndRegulations
        // ????????????  Files
        // ????????????  Application
        // ??????????????????Q&A  QAndA
        // ????????????  MailService
        switch (key) {
            case "allTabNameLaptopL":
                return [
                    { path: "/Unit", name: "????????????" },
                    // {
                    //     path: "/CallCar", name: "????????????", icon: <CallCarTab style={layout.titleBarTabIconLaptopL} />,
                    //     dropDown: [
                    //         { path: "/CallCar", name: "????????????" },
                    //         { path: "/FastCallCar", name: "????????????" },
                    //     ]
                    // },
                    { path: "/Member", name: "????????????" },
                    {
                        path: "/LawsAndRegulations", name: "????????????",
                        subName: [
                            "SchoolRegulations",
                            "FileRelatedRegulations",
                        ]
                    },
                    {
                        path: "/Files", name: "????????????",
                        subName: [
                            "KnowNTUA",
                            "BillboardOfNTUA",
                            "OnlineArchiveExhibition",
                        ]
                    },
                    {
                        path: "/Application", name: "????????????",
                        subName: [
                            "RelatedRegulations",
                            "FileApplication",
                            "ValueAddedApplications",
                        ]
                    },
                    {
                        path: "/QAndA", name: "??????????????????Q&A",
                        subName: [
                            "DownloadForm",
                            "FrequentlyQuestions",
                        ]
                    },
                    { path: "/MailService", name: "????????????", icon: <MailService style={layout.titleBarTabMailIconLaptopL} /> },
                ]
            case "allTabNameLaptop":
                return [
                    { path: "/Unit", name: "????????????" },
                    // {
                    //     path: "/CallCar", name: "????????????", icon: <CallCarTab style={layout.titleBarTabIconLaptopL} />,
                    //     dropDown: [
                    //         { path: "/CallCar", name: "????????????" },
                    //         { path: "/FastCallCar", name: "????????????" },
                    //     ]
                    // },
                    { path: "/Member", name: "????????????" },
                    {
                        path: "/LawsAndRegulations", name: "????????????",
                        subName: [
                            "SchoolRegulations",
                            "FileRelatedRegulations",
                        ]
                    },
                    {
                        path: "/Files", name: "????????????",
                        subName: [
                            "KnowNTUA",
                            "BillboardOfNTUA",
                            "OnlineArchiveExhibition",
                        ]
                    },
                    {
                        path: "/Application", name: "????????????",
                        subName: [
                            "RelatedRegulations",
                            "FileApplication",
                            "ValueAddedApplications",
                        ]
                    },
                    {
                        path: "/QAndA", name: "??????????????????Q&A",
                        subName: [
                            "DownloadForm",
                            "FrequentlyQuestions",
                        ]
                    },
                    { path: "/MailService", name: "????????????", icon: <MailService style={layout.titleBarTabMailIconLaptopL} /> },
                ]
            case "allTabNameTablet":
                return [
                    { path: "/Unit", name: "????????????", icon: <NewsTab style={layout.titleBarTabIconTablet} /> },
                    // {
                    //     path: "/CallCar", name: "????????????", icon: <CallCarTab style={layout.titleBarTabIconTablet} />,
                    //     dropDown: [
                    //         { path: "/CallCar", name: "????????????" },
                    //         { path: "/FastCallCar", name: "????????????" },
                    //     ]
                    // },
                    { path: "/Member", name: "????????????", icon: <BusRouteTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/LawsAndRegulations", name: "????????????", icon: <RecordTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/Files", name: "????????????", icon: <UserInfoTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/Application", name: "????????????", icon: <ContactTab style={layout.titleBarTabIconTablet} /> },
                    { path: "/QAndA", name: "??????????????????Q&A", icon: <QAndATab style={layout.titleBarTabIconTablet} /> },
                    { path: "/MailService", name: "????????????", icon: <MailService style={layout.titleBarTabMailIconLaptopL} /> },
                ]
            case "allTabNameMobileMLeftSide":
                return [
                    {
                        item: {
                            id: "1",
                            url: "/Unit",
                            name: "????????????",
                            parentName: "?????????"
                        },
                        children: []
                    },
                    {
                        item: {
                            id: "2",
                            url: "/Member",
                            name: "????????????",
                            parentName: "?????????"
                        },
                        children: []
                    },
                    {
                        item: {
                            id: "3",
                            url: "/LawsAndRegulations",
                            name: "????????????",
                            parentName: "?????????",
                        },
                        children: [
                            {
                                item: {
                                    id: "3.1",
                                    url: "/LawsAndRegulations",
                                    name: "????????????",
                                    parentName: "????????????",
                                    subName: "SchoolRegulations"
                                },
                                children: []
                            },
                            {
                                item: {
                                    id: "3.2",
                                    url: "/LawsAndRegulations",
                                    name: "????????????????????????",
                                    parentName: "????????????",
                                    subName: "FileRelatedRegulations"
                                },
                                children: []
                            },
                        ]
                    },
                    {
                        item: {
                            id: "4",
                            url: "/Files",
                            name: "????????????",
                            parentName: "?????????"
                        },
                        children: [
                            {
                                item: {
                                    id: "4.1",
                                    url: "/Files",
                                    name: "????????????",
                                    parentName: "????????????",
                                    subName: "KnowNTUA"
                                },
                                children: []
                            },
                            {
                                item: {
                                    id: "4.2",
                                    url: "/Files",
                                    name: "???????????????",
                                    parentName: "????????????",
                                    subName: "BillboardOfNTUA"
                                },
                                children: []
                            },
                            {
                                item: {
                                    id: "4.3",
                                    url: "/Files",
                                    name: "???????????????",
                                    parentName: "????????????",
                                    subName: "OnlineArchiveExhibition"
                                },
                                children: []
                            },
                        ]
                    },
                    {
                        item: {
                            id: "5",
                            url: "/Application",
                            name: "????????????",
                            parentName: "?????????"
                        },
                        children: [
                            {
                                item: {
                                    id: "5.1",
                                    url: "/Application",
                                    name: "??????????????????",
                                    parentName: "????????????",
                                    subName: "RelatedRegulations"
                                },
                                children: []
                            },
                            {
                                item: {
                                    id: "5.2",
                                    url: "/Application",
                                    name: "??????????????????",
                                    parentName: "????????????",
                                    subName: "FileApplication"
                                },
                                children: []
                            },
                            {
                                item: {
                                    id: "5.3",
                                    url: "/Application",
                                    name: "????????????",
                                    parentName: "????????????",
                                    subName: "ValueAddedApplications"
                                },
                                children: []
                            },
                        ]
                    },
                    {
                        item: {
                            id: "6",
                            url: "/QAndA",
                            name: "??????????????????Q&A",
                            parentName: "?????????"
                        },
                        children: [
                            {
                                item: {
                                    id: "6.1",
                                    url: "/QAndA",
                                    name: "??????????????????",
                                    parentName: "??????????????????Q&A",
                                    subName: "DownloadForm"
                                },
                                children: []
                            },
                            {
                                item: {
                                    id: "6.2",
                                    url: "/QAndA",
                                    name: "??????????????????",
                                    parentName: "??????????????????Q&A",
                                    subName: "FrequentlyQuestions"
                                },
                                children: []
                            },
                        ]
                    },
                    {
                        item: {
                            id: "7",
                            url: "/MailService",
                            name: "????????????",
                            parentName: "?????????"
                        },
                        children: []
                    },
                ]
            default:
                break;
        }
    }


    return (
        <>
            {/* ??????1440????????? (laptop)*/}
            {width >= 1440 &&
                <>
                    {/* ??????????????? LaptopL */}
                    <Container
                        theme={layout.titleBarContainerLaptopL}
                    >
                        {/* Logo?????? LaptopL */}
                        <SubContainer
                            theme={layout.titleBarLogoContainerLaptopL}
                        >
                            {/* Logo ICON LaptopL */}
                            <LaptopLLogo
                                style={layout.titleBarLogoIconLaptopL}
                                onClick={() => {
                                    history.push("/");
                                }}
                            />
                        </SubContainer>

                        {/* Tab ?????? LaptopL */}
                        <SubContainer
                            theme={layout.titleBarTabContainerLaptopL}
                        >
                            {/* Tab ????????? LaptopL */}
                            <Container
                                theme={layout.titleBarTabSubContainerLaptopL}
                            >
                                {TabMapping("allTabNameLaptopL").map((item => {
                                    return (
                                        <React.Fragment key={item.path}>
                                            {
                                                (item.path !== "/MailService") ?
                                                    <>
                                                        {/* Tab???????????? */}
                                                        < BasicContainer
                                                            active={location.pathname === item.path}
                                                            theme={layout.titleBarTabItemContainerLaptopL}
                                                            onClick={() => {
                                                                if (item?.subName) {
                                                                    history.push(`${item.path}?subTab=${item.subName[0]}`)
                                                                }
                                                                else {
                                                                    history.push(item.path)
                                                                }
                                                            }}
                                                        >
                                                            {/* {item.icon} */}
                                                            <Text
                                                                theme={layout.titleBarTabTextLaptopL}
                                                            >
                                                                {item.name}
                                                            </Text>

                                                        </BasicContainer>
                                                    </>
                                                    :
                                                    <>
                                                        {/* Tab???????????? */}
                                                        < BasicContainer
                                                            active={location.pathname === item.path}
                                                            theme={layout.titleBarTabItemMailContainerLaptopL}
                                                            onClick={() => { history.push(item.path) }}
                                                        >
                                                            {item.icon}
                                                            <Text
                                                                theme={layout.titleBarTabMailTextLaptopL}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                        </BasicContainer>
                                                    </>
                                            }
                                        </React.Fragment>
                                    )
                                }))}

                            </Container>
                        </SubContainer>



                    </Container>
                </>
            }

            {/* ??????1024 ??? ??????1440????????? (laptop)*/}
            {
                (width >= 1024 && width < 1440) &&
                <>
                    {/* ??????????????? Laptop */}
                    <Container
                        theme={layout.titleBarContainerLaptop}
                    >
                        {/* Logo?????? Laptop */}
                        <SubContainer
                            theme={layout.titleBarLogoContainerLaptop}
                        >
                            {/* Logo ICON Laptop */}
                            <LaptopLogo
                                style={layout.titleBarLogoIconLaptop}
                                onClick={() => {
                                    history.push("/");
                                }}
                            />
                        </SubContainer>

                        {/* Tab ?????? Laptop */}
                        <SubContainer
                            theme={layout.titleBarTabContainerLaptop}
                        >
                            {/* Tab ????????? Laptop */}
                            <Container
                                theme={layout.titleBarTabSubContainerLaptop}
                            >
                                {TabMapping("allTabNameLaptop").map((item => {
                                    return (
                                        <React.Fragment key={item.path}>
                                            {
                                                (item.path !== "/MailService")
                                                    ?
                                                    <>
                                                        {/* Tab???????????? */}
                                                        < BasicContainer
                                                            active={location.pathname === item.path}
                                                            theme={layout.titleBarTabItemContainerLaptop}
                                                            onClick={() => {
                                                                if (item?.subName) {
                                                                    history.push(`${item.path}?subTab=${item.subName[0]}`)
                                                                }
                                                                else {
                                                                    history.push(item.path)
                                                                }
                                                            }}
                                                        >
                                                            <Text
                                                                theme={layout.titleBarTabTextLaptop}
                                                            >
                                                                {item.name}
                                                            </Text>

                                                        </BasicContainer>
                                                    </>
                                                    :
                                                    <>
                                                        {/* Tab???????????? */}
                                                        < BasicContainer
                                                            active={location.pathname === "/MailService"}
                                                            theme={layout.titleBarMailServiceContainerLaptop}
                                                            onClick={() => { history.push("/MailService") }}
                                                        >
                                                            <MailService />
                                                        </BasicContainer>
                                                    </>
                                            }
                                        </React.Fragment>
                                    )
                                }))}

                            </Container>

                        </SubContainer>

                    </Container>
                </>
            }

            {/* ??????768 ??? ??????1024????????? (Tablet)*/}
            {/* {
                // (width >= 768 && width < 1024) &&
                <> */}
            {/* ??????????????? Tablet */}
            {/* <Container
                        theme={layout.titleBarContainerTablet}
                    > */}
            {/* Logo?????? Tablet */}
            {/* <SubContainer
                            theme={layout.titleBarLogoContainerTablet}
                        > */}
            {/* Logo ICON Tablet */}
            {/* <TabletLogo style={layout.titleBarLogoIconTablet} />
                        </SubContainer> */}

            {/* Tab ?????? Tablet */}
            {/* <SubContainer
                            theme={layout.titleBarTabContainerTablet}
                        > */}
            {/* Tab ????????? Tablet */}
            {/* <Container
                                theme={layout.titleBarTabSubContainerTablet}
                            >
                                {TabMapping("allTabNameTablet").map((item => {
                                    return (
                                        <React.Fragment key={item.path}>
                                            {
                                                (item.path !== "/CallCar") ?
                                                    <> */}
            {/* Tab???????????? */}
            {/* < BasicContainer
                                                            active={location.pathname === item.path}
                                                            theme={layout.titleBarTabItemContainerTablet}
                                                            onClick={() => { history.push(item.path) }}
                                                        >
                                                            {item.icon}
                                                            <Text
                                                                theme={layout.titleBarTabTextTablet}
                                                            >
                                                                {item.name}
                                                            </Text>

                                                        </BasicContainer>
                                                    </>
                                                    :
                                                    <DropDown
                                                        placement={"bottomCenter"}
                                                        dropDownItem={
                                                            <> */}
            {/* DropDown ???????????? */}
            {/* <BasicContainer
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    theme={layout.laptopDropDownItemContainer}
                                                                > */}
            {/* DropDown ????????? */}
            {/* {item.dropDown.map((it) => {
                                                                        return (
                                                                            <Text
                                                                                onMouseOver={(e) => { setNeedHover(true); props.onMouseover && props.onMouseover(e); }}
                                                                                onMouseOut={(e) => { setNeedHover(false); props.onMouseout && props.onMouseout(e); }}
                                                                                key={it.path}
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                theme={layout.laptopDropDownSubItemContainer}
                                                                                onClick={() => { history.push(it.path) }}
                                                                            >
                                                                                {it.name}
                                                                            </Text>
                                                                        )
                                                                    })
                                                                    }
                                                                </BasicContainer>
                                                            </>
                                                        }
                                                    > */}

            {/* Tab???????????? */}
            {/* < BasicContainer
                                                            active={location.pathname === item.path}
                                                            needHover={NeedHover}
                                                            theme={layout.titleBarTabItemContainerTablet}
                                                        // onClick={() => { history.push(item.path) }}
                                                        >
                                                            {item.icon}
                                                            <Text
                                                                theme={layout.titleBarTabTextTablet}
                                                            >
                                                                {item.name}
                                                            </Text>

                                                        </BasicContainer>
                                                    </DropDown>
                                            }
                                        </React.Fragment>
                                    )
                                }))}

                            </Container>
                        </SubContainer> */}

            {/* ?????????????????????????????? */}
            {/* <SubContainer
                            theme={layout.titleBarUserAndLogoutTablet}
                        > */}
            {/* ????????????????????????????????? */}
            {/* <BasicContainer
                                theme={layout.titleBarUserAndLogoutSubTablet}
                            > */}
            {/* ??????????????? */}
            {/* <Text
                                    theme={layout.titleBarUserTablet}
                                >
                                    Hi! {getParseItemLocalStorage("CAuth") ? getParseItemLocalStorage("UserName") : "??????"}
                                </Text> */}
            {/* ??????????????? ?????? */}
            {/* <Text
                                    theme={layout.titleBarUserStepTablet}
                                >
                                    |
                                </Text>

                                {getParseItemLocalStorage("CAuth")
                                    ?
                                    <> */}
            {/* ?????? */}
            {/* <Text
                                            theme={layout.titleBarLogoutTablet}
                                            onClick={() => {
                                                modalsService.infoModal.warn({
                                                    iconRightText: "????????????????",
                                                    yes: true,
                                                    yesText: "??????",
                                                    no: true,
                                                    noText: "??????",
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    yesOnClick: (e, close) => {
                                                        clearLocalStorage();
                                                        clearSession();
                                                        globalContextService.clear();
                                                        Switch();
                                                        close();
                                                    }
                                                })
                                            }}
                                        >
                                            <LogoutLaptop style={layout.titleBarLogoutIconTablet} />
                                            ??????
                                        </Text>
                                    </>
                                    :
                                    <> */}
            {/* ?????? */}
            {/* <Text
                                            theme={layout.titleBarLogoutTablet}
                                            onClick={() => { history.push("/Login") }}
                                        >
                                            <LoginLaptop style={layout.titleBarLogoutIconTablet} />
                                            ??????
                                        </Text>
                                    </>
                                }

                            </BasicContainer>
                        </SubContainer>
                    </Container> */}
            {/* </>
            } */}

            {/* ????????????1024????????? (MobileM) */}
            {
                width < 1024 &&
                <>
                    {/* ??????????????? MobileM */}
                    <Container
                        theme={layout.titleBarContainerMobileM}
                    >


                        {/* Logo?????? */}
                        <SubContainer
                            theme={layout.titleBarLogoContainerMobileM}
                        >
                            <MobileMLogo
                                onClick={() => {
                                    history.push("/");
                                }}
                            />
                        </SubContainer>

                        {/* ????????????????????? */}
                        <SubContainer
                            theme={layout.titleBarLeftSIdeBtnContainerMobileM}
                        >
                            <MobileMMenu onClick={() => { setDrawerCollapse(false) }} />
                        </SubContainer>
                        {/* ???????????? */}
                        {/* <SubContainer
                            theme={layout.titleBarLoginContainerMobileM}
                        >
                            {!getParseItemLocalStorage("CAuth")
                                &&
                                <> */}
                        {/* ?????? */}
                        {/* <Text
                                        theme={layout.titleBarLoginMobileM}
                                        onClick={() => { history.push("/Login") }}
                                    >
                                        <LogoutLaptop style={layout.titleBarLoginIconMobileM} />
                                        ??????
                                    </Text>
                                </>
                            }
                        </SubContainer> */}
                    </Container>

                    {/* LeftSideDrawer ?????? MobileM */}
                    <LeftSideDrawer
                        baseDefaultTheme={"DefaultTheme"}
                        collapse={DrawerCollapse}
                        containerEvent={{ onClick: () => { setDrawerCollapse(true) } }}
                        theme={layout.leftSideDrawerMobileM}
                    >
                        {/* Menu??? MobileM */}
                        <ScrollBar
                            basedefaulttheme={"DefaultTheme"}
                            className={`collapseMenuAreaScrollBar`}
                            autoHide={true}
                            theme={layout.menuAreaScrollBarMobileM}
                        >
                            {/* ?????????????????? */}
                            {/* <Container
                                height={Height}
                                theme={layout.titleBarFixedBottomMobileM}
                            > */}
                            <BackstageLeftSideMenuBar baseDefaultTheme={"DefaultTheme"}
                                collapse={DrawerCollapse}
                                logo={false}
                                setDrawerCollapse={setDrawerCollapse}
                                // logoText={
                                //     <LogoAll />
                                //     // <Text
                                //     //     baseDefaultTheme={"TextDefaultTheme"}
                                //     //     theme={layout.laptopBackstageLeftSideMenuBarLogoText}
                                //     // >
                                //     //     ????????????????????????
                                //     // </Text>
                                // }
                                menuItem={
                                    generateMenu(TabMapping("allTabNameMobileMLeftSide"), history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse)
                                }
                            />
                            {/* {TabMapping("allTabNameMobileMLeftSide").map((item => {
                                    return (
                                        <React.Fragment key={item.path}> */}
                            {/* Tab???????????? */}
                            {/* <BasicContainer
                                                extend={(item?.subTab ?? []).length > 0 && ExtendSubTab.pathname === item.path}
                                                theme={layout.titleBarTabItemContainerMobileM}
                                                onClick={() => {
                                                    if ((item?.subTab ?? []).length > 0) {
                                                        if (ExtendSubTab.pathname !== item.path) {
                                                            setExtendSubTab(item.path);
                                                        }
                                                    } else {
                                                        history.push(item.path);
                                                    }
                                                }}
                                            >
                                                {
                                                    location.pathname === item.path
                                                    &&
                                                    <LeftMenuTab style={layout.LeftMenuTabPoent} />
                                                }

                                                <Text
                                                    theme={layout.titleBarTabTextMobileM}
                                                >
                                                    {item.name}
                                                </Text>

                                                {
                                                    (item?.subTab ?? []).length > 0
                                                    &&
                                                    <LeftMenuPlus />
                                                }
                                            </BasicContainer>
                                            {console.log(ExtendSubTab)}
                                            {
                                                (
                                                    (item?.subTab ?? []).length > 0
                                                    &&
                                                    ExtendSubTab === item.path
                                                )
                                                &&
                                                <> */}
                            {/* Sub???????????? */}
                            {/* < BasicContainer
                                                        theme={layout.titleBarSubItemContainerMobileM}
                                                    >
                                                        {
                                                            item.subTab.map((subItem) => {
                                                                return (
                                                                    <React.Fragment key={subItem.id}>
                                                                        <Text
                                                                            theme={layout.titleBarSubTextMobileM}
                                                                            onClick={() => { history.push(`${item.path}?id=${subItem.id}`) }}
                                                                        >
                                                                            <LeftMenuTab style={layout.LeftMenuSubPoent} />

                                                                            {subItem.name}
                                                                        </Text>

                                                                    </React.Fragment>
                                                                )
                                                            })
                                                        }
                                                    </BasicContainer>
                                                </>

                                            }
                                        </React.Fragment >
                                    )
                                }))} */}

                            {/* </Container> */}

                        </ScrollBar>
                    </LeftSideDrawer>

                </>
            }
        </>
    )
}

//#region ???????????????????????????
const generateMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024 = false) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // ?????? menuData ??????????????????????????? item ???????????????????????????????????????
        let list = [];
        for (var item of menuData) {
            list.push(generateMenu(item, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024));
        }

        if (list.length > 0) {
            for (var item1 of list) {
                vdom.push(item1);
            }
            // vdom.push(
            //     <BasicContainer key="single" disable={false}>{list}</BasicContainer>
            // );
        }

    } else {
        // ?????? menuData ????????????
        vdom.push(
            <BasicContainer
                key={menuData.item.id}
                baseDeafultTheme={"DefaultTheme"}
                theme={{
                    basic: (style, props) => ({
                        ...style,
                        overflow: "hidden",
                        transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                        maxHeight: ExpandMenuName.includes(menuData.item.name) ? `none` : `${(parseInt(menuData.item.name.length / 7) + 1) * 21}px`,
                        margin: ExpandMenuName.includes(menuData.item.name) ? 0 : "0 0 39px"
                    })
                }}
            >
                {/* {console.log(menuData)} */}
                {/* ????????????????????? */}
                <Text
                    key={menuData.item.id}
                    baseDeafultTheme={"DefaultTheme"}
                    theme={{
                        basic: (style, props) => {
                            return {
                                ...style,
                                // height: "21px",
                                padding: "0 0 0 131px",
                                width: "266px",
                                // margin: "8px 0px",
                                color: " #FFFFFF",
                                fontSize: "18px",
                                lineHeight: "21px",
                                fontFamily: "Roboto",
                                fontWeight: 700,
                                // cursor: "pointer",
                                userSelect: "none",
                                //#region ?????????????????????????????????
                                ...(
                                    // ???????????????????????????????????????????????????????????????????????? Functions
                                    (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                        //?????????????????????
                                        (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            // background: "#e6f7ff",
                                            // boxShadow: "inset -3px 0px 0px #1890ff",
                                            // color: " #1890ff"
                                        }
                                        :
                                        //??????????????????
                                        (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            // background: "#e6f7ff",
                                            // boxShadow: "inset -3px 0px 0px #1890ff",
                                            // color: " #1890ff"
                                        }
                                ),
                                //#endregion

                                //#region ???????????????????????????????????????
                                // ...(
                                //     // ???????????????????????????????????????????????????????????????????????? Functions
                                //     (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                //         //?????????????????????
                                //         (
                                //             (
                                //                 getParseItemLocalStorage("MenuNameAndSubUrl")?.[menuData.item.name] ?? []
                                //             ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                //         {
                                //             color: " #1890ff"
                                //         }
                                //         :
                                //         //??????????????????
                                //         (
                                //             (
                                //                 getParseItemLocalStorage("MenuNameAndSubUrl")?.[menuData.item.name] ?? []
                                //             ).includes(location.pathname) && menuData.item.url.trim() === "/") &&
                                //         {
                                //             color: " #1890ff"
                                //         }

                                // ),
                                //#endregion
                            }
                        },
                    }}
                    onClick={() => {
                        // ?????????????????????????????????????????????
                        if (!menuData.item.id.includes('.')) {
                            // console.log("root")
                            // ???????????????????????????????????? 
                            let haveChildren = Object.values(getParseItemLocalStorage("MenuNameAndSubUrl")).filter((x) => x[0] === menuData.item.url).length > 1
                            if (!haveChildren) {

                                if (location.pathname !== menuData.item.url.trim()) {//(?????????????????????)
                                    pushAndNotExsistItemSession("Ctab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                    // console.log(widthLessThan1024)
                                    // widthLessThan1024 && setDrawerCollapse(true);
                                    setDrawerCollapse(true);
                                    history.push(menuData.item.url.trim())
                                }
                            }
                            //#region ?????????????????????????????? ????????? ?????????????????????????????????
                            if (menuData.item.parentName.trim() === "?????????") {
                                setExpandMenuName(e => {
                                    //#region ??????????????????????????????????????????
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

                                    keys.forEach(
                                        (item) => {
                                            if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                res = [...res, item]
                                            }
                                        }
                                    )
                                    // if (res.length === 0) {
                                    if (res.length > 1 && !ExpandMenuName.includes(menuData.item.name)) {
                                        return [...res, menuData.item.name]
                                    }
                                    else {
                                        // return [...res]
                                        return []
                                    }
                                    //#endregion
                                })
                                //#endregion
                            }
                        } else {
                            // console.log("sub")
                            // ????????????????????????????????????
                            // setExpandMenuName(e => {
                            //     //#region ??????????????????????????????????????????
                            //     let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                            //     let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                            //     let res = [];
                            //     let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

                            //     keys.forEach(
                            //         (item) => {
                            //             if (menuNameAndSubUrl[item].containAll(clickItem)) {
                            //                 res = [...res, item]
                            //             }
                            //         }
                            //     )

                            //     if (res.length === 0) {
                            //         return [...res, menuData.item.name]
                            //     }
                            //     else {
                            //         return [...res]
                            //     }
                            //     //#endregion
                            // })
                            if (location.pathname !== menuData.item.url.trim() || (location.pathname === menuData.item.url.trim() && location.search.split('=')[1] !== menuData.item.id.split('.')[1])) {//(?????????????????????)
                                pushAndNotExsistItemSession("Ctab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                // console.log(widthLessThan1024)
                                // widthLessThan1024 && setDrawerCollapse(true);
                                setDrawerCollapse(true);
                                history.push(`${menuData.item.url.trim()}?subTab=${menuData.item.subName}`)
                            }
                        }
                    }}
                >
                    {
                        menuData?.item?.parentName !== "?????????"
                            ?
                            <>
                                {/* Sub???????????? */}
                                <Text
                                    theme={{
                                        basic: (style, props) => ({
                                            ...style,
                                            color: "#FFFFFF",
                                            userSelect: "none",
                                            fontWeight: 700,
                                            fontSize: "18px",
                                            fontFamily: "Roboto",
                                            lineHeight: "21px",
                                            padding: "12px 32px 12px 54px",
                                            backgroundColor: "#4B4B4B",
                                            width: "175px",
                                            borderBottom: "1px solid #272727"
                                        })
                                    }}
                                >
                                    {
                                        menuData?.item?.subName === location.search.split('subTab=')[1]
                                        &&
                                        <LeftMenuTab style={{
                                            position: "absolute",
                                            top: "16px",
                                            left: "32px"
                                        }} />
                                    }

                                    {menuData?.item?.name}
                                </Text>

                            </>
                            :
                            <>
                                {
                                    menuData?.item?.url === location.pathname
                                    &&
                                    < LeftMenuTab style={{
                                        position: "absolute",
                                        top: "3px",
                                        left: "109px"
                                    }} />
                                }
                                {/* ????????????????????? */}
                                {menuData.item.name}

                                {
                                    Object.values(getParseItemLocalStorage("MenuNameAndSubUrl")).filter((x) => x[0] === menuData.item.url).length > 1
                                    &&
                                    (
                                        ExpandMenuName.includes(menuData?.item?.name)
                                            ?
                                            <LeftMenuCloseSubTab
                                                style={{
                                                    position: "absolute",
                                                    right: "-40px",
                                                    top: "-2px"
                                                }}
                                            />
                                            :
                                            <LeftMenuPlus
                                                style={{
                                                    position: "absolute",
                                                    right: "-40px",
                                                    top: "2px"
                                                }}
                                            />
                                    )
                                }

                            </>
                    }
                    {/* ??????????????????????????? name ??? icon ?????? */}
                    {/* {menuData.item.url.trim() === "/" &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    } */}

                    {/* ??????????????????????????? name ??? icon ?????? (??????????????????????????????) */}
                    {/* {(menuData.item.parentName.trim() === "?????????" && menuData.item.url.trim() !== "/") &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    } */}


                    {/* {menuData.item.url} */}

                    {/* ????????????????????? ????????? icon ?????? */}
                    {menuData.item.url.trim() === "/" &&
                        <ArrowUp
                            style={{
                                position: "absolute",
                                right: "24px",
                                height: "100%"
                            }}
                        />
                    }
                </Text>
                {generateMenu(menuData.children, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024)
                }
            </BasicContainer >
        );
    }
    return vdom;
}
//#endregion

//#region ??????????????? ????????? ??????????????????
const removeTailUrl = (pathname) => {
    let totalLength = pathname.length;
    let split = pathname.split("/")
    let howManyToRemove = [...split[split.length - 1]].length + 1;
    let pathnameRes = pathname.substring(0, totalLength - howManyToRemove);// ??????????????? ????????? ????????????

    return pathnameRes
}
//#endregion

//#region ???????????????????????????
const generateThinMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level = 1, fatherName) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // ?????? menuData ??????????????????????????? item ???????????????????????????????????????
        let list = [];
        for (var item of menuData) {
            if (level === 1) {
                list.push(generateThinMenu(item, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level));
            } else {
                list.push(generateThinMenu(item, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level + 1));
            }
        }

        if (list.length > 0) {
            // for (var item1 of list) {
            //     vdom.push(item1);
            // }
            if (level === 1) {
                vdom.push(
                    <BasicContainer key="single" name="????????????" >{list}</BasicContainer>
                );
            }
            else {
                vdom.push(
                    <BasicContainer
                        key="single"
                        name="????????????"
                        theme={{
                            basic: (style, props) => ({
                                ...style,
                                position: "fixed",
                                width: "240px",
                                left: "56px",
                                overflow: "hidden",
                                backgroundColor: "#fff",
                                boxShadow: "0px 9px 28px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08)",
                                //transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1), opacity .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                                transition: "all .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                                // maxHeight: (IsHoverMenuName && ExpandMenuName.includes(fatherName)) ? `${(list.length) * 40 + 16}px` : "0px",
                                // opacity: (IsHoverMenuName && ExpandMenuName.includes(fatherName)) ? "1" : "0",
                                // padding: (IsHoverMenuName && ExpandMenuName.includes(fatherName)) ? "8px 0px" : "0",
                                maxHeight: (IsHoverMenuName.includes(fatherName)) ? `${(list.length) * 40 + 16}px` : "0px",
                                opacity: (IsHoverMenuName.includes(fatherName)) ? "1" : "0",
                                padding: (IsHoverMenuName.includes(fatherName)) ? "8px 0px" : "0",
                                zIndex: 1
                            })
                        }}
                        onMouseEnter={() => {
                            // setIsHoverMenuName(true);

                            // ????????????????????????????????????
                            setIsHoverMenuName(e => {
                                //#region ??????????????????????????????????????????
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];
                                let clickItem = menuNameAndSubUrl[fatherName]; // ???????????????????????????????????????

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                if (res.length === 0) {
                                    return [...res, fatherName]
                                }
                                else {
                                    return [...res]
                                }
                                //#endregion
                            })
                        }}
                        onMouseLeave={() => {
                            setIsHoverMenuName([])
                        }}
                    >
                        {list}
                    </BasicContainer>
                );
            }

        }

    } else {
        // ?????? menuData ????????????
        // !! ?????????????????????Icon?????????????????????????????? ??? level ???????????????????????? 1 ????????????
        if (level === 1) {
            //#region ??????????????????
            vdom.push(
                <BasicContainer
                    key={menuData.item.id}
                    baseDeafultTheme={"DefaultTheme"}
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            width: "100%",
                            height: "40px",
                            //overflow: "hidden",// WhiteBlock
                            //transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                            //maxHeight: ExpandMenuName.includes(menuData.item.name) ? `${(menuData.children.length + 1) * 40}px` : "40px",
                        })
                    }}
                >
                    <Tooltip placement="right" title={menuData.item.name} >
                        {/* ????????????????????? */}
                        <Text
                            key={menuData.item.id}
                            baseDeafultTheme={"DefaultTheme"}
                            theme={{
                                basic: (style, props) => {
                                    return {
                                        ...style,
                                        padding: `0 0 0 50px`,
                                        height: "40px",
                                        width: "100%",
                                        // margin: "8px 0px",
                                        color: " #000000",
                                        fontSize: "14px",
                                        lineHeight: "40px",
                                        cursor: "pointer",
                                        userSelect: "none",
                                        //#region ?????????????????????????????????
                                        ...(
                                            // ???????????????????????????????????????????????????????????????????????? Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //?????????????????????
                                                (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                                :
                                                //??????????????????
                                                (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                        ),
                                        //#endregion

                                        //#region ???????????????????????????????????????
                                        ...(
                                            // ???????????????????????????????????????????????????????????????????????? Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //?????????????????????
                                                (
                                                    (
                                                        getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                    ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                                {
                                                    color: " #1890ff"
                                                }
                                                :
                                                //??????????????????
                                                (
                                                    (
                                                        getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                    ).includes(location.pathname) && menuData.item.url.trim() === "/") &&
                                                {
                                                    color: " #1890ff"
                                                }

                                        ),
                                        //#endregion

                                    }
                                },
                                hover: (style, props) => ({
                                    ...style,
                                    color: " #1890ff"
                                })
                            }}
                            onClick={() => {
                                if (menuData.item.url.trim() !== "/") {
                                    // ????????????????????????????????????
                                    if (location.pathname !== menuData.item.url.trim()) {//(?????????????????????)
                                        pushAndNotExsistItemSession("Ctab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                        history.push(menuData.item.url.trim())
                                    }
                                } else {
                                    // ????????????????????????????????????
                                    setExpandMenuName(e => {
                                        //#region ??????????????????????????????????????????
                                        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

                                        keys.forEach(
                                            (item) => {
                                                if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                    res = [...res, item]
                                                }
                                            }
                                        )

                                        if (res.length === 0) {
                                            return [...res, menuData.item.name]
                                        }
                                        else {
                                            return [...res]
                                        }
                                        //#endregion
                                    })
                                }
                            }}
                            onMouseEnter={() => {
                                // setIsHoverMenuName(true);
                                // if (menuData.item.url.trim() !== "/") {
                                //     // ????????????????????????????????????
                                //     pushAndNotExsistItemSession("Ctab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                //     history.push(menuData.item.url.trim())
                                // } else 

                                if (menuData.item.url.trim() === "/") {
                                    // ????????????????????????????????????
                                    setIsHoverMenuName(e => {
                                        //#region ??????????????????????????????????????????
                                        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

                                        keys.forEach(
                                            (item) => {
                                                if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                    res = [...res, item]
                                                }
                                            }
                                        )

                                        if (res.length === 0) {
                                            return [...res, menuData.item.name]
                                        }
                                        else {
                                            return [...res]
                                        }
                                        //#endregion
                                    })
                                }
                            }}
                            onMouseLeave={() => {
                                setIsHoverMenuName([])
                            }}
                        >
                            {/* ??????????????????????????? name ??? icon ?????? */}
                            {menuData.item.url.trim() === "/" &&
                                iconMap[menuData.item.name] ?
                                iconMap[menuData.item.name]({
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                })
                                :
                                !(menuData.item.parentName.trim() === "?????????" && menuData.item.url.trim() !== "/") &&
                                <WhiteBlock style={{
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                }} />
                            }

                            {/* ??????????????????????????? name ??? icon ?????? (??????????????????????????????) */}
                            {(menuData.item.parentName.trim() === "?????????" && menuData.item.url.trim() !== "/") &&
                                iconMap[menuData.item.name] &&
                                iconMap[menuData.item.name]({
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                })
                            }

                        </Text>
                    </Tooltip>
                    {generateThinMenu(menuData.children, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level + 1, menuData.item.name)}
                </BasicContainer >
            );

            //#endregion
        }
        else {
            //#region ????????????????????????
            vdom.push(
                <BasicContainer name="?????????"
                    key={menuData.item.id}
                    baseDeafultTheme={"DefaultTheme"}
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            overflow: "hidden",
                            transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                            // maxHeight: ExpandMenuName.includes(menuData.item.name) ? `${(menuData.children.length + 1) * 40}px` : "40px",
                        })
                    }}
                >
                    {/* ????????????????????? */}
                    <Text
                        key={menuData.item.id}
                        baseDeafultTheme={"DefaultTheme"}
                        theme={{
                            basic: (style, props) => {
                                return {
                                    ...style,
                                    padding: `0 0 0 8px`,
                                    height: "40px",
                                    width: "100%",
                                    // margin: "8px 0px",
                                    color: " #000000",
                                    fontSize: "14px",
                                    lineHeight: "40px",
                                    cursor: "pointer",
                                    userSelect: "none",
                                    //#region ?????????????????????????????????
                                    ...(
                                        // ???????????????????????????????????????????????????????????????????????? Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //?????????????????????
                                            (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                            :
                                            //??????????????????
                                            (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                    ),
                                    //#endregion

                                    //#region ???????????????????????????????????????
                                    ...(
                                        // ???????????????????????????????????????????????????????????????????????? Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //?????????????????????
                                            (
                                                (
                                                    getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                            {
                                                color: " #1890ff"
                                            }
                                            :
                                            //??????????????????
                                            (
                                                (
                                                    getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                ).includes(location.pathname) && menuData.item.url.trim() === "/") &&
                                            {
                                                color: " #1890ff"
                                            }

                                    ),
                                    //#endregion

                                }
                            },
                            hover: (style, props) => ({
                                ...style,
                                color: " #1890ff"
                            })
                        }}
                        onClick={() => {
                            if (menuData.item.url.trim() !== "/") {
                                // ????????????????????????????????????
                                if (location.pathname !== menuData.item.url.trim()) {//(?????????????????????)
                                    pushAndNotExsistItemSession("Ctab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                    history.push(menuData.item.url.trim())
                                }
                                setIsHoverMenuName([])// ???????????????????????????????????????

                            } else {
                                // ????????????????????????????????????
                                setExpandMenuName(e => {
                                    //#region ??????????????????????????????????????????
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

                                    keys.forEach(
                                        (item) => {
                                            if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                res = [...res, item]
                                            }
                                        }
                                    )

                                    if (res.length === 0) {
                                        return [...res, menuData.item.name]
                                    }
                                    else {
                                        return [...res]
                                    }
                                    //#endregion
                                })
                            }
                        }}
                        onMouseEnter={() => {
                            // ????????????????????????????????????
                            if (menuData.item.url.trim() === "/") {
                                setIsHoverMenuName(e => {
                                    //#region ??????????????????????????????????????????
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // ???????????????????????????????????????

                                    keys.forEach(
                                        (item) => {
                                            if (menuNameAndSubUrl[item].containAll(clickItem)) {
                                                res = [...res, item]
                                            }
                                        }
                                    )

                                    if (res.length === 0) {
                                        return [...res, menuData.item.name]
                                    }
                                    else {
                                        return [...res]
                                    }
                                    //#endregion
                                })
                            }
                        }}
                        onMouseLeave={() => {
                            // console.log(IsHoverMenuName)
                            setIsHoverMenuName(i => {
                                i.shift();
                                return i;
                            })
                        }}
                    >
                        {/* ??????????????????????????? name ??? icon ?????? */}
                        {menuData.item.url.trim() === "/" &&
                            iconMap[menuData.item.name] &&
                            iconMap[menuData.item.name]({
                                position: "absolute",
                                left: "24px",
                                height: "100%"
                            })
                        }

                        {/* ????????????????????? */}
                        {menuData.item.name}
                        {/* {menuData.item.url} */}

                        {/* ????????????????????? ????????? icon ?????? */}
                        {menuData.item.url.trim() === "/" &&
                            <ArrowUp
                                style={{
                                    position: "absolute",
                                    right: "24px",
                                    height: "100%",
                                    transform: "rotate(90deg)"
                                }}
                            />
                        }
                    </Text>
                    {generateThinMenu(menuData.children, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level + 1, menuData.item.name)}
                </BasicContainer >
            );
            //#endregion
        }
    }
    return vdom;
}
//#endregion