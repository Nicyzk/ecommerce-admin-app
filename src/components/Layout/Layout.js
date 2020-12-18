import React from 'react'
import Header from './Header/Header.js'

const layout = (props) => {
    return (
        <React.Fragment>
            <Header/>
            {props.children}
        </React.Fragment>
    )
}

export default layout