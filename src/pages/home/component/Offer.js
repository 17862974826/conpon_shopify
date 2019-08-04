import React, { Component } from 'react'
import { Form, Input } from 'antd';
import  '../index.css'


class Offer extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Step 1',
            subTitle: 'Choose offer'
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { title, subTitle } = this.state
        return (
            <div className={'offer-contain'}>
                <div className={'offer-wrap'}>
                    <h2>{title}</h2>
                    <p className={'offer-subTitle'}>{subTitle}</p>
                </div>
                <div>
                    <div>
                        <p>{'Name'}</p>
                        <Input />
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(Offer)