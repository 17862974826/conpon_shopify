import React, { Component } from 'react'
import { Form, Input, Radio } from 'antd';
import  '../index.css'


class Offer extends Component {
    constructor(props){
        super(props)
        this.inputValue = ''
        this.state = {
            value: 0,
            title: 'Step 1',
            subTitle: 'Choose offer'
        }
    }
    handleSelectRadio = (e) => {
        const value = e.target.value
        this.setState({
            value
        })
    }
    handleInputValue = (e) => {
       this.inputValue = e.target.value
    }

    render(){
        const { radioData = [] } = this.props
        const { title, subTitle } = this.state
        return (
            <div className={'offer-contain'}>
                <div className={'offer-wrap'}>
                    <h2>{title}</h2>
                    <p className={'offer-subTitle'}>{subTitle}</p>
                </div>
                <div>
                    <div className={'offer-input-wrap'}>
                        <p style={{marginRight: '10px', fontWeight: 'bold'}}>{'Name'}</p>
                        <Input placeholder={'Please enter a name'} onChange={this.handleInputValue}/>
                    </div>
                    <div className={'offer-select-wrap'}>
                        <p style={{marginRight: '10px', fontWeight: 'bold'}}>{'Offer type'}</p>
                        <Radio.Group onChange={this.handleSelectRadio} value={this.state.value}>
                            {
                                radioData.map(({value, title }) =>  <Radio key={title} value={value}>{title}</Radio>)
                            }
                        </Radio.Group>
                    </div>
                    <h4 style={{marginTop: '30px', fontWeight: 'bold'}}>{'Description'}</h4>
                    <p style={{marginTop: '15px', width: '600px'}}>{'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet'}</p>
                </div>
            </div>
        )
    }
}

export default Offer