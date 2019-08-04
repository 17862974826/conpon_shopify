import React from 'react';
import './App.css';
import Home from './pages/home/index'
import { Layout } from 'antd';
import { stepData } from './store'

const { Header, Footer, Content } = Layout;



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
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '50px' }}>
            <Home step={currentStep} stepData={stepData}/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout> 
      )
  }
 
}

export default App;
