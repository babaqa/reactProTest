import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { BasicContainer, ScrollBar, Container, SubContainer, Text, FormContainer, FormRow, TextInput, BasicButton, modalsService, globalContextService } from '../../../Components';
import { ReactComponent as LoginLogoTablet } from '../../../Assets/img/LoginLogoTablet.svg'
import { ReactComponent as Admin } from '../../../Assets/img/Admin.svg'
import { ReactComponent as Lock } from '../../../Assets/img/Lock.svg'
import { ReactComponent as Phone } from '../../../Assets/img/Phone.svg'
import { ReactComponent as AuthCode } from '../../../Assets/img/AuthCode.svg'
import { ReactComponent as Tabletbg } from '../../../Assets/img/Tabletbg.svg'
import { TabletPlacard } from '../../../ProjectComponent';

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

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { login: { rwd: { tablet } } } } = Theme;

    return (
        <>
            {/* 最外層容器 */}
            <BasicContainer
                baseDefaultTheme={"DefaultTheme"}
                theme={tablet.outContainer} >
                {/* 最外層容器 ScrollBar */}
                <ScrollBar
                    basedefaulttheme={"DefaultTheme"}
                    theme={tablet.outContainerScrollBar} /*autoHide={true}*/
                >
                    {/* 上半部 */}
                    <BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={tablet.aboveContainer}
                    >
                        {/* 背景自適應 */}
                        <Tabletbg style={tablet.bgImage} />

                        {/* 登入框容器 */}
                        <Container
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.loginContainer}
                        >

                            {/* 從這裡替換成其他表單 : 登入、忘記密碼、設定登入密碼 */}

                            {/* 登入表單 Login */}
                            {props.WhichForm === "Login" &&
                                <>
                                    {/* 登入表單容器  */}
                                    <BasicContainer
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={tablet.loginFormContainer}
                                    >
                                        {/* 登入表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={tablet.loginFormTitle}
                                        >
                                            管理者Login
                                        </Text>
                                        {/* 登入表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={tablet.loginFormSubTitle}
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
                                            theme={tablet.loginFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 帳號 Account */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="text"
                                                    placeholder={"請輸入您的帳號"}
                                                    leftIcon={
                                                        <Admin
                                                            style={tablet.loginFormAccountLeftIcon}
                                                        />
                                                    }
                                                    theme={tablet.loginFormAccount}
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
                                                            style={tablet.loginFormPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={tablet.loginFormPassword}
                                                    value={globalContextService.get("LoginPage", "Password") ?? ""}
                                                    onChange={(e, value, onInitial) => {
                                                        globalContextService.set("LoginPage", "Password", value);
                                                    }}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 登入按鈕 */}
                                                <SubContainer
                                                    theme={tablet.loginFormLoginButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"登入"}
                                                        theme={tablet.loginFormLoginButton}
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
                                                    theme={tablet.loginFormForgetPassContainer}
                                                >
                                                    <BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={tablet.loginFormForgetPassSubContainer}
                                                    >
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={tablet.loginFormForgetPassText}
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
                                        theme={tablet.forgetPassFormContainer}
                                    >
                                        {/* 忘記密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={tablet.forgetPassFormTitle}
                                        >
                                            忘記密碼
                                        </Text>
                                        {/* 忘記密碼表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={tablet.forgetPassFormSubTitle}
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
                                            theme={tablet.forgetPassFormFormContainer}
                                        >
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 手機號碼 Phone */}
                                                <TextInput
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    type="phone"
                                                    placeholder={"請輸入您的手機號碼"}
                                                    leftIcon={
                                                        <Phone
                                                            style={tablet.forgetPassFormPhoneLeftIcon}
                                                        />
                                                    }
                                                    theme={tablet.forgetPassFormPhone}
                                                />
                                                {/* 傳送認證碼按鈕 */}
                                                <SubContainer
                                                    theme={tablet.forgetPassFormSendAuthCodeButtonContainer}
                                                >
                                                    {!props.SendedAuthCode ?
                                                        <BasicButton
                                                            baseDefaultTheme={"PrimaryTheme"}
                                                            text={`傳送驗證碼`}
                                                            theme={tablet.forgetPassFormSendAuthCodeButton}
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
                                                                theme={tablet.forgetPassFormWaitSecToZeroButton}
                                                            />
                                                            :
                                                            <BasicButton
                                                                baseDefaultTheme={"PrimaryTheme"}
                                                                text={"重送驗證碼"}
                                                                theme={tablet.forgetPassFormSendAuthCodeButton}
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
                                                            style={tablet.forgetPassFormAuthCodeLeftIcon}
                                                        />
                                                    }
                                                    theme={tablet.forgetPassFormAuthCode}
                                                />
                                            </FormRow>
                                            <FormRow
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={tablet.forgetPassFormCancelAndNextButtonFormRow}
                                            >
                                                {/* 取消按鈕 */}
                                                <SubContainer
                                                    theme={tablet.forgetPassFormCancelButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        text={"取消"}
                                                        theme={tablet.forgetPassFormCancelButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                                {/* 下一步按鈕 */}
                                                <SubContainer
                                                    theme={tablet.forgetPassFormNextButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"下一步"}
                                                        theme={tablet.forgetPassFormNextButton}
                                                        onClick={() => { props.setWhichForm("ResetPass") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                            {/* 忘記密碼連結 */}
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                <SubContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={tablet.forgetPassFormForgetPassContainer}
                                                >
                                                    <Text
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={tablet.forgetPassFormForgetPassText}
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
                                        theme={tablet.resetPassFormContainer}
                                    >
                                        {/* 設定登入密碼表單標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={tablet.resetPassFormTitle}
                                        >
                                            設定登入密碼
                                        </Text>
                                        {/* 設定登入密碼表單次標題 */}
                                        <Text
                                            baseDefaultTheme={"DefaultTheme"}
                                            theme={tablet.resetPassFormSubTitle}
                                        >
                                            8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                        </Text>
                                        {/* 設定登入密碼表單組件 */}
                                        <FormContainer
                                            baseDefaultTheme={"DefaultTheme"}
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                            theme={tablet.resetPassFormFormContainer}
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
                                                            style={tablet.resetPassFormNewPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={tablet.resetPassFormNewPassword}
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
                                                            style={tablet.resetPassFormConfirmPasswordLeftIcon}
                                                        />
                                                    }
                                                    theme={tablet.resetPassFormConfirmPassword}
                                                />
                                            </FormRow>
                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                {/* 完成按鈕 */}
                                                <SubContainer
                                                    theme={tablet.resetPassFormDoneButtonContainer}
                                                >
                                                    <BasicButton
                                                        baseDefaultTheme={"PrimaryTheme"}
                                                        text={"完成"}
                                                        theme={tablet.resetPassFormDoneButton}
                                                        onClick={() => { props.setWhichForm("Login") }}
                                                    />
                                                </SubContainer>
                                            </FormRow>
                                        </FormContainer>
                                    </BasicContainer>
                                </>
                            }

                            {/* 登入頁Logo */}
                            <LoginLogoTablet />

                        </Container>
                    </BasicContainer>

                </ScrollBar>
            </BasicContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`