import  React,{ Component } from 'react'
import { Steps } from 'antd';
import Offer from './component/Offer'
import './index.css'

const { Step } = Steps;

class Home extends Component {
    
    render(){
        const { currentStep, stepData = [] } = this.props
      return (
        <>
        <Steps current={currentStep}>
          {
            stepData.map(data => {
              const { title } = data || {}
              return  <Step title={title} key={title}/>
            })
          }
        </Steps>
        <div className={'line'}/>
        <Offer />
        </>
      )
    }
}

export  default Home