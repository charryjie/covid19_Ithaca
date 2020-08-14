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
import { Line, Bar } from "react-chartjs-2";



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


function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

var gradientChartOptionsConfigurationWithNumbersAndGrid = {
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        gridLines: {
          zeroLineColor: "transparent",
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 7,
        },
      },
    ],
    xAxes: [
      {
        display: true,
        ticks: {
          display: true,
          padding: 10,
          fontColor: "rgba(0,0,0,0.4)",
          fontStyle: "bold",
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 0, right: 0, top: 5, bottom: 5 },
  },
};

const thead = ["日期", "总检测", "新增检测", "检测未出结果", "总确诊", "治愈", "住院", "死亡", "今日新增", "现存确诊"];

function DataCard(props) {
  let color = props.color;
  if (color === undefined) {
    color = "black";
  }

  return (
    <div>
      <div style={{paddingBottom: "10px"}}>{props.title}</div>
      <h1 className="font-weight-bold" style={{color: color}}>{props.data}</h1>
    </div>
  )
}

function LineChart(props) {
  return (
    <Card className="card-chart">
      <CardHeader>
        <CardTitle tag="h4">{props.title}</CardTitle>
      </CardHeader>

      <CardBody>
        <div className="chart-area" style={{height: props.height !== undefined ? props.height : "250px"}}>
          <Line
            data={props.data}
            options={props.options}
          />
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  )
}

function BarChart(props) {
  return (
    <Card className="card-chart">
      <CardHeader>
        <CardTitle tag="h4">{props.title}</CardTitle>
      </CardHeader>

      <CardBody>
        <div className="chart-area" style={{height: props.height !== undefined ? props.height : "250px"}}>
          <Bar
            data={props.data}
            options={props.options}
          />
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  )
}

class PaginateTable extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      startIndex: 0
    }
  }

  paginateBackward = () => {
    if(this.state.startIndex - 10 >= 0) {
      this.setState({
        startIndex: this.state.startIndex - 10
      })
    }
  }

  paginateForward = () => {
    if(this.state.startIndex + 10 < this.props.data.length) {
      this.setState({
        startIndex : this.state.startIndex + 10
      })
    }
  }

  render() {
    return (
      <Card>
  
        <CardHeader>
          <CardTitle tag="h4">{this.props.title}</CardTitle>
        </CardHeader>
  
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                {thead.map((prop, key) => {
                  return <th key={key}>{prop}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.data.slice(this.state.startIndex, this.state.startIndex+10).map((prop, key) => {
                return (
                  <tr key={key}>
                    <td className="text-left">
                      {prop.date.toString().substring(0, 10)}
                    </td>
                    <td className="text-left">
                      {prop.total_test}
                    </td>
                    <td className="text-left">
                      {
                        (prop.new_test === undefined)
                          ? "无数据"
                          : prop.new_test
                      }
                    </td>
                    <td className="text-left">
                      {prop.pending_result}
                    </td>
                    <td className="text-left">
                      {prop.positive}
                    </td>
                    <td className="text-left">
                      {prop.recovered}
                    </td>
                    <td className="text-left">
                      {prop.hospitalization}
                    </td>
                    <td className="text-left">
                      {prop.death}
                    </td>
                    <td className="text-left">
                      {prop.new_positive}
                    </td>
                    <td className="text-left">
                      {prop.total_active}
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
  
          </Table>
        </CardBody>
  
        <CardFooter className="text-center">
      
          <Button onClick={this.paginateBackward} style={{marginRight: "30px"}}>
            上一页
          </Button>
              
          <Button onClick={this.paginateForward}>
              下一页
          </Button>
              
            
        </CardFooter>
  
      </Card>
    )
  }
}

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
        });
        
      }
    }

    Http.send();
  }

  componentDidMount() {
    this.getData();
  }

  daySum = {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientFill = ctx.createLinearGradient(0, 230, 0, 70);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
      return {
        labels: this.state.dayChange.date,
        datasets: [
          {
            label: "确诊人数",
            borderColor: "#18ce0f",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#18ce0f",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 0,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: this.state.dayChange.day_sum,
          },
        ],
      };
    },
    options: gradientChartOptionsConfigurationWithNumbersAndGrid,
  };

  dayIncrease = {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientFill_blue = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill_blue.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill_blue.addColorStop(1, hexToRGB("#2CA8FF", 0.4));
      var gradientFill_red = ctx.createLinearGradient(0, 480, 0, 10);
      gradientFill_red.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill_red.addColorStop(1, hexToRGB("#f96332", 0.4));
      return {
        labels: this.state.dayChange.date,
        datasets: [
          {
            label: "每日新增",
            backgroundColor: gradientFill_blue,
            borderColor: "#2CA8FF",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#2CA8FF",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            fill: true,
            borderWidth: 1,
            data: this.state.dayChange.day_increase,
          },
          {
            label: "七日平均",
            type: 'line',
            borderColor: "#f96332",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#f96332",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 0,
            fill: true,
            backgroundColor: gradientFill_red,
            borderWidth: 2,
            data: this.state.dayChange.seven_avg,
          }
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              maxTicksLimit: 7,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            display: true,
            ticks: {
              display: true,
              padding: 10,
              fontColor: "rgba(0,0,0,0.4)",
              fontStyle: "bold",
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      layout: {
        padding: { left: 0, right: 0, top: 5, bottom: 5 },
      },
    },
  };

  dayActive = {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientFill = ctx.createLinearGradient(0, 400, 0, 30);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#D8BFD8", 0.3));
      return {
        labels: this.state.dayChange.date,
        datasets: [
          {
            label: "现存确诊 (注：03/30及之前无该数据)",
            borderColor: "#D8BFD8",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#D8BFD8",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 0,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: this.state.dayChange.day_active,
          },
        ],
      };
    },
    options: gradientChartOptionsConfigurationWithNumbersAndGrid,
  };
  
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
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={4}>
              <LineChart title="总确诊" data={this.daySum.data} options={this.daySum.options} />
            </Col>
            
            <Col xs={12} md={4}>
              <BarChart title="每日新增" data={this.dayIncrease.data} options={this.dayIncrease.options}></BarChart>
            </Col>
            
            <Col xs={12} md={4}>
              <LineChart title="现存确诊" data={this.dayActive.data} options={this.dayActive.options} />
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
