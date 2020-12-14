import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { BasicContainer, ScrollBar, Container, SubContainer, Text, FormContainer, FormRow, TextInput, BasicButton, modalsService, globalContextService } from '../../../Components';
import { ReactComponent as MobileMCar } from '../../../Assets/img/MobileMCar.svg'
import { ReactComponent as Admin } from '../../../Assets/img/Admin.svg'
import { ReactComponent as Lock } from '../../../Assets/img/Lock.svg'
import { ReactComponent as Phone } from '../../../Assets/img/Phone.svg'
import { ReactComponent as AuthCode } from '../../../Assets/img/AuthCode.svg'
import Laptopbg from '../../../Assets/img/Laptopbg.svg'
import { LaptopPlacard } from '../../../ProjectComponent';

//#region 倒數10秒
const TimeCounter = (props) => {

    const [Sec, setSec] = useState(10);

    useEffect(() => {
        let counter = setInterval(() => {
            setSec(s => s - 1);
            if (Sec === 1) {
                props.onCountToZero && props.onCountToZero();
            }
        }, 1000)

        return () => {
            clearInterval(counter)
        }
    }, [Sec])

    return (
        <>
            {Sec}
        </>
    )
}
//#endregion

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { login: { rwd: { laptop } } } } = Theme;

    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                baseDefaultTheme={"DefaultTheme"}
                theme={laptop.outContainer}
            >
                {/* 最外層容器 ScrollBar */}
                <ScrollBar
                    basedefaulttheme={"DefaultTheme"}
                    theme={laptop.outContainerScrollBar} /*autoHide={true}*/
                >
                    {/* 佔位容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptop.place}
                    />

                    {/* 左半邊公告容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptop.leftContainer}
                    >
                        <LaptopPlacard
                            TitleText={"公告"}
                            tabsName={["車行公告", "車行公告A",
                                "車行公告B", "車行公告C", "車行公告D", "車行公告EE", "1", "test",
                                "車行公告F", "車行公告G", "車行公告H",
                                "車行公告I", "車行公告J", "車行公告K",
                                "0", "車行公告M", "車行公告N",
                            ]}
                            nowTab={props.nowTab}
                            mainContent={{
                                "車行公告": <div style={{ color: "red", height: "100rem" }}>"車行公告"</div>,
                                "車行公告A": <div style={{ color: "red" }}>"車行公告A"</div>,
                                "車行公告B": <div style={{ color: "red" }}>"車行公告B"</div>,
                                "車行公告C": <div style={{ color: "red" }}>"車行公告C"</div>,
                                "車行公告D": <div style={{ color: "red" }}>"車行公告D"</div>,
                                "車行公告EE": <div style={{ color: "red" }}>"車行公告EE"</div>,
                                "1": <div style={{ color: "red" }}>"1"</div>,
                                "test": <div style={{ color: "red" }}>"test"</div>,
                                "車行公告F": <div style={{ color: "red" }}>"車行公告A"</div>,
                                "車行公告G": <div style={{ color: "red" }}>"車行公告B"</div>,
                                "車行公告H": <div style={{ color: "red" }}>"車行公告C"</div>,
                                "車行公告I": <div style={{ color: "red" }}>"車行公告D"</div>,
                                "車行公告J": <div style={{ color: "red" }}>"車行公告A"</div>,
                                "車行公告K": <div style={{ color: "red" }}>"車行公告B"</div>,
                                "車行公告L": <div style={{ color: "red" }}>"車行公告C"</div>,
                                "車行公告M": <div style={{ color: "red" }}>"車行公告D"</div>,
                                "車行公告N": <div style={{ color: "red" }}>"車行公告D"</div>,

                            }}
                            tabEvent={{
                                onClick: (tab) => {
                                    props.setNowTab(tab)
                                }
                            }}
                        />
                    </BasicContainer>

                    {/* 右半邊登入容器 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptop.rightContainer}
                    >
                        {/* 背景自適應 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptop.aboveBgImage(Laptopbg)}
                        />
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptop.belowBgImage(Laptopbg)}
                        />

                        {/* 登入框容器 */}
                        <Container
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptop.loginContainer}
                        >
                            {/* 屏東市政府標題 */}
                            <SubContainer
                                baseDefaultTheme={"DefaultTheme"}
                                theme={laptop.bigTitleContainer}
                            >
                                <Text
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={laptop.bigTitleText}
                                >
                                    屏東市政府
                                </Text>
                                <MobileMCar style={laptop.bigTitleLogo} />
                            </SubContainer>
                            {/* 次標題 */}
                            <SubContainer
                                baseDefaultTheme={"DefaultTheme"}
                                theme={laptop.subTitleContainer}
                            >
                                <Text
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={laptop.subTitleText}
                                >
                                    長照交通接送統一預約服務及管理系統
                                </Text>
                            </SubContainer>

                            {/* 從這裡替換成其他表單 : 登入、忘記密碼、設定登入密碼 */}

                            {/* 登入表單 Login */}
                            {props.WhichForm === "Login" &&
                                <>
                                    {/* 登入表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptop.loginFormContainer}
                                    >
                                        {/* 登入表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.loginFormTitle}
                                        >
                                            管理者Login
                                        </Text>
                                        {/* 登入表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.loginFormSubTitle}
                                        >
                                            為了保障您的帳號安全，建議您最少於三個月變更一次密碼。
                                        </Text>
                                        {/* 登入表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                if (!props.loginPending) {
                                                    props.loginExecute()
                                                }
                                            }}
                                            theme={laptop.loginFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 帳號 Account */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={"請輸入您的帳號"}
                                                    leftIcon={
                                                        <Admin
                                                            style={laptop.loginFormAccountLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.loginFormAccount}
                                                    value={globalContextService.get("LoginPage", "Account") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "Account", value);
                                                    }}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 密碼 Password */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"請輸入您的密碼"}
                                                    leftIcon={
                                                        <Lock
                                                            style={laptop.loginFormPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.loginFormPassword}
                                                    value={globalContextService.get("LoginPage", "Password") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "Password", value);
                                                    }}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 登入按鈕 */}
                                                <SubContainer
                                                    theme={laptop.loginFormLoginButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"登入"}
                                                        theme={laptop.loginFormLoginButton}
                                                        onClick={() => {
                                                            if (!props.loginPending) {
                                                                props.loginExecute()
                                                            }
                                                            // modalsService.infoModal.warn({
                                                            //     iconRightText: "請輸入帳號密碼",
                                                            //     yes: true,
                                                            //     yesText: "確認",
                                                            //     // no: true,
                                                            //     // autoClose: true,
                                                            //     backgroundClose: true,
                                                            //     theme: {
                                                            //         title: {
                                                            //             basic: (style, props) => ({
                                                            //                 ...style,
                                                            //                 color: "blue"
                                                            //             })
                                                            //         }
                                                            //     }
                                                            // })
                                                            // modalsService.titleModal.warn({
                                                            //     title: "標題",
                                                            //     iconRightText: "請輸入帳號密碼",
                                                            //     yes: true,
                                                            //     yesText: "確認",
                                                            //     no: true,
                                                            //     // autoClose: true,
                                                            //     backgroundClose: true,
                                                            //     theme: {
                                                            //         title: {
                                                            //             basic: (style, props) => ({
                                                            //                 ...style,
                                                            //                 // color: "blue"
                                                            //             })
                                                            //         }
                                                            //     }
                                                            // })
                                                        }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                            {/* 忘記密碼連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.loginFormForgetPassContainer}
                                                >
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={laptop.loginFormForgetPassSubContainer}
                                                    >
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptop.loginFormForgetPassText}
                                                            onClick={() => { props.setWhichForm("ForgetPass") }}
                                                        >
                                                            忘記密碼？
                                                        </Text>
                                                    </BasicContainer>
                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }

                            {/* 忘記密碼表單 ForgetPass */}
                            {props.WhichForm === "ForgetPass" &&
                                <>
                                    {/* 忘記密碼表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptop.forgetPassFormContainer}
                                    >
                                        {/* 忘記密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.forgetPassFormTitle}
                                        >
                                            忘記密碼
                                        </Text>
                                        {/* 忘記密碼表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.forgetPassFormSubTitle}
                                        >
                                            {!props.SendedAuthCode ?
                                                "請準備好您的手機"
                                                :
                                                "已發送簡訊驗證碼到您的手機"
                                            }
                                        </Text>
                                        {/* 忘記密碼表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={laptop.forgetPassFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 手機號碼 Phone */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="phone"
                                                    placeholder={"請輸入您的手機號碼"}
                                                    leftIcon={
                                                        <Phone
                                                            style={laptop.forgetPassFormPhoneLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.forgetPassFormPhone}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 傳送認證碼按鈕 */}
                                                <SubContainer
                                                    theme={laptop.forgetPassFormSendAuthCodeButtonContainer}
                                                >
                                                    {!props.SendedAuthCode ?
                                                        <BasicButton
                                                            baseDefaultTheme={"PrimaryTheme"}
                                                            text={`傳送驗證碼`}
                                                            theme={laptop.forgetPassFormSendAuthCodeButton}
                                                            onClick={() => {
                                                                props.setSendedAuthCode(true);
                                                            }}
                                                        />
                                                        : props.WaitSecToZero ?
                                                            <BasicButton
                                                                disable
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                text={
                                                                    <>
                                                                        重送驗證碼(
                                                                        <TimeCounter
                                                                            onCountToZero={() => {
                                                                                props.setWaitSecToZero(false);
                                                                                console.log("End")
                                                                            }}
                                                                        />
                                                                        秒)
                                                                    </>
                                                                }
                                                                theme={laptop.forgetPassFormWaitSecToZeroButton}
                                                            />
                                                            :
                                                            <BasicButton
                                                                baseDefaultTheme={"PrimaryTheme"}
                                                                text={"重送驗證碼"}
                                                                theme={laptop.forgetPassFormSendAuthCodeButton}
                                                                onClick={() => { props.setWaitSecToZero(true); console.log("Start") }}
                                                            />
                                                    }
                                                </SubContainer>
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 驗證碼 AuthCode */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={"請輸入簡訊內的認證碼"}
                                                    leftIcon={
                                                        <AuthCode
                                                            style={laptop.forgetPassFormAuthCodeLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.forgetPassFormAuthCode}
                                                />
                                            </FormRow>
                                            <FormRow
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptop.forgetPassFormCancelAndNextButtonFormRow}
                                            >
                                                {/* 取消按鈕 */}
                                                <SubContainer
                                                    theme={laptop.forgetPassFormCancelButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        text={"取消"}
                                                        theme={laptop.forgetPassFormCancelButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                                {/* 下一步按鈕 */}
                                                <SubContainer
                                                    theme={laptop.forgetPassFormNextButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"下一步"}
                                                        theme={laptop.forgetPassFormNextButton}
                                                        onClick={() => { props.setWhichForm("ResetPass") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                            {/* 忘記密碼連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={laptop.forgetPassFormForgetPassContainer}
                                                >
                                                    <Text
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={laptop.forgetPassFormForgetPassText}
                                                    >
                                                        點選下一步，請依照步驟完成驗證註冊。
                                                        </Text>
                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }

                            {/* 設定登入密碼表單 ResetPass */}
                            {props.WhichForm === "ResetPass" &&
                                <>
                                    {/* 設定登入密碼表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={laptop.resetPassFormContainer}
                                    >
                                        {/* 設定登入密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.resetPassFormTitle}
                                        >
                                            設定登入密碼
                                        </Text>
                                        {/* 設定登入密碼表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={laptop.resetPassFormSubTitle}
                                        >
                                            8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                        </Text>
                                        {/* 設定登入密碼表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={laptop.resetPassFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 新密碼 NewPassword */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"請輸入新的密碼"}
                                                    leftIcon={
                                                        <Lock
                                                            style={laptop.resetPassFormNewPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.resetPassFormNewPassword}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 確認新密碼 ConfirmPassword */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="password"
                                                    openEye
                                                    placeholder={"再一次輸入新密碼確認"}
                                                    leftIcon={
                                                        <Lock
                                                            style={laptop.resetPassFormConfirmPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={laptop.resetPassFormConfirmPassword}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 完成按鈕 */}
                                                <SubContainer
                                                    theme={laptop.resetPassFormDoneButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"完成"}
                                                        theme={laptop.resetPassFormDoneButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }
                        </Container>
                    </BasicContainer>
                </ScrollBar>
            </BasicContainer>

        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`