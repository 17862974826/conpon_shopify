import React, { Component } from 'react'
import axios from 'axios'
import G2 from '@antv/g2'

const styles = {
    wrap:{
        height: 580, 
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
            total: {},
            days:[],
            currentTab: 'views'
        }
    }

    componentDidMount() {
        axios.get('/c/api/shopify/adminData.php').then(res => {
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
            this.setState({
                total,
                days: _data
            })
            this.chart = new G2.Chart({
                container: 'chart', // 指定图表容器 ID
                width : 850, // 指定图表宽度
                height : 350 // 指定图表高度
            })
            this.chart.source(_data);
            this.chart.legend(false);
            this.chart.line().position('date*views').color('rgb(168, 85, 228)');
            this.chart.render();

        }).catch(e => {
            console.error(e)
        })

    }

    render(){
        const { total = [], currentTab } = this.state
      
        return (
            <div style={{...styles.wrap}}>
               <p style={{...styles.title}}>{'Performance analytics'}</p>
               <div style={{...styles.container}}>
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
                   <div id="chart"></div>
               </div>
            </div>
        )
    }
}

export default Performance