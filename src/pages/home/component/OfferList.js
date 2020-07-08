import React, { Component } from 'react'
import { Input, Table, Icon, Modal, Spin, Button } from 'antd'
import axios from 'axios'
import G2 from '@antv/g2'

const { Search } = Input;



const styles = {
    wrap: {
        height: 660,
        overflow: 'hidden',
        width: 1000
    },
    wrapTitle:{
        fontSize:18,
        marginBottom: 24,
        color: 'rgba(51,51,51,1)'
    },
    container:{
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




class  OfferList extends Component{
    constructor(props){
        super(props)
        this.state = {
           data: [],
           total: {},
           days: [],
           status: 'loading',
           showModal: false
        }

        this.columns = [
            {
                title: 'Offer name',
                key: 'name',
                render: (data) => {
                   const { name } = data || {}
                  return (
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                          <p>{name}</p>
                      </div>
                  )
                }
            },
            {
              title: 'Product picture',
              key: 'picture',
              render: (data) => {
                 const { pic } = data || {}
                return (
                    <div  style={{display: 'flex', justifyContent: 'center'}}>
                       <img src={pic} alt={''} style={{ height: 74, width: 74, overflow: 'hidden', borderRadius: 6}}/>
                    </div>
                )
              }
            },
            {
                title: 'Product name',
                key: 'Product',
                render: (data) => {
                    const { title } = data || {}
                    return (
                        <div  style={{display: 'flex', justifyContent: 'center'}}>
                           <p style={{flex: 1, whiteSpace: 'nowrap', textOverflow: 'ellipsis' ,overflow: 'hidden', height: 20, fontSize: 14}}>{title}</p>
                        </div>
                    )
                }
            },
            {
                title: 'Status',
                key: 'Status',
                render: (data) => {
                    const { status } = data || {}
                    return (
                        <div  style={{display: 'flex', justifyContent: 'center'}}>
                           <p>{status}</p>
                        </div>
                    )
                }
            },
            {
                title: 'Lastst modified time',
                key: 'modified',
                render: (data) => {
                    const { update_time } = data || {}
                    const time  = new Date(update_time * 1000)
                    const year = time.getFullYear()
                    const month = time.getMonth() + 1
                    const date = time.getDate()
                    return (
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                           <p>{`${year}-${month}-${date}`}</p>
                        </div>
                    )
                }
            },
            {
                title: 'show charts',
                key: 'charts',
                render: (data) => {
                    const { key } = data || {}
        
                    return (
                        <div style={{display: 'flex', justifyContent: 'center'}} onClick={() => {
                            this.handleClickShowChart(key)
                        }}>
                          <Icon type="pie-chart"  style={{ cursor: 'pointer' }}/>
                        </div>
                    )
                }
            },
            {
                title: 'delete',
                key: 'delete',
                render: (data) => {
                    const { key } = data || {}
                    return <Button type="danger" onClick={this.handleDeleteProduct.bind(this, key)}>delete</Button>
                }
            }
          ]
        
    }

    handleDeleteProduct = id => {
        axios.get(`/c/api/shopify/offlineRule.php?offer_id=${id}`).then(res => {
            const { data: { errorCode, errorMsg } = {} } = res || {}
            const { allData = [] } = this.state
            if(errorCode === 0 ) {
                const data = allData.filter(v => v.key !== id)
               
                this.setState({
                    data
                })
                
            } 

            alert(errorMsg)
            

        }).catch(e => {
            alert('删除失败')
        })
    }

    handleClickShowChart = key => {
       
        this.setState({
            showModal: true
        })

        setTimeout(() => {
            if(this.chart) return 
            this.chart = new G2.Chart({
                container: 'a', // 指定图表容器 ID
                width : 850, // 指定图表宽度
                height : 350 // 指定图表高度
            })
        }, 0)

        this.getChartsDataById(key)
    }

    getChartsDataById = (id) => {
        axios.get(`/c/api/shopify/adminData.php?offer_id=${id}`).then(res => {
            const { data: { data } = {} } = res || {}
            const { days,total} = data || {}
           
            const _data = Object.keys(days).map(key => {
               const {
                completededOffers,
                invitedCustomers,
                shares,
                slashs,
                views
            } = days[key]

                return {
                    date: key && key.replace('-', '/'),
                    completededOffers,
                    invitedCustomers,
                    shares,
                    slashs,
                    views,
                }
            })

            this.chart.clear()
            this.chart.source(_data);
            this.chart.legend(false);
            this.chart.line().position('date*views').color('rgb(168, 85, 228)');
            this.chart.render();

            this.setState({
                total,
                status: 'loaded',
                days: _data
            })

        }).catch(e => {
            this.setState({
                status: 'loaded',
            })
            console.error(e)
        })
    }

    handleOk = () => {
        this.setState({
            showModal: false
        })
    }

    handleCancel = () => {

        this.setState({
            showModal: false
        })

    }

    handleSearcgProduct = ({title}) => {
        const {  allData = [] } = this.state 
        const current = allData.filter(v => {
            const { name } = v || {}
            const reg = new RegExp(`${title}`, 'g')
            if(reg.test(name)) {
                return true
            }
        })
       this.setState({
           data: current
       })
    }

    componentDidMount() {
    
        axios.get('/c/api/shopify/adminOffers.php').then(res => {
            const { data:{ data } = {} }  = res || {} 
            const { offerList = [] } = data || {}
            let tabs = offerList.map(res => {              
                const { offer_name, product_info, id, update_time } = res || {}
                const { status, pic, title } = product_info || {}
                return {
                    name: offer_name,
                    key: id,
                    status: !status ? 'Enable' : 'Disable',
                    pic,
                    title,
                    update_time
                }
            })

            
            this.setState({
                data: tabs,
                allData: tabs
            })

        }).catch(e => {
            console.log(e)
        })
    }

    render(){
        const { currentTab, total, status } = this.state
      return (
        <div style={{...styles.wrap}}>
            <p style={{...styles.wrapTitle}}>{'Offers'}</p>
            <Search
                placeholder="find you offer"
                onSearch={value => {
                    
                    this.handleSearcgProduct({
                        title: value
                    })
                }}
                style={{ width: 318, height: 32, marginBottom: 20}}
            />
            <div style={{...styles.list}}>
                <Table 
                    dataSource={this.state.data} 
                    columns={this.columns}
                    bordered
                    rowKey={record => record.key}
                    style={{width: 1000 }}
                    pagination={{
                        total: this.state.data.length,
                        pageSize: 4,
                    }}
                />
            </div>
            <Modal
                width={1000}
                visible={this.state.showModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                {
                    [status === 'loading' ? 
                    <Spin key="spin"/> : (
                        <div style={{...styles.container}} key={'list'}>
                            <div style={{...styles.tab}}>
                                {
                                    Object.keys(total).map((d, i)=> {
                                        return (
                                            <div onClick={() => {
                                                this.setState({
                                                    currentTab: d
                                                },() => {
                                                    this.chart.clear()
                                                    this.chart.line().position(`date*${d}`).color('rgb(168, 85, 228)');
                                                    this.chart.render();
                                                })
                                            }} 
                                            key={`home-title-${i}`} style={{display: 'flex',flexDirection: 'column', alignItems: 'center',justifyContent: 'center', width: 190, marginRight: 10, height: 66, background: '#F7F7F7'}}>
                                                <p style={{color: currentTab === d ? 'rgb(168, 85, 228)' : '#666666', fontSize: 14}}>{d}</p>
                                                <p style={{color:  currentTab === d ? 'rgb(168, 85, 228)' : '#333333', fontSize: 20}}>{total[d]}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ),
                    <div id="a" key='container'></div>
                    ]
                }
                
            </Modal>
        </div>
      )
    }
}

export default OfferList