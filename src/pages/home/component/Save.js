import React from 'react'
import { Button, Icon } from 'antd'

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

const Save = (props) => {
    return (
        <div style={{...styles.wrap}}>
            <div>
            <Button style={{...styles.button, marginRight: 20}}>
                <Icon type="close" />
                <span style={{...styles.text}}>{'Cancle'}</span>
            </Button>
            <Button style={{...styles.button}}>
                <Icon type="save" />
                <span style={{...styles.text}}>{'Save'}</span>
            </Button>
            </div>
        </div>
    )
}

export default Save