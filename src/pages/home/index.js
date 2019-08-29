import  React,{ Component } from 'react'
import Select from './component/RouteSelect'
import EnableApp from './component/EnableApp'
import Message from './component/Message'
import Performance from './component/Performance'


class Home extends Component {

    render(){
      return (
          <>
            <Select {...this.props}/>
            <EnableApp />
            <Message />
            <Performance />
          </>
      )
    }
}

export  default Home