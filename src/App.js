import React from 'react';
import './App.css';
import Home from './pages/home/index'
import { Layout } from 'antd';
import logo from '../public/images/logo.png'
import { stepData, radioData, AvailabilityData } from './store'

const {  Footer, Content } = Layout;



class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentStep: 1,
      stepData
    }
  }

  render(){
    const { currentStep } = this.state  
    return ( 
      <Layout className="layout" style={{ background: '#F7F7F7'}}>
        <div style={{position: 'sticky',top: 0, left: 0,  zIndex: 999,backgroundColor: '#DADADA', height: 76, overflow: 'hidden'}}>
          <div style={{ margin: '0 auto'}}>
              <p style={{width: 108, height: 40, marginTop: 18}}>
                <img src={logo} alt='' style={{width: 108, height: 40, objectFit: 'cover'}}/>
              </p>
          </div>
        </div>
        <Content style={{ boxSizing: 'border-box' }}>
            <Home 
              step={currentStep} 
              stepData={stepData} 
              radioData={radioData}
              AvailabilityData={AvailabilityData}
            />
        </Content>
        <Footer style={{ textAlign: 'center', marginTop: 100 }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout> 
      )
  }
 
}

export default App;
