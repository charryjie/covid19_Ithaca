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
import { daySum, dayIncrease, dayActive} from'./data/ChartData'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
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
      today: null
    }
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

  componentDidMount() {
    this.getData();
  }

  render() {
    
    return (
      <>
        <div className="panel-header" style={{height: "300px", background: "#DC143C"}}>
          <h2 className="text-center" style={{color: "white"}}>康奈尔大学疫情实时动态</h2>
        </div>
        <div className="content">
          
          <Row>
            <Col>
              
              <Card className="card-chart">
                <CardBody>
                  <Row>
                    <Col className="text-center" style={{borderRight: "1px solid grey", height: "100%"}}>
                      <DataCard
                        title={"累计确诊"} 
                        data={this.state.total.positive}
                      />
                    </Col>
                    <Col className="text-center" style={{borderRight: "1px solid grey", height: "100%"}}>
                      <DataCard
                        title={"今日确诊"} 
                        data={this.state.new.new_positive}
                        color={this.state.new.new_positive === 0 ? "green": "red"}
                      />
                    </Col>
                    <Col className="text-center" style={{borderRight: "1px solid grey", height: "100%"}}>
                      <DataCard
                        title={"新增检测"} 
                        data={this.state.new.new_test}
                      />
                    </Col>
                    <Col className="text-center">
                      <DataCard
                        title={"现存确诊"} 
                        data={this.state.total.total_active}
                      />
                    </Col>
                  </Row>

                  <CardFooter>
                      <span className="stat">最后更新于{this.state.today}</span>
                      </CardFooter>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={4}>
              <LineChart title="总确诊" data={daySum(this.state.dayChange).data} options={daySum(this.state.dayChange).options} />
            </Col>
            
            <Col xs={12} md={4}>
              <BarChart title="每日新增" data={dayIncrease(this.state.dayChange).data} options={dayIncrease(this.state.dayChange).options}></BarChart>
            </Col>
            
            <Col xs={12} md={4}>
              <LineChart title="现存确诊" data={dayActive(this.state.dayChange).data} options={dayActive(this.state.dayChange).options} />
            </Col>
            
          </Row>
          
          <Row>
            <Col xs={12}>                
              <PaginateTable title="详细数据" data={this.state.allData}></PaginateTable>
            </Col>
            
          </Row>
          
        </div>
      </>
    );
  }
}

function App() {
  return (
    <div className="main-panel" style={{width: "100%", height: "unset", float: "unset"}}>
      <Dashboard></Dashboard>
  </div>
  )
}

export default App;
