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
import { useTranslation, Trans } from "react-i18next";
import { PaginateTable } from './components/PaginateTable'
import { DailyData } from './components/DailyData'
import { Chart } from './components/Chart'
// reactstrap components
import { Row, Col, Button, CardFooter } from "reactstrap";

import { useSelector, useDispatch } from 'react-redux';
import { selectAllData, selectToday, selectIdx, updateAllData } from './reducer';

function App() {

  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const dispatch = useDispatch();
  const allData = useSelector(selectAllData);
  const today = useSelector(selectToday);
  const selectedIdx = useSelector(selectIdx);

  let getData = () => {
    if(allData.length > 0) return 
    const Http = new XMLHttpRequest();
    // const url= 'https://qe9ojsk0m9.execute-api.ap-northeast-1.amazonaws.com/prod/dailydata';
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
    <div className="main-panel" style={{width: "100%", height: "unset", float: "unset", overflow: "visible"}}>
      <div className="panel-header" style={{height: "300px", background: "#778899"}}>
        <h3 className="text-center font-weight-bold" style={{color: "white", marginBottom: "6px"}}><Trans>Cornell Covid-19 Tracking</Trans></h3>
        <h5 className="text-center font-weight-bold" style={{color: "white"}}>(<Trans>Tompkins</Trans>)</h5>
        <h6 className="text-center font-weight-bold" style={{color: "white"}}><Trans>updated on</Trans> {today}</h6>
        <div className="text-center">
          <Button style={{backgroundColor: "#2F4F4F", marginRight: "10px"}} onClick={() => changeLanguage("en")}>English</Button>
          <Button style={{backgroundColor: "#2F4F4F"}} onClick={() => changeLanguage("zh")}>中文</Button>
        </div>
      </div>
      <div className="content" style={{marginTop: "-67px"}}>
        {selectedIdx === -1 ? null : <DailyData />}
        <Chart />
        
        <Row>
          <Col xs={12}>                
            <PaginateTable title="Detailed Data"></PaginateTable>
          </Col>
          
        </Row>

        <CardFooter className="text-center">
          <Trans>Developed and maintained by Jie Feng</Trans>
        </CardFooter>
        
      </div>
    </div>
  );
}

export default App;
