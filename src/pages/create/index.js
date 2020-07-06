import  React,{ Component } from 'react'
import { Steps, Button, message } from 'antd';
import Offer from './component/Offer'
import  Trigger from './component/Trigger'
import Availability from './component/Availability'
import Choose from './component/Choose'
import './index.css'
import axios from 'axios'
import Save from './component/Save'

const { Step } = Steps;

class Create extends Component {

  offerData = {}

  handleOfferData = (data) => {
    const { type, value } = data || {}
    this.offerData[type] = value

    
  }

  handleSaveClick = () => {
    const messageStatus = message.loading('提交中...', 0);
    const { products = [], name, discount, button, invitedSlash, offerAppear } = this.offerData || {}
    
    const { time = [], id, slash, offer} = products && products[0] || {}
    const [start_time, end_time] = time || []
    const params = {
      product_id: id,
      offer_name: name,
      start_time,
      end_time,
      slash,
      offer,
      button,
      invitedSlash,
      offerAppear,
      cut_money: discount,
      cut_type: 'fixed'
    }
    axios.get('/c/api/shopify/saveRule.php',{
      params:{
        ...params
      }
    }).then(res => {
      messageStatus()
      const { errorMsg, errorCode} = res.data || {}
      if(errorCode === 0 ){
        message.success('提交成功')
      } else {
        message.error(errorMsg)
      }
     
    }).catch(e => {
      messageStatus()
      message.error('提交失败，请重试')
      console.error(e)
    })


  }
    
    render(){
        const { currentStep, stepData = [], radioData = [], AvailabilityData = {} } = this.props
      return (
        <div style={{background: 'rgb(247,247,247)'}}>
          <Save handleSaveClick={this.handleSaveClick}/>
          <Offer radioData={radioData} onDataLoad={this.handleOfferData}/>
          <Trigger onDataLoad={this.handleOfferData}/>
          <Availability AvailabilityData={AvailabilityData}  onDataLoad={this.handleOfferData}/>
        </div>
      )
    }
}

export  default Create