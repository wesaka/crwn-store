import React from 'react';
import {withRouter} from 'react-router-dom';

import {
    BackgroundImageContainer,
    ContentContainer,
    MenuItemContainer,
    SubtitleContainer,
    TitleContainer
} from "./menu-item.styles";

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
    <MenuItemContainer large={size} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <BackgroundImageContainer
             style={{
                 backgroundImage: `url(${imageUrl})`
             }}>
        </BackgroundImageContainer>

        <ContentContainer>
            <TitleContainer>{title.toUpperCase()}</TitleContainer>
            <SubtitleContainer>SHOP NOW</SubtitleContainer>
        </ContentContainer>
    </MenuItemContainer>
);

export default withRouter(MenuItem);