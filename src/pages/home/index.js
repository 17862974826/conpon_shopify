import  React,{ Component } from 'react'
import { Steps, Button } from 'antd';
import Offer from './component/Offer'
import  Trigger from './component/Trigger'
import Availability from './component/Availability'
import Choose from './component/Choose'
import './index.css'
import axios from 'axios'
import Save from './component/Save'

const { Step } = Steps;

class Home extends Component {

  offerData = {}

  handleOfferData = (data) => {
    const { type, value } = data || {}
    this.offerData[type] = value
    console.log(this.offerData)
  }

  handleSaveClick = () => {
    
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
      console.log(res)
    }).catch(e => {
      console.error(e)
    })


  }
    
    render(){
        const { currentStep, stepData = [], radioData = [], AvailabilityData = {} } = this.props
      return (
        <div style={{background: 'rgb(247,247,247)'}}>
          <Save/>
          <Offer radioData={radioData} onDataLoad={this.handleOfferData}/>
          <Trigger onDataLoad={this.handleOfferData}/>
          <Availability AvailabilityData={AvailabilityData}  onDataLoad={this.handleOfferData}/>
        </div>
      )
    }
}

export  default Home