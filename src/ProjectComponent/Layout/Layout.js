import React, { useState, useContext, useEffect } from 'react';
import { Context, Tooltip, BackstageLeftSideMenuBar, BackstagePageTabBar, BackstageTopMenuBar, ScrollBar, BasicContainer, LeftSideDrawer, SubContainer, Text, BasicButton, DropDown, modalsService, globalContextService } from '../../Components'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useWindowSize } from '../../SelfHooks/useWindowSize'
import { ReactComponent as Logo } from '../../Assets/img/Logo.svg'
import { ReactComponent as ArrowUp } from '../../Assets/img/BackstageLeftSideMenuBar/ArrowUp.svg'
import { ReactComponent as WhiteBlock } from '../../Assets/img/BackstageLeftSideMenuBar/WhiteBlock.svg'
import { ReactComponent as Org } from '../../Assets/img/BackstageLeftSideMenuBar/Org.svg'
import { ReactComponent as Check } from '../../Assets/img/BackstageLeftSideMenuBar/Check.svg'
import { getParseItemLocalStorage, setStringifyItemSession, pushAndNotExsistItemSession, getParseItemSession, removeByKeyItemSession, clearLocalStorage, clearSession, setStringifyItemLocalStorage } from '../../Handlers';
import { iconMap, pageTabBarUrlMapping, pageTextUrlMapping } from '../../Mappings/Mappings'
import { useHistory, useLocation } from 'react-router-dom';
import { isNil } from 'lodash';

export const Layout = (props) => {
    //const [Collapse, setCollapse] = useState(false);
    const [DrawerCollapse, setDrawerCollapse] = useState(true);
    const [width] = useWindowSize();

    const { Collapse, setCollapse, Theme, Switch } = useContext(Context);
    const { layout } = Theme;
    let history = useHistory();
    let location = useLocation();

    const [ExpandMenuName, setExpandMenuName] = useState([]); // 當前開啟的分頁
    const [IsHoverMenuName, setIsHoverMenuName] = useState([]); // 當前開啟的分頁

    useEffect(() => {
        //#region 設定剛登入時，開啟歡迎頁
        // console.log(getParseItemSession("tab"))
        if (isNil(getParseItemSession("tab")) || (getParseItemSession("tab") ?? []).length === 0) {
            setStringifyItemSession("tab", [{ title: "首頁", path: "/" }])
        }
        //#endregion
    })

    useEffect(() => {
        // setStringifyItemSession("tab", [{ title: "某某某頁面", path: "/xxx/yyy" }, { title: "某某某頁面", path: "/aaa/bbb" }, { title: "某某某頁面c", path: "/aaa/ccc" },
        // { title: "某某某頁面", path: "/aaa/111" }, { title: "某某某頁面", path: "/aaa/333" }, { title: "某某某頁面c", path: "/aaa/555" },
        // { title: "某某某頁面", path: "/aaa/222" }, { title: "某某某頁面", path: "/aaa/444" }, { title: "某某某頁面c", path: "/aaa/666" }])

        //#region 設定剛登入時，開啟歡迎頁
        // console.log(getParseItemSession("tab"))
        // if (isNil(getParseItemSession("tab")) || (getParseItemSession("tab") ?? []).length === 0) {
        //     setStringifyItemSession("tab", [{ title: "首頁", path: "/" }])
        // }
        //#endregion

        //#region 處理當直接從瀏覽器網址列輸入 路由 ，一樣要新增分頁的情況
        // !! 注意 只處理包含在 pageTabBarUrlMapping 物件中的路由 
        let historyOpenTab = (getParseItemSession("tab") ?? []).map((item => item.path))
        if ((!historyOpenTab.includes(location.pathname) && pageTabBarUrlMapping[location.pathname])) {
            pushAndNotExsistItemSession("tab", "path", location.pathname, { title: pageTabBarUrlMapping[location.pathname], path: location.pathname })
        }
        //#endregion

        //#region 處理當前應被標記與開啟的父層
        let canUseFunctions = getParseItemLocalStorage("Functions") ?? []
        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
        let res = [];

        // keys.forEach(
        //     (item) => {
        //         if (menuNameAndSubUrl[item].includes(location.pathname)) {
        //             res = [...res, item]
        //         }
        //     }
        // )

        //#region 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
        if (canUseFunctions.includes(location.pathname)) {
            //進入子頁面路由
            let totalLength = location.pathname.length;
            let split = location.pathname.split("/")
            let howManyToRemove = [...split[split.length - 1]].length + 1;
            let pathnameRes = location.pathname.substring(0, totalLength - howManyToRemove);// 去掉最尾端 子頁面 部分路由

            keys.forEach(
                (item) => {
                    if (menuNameAndSubUrl[item].includes(pathnameRes)) {
                        res = [...res, item]
                    }
                }
            )
        }
        else {
            //進入一般分頁
            keys.forEach(
                (item) => {
                    if (menuNameAndSubUrl[item].includes(location.pathname)) {
                        res = [...res, item]
                    }
                }
            )
        }
        //#endregion

        setExpandMenuName(res)
        //#endregion

    }, [Collapse]) // 除了初始設置外，由窄版 切換至 寬版 亦需要重新設定展開 應該展開的 父層

    useEffect(() => {
        // if (width >= 1440) {
        //     setCollapse(false); // 切換到 laptop畫面，左側欄要放大成寬版
        // }
        if (width >= 1024 && width < 1440) {
            if (!Collapse) {
                setCollapse(true); // 切換到 laptop畫面，左側欄要縮小成窄版
            }
        }

    }, [width])


    if (localStorage.getItem("Auth") === null) {
        return null
    }

    return (
        <>
            {/* 大於1440的畫面 (laptop)*/}
            {width >= 1440 &&
                <>
                    <BackstageLeftSideMenuBar baseDefaultTheme={"DefaultTheme"} collapse={Collapse}
                        logo={<Logo style={layout.laptopBackstageLeftSideMenuBarLogo(Collapse)} />}
                        logoText={
                            <Text
                                baseDefaultTheme={"TextDefaultTheme"}
                                theme={layout.laptopBackstageLeftSideMenuBarLogoText}
                            >
                                屏東派車管理系統
                            </Text>
                        }
                        menuItem={
                            Collapse ?
                                generateThinMenu(getParseItemLocalStorage("ModulesTree"), history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName)
                                :
                                generateMenu(getParseItemLocalStorage("ModulesTree"), history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse)
                        }
                    />
                    <BackstageTopMenuBar baseDefaultTheme={"DefaultTheme"} theme={layout.laptopBackstageTopMenuBar(Collapse)}>
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            <BasicButton
                                baseDefaultTheme={"BasicButtonDefaultTheme"}
                                theme={layout.laptopBasicButton}
                                icon={<MenuOpenIcon style={layout.laptopBasicButtonIcon} />}
                                text={""}
                                onClick={() => { setCollapse(c => !c) }}
                            />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.laptopPageText}>
                                {/* 預設頁面/預設功能 */}
                                {pageTextUrlMapping[location.pathname]}
                            </Text>
                        </SubContainer>
                        {/* <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}> */}
                        {/* 無 Logo */}
                        {/* </SubContainer> */}


                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>

                            {/* 選擇可訪問組織 DropDown */}
                            <DropDown
                                placement={"bottomRight"}
                                dropDownItem={
                                    <>
                                        {/* 選擇可訪問組織 DropDown 容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                                            height={(getParseItemLocalStorage("Orgs") ?? []).length}
                                            theme={layout.laptopUseOrgDropDownContainer}
                                        >
                                            <ScrollBar
                                                basedefaulttheme={"DefaultTheme"}
                                                className={`collapseMenuAreaScrollBar`}
                                                autoHide={true}
                                                theme={layout.laptopUseOrgScrollBar}
                                            >
                                                {/* DropDown 項目容器 */}
                                                <BasicContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={layout.laptopDropDownItemContainer}>
                                                    {/* DropDown 子項目 */}
                                                    {(getParseItemLocalStorage("Orgs") ?? []).map((item, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Text
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    theme={layout.laptopDropDownSubItemContainer}
                                                                    onClick={() => {
                                                                        setStringifyItemLocalStorage("UseOrg", { id: item?.id, name: item?.name })
                                                                        Switch();
                                                                    }}
                                                                >
                                                                    {item?.name}
                                                                    {getParseItemLocalStorage("UseOrg")?.name === item?.name &&
                                                                        <Check style={{
                                                                            position: "relative",
                                                                            left: "8px"
                                                                        }} />
                                                                    }
                                                                </Text>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </BasicContainer>
                                            </ScrollBar>
                                        </BasicContainer>
                                    </>
                                }
                            >
                                <Org style={{ position: "relative", right: "32px", cursor: "pointer" }} />
                            </DropDown>

                            <DropDown
                                dropDownItem={
                                    <>
                                        {/* DropDown 項目容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={layout.laptopDropDownItemContainer}>
                                            {/* DropDown 子項目 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={layout.laptopDropDownSubItemContainer}
                                                onClick={() => {
                                                    modalsService.infoModal.warn({
                                                        iconRightText: "是否要登出?",
                                                        yes: true,
                                                        yesText: "確認",
                                                        no: true,
                                                        noText: "取消",
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
                                                登出
                                            </Text>
                                        </BasicContainer>
                                    </>
                                }>

                                <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.laptopUserNameText}>
                                    {/* 管理員 */}
                                    {getParseItemLocalStorage("UserName")}
                                </Text>
                            </DropDown>

                        </SubContainer>
                    </BackstageTopMenuBar>
                    <BackstagePageTabBar
                        openHistory={getParseItemSession("tab")}
                        urlMapping={pageTabBarUrlMapping}
                        // urlMapping={{
                        //     "/xxx/yyy": "某x", "/aaa/bbb": "某a", "/aaa/ccc": "某c",
                        //     "/aaa/111": "某1", "/aaa/222": "某2", "/aaa/333": "某3",
                        //     "/aaa/444": "某4", "/aaa/555": "某5", "/aaa/666": "某6"
                        // }}
                        tabOnClose={(item, index, arr, pathname, toNewPathName) => {
                            removeByKeyItemSession("tab", "path", item.path);
                            // console.log(toNewPathName)
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(toNewPathName)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                return [...res]
                                //#endregion
                            })
                        }}
                        tabOnClick={(url) => {
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(url)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                return [...res]
                                //#endregion
                            })
                        }}
                        theme={layout.laptopBackstageTopMenuBar(Collapse)}
                    />
                </>
            }

            {/* 大於1024 與 小於1440的畫面 (laptop)*/}
            {(width >= 1024 && width < 1440) &&
                <>
                    <BackstageLeftSideMenuBar baseDefaultTheme={"DefaultTheme"} collapse={true}  // Collapse
                        logo={<Logo style={layout.laptopBackstageLeftSideMenuBarLogo(true)} />}  // Collapse
                        logoText={
                            <Text
                                baseDefaultTheme={"TextDefaultTheme"}
                                theme={layout.laptopBackstageLeftSideMenuBarLogoText}
                            >
                                屏東派車管理系統
                        </Text>
                        }
                        menuItem={
                            // Collapse
                            // true ?
                            generateThinMenu(getParseItemLocalStorage("ModulesTree"), history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName)
                            // :
                            // generateMenu(getParseItemLocalStorage("ModulesTree"), history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse)
                        }
                    />
                    <BackstageTopMenuBar baseDefaultTheme={"DefaultTheme"} theme={layout.laptopBackstageTopMenuBar(true)}> {/* Collapse */}
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            <BasicButton
                                baseDefaultTheme={"BasicButtonDefaultTheme"}
                                theme={layout.laptopBasicButton}
                                icon={<MenuOpenIcon style={layout.laptopBasicButtonIcon} />}
                                text={""}
                            onClick={() => { setDrawerCollapse(false) /* setCollapse(c => !c) */ }}  // Collapse
                            />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.laptopPageText}>
                                {/* 預設頁面/預設功能 */}
                                {pageTextUrlMapping[location.pathname]}
                            </Text>
                        </SubContainer>
                        {/* <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}> */}
                        {/* 無 Logo */}
                        {/* </SubContainer> */}


                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>

                            {/* 選擇可訪問組織 DropDown */}
                            <DropDown
                                placement={"bottomRight"}
                                dropDownItem={
                                    <>
                                        {/* 選擇可訪問組織 DropDown 容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                                            height={(getParseItemLocalStorage("Orgs") ?? []).length}
                                            theme={layout.laptopUseOrgDropDownContainer}
                                        >
                                            <ScrollBar
                                                basedefaulttheme={"DefaultTheme"}
                                                className={`collapseMenuAreaScrollBar`}
                                                autoHide={true}
                                                theme={layout.laptopUseOrgScrollBar}
                                            >
                                                {/* DropDown 項目容器 */}
                                                <BasicContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={layout.laptopDropDownItemContainer}>
                                                    {/* DropDown 子項目 */}
                                                    {(getParseItemLocalStorage("Orgs") ?? []).map((item, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Text
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    theme={layout.laptopDropDownSubItemContainer}
                                                                    onClick={() => {
                                                                        setStringifyItemLocalStorage("UseOrg", { id: item?.id, name: item?.name })
                                                                        Switch();
                                                                    }}
                                                                >
                                                                    {item?.name}
                                                                    {getParseItemLocalStorage("UseOrg")?.name === item?.name &&
                                                                        <Check style={{
                                                                            position: "relative",
                                                                            left: "8px"
                                                                        }} />
                                                                    }
                                                                </Text>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </BasicContainer>
                                            </ScrollBar>
                                        </BasicContainer>
                                    </>
                                }
                            >
                                <Org style={{ position: "relative", right: "32px", cursor: "pointer" }} />
                            </DropDown>

                            <DropDown
                                dropDownItem={
                                    <>
                                        {/* DropDown 項目容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={layout.laptopDropDownItemContainer}>
                                            {/* DropDown 子項目 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={layout.laptopDropDownSubItemContainer}
                                                onClick={() => {
                                                    modalsService.infoModal.warn({
                                                        iconRightText: "是否要登出?",
                                                        yes: true,
                                                        yesText: "確認",
                                                        no: true,
                                                        noText: "取消",
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
                                                登出
                                        </Text>
                                        </BasicContainer>
                                    </>
                                }>

                                <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.laptopUserNameText}>
                                    {/* 管理員 */}
                                    {getParseItemLocalStorage("UserName")}
                                </Text>
                            </DropDown>

                        </SubContainer>
                    </BackstageTopMenuBar>

                    <LeftSideDrawer
                        baseDefaultTheme={"DefaultTheme"}
                        collapse={DrawerCollapse}
                        containerEvent={{ onClick: () => { setDrawerCollapse(true) } }}
                    >
                        {/* logo 區 */}
                        <BasicContainer baseDefaultTheme={"BasicContainerDefaultTheme"} theme={layout.basicLogoArea} >
                            <Logo style={layout.basicLogo} />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.basicLogiText} >
                                屏東派車管理系統
                            </Text>
                        </BasicContainer>
                        {/* Menu區 */}
                        <ScrollBar
                            basedefaulttheme={"DefaultTheme"}
                            className={`collapseMenuAreaScrollBar`}
                            autoHide={true}
                            theme={layout.menuAreaScrollBar}
                        >
                            <BasicContainer
                                {...props.logoAreaEvent}
                                className={`collapseMenuArea`}
                                baseDefaultTheme={"BasicContainerDefaultTheme"}
                                theme={layout.menuArea}
                            >
                                {/* 在這裡遍歷MenuItem */}
                                {generateMenu(getParseItemLocalStorage("ModulesTree"), history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, true)}
                            </BasicContainer>
                        </ScrollBar>
                    </LeftSideDrawer>

                    <BackstagePageTabBar
                        openHistory={getParseItemSession("tab")}
                        urlMapping={pageTabBarUrlMapping}
                        // urlMapping={{
                        //     "/xxx/yyy": "某x", "/aaa/bbb": "某a", "/aaa/ccc": "某c",
                        //     "/aaa/111": "某1", "/aaa/222": "某2", "/aaa/333": "某3",
                        //     "/aaa/444": "某4", "/aaa/555": "某5", "/aaa/666": "某6"
                        // }}
                        tabOnClose={(item, index, arr, pathname, toNewPathName) => {
                            removeByKeyItemSession("tab", "path", item.path);
                            // console.log(toNewPathName)
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(toNewPathName)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                return [...res]
                                //#endregion
                            })
                        }}
                        tabOnClick={(url) => {
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(url)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                return [...res]
                                //#endregion
                            })
                        }}
                        theme={layout.laptopBackstageTopMenuBar(true)} // Collapse
                    />
                </>

            }


            {/* 小於等於1024的畫面 (basic) */}
            {
                width < 1024 &&
                <>
                    <BackstageTopMenuBar baseDefaultTheme={"DefaultTheme"} >
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            <BasicButton
                                baseDefaultTheme={"BasicButtonDefaultTheme"}
                                theme={layout.basicBasicButton}
                                icon={<MenuOpenIcon style={layout.basicBasicButtonIcon} />}
                                text={""}
                                onClick={() => { setDrawerCollapse(c => !c) }} />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.basicPageText}>
                                {/* 預設頁面/預設功能 */}
                                {pageTextUrlMapping[location.pathname]}
                            </Text>
                        </SubContainer>
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>
                            {/* Logo 不做在中間了，如果要在打開註解*/}
                            {/* <Logo style={{ margin: `0.25rem 0.5rem 0 0rem`, height: "100%", width: "1.5rem" }} />
                            {width >= 520 &&
                                <Text baseDefaultTheme={"TextDefaultTheme"}
                                    theme={{
                                        basic: (style) => ({
                                            ...style,
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            top: "-.4rem",
                                            display: "inline-block",
                                            color: "#fff"
                                        })
                                    }}
                                >1966照護網 靈糧堂
                                </Text>
                            } */}
                        </SubContainer>
                        <SubContainer baseDefaultTheme={"SubContainerDefaultTheme"}>

                            {/* 選擇可訪問組織 DropDown */}
                            <DropDown
                                placement={"bottomRight"}
                                dropDownItem={
                                    <>
                                        {/* 選擇可訪問組織 DropDown 容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"BasicContainerDefaultTheme"}
                                            height={(getParseItemLocalStorage("Orgs") ?? []).length}
                                            theme={layout.basicUseOrgDropDownContainer}
                                        >
                                            <ScrollBar
                                                basedefaulttheme={"DefaultTheme"}
                                                className={`collapseMenuAreaScrollBar`}
                                                autoHide={true}
                                                theme={layout.basicUseOrgScrollBar}
                                            >
                                                {/* DropDown 項目容器 */}
                                                <BasicContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={layout.laptopDropDownItemContainer}>
                                                    {/* DropDown 子項目 */}
                                                    {(getParseItemLocalStorage("Orgs") ?? []).map((item, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Text
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    theme={layout.laptopDropDownSubItemContainer}
                                                                    onClick={() => {
                                                                        setStringifyItemLocalStorage("UseOrg", { id: item?.id, name: item?.name })
                                                                        Switch();
                                                                    }}
                                                                >
                                                                    {item?.name}
                                                                    {getParseItemLocalStorage("UseOrg")?.name === item?.name &&
                                                                        <Check style={{
                                                                            position: "relative",
                                                                            left: "8px"
                                                                        }} />
                                                                    }
                                                                </Text>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </BasicContainer>
                                            </ScrollBar>
                                        </BasicContainer>
                                    </>
                                }
                            >
                                <Org style={{ position: "relative", right: "32px", cursor: "pointer" }} />
                            </DropDown>

                            <DropDown
                                dropDownItem={
                                    <>
                                        {/* DropDown 項目容器 */}
                                        <BasicContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={layout.dropDownItemContainer}>
                                            {/* DropDown 子項目 */}
                                            <Text
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={layout.dropDownSubItemContainer}
                                                onClick={() => {
                                                    modalsService.infoModal.warn({
                                                        iconRightText: "是否要登出?",
                                                        yes: true,
                                                        yesText: "確認",
                                                        no: true,
                                                        noText: "取消",
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
                                                登出
                                            </Text>
                                        </BasicContainer>
                                    </>
                                }>

                                <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.basicUserNameText}>
                                    {/* 管理員 */}
                                    {getParseItemLocalStorage("UserName")}
                                </Text>
                            </DropDown>

                        </SubContainer>
                    </BackstageTopMenuBar>
                    <LeftSideDrawer
                        baseDefaultTheme={"DefaultTheme"}
                        collapse={DrawerCollapse}
                        containerEvent={{ onClick: () => { setDrawerCollapse(true) } }}
                    >
                        {/* logo 區 */}
                        <BasicContainer baseDefaultTheme={"BasicContainerDefaultTheme"} theme={layout.basicLogoArea} >
                            <Logo style={layout.basicLogo} />
                            <Text baseDefaultTheme={"TextDefaultTheme"} theme={layout.basicLogiText} >
                                屏東派車管理系統
                            </Text>
                        </BasicContainer>
                        {/* Menu區 */}
                        <ScrollBar
                            basedefaulttheme={"DefaultTheme"}
                            className={`collapseMenuAreaScrollBar`}
                            autoHide={true}
                            theme={layout.menuAreaScrollBar}
                        >
                            <BasicContainer
                                {...props.logoAreaEvent}
                                className={`collapseMenuArea`}
                                baseDefaultTheme={"BasicContainerDefaultTheme"}
                                theme={layout.menuArea}
                            >
                                {/* 在這裡遍歷MenuItem */}
                                {generateMenu(getParseItemLocalStorage("ModulesTree"), history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, true)}
                            </BasicContainer>
                        </ScrollBar>
                    </LeftSideDrawer>
                    <BackstagePageTabBar
                        openHistory={getParseItemSession("tab")}
                        urlMapping={pageTabBarUrlMapping}
                        // urlMapping={{
                        //     "/xxx/yyy": "某x", "/aaa/bbb": "某a", "/aaa/ccc": "某c",
                        //     "/aaa/111": "某1", "/aaa/222": "某2", "/aaa/333": "某3",
                        //     "/aaa/444": "某4", "/aaa/555": "某5", "/aaa/666": "某6"
                        // }}
                        tabOnClose={(item, index, arr, pathname, toNewPathName) => {
                            removeByKeyItemSession("tab", "path", item.path);
                            // console.log(toNewPathName)
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(toNewPathName)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                return [...res]
                                //#endregion
                            })
                        }}
                        tabOnClick={(url) => {
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];

                                keys.forEach(
                                    (item) => {
                                        if (menuNameAndSubUrl[item].containAll(url)) {
                                            res = [...res, item]
                                        }
                                    }
                                )

                                return [...res]
                                //#endregion
                            })
                        }}
                        theme={layout.basicBackstagePageTabBar(Collapse)}
                    />
                </>
            }
        </>
    )
}

//#region 產生寬版左側欄內容
const generateMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, setDrawerCollapse, widthLessThan1024 = false) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // 如果 menuData 是陣列，則對每一個 item 遞迴一次，並將它放入容器中
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
        // 如果 menuData 不是陣列
        vdom.push(
            <BasicContainer
                key={menuData.item.id}
                baseDeafultTheme={"DefaultTheme"}
                theme={{
                    basic: (style, props) => ({
                        ...style,
                        overflow: "hidden",
                        transition: "max-height .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                        maxHeight: ExpandMenuName.includes(menuData.item.name) ? `${(menuData.children.length + 1) * 40}px` : "40px",
                    })
                }}
            >
                {/* 左側欄項目容器 */}
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
                                //#region 被選中的左側欄項目樣式
                                ...(
                                    // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                    (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                        //進入子頁面路由
                                        (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            background: "#e6f7ff",
                                            boxShadow: "inset -3px 0px 0px #1890ff",
                                            color: " #1890ff"
                                        }
                                        :
                                        //進入一般分頁
                                        (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                        {
                                            background: "#e6f7ff",
                                            boxShadow: "inset -3px 0px 0px #1890ff",
                                            color: " #1890ff"
                                        }
                                ),
                                //#endregion

                                //#region 被選中的左側欄父層項目樣式
                                ...(
                                    // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                    (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                        //進入子頁面路由
                                        (
                                            (
                                                getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                            ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                        {
                                            color: " #1890ff"
                                        }
                                        :
                                        //進入一般分頁
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
                            // 若是次層目錄，則跳轉路由 
                            if (location.pathname !== menuData.item.url.trim()) {//(路由不變不跳轉)
                                pushAndNotExsistItemSession("tab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                // console.log(widthLessThan1024)
                                widthLessThan1024 && setDrawerCollapse(true);
                                history.push(menuData.item.url.trim())
                            }

                            //#region 處理最上層就是分頁時 點擊了 要把其他展開的的收起來
                            if (menuData.item.parentName.trim() === "根節點") {
                                setExpandMenuName(e => {
                                    //#region 處理當前應被標記與開啟的父層
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

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
                            //#endregion

                        } else {
                            // 若是父層則伸縮側邊欄項目
                            setExpandMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];
                                let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

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
                >
                    {/* 若為最上層則給對應 name 的 icon 圖標 */}
                    {menuData.item.url.trim() === "/" &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    }

                    {/* 若為最上層則給對應 name 的 icon 圖標 (最上層即功能頁的情況) */}
                    {(menuData.item.parentName.trim() === "根節點" && menuData.item.url.trim() !== "/") &&
                        iconMap[menuData.item.name] &&
                        iconMap[menuData.item.name]({
                            position: "absolute",
                            left: "24px",
                            height: "100%"
                        })
                    }

                    {/* 左側欄項目名稱 */}
                    {menuData.item.name}
                    {/* {menuData.item.url} */}

                    {/* 若為最上層則給 展開的 icon 圖標 */}
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

//#region 去掉最尾端 子頁面 部分路由函數
const removeTailUrl = (pathname) => {
    let totalLength = pathname.length;
    let split = pathname.split("/")
    let howManyToRemove = [...split[split.length - 1]].length + 1;
    let pathnameRes = pathname.substring(0, totalLength - howManyToRemove);// 去掉最尾端 子頁面 部分路由

    return pathnameRes
}
//#endregion

//#region 產生窄版左側欄內容
const generateThinMenu = (menuData, history, location, ExpandMenuName, setExpandMenuName, IsHoverMenuName, setIsHoverMenuName, level = 1, fatherName) => {
    // console.log(menuData)
    let vdom = [];

    if (menuData instanceof Array) {
        // 如果 menuData 是陣列，則對每一個 item 遞迴一次，並將它放入容器中
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
                    <BasicContainer key="single" name="頂層容器" >{list}</BasicContainer>
                );
            }
            else {
                vdom.push(
                    <BasicContainer
                        key="single"
                        name="子級容器"
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

                            // 若是父層則伸縮側邊欄項目
                            setIsHoverMenuName(e => {
                                //#region 處理當前應被標記與開啟的父層
                                let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                let res = [];
                                let clickItem = menuNameAndSubUrl[fatherName]; // 所點擊項目所包含的所有路由

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
        // 如果 menuData 不是陣列
        // !! 因應第一層只有Icon的情況所以拆開來做， 依 level 判斷目前是第幾層 1 為最頂層
        if (level === 1) {
            //#region 最頂層的情況
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
                        {/* 左側欄項目容器 */}
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
                                        //#region 被選中的左側欄項目樣式
                                        ...(
                                            // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //進入子頁面路由
                                                (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                                :
                                                //進入一般分頁
                                                (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                                {
                                                    background: "#e6f7ff",
                                                    boxShadow: "inset -3px 0px 0px #1890ff",
                                                    color: " #1890ff"
                                                }
                                        ),
                                        //#endregion

                                        //#region 被選中的左側欄父層項目樣式
                                        ...(
                                            // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                            (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                                //進入子頁面路由
                                                (
                                                    (
                                                        getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                    ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                                {
                                                    color: " #1890ff"
                                                }
                                                :
                                                //進入一般分頁
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
                                    // 若是次層目錄，則跳轉路由
                                    if (location.pathname !== menuData.item.url.trim()) {//(路由不變不跳轉)
                                        pushAndNotExsistItemSession("tab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                        history.push(menuData.item.url.trim())
                                    }
                                } else {
                                    // 若是父層則伸縮側邊欄項目
                                    setExpandMenuName(e => {
                                        //#region 處理當前應被標記與開啟的父層
                                        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

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
                                //     // 若是次層目錄，則跳轉路由
                                //     pushAndNotExsistItemSession("tab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                //     history.push(menuData.item.url.trim())
                                // } else 

                                if (menuData.item.url.trim() === "/") {
                                    // 若是父層則伸縮側邊欄項目
                                    setIsHoverMenuName(e => {
                                        //#region 處理當前應被標記與開啟的父層
                                        let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                        let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                        let res = [];
                                        let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

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
                            {/* 若為最上層則給對應 name 的 icon 圖標 */}
                            {menuData.item.url.trim() === "/" &&
                                iconMap[menuData.item.name] ?
                                iconMap[menuData.item.name]({
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                })
                                :
                                !(menuData.item.parentName.trim() === "根節點" && menuData.item.url.trim() !== "/") &&
                                <WhiteBlock style={{
                                    position: "absolute",
                                    left: "24px",
                                    height: "100%"
                                }} />
                            }

                            {/* 若為最上層則給對應 name 的 icon 圖標 (最上層即功能頁的情況) */}
                            {(menuData.item.parentName.trim() === "根節點" && menuData.item.url.trim() !== "/") &&
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
            //#region 不是最頂層的情況
            vdom.push(
                <BasicContainer name="正在看"
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
                    {/* 左側欄項目容器 */}
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
                                    //#region 被選中的左側欄項目樣式
                                    ...(
                                        // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //進入子頁面路由
                                            (removeTailUrl(location.pathname) === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                            :
                                            //進入一般分頁
                                            (location.pathname === menuData.item.url && menuData.item.url.trim() !== "/") &&
                                            {
                                                background: "#e6f7ff",
                                                boxShadow: "inset -3px 0px 0px #1890ff",
                                                color: " #1890ff"
                                            }
                                    ),
                                    //#endregion

                                    //#region 被選中的左側欄父層項目樣式
                                    ...(
                                        // 處理進入子頁面如新增、修改等，標記於父層路由標籤 Functions
                                        (getParseItemLocalStorage("Functions") ?? []).includes(location.pathname) ?
                                            //進入子頁面路由
                                            (
                                                (
                                                    getParseItemLocalStorage("MenuNameAndSubUrl")[menuData.item.name] ?? []
                                                ).includes(removeTailUrl(location.pathname)) && menuData.item.url.trim() === "/") &&
                                            {
                                                color: " #1890ff"
                                            }
                                            :
                                            //進入一般分頁
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
                                // 若是次層目錄，則跳轉路由
                                if (location.pathname !== menuData.item.url.trim()) {//(路由不變不跳轉)
                                    pushAndNotExsistItemSession("tab", "path", menuData.item.url, { title: menuData.item.name, path: menuData.item.url })
                                    history.push(menuData.item.url.trim())
                                }
                                setIsHoverMenuName([])// 點擊具路由分頁後關閉分頁框

                            } else {
                                // 若是父層則伸縮側邊欄項目
                                setExpandMenuName(e => {
                                    //#region 處理當前應被標記與開啟的父層
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

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
                            // 若是父層則伸縮側邊欄項目
                            if (menuData.item.url.trim() === "/") {
                                setIsHoverMenuName(e => {
                                    //#region 處理當前應被標記與開啟的父層
                                    let menuNameAndSubUrl = getParseItemLocalStorage("MenuNameAndSubUrl")
                                    let keys = Object.keys(getParseItemLocalStorage("MenuNameAndSubUrl")) ?? []
                                    let res = [];
                                    let clickItem = menuNameAndSubUrl[menuData.item.name]; // 所點擊項目所包含的所有路由

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
                        {/* 若為最上層則給對應 name 的 icon 圖標 */}
                        {menuData.item.url.trim() === "/" &&
                            iconMap[menuData.item.name] &&
                            iconMap[menuData.item.name]({
                                position: "absolute",
                                left: "24px",
                                height: "100%"
                            })
                        }

                        {/* 左側欄項目名稱 */}
                        {menuData.item.name}
                        {/* {menuData.item.url} */}

                        {/* 若為最上層則給 展開的 icon 圖標 */}
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