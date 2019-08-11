import React, { Component } from 'react'
import { Button, Checkbox } from 'antd';
import  '../index.css'


class Availability extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Step 3',
            subTitle: 'Availability',
            description: 'To whom the offer appears and who can be invited to slash'
        }
    }

    handleOfferClick = (e) => {
         const { onDataLoad } = this.props
         onDataLoad({
             type: 'offerAppear',
             value: e
         })
    }

    handleSlashClick = (e) =>{
        const { onDataLoad } = this.props
        onDataLoad({
            type: 'invitedSlash',
            value: e
        })
    }

    render(){
        const { AvailabilityData = {} } = this.props
        const { offer = {}, slash = {}} = AvailabilityData || {}
        const { title: offerTitle, list: offerList}  = offer || {}
        const { title: slashTitle, list} = slash || {}
        const { title, subTitle, description } = this.state
       
        return (
            <div className={'offer-contain'}>
                <div className={'offer-wrap'}>
                    <h2>{title}</h2>
                    <p className={'offer-subTitle'}>{subTitle}</p>
                    <p style={{fontSize: 14}}>{description}</p>
                </div>
                <div>
                    <p style={{marginBottom: 20, fontWeight: 'bold'}}>{offerTitle}</p>
                    <Checkbox.Group options={offerList}  onChange={this.handleOfferClick} />
                    <Button style={{marginTop: 20, width: 300, display: 'block'}}>{'Select tags'}</Button>
                    <div style={{marginTop: 60}}>
                        <p style={{marginBottom: 20, fontWeight: 'bold'}}>{slashTitle}</p>
                        <Checkbox.Group options={list}  onChange={this.handleSlashClick} />
                        <Button style={{marginTop: 20, width: 300, display: 'block'}}>{'Select tags'}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Availability