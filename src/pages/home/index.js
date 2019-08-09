import  React,{ Component } from 'react'
import { Steps, Button } from 'antd';
import Offer from './component/Offer'
import  Trigger from './component/Trigger'
import Availability from './component/Availability'
import Choose from './component/Choose'
import './index.css'

const { Step } = Steps;

class Home extends Component {
    
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
        <Offer radioData={radioData}/>
        <div className={'line'}/>
        <Trigger />
        <div className={'line'}/>
        <Availability AvailabilityData={AvailabilityData}/>
        <div className={'line'}/>
        <Choose />
        <div className={'line'}/>
        <div style={{ display: 'flex',flexDirection: 'row', width: 150, justifyContent: 'space-between'}}>
          <Button>{'Cancel'}</Button>
          <Button>{'Save'}</Button>
        </div>
        </>
      )
    }
}

export  default Home