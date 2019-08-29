import React, { Component } from 'react'
import { Button, Switch } from 'antd'


const styles = {
    wrap:{
        height: 200, 
        display: 'flex',
    },
    button: {
        width: 120,
        height: 36, 
        background:'rgba(219,99,102,1)',
        borderRadius: 4,
        fontSize: 14,
        color: '#fff'
    },
    contain:{
        height: 158,
    },

    title:{
        fontSize: 18,
        color: '#333',
        marginBottom: 20
    },
    content:{
        boxSizing: 'border-box',
        height: 120,
        paddingTop: 12,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 12,
        background: '#fff'
    },
    text:{
        fontSize: 14,
        color: '#665656'
    }
}

class  EnableApp extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: ''
        }
    }


    render(){
        return (
            <div style={{...styles.wrap}}>
                <div style={{ height: 158 }}>
                    <p style={{...styles.title}}>{'Enable app'}</p>
                    <div style={{...styles.content}}>
                        <div style={{display: 'flex', alignItems: 'center', height: 26, marginBottom: 15}}>
                            <Switch />
                            <p style={{fontSize: 14, color: '#333', marginLeft: 14}}>{'Application Disabled'}</p>
                        </div>
                        <p style={{...styles.text}}>{'Enable or disable the app.If disable,all the price slash pop-ups will not be displayed.'}</p>
                    </div>
                </div>
                <div style={{ height: 158, marginLeft: 20 }}>
                    <p style={{...styles.title}}>{'Your plan'}</p>
                    <div style={{...styles.content}}>
                        <div style={{display: 'flex', alignItems: 'center', height: 26, marginBottom: 15}}>
                            <p style={{fontSize: 14, color: '#333'}}>{'Standard'}</p>
                            <p style={{width: 105, borderRadius: 4, height: 26,lineHeight:'26px', textAlign: 'center', background: 'rgb(240,194,106)',fontSize: 14, color: '#333333', marginLeft: 14}}>{'upgrade'}</p>
                        </div>
                        <p style={{...styles.text}}>{'Free trall will be expired in 9 days.'}</p>
                    </div>
                  
                </div>
            </div>
        )
    }
}

export default EnableApp