import React, { Component} from 'react'
import { Button, Table, Icon, InputNumber, Modal, List, Spin, Radio, DatePicker  } from 'antd';
import '../index.css'
import axios from 'axios'

const styles = {
    wrap: {
        minHeight: 301
    }
}

const { RangePicker } = DatePicker || {}

  

class Trigger extends Component {
    constructor(props){
        super(props)
        this.checkboxList = []
        this.state = {
            title: 'Set trigger for $0 offer',
            radioValue: '',
            summary: 'Choose products or collections that trigger this offer',
            dataSource: [],
            products:[],
            isShowModal: false
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
                title: 'Product title',
                key: 'pictitleture',
                render: (data) => {
                   const { title } = data || {}
                  return (
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                         <p>{title}</p>
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
                        <InputNumber min={0} onChange={(value) => {

                            const { onDataLoad } = this.props
                            const { dataSource } = this.state
                           const _dataSource = dataSource.map(d => {
                            return {
                                ...d,
                                offer: value
                            }
                           })
                           onDataLoad({
                                type: 'products',
                                value:_dataSource
                            })
                        }}/>
                    </div>
                )
              }
            },
            {
              title: 'Qty of slash required',
              key: 'slash',
              render: () => {
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                         <InputNumber min={0} onChange={(value) => {
                            const { onDataLoad } = this.props
                            const { dataSource } = this.state
                           const _dataSource = dataSource.map(d => {
                            return {
                                ...d,
                                slash: value
                            }
                           })
                           onDataLoad({
                                type: 'products',
                                value:_dataSource
                            })
                        }}/>
                    </div>
                )
              }
            },
            {
                title: 'Expired time',
                key: 'time',
                render: (text, record) => {
                    const { calendar, time } = record || {}
                  
                return  <div  style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: 60, position: 'relative'}} 
                      onMouseEnter={this.handleMoveSatusTime.bind(null, record, true)}
                      onMouseLeave={this.handleMoveSatusTime.bind(null, record, false)}
                >
                    <Icon type="calendar" theme="twoTone" />
                    {
                        time ? time.map(_d => (<p style={{marginLeft: 5}} key={_d}>{_d}</p>)): null 
                    }
                    {
                        calendar ? <div style={{position: 'absolute', zIndex: 2,  top: -20, left: -50,  width: 300, border: '1px solid #d9d9d9', borderRadius: 4,backgroundColor:'#fff' }}>
                             <RangePicker onChange={this.onPanelChange.bind(null, record)} />
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
        const { onDataLoad } = this.props
        const { key } = record || {}
        const { dataSource = [] } = this.state
        const _time = value.map(_d => {
            const date = new Date(_d)
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const day = date.getDate()
            const _month = month >= 10 ? month : `0${month}`
            const _day = day >= 10 ? day : `0${day}`
            const time = `${year}-${_month}-${_day} 00:00:00`
            return time
        })
      
        const _dataSource = dataSource.map(data => {
            if(data.key === key) {
                return {
                    ...data,
                    time: _time
                }
            }
            return data 
        })

        onDataLoad({
            type: 'products',
            value:_dataSource
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

    handleShowModal = () => {
        const { products = [], radioValue} = this.state
       
        const _products = products.filter((data, index) => {
            const { node } = data || {}
            const { id } = node || {}
            
            return radioValue === id
        })
       
        const _datsSource = _products.map((d,index) => {
            const { node } = d || {}
            const { title,id,  picture} = node || {}

            return {
                picture: picture || '//cdn.shopify.com/s/files/1/0252/6075/2970/products/20180705190154_31078_512x512.jpg?v=1562312148',
                title,
                id,
                offer: 0,
                slash: 0,
                key: index
            }
        })

        this.handleChangeModalSatus({
            dataSource: _datsSource
        })
    }

    handleCancelModal = () => {
        this.handleChangeModalSatus()
    }

    handleChangeModalSatus = (params = {} ) => {
        this.setState({
            isShowModal: false,
            ...params
        })
    }

    handleSelectCehckbox = (e) => {
        const id = e.target.value
        this.setState({
            radioValue: id
        })
    }

    handleClickAddProduct = () => {
        const {  products = [] } = this.state

        if(!Array.isArray(products) || !products.length) {
            axios.get('/c/api/shopify/productSearch.php',{
                params:{
                    title: 'tianyangtest'
                }
            }).then(res => {
               
                const { data: { data = {} } = {} } = res || {}
                const { list = {} } = data || {}
                const { products: { edges = [] } =  {} } = list || {}
                const _edges = edges.map(data => {
                    return {
                        ...data,
                        isChecked: false
                    }
                })
                this.checkboxList.length = _edges.length
                this.setState({
                    products: _edges
                })
            }).catch(error => {
                console.error(error)
            })
        }

        this.setState({
            isShowModal: true
        })
    }

    render(){
        const { title, dataSource = [],products = [], isShowModal } = this.state
        const radioStyle = {
            display: 'block',
            height: '50px',
            width: '100%',
            borderBottom: '1px dashed #ccc',
            lineHeight: '50px',
          };
        return (
            <div style={{...styles.wrap}}>
                <div style={{ marginBottom: 12 }}>
                    <p style={{marginBottom: 23, fontFamily: 'Aileron-Regular', fontSize: 18, color: '#333333'}}>{title}</p>
                    <p style={{fontSize: 14, color: '#666666', marginLeft: 20}}>{'Choose products or collections that trigger this offer'}</p>
                </div>
                <div>
                    <div style={{marginBottom: 20, marginLeft:20 }}>
                        <Button style={{marginRight: 10, width: 150, height: 36, borderRadius: 4, background: '#F0C26A'}} onClick={this.handleClickAddProduct}>
                            <span style={{color: '#fff'}}>{'Choose products'}</span>
                        </Button>
                        <Button style={{marginRight: 10, width: 150, height: 36, borderRadius: 4, background: '#F0C26A'}}>
                            <span style={{color: '#fff'}}>{'Choose collections'}</span>
                        </Button>
                    </div>
                    <Table 
                        dataSource={dataSource} 
                        columns={this.columns}
                        bordered
                        style={{width: 1200}}
                        pagination={{
                            total: dataSource.length,
                            pageSize: 20,
                        }}

                    />
                </div>
                <Modal
                    title="Choose products"
                    visible={isShowModal}
                    onOk={this.handleShowModal}
                    onCancel={this.handleCancelModal}
                    >
                        <Radio.Group onChange={this.handleSelectCehckbox.bind(null)} value={this.state.radioValue} style={{width: '100%'}}>
                            {
                                Array.isArray(products) && products.length ? products.map(value => {
                                    const { node = {} } = value || {}
                                    const { id, title, images = []} = node || {}
                                    return  <Radio style={radioStyle} value={id} key={id}>{title}</Radio>
                                }) : <Spin />
                            }
                        </Radio.Group>
                </Modal>
            </div>
        )
    }
}

export default Trigger