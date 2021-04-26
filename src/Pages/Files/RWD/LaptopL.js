import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MainPageSubTitleBar, TimeCounterButton } from '../../../ProjectComponent';
import { Container, BasicContainer, BasicButton, TreeSelector, Tooltip, DateTimePicker, Textarea, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { ReactComponent as Point } from '../../../Assets/img/FilesPage/Point.svg'
import { ReactComponent as Slash } from '../../../Assets/img/FilesPage/Slash.svg'

import { Component } from '../Component/Component'
import { DetailComponent } from '../DetailComponent/DetailComponent'
import { subTabMapping } from '../../../Mappings/Mappings';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { files: { rwd: { laptopL } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    //#region 分頁映射
    const tabMap = () => {
        return ["認識臺藝", "臺藝風雲榜", "線上檔案展"]

    }

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {
                            props.NowTab === "OnlineArchiveExhibition"
                            &&
                            <>
                                {/* 分頁tab 容器 */}
                                <BasicContainer
                                    exhibition={props.NowTab === "OnlineArchiveExhibition"}
                                    theme={laptopL.tabsContainer}
                                >
                                    {tabMap().map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Text
                                                    onClick={() => {
                                                        // props.setNowTab(Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]) 
                                                        history.push(`/Files?subTab=${Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]}`);
                                                    }}
                                                    exhibition={props.NowTab === "OnlineArchiveExhibition"}
                                                    theme={laptopL.titleBarContactTab}
                                                >
                                                    {
                                                        subTabMapping[props.NowTab] === item
                                                        &&
                                                        <Point
                                                            style={laptopL.pointSvg}
                                                        />
                                                    }
                                                    {item}
                                                </Text>
                                            </React.Fragment>
                                        )
                                    })}
                                </BasicContainer>

                            </>
                        }

                        {/* 首頁文字 */}
                        <Container style={{ justifyContent: "flex-end", padding: "0 50px", alignItems: "center" }}>
                            <Text
                                theme={laptopL.homePageText}
                                exhibition={props.NowTab === "OnlineArchiveExhibition"}
                            // onClick={() => {
                            //     history.push("/")
                            // }}
                            >
                                {"首頁"}

                                {/* 當前頁面文字 */}
                            </Text>
                            <Slash style={{ margin: "0 20px" }} />
                            <Text
                                theme={laptopL.nowPageText}
                            >
                                {subTabMapping[props.NowTab]}
                            </Text>
                        </Container>

                        {/* 子標題列 */}
                        <MainPageSubTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={subTabMapping[props.NowTab]}
                            theme={laptopL.baseSubTitleBar}
                            exhibition={props.NowTab === "OnlineArchiveExhibition"}
                        >
                        </MainPageSubTitleBar>
                    </>
                }
            >

                {
                    props.NowTab !== "OnlineArchiveExhibition"
                    &&
                    <>
                        {/* 分頁tab 容器 */}
                        <BasicContainer
                            theme={laptopL.tabsContainer}
                        >
                            {tabMap().map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Text
                                            onClick={() => {
                                                // props.setNowTab(Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]) 
                                                history.push(`/Files?subTab=${Object.keys(subTabMapping).filter((x) => subTabMapping[x] === item)[0]}`);
                                            }}
                                            theme={laptopL.titleBarContactTab}
                                        >
                                            {
                                                subTabMapping[props.NowTab] === item
                                                &&
                                                <Point
                                                    style={laptopL.pointSvg}
                                                />
                                            }
                                            {item}
                                        </Text>
                                    </React.Fragment>
                                )
                            })}
                        </BasicContainer>

                    </>
                }

                {/* 列表 容器 */}
                <BasicContainer
                    exhibition={props.NowTab === "OnlineArchiveExhibition"}
                    theme={laptopL.listContainer}
                >
                    {/* 切換使用的組件 */}
                    {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                    {
                        props?.ExhibitionDetail
                            ?
                            <DetailComponent
                                NowTab={props.NowTab}
                                ExhibitionDetail={props.ExhibitionDetail}
                                setExhibitionDetail={props.setExhibitionDetail}
                            />
                            :
                            <Component
                                NowTab={props.NowTab}
                                ExhibitionDetail={props.ExhibitionDetail}
                                setExhibitionDetail={props.setExhibitionDetail}
                            />
                    }


                </BasicContainer>
            </MainPageContainer>


        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`