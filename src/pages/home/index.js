import  React,{ Component } from 'react'
import { Steps, Button } from 'antd';
import Offer from './component/Offer'
import  Trigger from './component/Trigger'
import Availability from './component/Availability'
import Choose from './component/Choose'
import './index.css'
import axios from 'axios'

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
        <>
        <div style={{position: 'sticky', top: 0,  zIndex: 100 ,paddingTop: 20,  backgroundColor: '#f0f2f5'}}>
          <Steps current={currentStep}>
            {
              stepData.map(data => {
                const { title } = data || {}
                return  <Step title={title} key={title}/>
              })
            }
          </Steps>
          <div className={'line'}/>
        </div>
        <Offer radioData={radioData} onDataLoad={this.handleOfferData}/>
        <div className={'line'}/>
        <Trigger onDataLoad={this.handleOfferData}/>
        <div className={'line'}/>
        <Availability AvailabilityData={AvailabilityData}  onDataLoad={this.handleOfferData}/>
        <div className={'line'}/>
        <Choose  onDataLoad={this.handleOfferData} />
        <div className={'line'}/>
        <div style={{ display: 'flex',flexDirection: 'row', width: 150, justifyContent: 'space-between'}}>
          <Button>{'Cancel'}</Button>
          <Button onClick={this.handleSaveClick}>{'Save'}</Button>
        </div>
        </>
      )
    }
}

export  default Home