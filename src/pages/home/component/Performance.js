import React, { Component } from 'react'
import { Input } from 'antd'
const { TextArea } = Input;



const styles = {
    wrap:{
        height: 536, 
        display: 'flex',
        flexDirection: 'column'
    },
    container:{
        height: 498, 
        width: 877,
        background: '#fff'
    },
    title:{
        fontSize: 18,
        marginBottom: 20,
        color: '#333'
    },
    tab:{
        height: 111,
        display: 'flex',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 25
    }
}

class  Performance extends Component{
    constructor(props){
        super(props)
        this.state = {
            tabs: [
                {
                    title: 'Views',
                    value: '345'
                },
                {
                    title: 'Views',
                    value: '345'
                },
                {
                    title: 'Views',
                    value: '345'
                },
                {
                    title: 'Views',
                    value: '345'
                },
                {
                    title: 'Views',
                    value: '345'
                }
            ]
        }
    }

    render(){
        const { tabs = [] } = this.state
        return (
            <div style={{...styles.wrap}}>
               <p style={{...styles.title}}>{'Performance analytics'}</p>
               <div style={{...styles.container}}>
                   <div style={{...styles.tab}}>
                       {
                           tabs.map(d => {
                               const {title , value } = d || {}
                               return (
                                   <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center',justifyContent: 'center', width: 190, marginRight: 10, height: 66, background: '#F7F7F7'}}>
                                       <p style={{color: '#666666', fontSize: 14}}>{title}</p>
                                       <p style={{color: '#333333', fontSize: 20}}>{value}</p>
                                   </div>
                               )
                           })
                       }
                   </div>
               </div>
            </div>
        )
    }
}

export default Performance