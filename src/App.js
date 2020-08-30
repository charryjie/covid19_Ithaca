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
import React, { useState, useEffect } from "react";
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

import { useSelector, useDispatch } from 'react-redux';
import { selectedIdx, updateByKey } from './reducer';

function Dashboard() {
  const [newD, setNewD] = useState({new_positive: 0, new_hospitalization: 0, new_test: 0, pending_result: 0});
  const [total, setTotal] = useState({positive: 0, total_test: 0, recovered: 0, death: 0, death_ratio: 0, total_active: 0});
  const [dayChange, setDayChange] = useState({date: null, day_sum: null, day_increase: null, seven_avg: null, day_active: null});
  const [allData, setAllData] = useState([]);
  const [today, setToday] = useState(null);
  const [cardStyle, setCardStyle] = useState(null);
  // const [selectedIdx, setSelectedIdx] = useState(-1);
  const card = React.createRef();

  const dispatch = useDispatch();
  const currentIdx = useSelector(selectedIdx);

  let getData = () => {
    const Http = new XMLHttpRequest();
    // const url = 'https://covid19-ithaca.herokuapp.com/dailydata';
    const url = 'http://localhost:4999/dailydata'
    Http.open("GET", url);

    Http.onreadystatechange = (e) => {
      if(Http.readyState === 4) {
        let data = JSON.parse(Http.responseText);
        setAllData(data);
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
        
        setNewD({new_positive: data[len-1].new_positive, new_hospitalization: data[len-1].hospitalization - data[len-2].hospitalization, new_test: data[len-1].new_test, 
          pending_result: data[len-1].pending_result});

        setTotal({positive: data[len-1].positive, total_test: data[len-1].total_test, recovered: data[len-1].recovered, death: data[len-1].death, 
          death_ratio: data[len-1].death / data[len-1].positive, total_active: data[len-1].total_active});

        setDayChange({date: date, day_sum: sum, day_increase: increase, seven_avg: avg, day_active: active});
        setToday(today[0] + '-' + today[1] + '-' + today[2]);
      }
    }

    Http.send();
  }

  // let updateIdx = (idx) => {
  //   setSelectedIdx(idx);
  // }

  let onScroll = () => {
    if(card.current === null) return
    let dis = card.current.offsetTop;
    if(window.pageYOffset > dis ) {
      if (currentIdx === -1) {
        setCardStyle({background: "#D8BFD8"});
        dispatch(updateByKey(allData.length-1))
      }
    } else {
      setCardStyle({background: "white"});
      dispatch(updateByKey(-1))
    }
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    window.onscroll = onScroll
  })
  

  return (
    <>
      <div className="panel-header" style={{height: "300px", background: "#778899"}}>
        <h3 className="text-center font-weight-bold" style={{color: "white"}}>康奈尔大学疫情实时动态</h3>
      </div>
      <div ref={card} className="content">
        <Row style={{ position: "sticky", top: 0, zIndex: 999}} >
          <Col>
            <Card className="card-chart" style={cardStyle}>
              {currentIdx === -1 ?
                <CardBody >
                  <Row>
                    <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "80px"}}>
                      <DataCard
                        title={"总确诊"} 
                        data={total.positive}
                        idx={currentIdx}
                      />
                    </Col>
                    <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "80px"}}>
                      <DataCard
                        title={"今日确诊"} 
                        data={newD.new_positive}
                        color={newD.new_positive === 0 ? "green": "red"}
                        idx={currentIdx}
                      />
                    </Col>
                    <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "80px"}}>
                      <DataCard
                        title={"新增检测"} 
                        data={newD.new_test}
                        idx={currentIdx}
                      />
                    </Col>
                    <Col className="text-center" xs={3} style={{height: "80px"}}>
                      <DataCard
                        title={"现存确诊"} 
                        data={total.total_active}
                        idx={currentIdx}
                      />
                    </Col>
                  </Row>

                  <CardFooter>
                    <span className="font-weight-bold" style={{color: "#778899"}}>更新于{today}</span>
                  </CardFooter>
                </CardBody> :
                <CardBody>  
                  <Row style={{paddingBottom: "20px"}}>
                    <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"日期"} 
                        data={allData[currentIdx].date.toString().substring(0, 10)}
                      />
                    </Col>
                    <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"累计确诊"} 
                        data={allData[currentIdx].positive}
                      />
                    </Col>
                    <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"当日确诊"} 
                        data={allData[currentIdx].new_positive}
                        color={allData[currentIdx].new_positive === 0 ? "green": "red"}
                      />
                    </Col>
                    <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"累计检测"} 
                        data={allData[currentIdx].total_test}
                      />
                    </Col>
                    <Col className="text-center" xs={2} style={{height: "60px"}}>
                      <DataCard
                        title={"新增检测"} 
                        data={allData[currentIdx].new_test}
                      />
                    </Col>
                  </Row>
                  <Row>  
                    <Col className="text-center" xs={3} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"检测未出结果"} 
                        data={allData[currentIdx].pending_result}
                      />
                    </Col>
                 
                  
                    <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"治愈"} 
                        data={allData[currentIdx].recovered}
                      />
                    </Col>
                    <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"住院"} 
                        data={allData[currentIdx].hospitalization}
                      />
                    </Col>
                    <Col className="text-center" xs={2} style={{borderRight: "1px solid grey", height: "60px"}}>
                      <DataCard
                        title={"死亡"} 
                        data={allData[currentIdx].death}
                      />
                    </Col>
                    <Col className="text-center" xs={2} style={{height: "60px"}}>
                      <DataCard
                        title={"现存确诊"} 
                        data={allData[currentIdx].total_active}
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
            <LineChart title="累计确诊" data={ dataGen(dayChange.date, [{ data: dayChange.day_sum, label: "确诊人数", color: "#18ce0f"}])} options={ chartConfigure } />
          </Col>
          
          <Col xs={12} md={4}>
            <BarChart title="每日新增" data={ dataGen(dayChange.date, [
              { data: dayChange.day_increase, label: "每日新增", color: "#2CA8FF"},
              { data: dayChange.seven_avg, label: "七日平均", type: "line", color: "#f96332"}
              ])} options={chartConfigure}></BarChart>
          </Col>
          
          <Col xs={12} md={4}>
            <LineChart title="现存确诊" data={ dataGen(dayChange.date, [{ data: dayChange.day_active, label: "现存确诊", color: "#D8BFD8"}])}options={ chartConfigure } />
          </Col>
          
        </Row>
        
        <Row>
          <Col xs={12}>                
            <PaginateTable title="详细数据" data={allData}></PaginateTable>
          </Col>
          
        </Row>
        
      </div>
    </>
  );
}

function App() {
  return (
    <div className="main-panel" style={{width: "100%", height: "unset", float: "unset", overflow: "visible"}}>
      <Dashboard></Dashboard>
  </div>
  )
}

export default App;
