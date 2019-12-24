import React from 'react'

import './menu-item.styles.scss'

const MenuItem = ({title, image, size}) => (
    <div  className={`${size} menu-item`}>
        <div className='background-image'
             style={{
                 backgroundImage: `url(${image})`
             }}>
        </div>

        <div className='content'>
            <div className='title'>{title.toUpperCase()}</div>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default MenuItem;