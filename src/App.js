/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts

import { DataCard } from './components/DataCard'
import { LineChart, BarChart } from './components/Chart'
import { PaginateTable } from './components/PaginateTable'
import { dataGen} from'./data/ChartData'
import { chartConfigure } from './components/Chart'
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
} from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      new: {
        new_positive: 0,
        new_hospitalization: 0, 
        new_test: 0, 
        pending_result: 0
      },
      total: {
        positive: 0, 
        total_test: 0, 
        recovered: 0, 
        death: 0, 
        death_ratio: 0,
        total_active: 0
      },
      dayChange: {
        date: null,
        day_sum: null,
        day_increase: null,
        seven_avg: null,
        day_active: null
      },
      allData: [],
      today: null,
      cardStyle: null,
      selectedIdx: -1
    }
    this.card = React.createRef();
  }

  getData = () => {
    const Http = new XMLHttpRequest();
    const url = 'https://covid19-ithaca.herokuapp.com/dailydata';
    Http.open("GET", url);

    Http.onreadystatechange = (e) => {
      if(Http.readyState === 4) {
        let data = JSON.parse(Http.responseText);
        this.setState({ allData: data})
        let len = data.length;
        let date = [], increase = [], sum = [], avg = [], active = [];
        data.forEach((item) => {
          let datearr = item.date.toString().replace('T','-').split('-');
          let month = datearr[1];
          let day = datearr[2];
          date.push(month + '/' + day);
          increase.push(item.new_positive);
          sum.push(item.positive);
          avg.push(item.seven_avg.toFixed(2));
          active.push(item.total_active)
        });
        let today = data[len-1].date.toString().replace('T','-').split('-');
        this.setState({
          new: {
            new_positive: data[len-1].new_positive,
            new_hospitalization: data[len-1].hospitalization - data[len-2].hospitalization,
            new_test: data[len-1].new_test,
            pending_result: data[len-1].pending_result
          },
          total: {
            positive: data[len-1].positive,
            total_test: data[len-1].total_test,
            recovered: data[len-1].recovered,
            death: data[len-1].death,
            death_ratio: data[len-1].death / data[len-1].positive,
            total_active: data[len-1].total_active
          },
          dayChange: {
            date: date,
            day_sum: sum,
            day_increase: increase,
            seven_avg: avg,
            day_active: active
          },
          today: today[0] + '-' + today[1] + '-' + today[2]
        });
        
      }
    }

    Http.send();
  }

  updateIdx = (idx) => {
    this.setState ({
      selectedIdx: idx
    })
  }

  componentDidMount() {
    this.getData();
    window.onscroll = () => {
      let dis = this.card.current.offsetTop;
      if(window.pageYOffset > dis ) {
        if (this.state.selectedIdx === -1) {
          this.setState ({cardStyle: {
            background: "#D8BFD8"
            },
            selectedIdx: this.state.allData.length-1
          })
        }
      } else {
        this.setState (
          {cardStyle: {
            background: "white"
          },
          selectedIdx: -1
        }
        )
      }
    }
  }

  render() {
    return (
      <>
        <div className="panel-header" style={{height: "300px", background: "#778899"}}>
          <h2 className="text-center font-weight-bold" style={{color: "white"}}>康奈尔大学疫情实时动态</h2>
        </div>
        <div ref={this.card} className="content">
          <Row style={{ position: "sticky", top: 0, zIndex: 999}} >
            <Col>
              <Card className="card-chart" style={this.state.cardStyle}>
                {this.state.selectedIdx === -1 ?
                  <CardBody >
                    <Row>
                      <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "80px"}}>
                        <DataCard
                          title={"累计确诊"} 
                          data={this.state.total.positive}
                          idx={this.state.selectedIdx}
                        />
                      </Col>
                      <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "80px"}}>
                        <DataCard
                          title={"今日确诊"} 
                          data={this.state.new.new_positive}
                          color={this.state.new.new_positive === 0 ? "green": "red"}
                          idx={this.state.selectedIdx}
                        />
                      </Col>
                      <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "80px"}}>
                        <DataCard
                          title={"新增检测"} 
                          data={this.state.new.new_test}
                          idx={this.state.selectedIdx}
                        />
                      </Col>
                      <Col className="text-center" xs={3} style={{height: "80px"}}>
                        <DataCard
                          title={"现存确诊"} 
                          data={this.state.total.total_active}
                          idx={this.state.selectedIdx}
                        />
                      </Col>
                    </Row>

                    <CardFooter>
                      <span className="font-weight-bold" style={{color: "#778899"}}>最后更新于{this.state.today}</span>
                    </CardFooter>
                  </CardBody> :
                  <CardBody>  
                    <Row style={{paddingBottom: "20px"}}>
                      <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"日期"} 
                          data={this.state.allData[this.state.selectedIdx].date.toString().substring(0, 10)}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"累计确诊"} 
                          data={this.state.allData[this.state.selectedIdx].positive}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"当日确诊"} 
                          data={this.state.allData[this.state.selectedIdx].new_positive}
                          color={this.state.allData[this.state.selectedIdx].new_positive === 0 ? "green": "red"}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"累计检测"} 
                          data={this.state.allData[this.state.selectedIdx].total_test}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{height: "60px"}}>
                        <DataCard
                          title={"新增检测"} 
                          data={this.state.allData[this.state.selectedIdx].new_test}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"检测未出结果"} 
                          data={this.state.allData[this.state.selectedIdx].pending_result}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"治愈"} 
                          data={this.state.allData[this.state.selectedIdx].recovered}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"住院"} 
                          data={this.state.allData[this.state.selectedIdx].hospitalization}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                        <DataCard
                          title={"死亡"} 
                          data={this.state.allData[this.state.selectedIdx].death}
                        />
                      </Col>
                      <Col className="text-center" xs={2} style={{height: "60px"}}>
                        <DataCard
                          title={"现存确诊"} 
                          data={this.state.allData[this.state.selectedIdx].total_active}
                        />
                      </Col>
                    </Row>
                     
                  </CardBody>
                }
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col xs={12} md={4}>
              <LineChart title="累计确诊" data={ dataGen(this.state.dayChange.date, [{ data: this.state.dayChange.day_sum, label: "确诊人数", color: "#18ce0f"}])} options={ chartConfigure } />
            </Col>
            
            <Col xs={12} md={4}>
              <BarChart title="每日新增" data={ dataGen(this.state.dayChange.date, [
                { data: this.state.dayChange.day_increase, label: "每日新增", color: "#2CA8FF"},
                { data: this.state.dayChange.seven_avg, label: "七日平均", type: "line", color: "#f96332"}
                ])} options={chartConfigure}></BarChart>
            </Col>
            
            <Col xs={12} md={4}>
              <LineChart title="现存确诊" data={ dataGen(this.state.dayChange.date, [{ data: this.state.dayChange.day_active, label: "现存确诊", color: "#D8BFD8"}])}options={ chartConfigure } />
            </Col>
            
          </Row>
          
          <Row>
            <Col xs={12}>                
              <PaginateTable title="详细数据" updateIdx={this.updateIdx} data={this.state.allData}></PaginateTable>
            </Col>
            
          </Row>
          
        </div>
      </>
    );
  }
}

function App() {
  return (
    <div className="main-panel" style={{width: "100%", height: "unset", float: "unset", overflow: "visible"}}>
      <Dashboard></Dashboard>
  </div>
  )
}

export default App;
