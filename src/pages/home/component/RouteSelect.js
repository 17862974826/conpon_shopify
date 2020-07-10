import React from 'react'
import { Button, Icon } from 'antd'
import {  Link } from "react-router-dom";


const styles = {
    wrap:{
        height: 100, 
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        width: 120,
        height: 36, 
        background:'rgba(219,99,102,1)',
        borderRadius: 4,
        fontSize: 14,
        color: '#fff'
    },
    text:{
        fontSize: 14,
        color: '#fff',
    }
}

const Select = (props) => {
    const { handleSaveClick, match } = props
 
    return (
        <div style={{...styles.wrap}}>
            <div>
            <Link to={'/create'}>
                <Button style={{...styles.button, marginRight: 20, width: 204}}>
                    <Icon type="plus" />
                    <span style={{...styles.text}}>{'Create discount offer'}</span>
                </Button>
            </Link>
            <Button style={{...styles.button}} onClick={handleSaveClick}>
                <Icon type="setting" />
                <span style={{...styles.text}}>{'Settings'}</span>
            </Button>
            </div>
        </div>
    )
}

export default Select