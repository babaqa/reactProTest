import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
// import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
// import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { component: { caseCallCarComponent: { rwd: { tablet } } } } } } = Theme;

    let history = useHistory()

    return (
        <>
            Tablet
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
`