import React from 'react';
import './App.css';
import Create from './pages/create/index'
import Home from './pages/home'
import { Layout } from 'antd';
import logo from '../public/images/logo.png'
import { stepData, radioData, AvailabilityData } from './store'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const {  Footer, Content } = Layout;

const CreateRoute = () => {
  return  <Create 
    radioData={radioData}
    AvailabilityData={AvailabilityData}
  />
}

const HomeRoute = (props) => {
  console.log(props)
  return  <Home 
    {...props}
    radioData={radioData}
    AvailabilityData={AvailabilityData}
  />
}

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    
      stepData
    }
  }



  render(){
  
    return ( 
      <Router>
        <Layout className="layout" style={{ background: '#F7F7F7'}}>
            <div style={{position: 'sticky',top: 0, left: 0,  zIndex: 999,backgroundColor: '#DADADA', height: 76, overflow: 'hidden'}}>
            <Link to="/home">
              <div style={{ margin: '0 auto'}}>
                  <p style={{width: 108, height: 40, marginTop: 18, marginLeft: 40}}>
                    <img src={logo} alt='' style={{width: 108, height: 40, objectFit: 'cover'}}/>
                  </p>
              </div>
              </Link>
            </div>
          <Content style={{ boxSizing: 'border-box', paddingLeft: 40 }}>
           <Switch>
              <Route exact path="/" component={CreateRoute} />
              <Route path="/home" component={HomeRoute} />
              <Route component={CreateRoute} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', marginTop: 100 }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout> 
      </Router>
      )
  }
}


export default App;
