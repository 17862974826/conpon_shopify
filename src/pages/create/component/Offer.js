import React, { Component } from 'react'
import { Form, Input, Radio } from 'antd';
import  '../index.css'

const styles= {
    wrap:{
        minHeight: 320,
    },
    title:{
        color: '#333333',
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'Aileron-Regular'
    },
    content:{
        height: 232,
        width: 1200,
        borderRadius: 4,
        background: '#fff',
        paddingLeft: 20,
        paddingTop: 20
    },
    inputWarp: {
        display: 'flex',
        marginBottom: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    radioWrap: {
        display: 'flex',
        marginBottom: 25
    }
}
class Offer extends Component {
    constructor(props){
        super(props)
        this.inputValue = ''
        this.state = {
            value: 0,
            title: 'Step1  Choose offer',
        }
    }
    handleSelectRadio = (e) => {
        const { onDataLoad } = this.props
        const value = e.target.value
        onDataLoad({
            type: 'discount',
            value
        })
        this.setState({
            value
        })
    }
    handleInputValue = (e) => {
       this.inputValue = e.target.value
       const { onDataLoad } = this.props
       onDataLoad({
           type: 'name',
           value: this.inputValue
       })
       
    }

    render(){
        const { radioData = [] } = this.props
        const { title } = this.state
        return (
            <div style={{...styles.wrap}}>
                <p style={{...styles.title}}>{title}</p>
                <div style={{...styles.content}}>
                    <div style={{...styles.inputWarp}}>
                        <p style={{marginRight: 23, fontSize: 14, color: '#333'}}>{'Name'}</p>
                        <Input 
                            placeholder={'Please enter a name'} 
                            onChange={this.handleInputValue}
                            style={{width: 364, height: 32, borderRadius: 4, fontFamily: 'Aileron-Regular'}}
                        />
                    </div>
                    <div style={{...styles.radioWrap}}>
                        <p style={{marginRight: '10px', fontWeight: 'bold'}}>{'Offer type'}</p>
                        <Radio.Group onChange={this.handleSelectRadio} value={this.state.value}>
                            {
                                radioData.map(({value, title }) =>  <Radio key={title} value={value}>{title}</Radio>)
                            }
                        </Radio.Group>
                    </div>
                    <p style={{fontSize: 14, color: '#333333', fontWeight: 'bold'}}>{'Offer type'}</p>
                    <p style={{ marginBottom: 10, width: 1089, color: '#666666', fontSize: 14}}>{'Lorem ipsum dolor sit amet,consectetur adipiscing elit.Aenean euismod bibendum laoreet.Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.Proin sodales pulvinar tempor.Cum sociis natoque penatibus etmagnis dis parturient montes,nascetur ridiculus mus.Nam fermentum,nulla luctus pharetra vulputate,felis tellus mollis orci,sed rhoncus sapien nunc eget odio.'}</p>
                </div>
            </div>
        )
    }
}

export default Offer