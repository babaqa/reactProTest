import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/FastCallCarPage/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/FastCallCarPage/Edit.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemTestComponent } from '../SystemTestComponent/SystemTestComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { test: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion

    return (
        <>
            <MainPageContainer
                // height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >



                        </BasicContainer>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                {/* {console.log(props.NewsType)} */}
                {/* {console.log(props.AllNews)} */}

                <SystemTestComponent
                    QuestionA={props.QuestionA} // 文書相關檔案QA
                />

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`