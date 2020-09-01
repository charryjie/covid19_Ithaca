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
import React, { useEffect } from "react";
// react plugin used to create charts

import { PaginateTable } from './components/PaginateTable'
import { DailyData } from './components/DailyData'
import { Chart } from './components/Chart'
// reactstrap components
import {
  Row,
  Col,
} from "reactstrap";

import { useSelector, useDispatch } from 'react-redux';
import { selectAllData, selectToday, selectIdx, updateAllData } from './reducer';

function Dashboard() {

  const dispatch = useDispatch();
  const allData = useSelector(selectAllData);
  const today = useSelector(selectToday);
  const selectedIdx = useSelector(selectIdx);

  let getData = () => {
    if(allData.length > 0) return 
    const Http = new XMLHttpRequest();
    const url = 'https://covid19-ithaca.herokuapp.com/dailydata';
    // const url = 'http://localhost:4999/dailydata'
    Http.open("GET", url);

    Http.onreadystatechange = (e) => {
      if(Http.readyState === 4) {
        let data = JSON.parse(Http.responseText);
        dispatch(updateAllData(data));
      }
    }

    Http.send();
  }

  useEffect(() => {
    getData();
  })

  

  return (
    <>
      <div className="panel-header" style={{height: "300px", background: "#778899"}}>
        <h3 className="text-center font-weight-bold" style={{color: "white"}}>康奈尔大学疫情实时动态</h3>
        <h6 className="text-center font-weight-bold" style={{color: "white"}}>{today}</h6>
      </div>
      <div className="content">
        {selectedIdx === -1 ? null : <DailyData />}
        <Chart />
        
        <Row>
          <Col xs={12}>                
            <PaginateTable title="详细数据"></PaginateTable>
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
