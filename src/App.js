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
import { selectIdx, selectAllData, selectToday, updateByKey, updateAllData, changeColor } from './reducer';

function Dashboard() {
  const card = React.createRef();

  const dispatch = useDispatch();
  const currentIdx = useSelector(selectIdx);
  const allData = useSelector(selectAllData);
  const today = useSelector(selectToday);

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

  let onScroll = () => {
    if(card.current === null) return
    let dis = card.current.offsetTop;
    if(window.pageYOffset > dis ) {
      if (currentIdx === -1) {
        dispatch(changeColor("white"))
        dispatch(updateByKey(allData.length-1))
      }
    } else {
      dispatch(changeColor("white"))
      dispatch(updateByKey(-1))
    }
  }

  useEffect(() => {
    getData();
  })

  useEffect(() => {
    window.onscroll = onScroll
  })
  

  return (
    <>
      <div className="panel-header" style={{height: "300px", background: "#778899"}}>
        <h3 className="text-center font-weight-bold" style={{color: "white"}}>康奈尔大学疫情实时动态</h3>
        <h6 className="text-center font-weight-bold" style={{color: "white"}}>{today}</h6>
      </div>
      <div ref={card} className="content">
        <DailyData />
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
