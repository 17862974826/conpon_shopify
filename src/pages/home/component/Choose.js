import React, { Component } from 'react'
import {  Input, Button } from 'antd';
import  '../index.css'


class Choose extends Component {
    constructor(props){
        super(props)
        this.inputValue = ''
        this.buttonStyle = {}
        this.state = {
            value: 0,
            title: 'Step 4',
            subTitle: 'Choose style',
            description: 'What is the offer looks like on your product page'
        }
    }
    handleInputValue = (type, e) => {
        const { onDataLoad } = this.props
        this.buttonStyle = {
            ...this.buttonStyle,
            [type]: e.target.value
        }
        onDataLoad({
            type: 'button',
            value: this.buttonStyle
        })
    }
    render(){
        const { title, subTitle, description } = this.state
        return (
            <div className={'offer-contain'}>
                <div className={'offer-wrap'}>
                    <h2>{title}</h2>
                    <p className={'offer-subTitle'}>{subTitle}</p>
                    <p style={{fontSize: 14}}>{description}</p>
                </div>
                <div>
                    <div>
                        <Button style={{marginBottom: 20}}>{'Select style'}</Button>
                        <div className={'offer-input-wrap'} style={{marginBottom: 20}}>
                            <p style={{marginRight: '10px', fontWeight: 'bold'}}>{'Text'}</p>
                            <Input placeholder={'Please enter a text'} onChange={this.handleInputValue.bind(null, 'text')}/>
                        </div>
                        <div className={'offer-input-wrap'} style={{marginBottom: 20}} >
                            <p style={{marginRight: '10px', fontWeight: 'bold'}}>{'Color'}</p>
                            <Input placeholder={'Please enter a color'} onChange={this.handleInputValue.bind(null, 'color')}/>
                        </div>
                        <div className={'offer-input-wrap'} style={{marginBottom: 20}}>
                            <p style={{marginRight: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{'Share message'}</p>
                            <Input placeholder={'Please enter a message'} onChange={this.handleInputValue.bind(null, 'message')}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Choose