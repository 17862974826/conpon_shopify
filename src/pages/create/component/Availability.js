import React, { Component } from 'react'
import { Button, Checkbox } from 'antd';

const styles = {
    wrap:{
        height: 412,
        marginTop: 53,
        overflow: 'hidden'
    },
    titleWrap:{
        display: 'flex',
        marginBottom: 20,
        alignItems: 'flex-end'
    },
    content:{
        height: 372,
        width: 1200,
        paddingLeft: 20,
        paddingTop: 30,
        background: '#fff',
        borderRadius: 4
    }
}


class Availability extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Step 3 Availability' ,
            subTitle: 'To whom the offer appears and who can be invited to slash',
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
        const { list: offerList}  = offer || {}
        const { title: slashTitle, list} = slash || {}
        const { title, subTitle } = this.state
       
        return (
            <div style={{...styles.wrap}}>
                <div style={{...styles.titleWrap}}>
                    <p style={{marginRight: 40, fontFamily:'Aileron-Regular', color: '#333', fontSize: 18}}>{title}</p>
                    <p style={{fontFamily:'Aileron-Regular', color: '#666', fontSize: 14}}>{subTitle}</p>
                </div>
                <div style={{...styles.content}}>
                    <div>
                        <p style={{marginBottom: 20, fontSize: 14, color: '#333'}}>{'To whom the offer appears'}</p>
                        <Checkbox.Group options={offerList}  onChange={this.handleOfferClick} />
                        <Button style={{marginTop: 20, width: 120, height: 32, backgroundColor: '#DB6366', color: '#fff',display: 'block'}}>{'Select tags'}</Button>
                    </div>
                    <div style={{marginTop: 60}}>
                        <p style={{marginBottom: 20, fontSize: 14, color: '#333'}}>{slashTitle}</p>
                        <Checkbox.Group options={list}  onChange={this.handleSlashClick} />
                        <Button style={{marginTop: 20, width: 120, height: 32, backgroundColor: '#DB6366', color: '#fff',display: 'block'}}>{'Select tags'}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Availability