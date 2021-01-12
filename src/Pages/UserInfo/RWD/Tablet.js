import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MainPageSubTitleBar, TimeCounterButton } from '../../../ProjectComponent';
import { Container, BasicContainer, BasicButton, TreeSelector, Tooltip, DateTimePicker, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Lock } from '../../../Assets/img/UserInfoPage/Lock.svg'
import { isNil } from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { userInfo: { rwd: { tablet } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                theme={tablet.mainPageContainer}
            // outSideTopComponent={
            //     <>
            //         {/* 標題列 */}
            //         <MainPageTitleBar
            //             bascDefaultTheme={"DefaultTheme"}
            //             titleText={"用戶資料"}
            //             theme={tablet.titleBar}
            //         // onSubmit={(e)=>console.log(e)}
            //         >

            //         </MainPageTitleBar>
            //     </>
            // }
            >

                {/* 基本資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.basicInformationContainer}
                >
                    {/* 基本資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={tablet.basicInfBaseSubTitleBar}
                    >
                        {/* 待接api，若無共享車隊身分則可以註冊 */}
                        {true
                            &&
                            <>
                                {/*  註冊共享車隊按鈕 (標題列右方) 容器 */}
                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 註冊共享車隊按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={tablet.registeredFleetButton}
                                        onClick={(e) => {

                                        }}
                                    >
                                        註冊共享車隊
                                    </NativeLineButton>
                                </SubContainer>
                            </>
                        }

                        {/* 待接api，若無巴士身分則可以註冊 */}
                        {true
                            &&
                            <>
                                {/*  註冊巴士按鈕 (標題列右方) 容器 */}
                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 註冊巴士按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={tablet.registeredBusButton}
                                        onClick={(e) => {

                                        }}
                                    >
                                        註冊巴士
                                    </NativeLineButton>
                                </SubContainer>
                            </>
                        }
                        {/*  修改密碼按鈕 (標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 修改密碼按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={tablet.editPwdButton}
                                onClick={(e) => {
                                    e.preventDefault();

                                    let rowData = {};

                                    //#region 打開修改密碼 Modal
                                    modalsService.titleModal.normal({
                                        //id: "top1",
                                        title: "修改密碼",
                                        yes: true,
                                        yesText: "確認",
                                        no: true,
                                        noText: "取消",
                                        // autoClose: true,
                                        backgroundClose: false,
                                        noOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        yesOnClick: (e, close) => {
                                            //#region 表單驗證
                                            let validMsg = "";

                                            //#endregion

                                            //#region 表單驗證後動作
                                            if (validMsg !== "") {
                                                // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
                                                modalsService.infoModal.error({
                                                    id: "top1", //注意 這裡要加上固定id
                                                    iconRightText: validMsg,
                                                    yes: true,
                                                    yesText: "確認",
                                                    // no: true,
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    yesOnClick: (e, close) => {
                                                        close();
                                                    }
                                                })
                                            }
                                            else {
                                                close();
                                            }
                                            //#endregion
                                        },
                                        closeIconOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        content: (
                                            <FormContainer
                                                baseDefaultTheme={"DefaultTheme"}
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                }}
                                                theme={tablet.editPwdFormContainer}
                                            >
                                                <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                    {/* 修改密碼提示文字 */}
                                                    < Text
                                                        theme={tablet.editPwdTip}
                                                    >
                                                        8碼以上且大寫英文、小寫英文、數字、特殊符號，4選3。
                                                    </Text>

                                                    {/* 舊密碼 OldPwd */}
                                                    <TextInput
                                                        topLabel={<>舊密碼</>}
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        type="password"
                                                        placeholder={"請輸入舊密碼"}
                                                        leftIcon={
                                                            <Lock
                                                                style={tablet.pwdLeftIcon}
                                                            />
                                                        }
                                                        openEye
                                                        value={globalContextService.get("UserInfoPage", "OldPwd") ?? props.Client?.name}
                                                        onChange={(e, value, onInitial) => {
                                                            globalContextService.set("UserInfoPage", "OldPwd", value);
                                                        }}
                                                        theme={tablet.oldPwd}
                                                    />

                                                    {/* 新密碼 NewPwd */}
                                                    <TextInput
                                                        topLabel={<>新密碼</>}
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        type="password"
                                                        placeholder={"請輸入新密碼"}
                                                        leftIcon={
                                                            <Lock
                                                                style={tablet.pwdLeftIcon}
                                                            />
                                                        }
                                                        openEye
                                                        value={globalContextService.get("UserInfoPage", "NewPwd") ?? props.Client?.name}
                                                        onChange={(e, value, onInitial) => {
                                                            globalContextService.set("UserInfoPage", "NewPwd", value);
                                                        }}
                                                        theme={tablet.newPwd}
                                                    />

                                                    {/* 確認新密碼 ConfirmPwd */}
                                                    <TextInput
                                                        topLabel={<>確認新密碼</>}
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        type="password"
                                                        placeholder={"請輸入新密碼"}
                                                        leftIcon={
                                                            <Lock
                                                                style={tablet.pwdLeftIcon}
                                                            />
                                                        }
                                                        openEye
                                                        value={globalContextService.get("UserInfoPage", "ConfirmPwd") ?? props.Client?.name}
                                                        onChange={(e, value, onInitial) => {
                                                            globalContextService.set("UserInfoPage", "ConfirmPwd", value);
                                                        }}
                                                        theme={tablet.confirmPwd}
                                                    />

                                                </FormRow>
                                            </FormContainer>
                                        ),
                                        theme: tablet.editPwdModal
                                    })
                                    //#endregion
                                }}
                            >
                                修改密碼
                                </NativeLineButton>
                        </SubContainer>

                        {/*  修改手機按鈕 (標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 修改手機按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={tablet.editPhoneButton}
                                onClick={(e) => {
                                    e.preventDefault();

                                    let rowData = {};

                                    //#region 打開修改手機 發送驗證碼 Modal
                                    modalsService.titleModal.normal({
                                        //id: "top1",
                                        title: "修改手機",
                                        yes: true,
                                        yesText: "發送驗證碼",
                                        no: true,
                                        noText: "取消",
                                        // autoClose: true,
                                        backgroundClose: false,
                                        noOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        yesOnClick: (e, close) => {
                                            //#region 表單驗證
                                            let validMsg = "";

                                            //#endregion

                                            //#region 表單驗證後動作
                                            if (validMsg !== "") {
                                                // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
                                                modalsService.infoModal.error({
                                                    id: "top1", //注意 這裡要加上固定id
                                                    iconRightText: validMsg,
                                                    yes: true,
                                                    yesText: "確認",
                                                    // no: true,
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    yesOnClick: (e, close) => {
                                                        close();
                                                    }
                                                })
                                            }
                                            else {
                                                close();

                                                //#region 打開修改手機 提交驗證碼 Modal
                                                modalsService.titleModal.normal({
                                                    //id: "top1",
                                                    title: "修改手機",
                                                    yes: true,
                                                    yesText: "提交驗證碼",
                                                    no: true,
                                                    noText: "取消",
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    noOnClick: (e) => {
                                                        // props.controllGCS("addClientModalClose")
                                                    },
                                                    yesOnClick: (e, close) => {
                                                        //#region 表單驗證
                                                        let validMsg = "";

                                                        //#endregion

                                                        //#region 表單驗證後動作
                                                        if (validMsg !== "") {
                                                            // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
                                                            modalsService.infoModal.error({
                                                                id: "top1", //注意 這裡要加上固定id
                                                                iconRightText: validMsg,
                                                                yes: true,
                                                                yesText: "確認",
                                                                // no: true,
                                                                // autoClose: true,
                                                                backgroundClose: false,
                                                                yesOnClick: (e, close) => {
                                                                    close();
                                                                }
                                                            })
                                                        }
                                                        else {
                                                            close();

                                                            //#region 打開修手機驗證成功 Modal
                                                            modalsService.infoModal.success({
                                                                iconRightText: "手機驗證成功",
                                                                yes: true,
                                                                yesText: "確認",
                                                                // no: true,
                                                                // autoClose: true,
                                                                backgroundClose: false,
                                                                yesOnClick: (e, close) => { close(); }
                                                            })
                                                        }
                                                        //#endregion
                                                    },
                                                    closeIconOnClick: (e) => {
                                                        // props.controllGCS("addClientModalClose")
                                                    },
                                                    content: (
                                                        <>
                                                            {/*提交驗證碼容器*/}
                                                            <FormContainer
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                theme={tablet.confirmVerificationCodeFormContainer}
                                                            >
                                                                <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                                    {/* 提交驗證碼提示文字 */}
                                                                    < Text
                                                                        theme={tablet.confirmVerificationCodeTip}
                                                                    >
                                                                        已發送簡訊驗證碼到您的手機
                                                                    </Text>

                                                                    {/* 手機號碼 ModalEditCellPhone */}
                                                                    <TextInput
                                                                        topLabel={<>手機號碼</>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={"請輸入手機號碼"}
                                                                        value={globalContextService.get("UserInfoPage", "ModalEditCellPhone") ?? ""}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserInfoPage", "ModalEditCellPhone", value);
                                                                        }}
                                                                        theme={tablet.modalEditCellPhone}
                                                                    />

                                                                    {/* 驗證碼 ModalVerificationCode */}
                                                                    <TextInput
                                                                        topLabel={
                                                                            <>
                                                                                驗證碼
                                                                                <TimeCounterButton
                                                                                    getPresetWaitSecToZero={true}
                                                                                    getPresetCounter={10}
                                                                                />

                                                                            </>
                                                                        }
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={"請輸入驗證碼"}
                                                                        value={globalContextService.get("UserInfoPage", "ModalVerificationCode") ?? ""}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("UserInfoPage", "ModalVerificationCode", value);
                                                                        }}
                                                                        theme={tablet.modalVerificationCode}
                                                                    />

                                                                </FormRow>
                                                            </FormContainer>
                                                        </>
                                                    ),
                                                    theme: tablet.confirmVerificationCodeModal
                                                })
                                                //#endregion
                                            }
                                            //#endregion
                                        },
                                        closeIconOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        content: (
                                            <>
                                                {/*發送驗證碼容器*/}
                                                <FormContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    theme={tablet.sendVerificationCodeFormContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                        {/* 手機號碼 ModalEditCellPhone */}
                                                        <TextInput
                                                            topLabel={<>手機號碼</>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={"請輸入手機號碼"}
                                                            value={globalContextService.get("UserInfoPage", "ModalEditCellPhone") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("UserInfoPage", "ModalEditCellPhone", value);
                                                            }}
                                                            theme={tablet.modalEditCellPhone}
                                                        />

                                                    </FormRow>
                                                </FormContainer>
                                            </>
                                        ),
                                        theme: tablet.sendVerificationCodeModal
                                    })
                                    //#endregion
                                }}
                            >
                                修改手機
                                </NativeLineButton>
                        </SubContainer>
                    </MainPageSubTitleBar>

                    <Container>

                        {/* 姓名 Name */}
                        <TextInput
                            viewType
                            topLabel={<>姓名</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "Name") ?? props.Client?.name}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "Name", value);
                            }}
                            theme={tablet.name}
                        />

                        {/* 生日 Birthday */}
                        <DateTimePicker
                            topLabel={<>生日</>}
                            // type={"time"} // time、date、week、month、quarter、year
                            type={"date"}
                            format={"YYYY-MM-DD"}
                            bascDefaultTheme={"DefaultTheme"}
                            viewType
                            isSearchable
                            placeholder={""}
                            value={
                                // (globalContextService.get("UserInfoPage", `Birthday`) ?
                                //     moment(globalContextService.get("UserInfoPage", `Birthday`), "YYYY-MM-DD")
                                //     :
                                (props.Client?.birthday) ?
                                    moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                    :
                                    null
                                // )
                            }
                            onChange={(value, momentObj) => {
                                globalContextService.set("UserInfoPage", `Birthday`, value);
                            }}
                            theme={tablet.birthday}
                        />

                        {/* 性別 Sex */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={<>性別</>}
                            viewType
                            isSearchable
                            placeholder={""}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={
                                // globalContextService.get("UserInfoPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                (!isNil(props.Client?.sex)) ?
                                    { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                    :
                                    null
                            }
                            onChange={(e, value, onInitial) => {
                                // console.log("value", value)
                                globalContextService.set("UserInfoPage", "Sex", value);
                            }}

                            options={[
                                { value: 'hint', label: "請選擇性別", isDisabled: true },
                                { value: 1, label: '男' },
                                { value: 0, label: '女' }
                            ]}
                            // menuPosition={true}
                            theme={tablet.sex}
                        />

                        {/* 身分證字號 Uid */}
                        <TextInput
                            viewType
                            topLabel={<>身分證字號</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "Uid") ?? props.Client?.uid}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "Uid", value);
                            }}
                            theme={tablet.uid}
                        />

                        {/* 手機 Cellphone */}
                        <TextInput
                            viewType
                            topLabel={<>手機</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "Cellphone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "Cellphone", value);
                            }}
                            theme={tablet.cellPhone}
                        />

                    </Container>
                </BasicContainer>


                {/* 長照資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.caseInformationContainer}
                >
                    {/* 長照資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"長照"}
                        theme={tablet.caseInfBaseSubTitleBar}
                    >
                        {/*  額度狀況按鈕 (標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 額度狀況按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={tablet.quotaStatusButton}
                                onClick={(e) => {
                                    e.preventDefault();

                                    let rowData = {};

                                    //#region 打開額度狀況 Modal
                                    modalsService.titleModal.normal({
                                        //id: "top1",
                                        title: "額度狀況",
                                        yes: true,
                                        yesText: "確認",
                                        no: false,
                                        // noText: "取消",
                                        // autoClose: true,
                                        backgroundClose: false,
                                        noOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        yesOnClick: (e, close) => {
                                            //#region 表單驗證
                                            let validMsg = "";

                                            //#endregion

                                            //#region 表單驗證後動作
                                            if (validMsg !== "") {
                                                // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
                                                modalsService.infoModal.error({
                                                    id: "top1", //注意 這裡要加上固定id
                                                    iconRightText: validMsg,
                                                    yes: true,
                                                    yesText: "確認",
                                                    // no: true,
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    yesOnClick: (e, close) => {
                                                        close();
                                                    }
                                                })
                                            }
                                            else {
                                                close();
                                            }
                                            //#endregion
                                        },
                                        closeIconOnClick: (e) => {
                                            // props.controllGCS("addClientModalClose")
                                        },
                                        content: (
                                            <FormContainer
                                                baseDefaultTheme={"DefaultTheme"}
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                }}
                                                theme={tablet.quotaStatusFormContainer}
                                            >
                                                <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                    {/* 總額度 標題 */}
                                                    < Text
                                                        theme={tablet.totalAmountTitle}
                                                    >
                                                        總額度
                                                         {/* 總額度 內文 */}
                                                        <Text
                                                            theme={tablet.totalAmountText}
                                                        >
                                                            {'$' + '1840'}
                                                        </Text>
                                                    </Text>

                                                    {/* 使用額度 標題 */}
                                                    < Text
                                                        theme={tablet.useQuotaTitle}
                                                    >
                                                        使用額度
                                                         {/* 使用額度 內文 */}
                                                        <Text
                                                            theme={tablet.useQuotaText}
                                                        >
                                                            {'$' + '0'}
                                                        </Text>
                                                    </Text>

                                                    {/* 剩餘額度 標題 */}
                                                    < Text
                                                        theme={tablet.remainingAmountTitle}
                                                    >
                                                        剩餘額度
                                                         {/* 剩餘額度 內文 */}
                                                        <Text
                                                            theme={tablet.remainingAmountText}
                                                        >
                                                            {'$' + '1840'}
                                                        </Text>
                                                    </Text>

                                                </FormRow>
                                            </FormContainer>
                                        ),
                                        theme: tablet.quotaStatusModal
                                    })
                                    //#endregion
                                }}
                            >
                                額度狀況
                                    </NativeLineButton>
                        </SubContainer>
                    </MainPageSubTitleBar>

                    <Container>
                        {/* 案號 CaseNumber */}
                        <TextInput
                            viewType
                            topLabel={<>案號</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "CaseNumber") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "CaseNumber", value);
                            }}
                            theme={tablet.caseNumber}
                        />

                        {/* 長照居住地址 CaseResidentialAddress */}
                        <TextInput
                            viewType
                            topLabel={<>居住地址</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "CaseResidentialAddress") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "CaseResidentialAddress", value);
                            }}
                            theme={tablet.caseResidentialAddress}
                        />

                        {/* 長照緊急聯絡人姓名 CaseEmergencyName */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人姓名</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "CaseEmergencyName") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "CaseEmergencyName", value);
                            }}
                            theme={tablet.caseEmergencyName}
                        />

                        {/* 長照緊急聯絡人手機 CaseEmergencyCellPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人手機</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "CaseEmergencyCellPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "CaseEmergencyCellPhone", value);
                            }}
                            theme={tablet.caseEmergencyCellPhone}
                        />

                        {/* 長照緊急聯絡人市話 CaseEmergencyPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人市話</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "CaseEmergencyPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "CaseEmergencyPhone", value);
                            }}
                            theme={tablet.caseEmergencyPhone}
                        />

                        {/* 長照服務車隊 CaseServiceFleet */}
                        <TextInput
                            viewType
                            topLabel={<>服務車隊</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "CaseServiceFleet") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "CaseServiceFleet", value);
                            }}
                            theme={tablet.caseServiceFleet}
                        />
                    </Container>

                </BasicContainer>

                {/* 共享車隊資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.fleetInformationContainer}
                >
                    {/* 共享車隊資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"共享車隊"}
                        theme={tablet.fleetInfBaseSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    <Container>

                        {/* 共享車隊居住地址 FleetResidentialAddress */}
                        <TextInput
                            viewType
                            topLabel={<>居住地址</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "FleetResidentialAddress") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "FleetResidentialAddress", value);
                            }}
                            theme={tablet.fleetResidentialAddress}
                        />

                        {/* 共享車隊緊急聯絡人姓名 FleetEmergencyName */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人姓名</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "FleetEmergencyName") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "FleetEmergencyName", value);
                            }}
                            theme={tablet.fleetEmergencyName}
                        />

                        {/* 共享車隊緊急聯絡人手機 FleetEmergencyCellPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人手機</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "FleetEmergencyCellPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "FleetEmergencyCellPhone", value);
                            }}
                            theme={tablet.fleetEmergencyCellPhone}
                        />

                        {/* 共享車隊緊急聯絡人市話 FleetEmergencyPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人市話</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "FleetEmergencyPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "FleetEmergencyPhone", value);
                            }}
                            theme={tablet.fleetEmergencyPhone}
                        />

                        {/* 共享車隊服務車隊 FleetServiceFleet */}
                        <TextInput
                            viewType
                            topLabel={<>服務車隊</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "FleetServiceFleet") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "FleetServiceFleet", value);
                            }}
                            theme={tablet.fleetServiceFleet}
                        />
                    </Container>

                </BasicContainer>

                {/* 巴士資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.busInformationContainer}
                >
                    {/* 巴士資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"巴士"}
                        theme={tablet.busInfBaseSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    <Container>

                        {/* 巴士居住地址 BusResidentialAddress */}
                        <TextInput
                            viewType
                            topLabel={<>居住地址</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "BusResidentialAddress") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "BusResidentialAddress", value);
                            }}
                            theme={tablet.busResidentialAddress}
                        />

                        {/* 巴士緊急聯絡人姓名 BusEmergencyName */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人姓名</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "BusEmergencyName") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "BusEmergencyName", value);
                            }}
                            theme={tablet.busEmergencyName}
                        />

                        {/* 巴士緊急聯絡人手機 BusEmergencyCellPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人手機</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "BusEmergencyCellPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "BusEmergencyCellPhone", value);
                            }}
                            theme={tablet.busEmergencyCellPhone}
                        />

                        {/* 巴士緊急聯絡人市話 BusEmergencyPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人市話</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "BusEmergencyPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "BusEmergencyPhone", value);
                            }}
                            theme={tablet.busEmergencyPhone}
                        />

                        {/* 巴士服務車隊 BusServiceFleet */}
                        <TextInput
                            viewType
                            topLabel={<>服務車隊</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "BusServiceFleet") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "BusServiceFleet", value);
                            }}
                            theme={tablet.busServiceFleet}
                        />
                    </Container>

                </BasicContainer>

                {/* 日照資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.dayCareInformationContainer}
                >
                    {/* 日照資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"日照"}
                        theme={tablet.dayCareInfBaseSubTitleBar}
                    >
                    </MainPageSubTitleBar>

                    <Container>
                        {/* 案號 DayCareNumber */}
                        <TextInput
                            viewType
                            topLabel={<>案號</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "DayCareNumber") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "DayCareNumber", value);
                            }}
                            theme={tablet.dayCareNumber}
                        />

                        {/* 日照居住地址 DayCareResidentialAddress */}
                        <TextInput
                            viewType
                            topLabel={<>居住地址</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "DayCareResidentialAddress") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "DayCareResidentialAddress", value);
                            }}
                            theme={tablet.dayCareResidentialAddress}
                        />

                        {/* 日照緊急聯絡人姓名 DayCareEmergencyName */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人姓名</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "DayCareEmergencyName") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "DayCareEmergencyName", value);
                            }}
                            theme={tablet.dayCareEmergencyName}
                        />

                        {/* 日照緊急聯絡人手機 DayCareEmergencyCellPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人手機</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "DayCareEmergencyCellPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "DayCareEmergencyCellPhone", value);
                            }}
                            theme={tablet.dayCareEmergencyCellPhone}
                        />

                        {/* 日照緊急聯絡人市話 DayCareEmergencyPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人市話</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "DayCareEmergencyPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "DayCareEmergencyPhone", value);
                            }}
                            theme={tablet.dayCareEmergencyPhone}
                        />

                        {/* 日照服務車隊 DayCareServiceFleet */}
                        <TextInput
                            viewType
                            topLabel={<>服務車隊</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "DayCareServiceFleet") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "DayCareServiceFleet", value);
                            }}
                            theme={tablet.dayCareServiceFleet}
                        />
                    </Container>

                </BasicContainer>

                {/* 偏鄉資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.ruralInformationContainer}
                >
                    {/* 偏鄉資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"偏鄉運能不足"}
                        theme={tablet.ruralInfBaseSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    <Container>

                        {/* 偏鄉居住地址 RuralResidentialAddress */}
                        <TextInput
                            viewType
                            topLabel={<>居住地址</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "RuralResidentialAddress") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "RuralResidentialAddress", value);
                            }}
                            theme={tablet.ruralResidentialAddress}
                        />

                        {/* 偏鄉緊急聯絡人姓名 RuralEmergencyName */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人姓名</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "RuralEmergencyName") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "RuralEmergencyName", value);
                            }}
                            theme={tablet.ruralEmergencyName}
                        />

                        {/* 偏鄉緊急聯絡人手機 RuralEmergencyCellPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人手機</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "RuralEmergencyCellPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "RuralEmergencyCellPhone", value);
                            }}
                            theme={tablet.ruralEmergencyCellPhone}
                        />

                        {/* 偏鄉緊急聯絡人市話 RuralEmergencyPhone */}
                        <TextInput
                            viewType
                            topLabel={<>緊急聯絡人市話</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "RuralEmergencyPhone") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "RuralEmergencyPhone", value);
                            }}
                            theme={tablet.ruralEmergencyPhone}
                        />

                        {/* 偏鄉服務車隊 RuralServiceFleet */}
                        <TextInput
                            viewType
                            topLabel={<>服務車隊</>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("UserInfoPage", "RuralServiceFleet") ?? props.Client?.phone}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("UserInfoPage", "RuralServiceFleet", value);
                            }}
                            theme={tablet.ruralServiceFleet}
                        />
                    </Container>

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`