import React, { Component} from 'react'
import { Button, Table, Icon, InputNumber,Calendar  } from 'antd';
import '../index.css'

const mock = {
    picture: '//cdn.shopify.com/s/files/1/0252/6075/2970/products/20180705190154_31078_512x512.jpg?v=1562312148',
    offers: 0,
    time: '',
    calendar: false
}
   


  

class Trigger extends Component {
    constructor(props){
        super(props)
        this.totalIndex = 1
        this.state = {
            title: 'Step 2',
            subTitle: 'Set trigger for $0 offer',
            summary: 'Choose products or collections that trigger this offer',
            dataSource: []
        }
        this.columns = [
            {
              title: 'Product picture',
              key: 'picture',
              render: (data) => {
                 const { picture } = data || {}
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={picture} style={{width: 60, height: 60, borderRadius: 6, overflow: 'hidden'}}/>
                    </div>
                )
              }
            },
            {
              title: 'Qty of offers',
              key: 'offers',
              render: () => {
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <InputNumber min={0}/>
                    </div>
                )
              }
            },
            {
              title: 'Qty of slash required',
              key: 'required',
              render: () => {
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                         <InputNumber min={0}/>
                    </div>
                )
              }
            },
            {
                title: 'Expired time',
                key: 'time',
                render: (text, record) => {
                    const { calendar, time } = record || {}
                  
                return  <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60, position: 'relative'}} 
                      onMouseEnter={this.handleMoveSatusTime.bind(null, record, true)}
                      onMouseLeave={this.handleMoveSatusTime.bind(null, record, false)}
                >
                    <Icon type="calendar" theme="twoTone" />
                    {
                        time ? <p style={{marginLeft: 5}}>{time}</p>: null 
                    }
                    {
                        calendar ? <div style={{position: 'absolute', zIndex: 2,  top: -300, left: 90,  width: 300, border: '1px solid #d9d9d9', borderRadius: 4,backgroundColor:'#fff' }}>
                             <Calendar fullscreen={false} onChange={this.onPanelChange.bind(null, record)} />
                        </div> : null 
                    }
                </div>
            },
            },
            {
                title: 'Delete',
                key: 'Delete',
                render: (text, record) => (<div style={{display: 'flex', justifyContent: 'center'}} onClick={this.handleClickDelate.bind(null, record)}><Icon type="delete" theme="twoTone" /></div>),
              }
          ];
    }

    handleClickDelate = (record) => {
       const { key } = record || {}
       const { dataSource = [] } = this.state 
       const _dataSource = dataSource.filter(d => d.key !== key)
       this.setState({
           dataSource: _dataSource
       })
    }

    onPanelChange = (record, value) => {
        const { _d } = value || {}
        const { key } = record || {}
        const { dataSource = [] } = this.state
        const date = new Date(_d)
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const day = date.getDate()
        const time = `${year}-${month}-${day}`
        const _dataSource = dataSource.map(data => {
            if(data.key === key) {
                return {
                    ...data,
                    time
                }
            }
            return data 
        })
      
        this.setState({
            dataSource: _dataSource
        }) 
      }
    
    handleMoveSatusTime = (record, status) => {
        const isEnter = status  
        const { key } = record || {}
        const { dataSource = [] } = this.state 
        const _dataSource = dataSource.map(data => {
            const { key: _key } = data || {}
            if(isEnter) {
                if (_key === key) {
                    return {
                        ...data,
                        calendar: status
                    }
                } else {
                    return {
                        ...data,
                        calendar:!status
                    }
                }
            } else {
                return {
                    ...data,
                    calendar: false
                }
            }
            
        })
     
        this.setState({
            dataSource: _dataSource
        })
        
    }

    handleClickAddProduct = () => {
        const { dataSource = [] } = this.state
        dataSource.push({
            ...mock,
            key: this.totalIndex
        })
        this.totalIndex+=1
        this.setState({
            dataSource
        })
    }

    render(){
        const { title ,subTitle, summary, dataSource = [] } = this.state
        return (
            <div className={'offer-contain'}>
                <div className={'offer-wrap'}>
                    <h2>{title}</h2>
                    <p className={'offer-subTitle'}>{subTitle}</p>
                </div>
                <div>
                    <p style={{fontSize: 18, marginBottom: 20}}>{summary}</p>
                    <div style={{marginBottom: 20}}>
                        <Button style={{marginRight: 20}} onClick={this.handleClickAddProduct}>{'Choose products'}</Button>
                        <Button>{'Choose collections'}</Button>
                    </div>
                    <Table 
                        dataSource={dataSource} 
                        columns={this.columns}
                        bordered
                        pagination={{
                            total: dataSource.length,
                            pageSize: 20,
                        }}

                    />
                </div>
            </div>
        )
    }
}

export default Trigger