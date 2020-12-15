import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MainPageSubTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, DateTimePicker, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { isNil } from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { userInfo: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"用戶資料"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 基本資料表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.basicInformationContainer}
                >
                    {/* 基本資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={laptopL.basicInfBaseSubTitleBar}
                    >
                        {/*  修改密碼按鈕 (標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 修改密碼按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptopL.editPwdButton}
                            // onClick={() => {
                            // }}
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
                                theme={laptopL.editPhoneButton}
                            // onClick={() => {
                            // }}
                            >
                                修改手機
                                </NativeLineButton>
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 基本資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                    >
                        <FormRow>

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
                                theme={laptopL.name}
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
                                theme={laptopL.birthday}
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
                                theme={laptopL.sex}
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
                                theme={laptopL.uid}
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
                                theme={laptopL.cellPhone}
                            />

                        </FormRow>
                    </FormContainer>
                </BasicContainer>

                {/* 下方資料容器 */}
                <Container>

                    {/* 下方左側資料 容器 */}
                    <SubContainer
                        theme={laptopL.leftBottomContainer}
                    >
                        {/* 長照資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.caseInformationContainer}
                        >
                            {/* 長照資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"長照"}
                                theme={laptopL.caseInfBaseSubTitleBar}
                            >
                                {/*  額度狀況按鈕 (標題列右方) 容器 */}
                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 額度狀況按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptopL.quotaStatusButton}
                                    // onClick={() => {
                                    // }}
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
                                    theme={laptopL.caseNumber}
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
                                    theme={laptopL.caseResidentialAddress}
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
                                    theme={laptopL.caseEmergencyName}
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
                                    theme={laptopL.caseEmergencyCellPhone}
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
                                    theme={laptopL.caseEmergencyPhone}
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
                                    theme={laptopL.caseServiceFleet}
                                />
                            </Container>

                        </BasicContainer>
                    </SubContainer>

                    {/* 下方中間資料 容器 */}
                    <SubContainer
                        theme={laptopL.centerBottomContainer}
                    >
                        {/* 共享車隊資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.fleetInformationContainer}
                        >
                            {/* 共享車隊資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"共享車隊"}
                                theme={laptopL.fleetInfBaseSubTitleBar}
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
                                    theme={laptopL.fleetResidentialAddress}
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
                                    theme={laptopL.fleetEmergencyName}
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
                                    theme={laptopL.fleetEmergencyCellPhone}
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
                                    theme={laptopL.fleetEmergencyPhone}
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
                                    theme={laptopL.fleetServiceFleet}
                                />
                            </Container>

                        </BasicContainer>
                    </SubContainer>

                    {/* 下方右側資料 容器 */}
                    <SubContainer
                        theme={laptopL.rightBottomContainer}
                    >
                        {/* 巴士資料表單區容器 */}
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={laptopL.busInformationContainer}
                        >
                            {/* 巴士資料 子標題列 */}
                            <MainPageSubTitleBar
                                bascDefaultTheme={"DefaultTheme"}
                                titleText={"巴士"}
                                theme={laptopL.busInfBaseSubTitleBar}
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
                                    theme={laptopL.busResidentialAddress}
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
                                    theme={laptopL.busEmergencyName}
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
                                    theme={laptopL.busEmergencyCellPhone}
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
                                    theme={laptopL.busEmergencyPhone}
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
                                    theme={laptopL.busServiceFleet}
                                />
                            </Container>

                        </BasicContainer>
                    </SubContainer>
                
                </Container>
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`