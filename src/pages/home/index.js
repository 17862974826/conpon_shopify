import  React,{ Component } from 'react'
import Select from './component/RouteSelect'
import EnableApp from './component/EnableApp'
import Message from './component/Message'
import Performance from './component/Performance'
import OfferList from './component/OfferList'


class Home extends Component {

    render(){
      return (
          <>
            <Select {...this.props}/>
            <EnableApp />
            <Message />
            <Performance />
            <OfferList />
          </>
      )
    }
}

export  default Home