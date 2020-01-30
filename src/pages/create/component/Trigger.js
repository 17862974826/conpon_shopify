import React, { Component} from 'react'
import { Button, Table, Icon, InputNumber,Input, Modal, List, Radio, DatePicker  } from 'antd';
import '../index.css'
import axios from 'axios'

const { Search } = Input;

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
        this.isFirstRender = true
        this.endPage = false
        this.state = {
            title: 'Set trigger for $0 offer',
            radioValue: '',
            summary: 'Choose products or collections that trigger this offer',
            dataSource: [],
            products:[],
            inputValue: '',
            loading: true,
            isShowModal: false,
            currentId: null
        }
        this.columns = [
            {
              title: 'Product picture',
              key: 'picture',
              render: (data) => {
                 const { picture } = data || {}
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={picture} style={{width: 120, height: 120, borderRadius: 12, overflow: 'hidden'}}/>
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
                           this.setState({
                            dataSource: _dataSource
                          }, function(){
                            onDataLoad({
                                type: 'products',
                                value:_dataSource
                            })
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
                          this.setState({
                            dataSource: _dataSource
                          }, function(){
                            onDataLoad({
                                type: 'products',
                                value:_dataSource
                            })
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
                             <RangePicker  showTime onChange={this.onPanelChange.bind(null, record)} />
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
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const seconds = date.getSeconds()
            const _month = month >= 10 ? month : `0${month}`
            const _day = day >= 10 ? day : `0${day}`
            const time = `${year}-${_month}-${_day} ${hours}:${minutes}:${seconds}`
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
        const { products = [], currentId} = this.state
        
        const _products = products.filter((data, index) => {
            const { node } = data || {}
            const { id } = node || {}
            
            return currentId === id
        })
       
        const _datsSource = _products.map((d,index) => {
            const { node } = d || {}
            const { title,id,  images} = node || {}
            const { edges = []} = images || {}
            const [edgesResult = {}] = edges || []

            const { node: { src } = {}} = edgesResult || {}


            return {
                picture: src,
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


    handleLoadMore =() => {

        if(!this.cursor) return 
        const { products  = []} = this.state 
        this.setState({
            loading: true
        })
        
        axios.get('/c/api/shopify/productSearch.php',{
            params:{
                cursor: this.cursor
            }
        }).then(res => {
            const { data: { data = {} } = {} } = res || {}
            const { list = {} } = data || {}
            const { products: { edges = [], pageInfo = {} } =  {} } = list || {}
            const { hasNextPage } = pageInfo || {}
            this.hasNext = hasNextPage
            this.cursor = edges[edges.length - 1] && edges[edges.length - 1].cursor

            this.endPage = !this.hasNext 

            const _edges = edges.map(data => {
                return {
                    ...data,
                    isChecked: false
                }
            })

            this.setState({
                products: products.concat(edges),
                loading: false
            })

        }).catch(error => {
            console.error(error)
            this.setState({
                loading: false
            })
        })
    }
    
    handleSearcgProduct = (opt) => {
        const { title } = opt || {}

        let requestUrl = `/c/api/shopify/productSearch.php?title=${title}`

        axios.get(requestUrl).then(res => {
 
            const { data: { data = {} } = {} } = res || {}
            const { list = {} } = data || {}
            const { products: { edges = [], pageInfo = {} } =  {} } = list || {}
            const { hasNextPage } = pageInfo || {}
            this.hasNext = hasNextPage
            this.cursor = edges[edges.length - 1] && edges[edges.length - 1].cursor
            this.endPage = !this.hasNext
            const _edges = edges.map(data => {
                return {
                    ...data,
                    isChecked: false
                }
            })

            this.setState({
                products: edges,
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
            
            console.error(error)
        })

        this.setState({
            isShowModal: true
        })
    }

    handleClickAddProduct = (opt) => {
        
        let requestUrl = '/c/api/shopify/productSearch.php'
          
        this.setState({
            inputValue: ''
        })

        
        
        axios.get(requestUrl).then(res => {
            
           
            const { data: { data = {} } = {} } = res || {}
            const { list = {} } = data || {}
            const { products: { edges = [], pageInfo = {} } =  {} } = list || {}
            const { hasNextPage } = pageInfo || {}
            this.hasNext = hasNextPage
            this.cursor = edges[edges.length - 1] && edges[edges.length - 1].cursor
          
            const _edges = edges.map(data => {
                return {
                    ...data,
                    isChecked: false
                }
            })
            this.isFirstRender = false
            this.setState({
                loading: false,
                products: _edges
            })
        }).catch(error => {
            this.isFirstRender = false
            this.setState({
                loading: false
            })
            console.error(error)
        })

        this.setState({
            isShowModal: true
        })
    }

    handleRadioChange(id) {
        if(id) {
            this.setState({
                currentId: id
            })
        }
    }

    componentDidMount(){
    }

    render(){
        const { title, dataSource = [],products = [], isShowModal, currentId } = this.state
        const radioStyle = {
            display: 'block',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
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
                            <Search
                                placeholder="input search text"
                                value={this.state.inputValue}
                                onChange={e => {
                                    const value =  e.target.value
                                    this.setState({
                                        inputValue: value
                                    })
                                    // clearTimeout(this.time)
                                    // this.time = setTimeout(() => {
                                    //         this.handleSearcgProduct({
                                    //             title: value
                                    //     })
                                    // }, 400);
                                    
                                }}
                                onSearch={value => {
                                    
                                    this.handleSearcgProduct({
                                        title: value
                                    })
                                }}
                                style={{ width: 470,marginBottom: 20}}
                            />
                          <List
                            size="large"
                            loading={this.state.loading}
                            style={{
                                height: 500,
                                overflow: 'scroll'
                            }}
                            bordered
                            footer={
                               (this.endPage || this.isFirstRender)  ?   null : <Button style={{ width: '100%', textAlign: 'center'}} onClick={this.handleLoadMore} >{'load more'}</Button>
                            }
                            dataSource={products}
                            renderItem={item => {
                                const { node = {} } = item || {}
                                const { id, title, images = {}} = node || {}
                                const { edges = [] } = images
                                const { node: imgNode } = edges && edges[0]
                                const { src } = imgNode || {}
                              
                                return <List.Item key={id}>
                                {
                                <Radio  onChange={() =>{
                                    this.handleRadioChange(id)
                                }} style={radioStyle} value={id} key={id} checked={currentId === id}>
                                    <img src={src} style={{height: 35, width: 35, borderRadius: 6, marginRight: 8,  objectFit: 'contain' }} alt=""/>
                                    <span style={{
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{title}</span>
                                </Radio>
                                }</List.Item>
                            }}
                          />
                </Modal>
            </div>
        )
    }
}

export default Trigger