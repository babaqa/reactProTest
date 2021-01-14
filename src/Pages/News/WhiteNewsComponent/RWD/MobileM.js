import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input, CardTable } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, NativeLineButton } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as NoData } from '../../../../Assets/img/WhiteNewsComponentPage/NoData.svg'

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { component: { whiteNewsComponent: { rwd: { mobileM } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const statusMapping = (status, getTheme = false) => {
        switch (toString(status)) {
            case "1":
                return (getTheme ? mobileM.newsIdentityTag.caseNews : "長照");
            case "2":
                return (getTheme ? mobileM.newsIdentityTag.whiteNews : "共享車隊");
            case "3":
                return (getTheme ? mobileM.newsIdentityTag.busNews : "巴士");
            default:
                return (getTheme ? mobileM.newsIdentityTag.unknownNews : "無此身份");
        }
    }

    let history = useHistory()
    let data = props.data.filter(d => d.identity === '2')

    return (
        <>
            {/* 公告外層 容器 */}
            <BasicContainer
                bascDefaultTheme={"DefaultTheme"}
                theme={mobileM.newsContainer}
            >
                {data.length === 0
                    ?
                    <>
                        {/* 無資料表單區容器 */}
                        < BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={mobileM.noDataContainer}
                        >
                            <NoData style={mobileM.noDataSvg} />
                        </BasicContainer>
                    </>
                    :
                    <CardTable
                        dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                        dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                            globalContextService.remove("WhiteNewsComponentPage", "CheckedRowKeys");
                            globalContextService.remove("WhiteNewsComponentPage", "CheckedRowsData");
                        }}
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("WhiteNewsComponentPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("WhiteNewsComponentPage", "CheckedRowsData", checkedRows);
                            }
                        }
                        setPerCheckBoxDisabled={(record) => {
                            return {
                                // ...record, // 對應CheckBox當列資料
                                // disabled: record.name === 'Edrward 11',
                            }
                        }}
                        //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                        //scrollAreaHeight={"calc( 100% - 55px )"}
                        columnsAttr={
                            //#region 資料欄設定
                            [
                                {
                                    title: '',
                                    width: "100%",
                                    dataIndex: '',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                    render: (rowData, allRowData) => {

                                        return (
                                            <>
                                                {/* 公告容器 */}
                                                <Container theme={mobileM.newsCardContainer}>

                                                    {/* 公告Tag容器 */}
                                                    <SubContainer theme={mobileM.newsCardTagContainer}>
                                                        {/* 公告Tag */}
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={statusMapping(props?.tag ?? toString(rowData.identity), true)}
                                                            text={statusMapping(props?.tag ?? toString(rowData.identity))}
                                                        />
                                                    </SubContainer >

                                                    {/* 公告日期容器 */}
                                                    <SubContainer theme={mobileM.newsCardDateContainer}>
                                                        {/* 公告日期文字 */}
                                                        <Text theme={mobileM.newsCardDateText}>
                                                            {rowData.date ?? "2020-12-31"}
                                                        </Text>
                                                    </SubContainer>

                                                    {/* 公告內容容器 */}
                                                    <SubContainer theme={mobileM.newsCardContentContainer}>
                                                        {/* 公告內容文字 */}
                                                        <Text
                                                            theme={mobileM.newsCardContentText}
                                                            onClick={() => {
                                                                modalsService.titleModal.normal({
                                                                    //id: "top1",
                                                                    title: "公告",
                                                                    yes: true,
                                                                    yesText: "確認",
                                                                    no: false,
                                                                    noText: "取消",
                                                                    // autoClose: true,
                                                                    backgroundClose: false,
                                                                    noOnClick: (e) => {
                                                                    },
                                                                    yesOnClick: (e, close) => {
                                                                        close();
                                                                    },
                                                                    closeIconOnClick: (e) => {
                                                                    },
                                                                    content: (
                                                                        <Text theme={mobileM.newsCardContentModalText}>
                                                                            {rowData.announce ?? "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順..."}
                                                                        </Text>
                                                                    ),
                                                                    theme: mobileM.newsModal
                                                                })
                                                            }}
                                                        >
                                                            {rowData.announce}
                                                        </Text>
                                                    </SubContainer>

                                                </Container>

                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '',
                                    width: "0px",
                                    dataIndex: 'rightOccupy',
                                    fixed: 'right',
                                    sorter: false
                                },
                            ]
                            //#endregion
                        }
                        //sort
                        showHeader={false}
                        data={data}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        // data={props.AllClient.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                }
                {(data.length > 0 && data.length <= 10)
                    &&
                    <>
                        {/* 沒有更多公告 提醒 */}
                        <Text
                            theme={mobileM.noDataTip}
                        >
                            沒有更多公告
                        </Text>
                    </>
                }
            </BasicContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`