import React, { Component } from 'react'
import { Input } from 'antd'
const { TextArea } = Input;



const styles = {
    wrap:{
        height: 200, 
        display: 'flex',
        flexDirection: 'column'
    },
    title:{
        fontSize: 18,
        marginBottom: 20,
        color: '#333'
    }
}

class  Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: ''
        }
    }

    onChange = (e) => {
        console.log(e.target.value)
    }


    render(){
        return (
            <div style={{...styles.wrap}}>
               <p style={{...styles.title}}>{'System message'}</p>
               <TextArea
                    onChange={this.onChange}
                    placeholder="Reminder:"
                    style={{height: 120, width: 877}}
                />
            </div>
        )
    }
}

export default Message